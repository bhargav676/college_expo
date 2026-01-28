require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { parse } = require("csv-parse/sync");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

const forms = [
  { name: "Hardware Expo", csvUrl: process.env.HARDWARE_EXPO_CSV || "" },
  { name: "Paper Presentation", csvUrl: process.env.PAPER_PRESENTATION_CSV || "" },
  { name: "Robo Wars", csvUrl: process.env.ROBO_WARS_CSV || "" },
  { name: "Digital Hackathon", csvUrl: process.env.DIGITAL_HACKATHON_CSV || "" },
  { name: "Fun Events", csvUrl: process.env.FUN_EVENTS_CSV || "" },
];

const sheetCache = {};
const CACHE_TTL = 15 * 60 * 1000; // Increased to 15 minutes (adjust as needed)

async function fetchSheet(csvUrl) {
  if (!csvUrl || csvUrl.startsWith("YOUR_")) return [];

  // Use cache if valid
  const cached = sheetCache[csvUrl];
  if (cached && Date.now() - cached.time < CACHE_TTL) {
    return cached.data;
  }

  // Fetch fresh data
  const response = await fetch(csvUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch sheet (${response.status})`);
  }

  const text = await response.text();
  const records = parse(text, {
    columns: true,
    skip_empty_lines: true,
  });

  // Save to cache
  sheetCache[csvUrl] = {
    time: Date.now(),
    data: records,
  };

  return records;
}

/* ================================
   CHECK REGISTRATION
================================ */
app.post("/check-registration", async (req, res) => {
  const { searchValue } = req.body;

  if (!searchValue) {
    return res.status(400).json({ error: "Enter email or mobile number" });
  }

  const searchLower = searchValue.trim().toLowerCase();
  const searchClean = searchValue.replace(/[\s\-\(\)]/g, "");

  // Run all sheet checks in parallel
  const promises = forms.map(async (form) => {
    if (!form.csvUrl || form.csvUrl.startsWith("YOUR_")) {
      return null;
    }

    try {
      const rows = await fetchSheet(form.csvUrl);

      const exists = rows.some((row) =>
        Object.values(row).some((cell) => {
          const value = String(cell).trim().toLowerCase();
          const clean = String(cell).replace(/[\s\-\(\)]/g, "");
          return value === searchLower || clean === searchClean;
        })
      );

      if (exists) {
        return { name: form.name, status: "Registered" };
      }
    } catch (err) {
      console.error(`Error fetching ${form.name}:`, err.message);
    }
    return null;
  });

  const results = await Promise.all(promises);
  const foundEvents = results.filter(Boolean);

  res.json({
    searchValue,
    registeredEvents: foundEvents,
    totalRegistrations: foundEvents.length,
  });
});

/* ================================
   EVENTS LIST
================================ */
app.get("/events", (req, res) => {
  res.json({
    events: forms.map((f) => ({
      name: f.name,
      hasSheet: !!f.csvUrl && !f.csvUrl.startsWith("YOUR_"),
    })),
  });
});

/* ================================
   DEBUG ENDPOINT
================================ */
app.get("/debug", async (req, res) => {
  const results = [];

  for (const form of forms) {
    try {
      const rows = await fetchSheet(form.csvUrl);
      results.push({
        name: form.name,
        status: "OK",
        rowCount: rows.length,
        columns: rows[0] ? Object.keys(rows[0]) : [],
      });
    } catch (err) {
      results.push({
        name: form.name,
        status: "ERROR",
        error: err.message,
      });
    }
  }

  res.json({ debug: results });
});

/* ================================
   START SERVER + PRE-WARM CACHE
================================ */
app.listen(PORT, async () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📋 Configured ${forms.length} events`);

  // Pre-warm the cache in the background (doesn't block the server start)
  console.log("Pre-warming sheet cache...");
  Promise.all(
    forms.map((form) =>
      fetchSheet(form.csvUrl).catch((err) =>
        console.error(`Pre-warm failed for ${form.name}:`, err.message)
      )
    )
  ).then(() => {
    console.log("Cache pre-warming completed");
  });
});