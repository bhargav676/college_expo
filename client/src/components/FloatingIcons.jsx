import { motion } from "framer-motion";
import { HiRocketLaunch, HiTrophy, HiUsers, HiSparkles, HiCpuChip } from "react-icons/hi2";

const icons = [
  { Icon: HiRocketLaunch, color: "text-cyan-400" },
  { Icon: HiTrophy, color: "text-yellow-400" },
  { Icon: HiUsers, color: "text-purple-400" },
  { Icon: HiSparkles, color: "text-pink-400" },
  { Icon: HiCpuChip, color: "text-green-400" },
];

const random = (min, max) => Math.random() * (max - min) + min;

export default function FloatingIcons() {
  return (
    <div className="relative flex justify-center items-center h-32 md:h-40 w-full overflow-visible pointer-events-none select-none">
      {icons.map(({ Icon, color }, i) => (
        <motion.div
          key={i}
          className={`absolute text-3xl md:text-5xl ${color}`}
          style={{
            left: `${20 + i * 15}%`,
            top: `${random(10, 60)}%`,
            zIndex: 1,
          }}
          animate={{
            y: [0, random(-20, 20), 0, random(10, 30), 0],
            rotate: [0, random(-15, 15), 0, random(-10, 10), 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: random(5, 8),
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            delay: i * 0.5,
          }}
          whileHover={{ scale: 1.3, filter: "brightness(1.3)" }}
        >
          <Icon />
        </motion.div>
      ))}
    </div>
  );
}
