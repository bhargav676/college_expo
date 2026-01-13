const Button = ({ children, variant = 'primary', className = '', onClick }) => {
  const variants = {
    primary: 'bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70',
    secondary: 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70',
    outline: 'bg-transparent border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500/10 hover:shadow-lg hover:shadow-cyan-500/50',
    ghost: 'bg-cyan-500/10 text-cyan-500 hover:bg-cyan-500/20 hover:shadow-lg hover:shadow-cyan-500/30',
  };

  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
