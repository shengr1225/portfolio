import { motion } from "framer-motion";

const cardVariants = {
  initial: {
    y: 20,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
  hover: {
    y: -5,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
};

export function TimelineDay({
  date,
  subtitle,
  side,
  dotColor,
  children,
}: {
  date: string;
  subtitle: string;
  side: "left" | "right";
  dotColor: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`relative mb-24 ${
        side === "right" ? "text-right" : "text-left"
      }`}
    >
      <div className="flex items-center mb-4">
        <motion.div
          className={`w-4 h-4 rounded-full ${dotColor} absolute left-1/2 -translate-x-1/2`}
          whileHover={{ scale: 1.5 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        />
        <div className={`w-1/2 ${side === "right" ? "pl-8" : "pr-8"}`}>
          <h3 className="text-xl font-semibold text-white">{date}</h3>
          <p className="text-gray-400">{subtitle}</p>
        </div>
      </div>
      <div
        className={`space-y-6 ${
          side === "right" ? "ml-[52%] pl-8" : "w-[48%]"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export function TimelineCard({
  tag,
  tagColor,
  title,
  items,
}: {
  tag: string;
  tagColor: string;
  title: string;
  items: string[];
}) {
  const getTagColor = (color: string) => {
    const colors = {
      blue: "bg-blue-500/20 text-blue-300 border-blue-500/20",
      green: "bg-green-500/20 text-green-300 border-green-500/20",
      purple: "bg-purple-500/20 text-purple-300 border-purple-500/20",
      yellow: "bg-yellow-500/20 text-yellow-300 border-yellow-500/20",
      orange: "bg-orange-500/20 text-orange-300 border-orange-500/20",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
    >
      <div className="flex items-center gap-4 mb-4">
        <span
          className={`px-3 py-1 rounded-full text-sm border ${getTagColor(
            tagColor
          )}`}
        >
          {tag}
        </span>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      <ul className="space-y-2 text-gray-300">
        {items.map((item, index) => (
          <motion.li
            key={index}
            className="flex items-start"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <span className="mr-2">•</span>
            {item}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
