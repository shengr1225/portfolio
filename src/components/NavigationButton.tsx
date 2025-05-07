import { motion } from "framer-motion";

interface NavigationButtonProps {
  text: string;
  targetId: string;
}

const NavigationButton = ({ text, targetId }: NavigationButtonProps) => {
  return (
    <motion.div
      className="flex justify-center py-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <motion.div
        className="flex items-center gap-2 text-gray-400 cursor-pointer bg-[#0B1120]/80 backdrop-blur-sm px-4 py-2 rounded-full"
        onClick={() =>
          window.scrollTo({
            top:
              (document.querySelector(`#${targetId}`) as HTMLElement)
                ?.offsetTop || 0,
            behavior: "smooth",
          })
        }
        whileHover={{ y: -3 }}
        animate={{
          y: [0, 5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <span className="text-sm">{text}</span>
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default NavigationButton;
