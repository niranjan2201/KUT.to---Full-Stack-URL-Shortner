import { motion } from "framer-motion";

function Card({ title, desc, icon: Icon, theme = "violet" }) {
  const themes = {
    violet: {
      glow: "from-violet-400/70 via-fuchsia-400/40 to-transparent",
      border: "border-violet-200/40",
      iconBg: "bg-violet-400/25",
    },
    blue: {
      glow: "from-sky-400/70 via-cyan-400/40 to-transparent",
      border: "border-sky-200/40",
      iconBg: "bg-sky-400/25",
    },
    orange: {
      glow: "from-orange-400/70 via-rose-400/40 to-transparent",
      border: "border-orange-200/40",
      iconBg: "bg-orange-400/25",
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ scale: 1.05, y: -8 }}
      whileTap={{ scale: 0.93, rotate: -0.3 }}
      transition={{ type: "spring", stiffness: 500, damping: 22 }}
      className={`relative overflow-hidden rounded-2xl p-6 cursor-pointer
        backdrop-blur-2xl bg-white/20 border ${themes[theme].border}
        shadow-xl hover:shadow-2xl transition-all duration-300
        hover:bg-white/25`}
    >
      {/* Glow */}
      <motion.div
        className={`absolute inset-0 opacity-80 bg-gradient-to-br ${themes[theme].glow} pointer-events-none`}
        initial={{ opacity: 0.55 }}
        whileHover={{ opacity: 1 }}
        whileTap={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      />

      {/* Highlight */}
      <div className="absolute inset-0 bg-white/5 pointer-events-none" />

      <div className="relative z-10">
        {/* Icon */}
        <motion.div
          whileHover={{ rotate: 6 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 500, damping: 18 }}
          className={`w-12 h-12 rounded-xl flex items-center justify-center 
          ${themes[theme].iconBg} border border-white/25 mb-4`}
        >
          <Icon className="w-6 h-6 text-white" />
        </motion.div>

        <h3 className="text-white font-semibold text-lg tracking-wide mb-2">
          {title}
        </h3>

        <p className="text-gray-200 text-sm leading-relaxed font-normal">
          {desc}
        </p>
      </div>
    </motion.div>
  );
}

export default Card;
