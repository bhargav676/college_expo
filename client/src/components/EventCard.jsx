const EventCard = ({
  title,
  description,
  icon: Icon,
  category,
  registrationLink,
}) => {
  const handleRegister = () => {
    if (registrationLink) {
      window.open(registrationLink, "_blank");
    }
  };

  return (
    <div className="group relative bg-gradient-to-br from-gray-900 to-black border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-2">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="relative z-10">
        {/* Icon */}
        <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          <Icon className="text-4xl text-cyan-500" />
        </div>

        {/* Category Badge */}
        <div className="mb-3">
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full ${
              category === "Technical"
                ? "bg-cyan-500/20 text-cyan-500"
                : "bg-purple-500/20 text-purple-500"
            }`}
          >
            {category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-500 transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-sm mb-6 line-clamp-3">{description}</p>

        {/* Button */}
        <button
          onClick={handleRegister}
          disabled={!registrationLink}
          className={`w-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 hover:from-cyan-500/20 hover:to-purple-500/20 text-cyan-500 font-semibold py-3 px-6 rounded-lg border border-cyan-500/30 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50 ${
            !registrationLink ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Register Now →
        </button>
      </div>
    </div>
  );
};

export default EventCard;
