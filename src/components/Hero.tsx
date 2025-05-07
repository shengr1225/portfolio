import { motion } from "framer-motion";
import TypewriterEffect from "typewriter-effect";

interface HeroProps {
  isMobile: boolean;
}

const Hero = ({ isMobile }: HeroProps) => {
  return (
    <section className="relative min-h-[calc(100vh-65px)] mt-[65px] flex flex-col justify-center items-center px-4 md:px-6 lg:px-8 sm:pb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-4xl mx-auto"
      >
        <motion.h1
          className="text-4xl sm:text-5xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200 mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Journey Through Code
        </motion.h1>

        <motion.div
          className="text-base sm:text-lg text-gray-400/90 mb-8 sm:mb-12 max-w-2xl mx-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <TypewriterEffect
            onInit={(typewriter) => {
              typewriter
                .typeString(
                  "Transforming ideas into reality through elegant code and innovative solutions."
                )
                .start();
            }}
            options={{
              delay: 50,
            }}
          />
        </motion.div>

        <motion.div
          className="flex flex-col gap-4 sm:gap-6 max-w-3xl p-3 sm:p-6 rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-white/[0.05] mx-2 sm:mx-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="flex items-center gap-3 text-blue-400">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <span className="text-xs sm:text-sm font-medium">
              AI PROGRESS SUMMARY
            </span>
          </div>
          <div className="text-sm sm:text-base lg:text-lg text-gray-300/90 text-left whitespace-pre-line leading-relaxed">
            {isMobile ? (
              <TypewriterEffect
                onInit={(typewriter) => {
                  typewriter
                    .typeString("")
                    .pauseFor(5000)
                    .typeString("Hi, I am Sheng Rong 👋")
                    .pauseFor(1000)
                    .deleteAll(20)
                    .typeString(
                      "From crafting games that generated $2M monthly "
                    )
                    .pauseFor(500)
                    .deleteAll(20)
                    .typeString(
                      "to building AI-powered platforms that connect people and ideas. "
                    )
                    .pauseFor(500)
                    .deleteAll(20)
                    .typeString(
                      "As an AI fullstack engineer with 8+ years of experience, I blend technical expertise with entrepreneurial vision. My journey spans from game development to founding SFMeal.com, and now pioneering AI systems at Pominis. "
                    )
                    .pauseFor(1000)
                    .typeString("<br/><br/>")
                    .typeString(
                      "I'm passionate about creating scalable, user-centric products that make a real impact. Let's build something extraordinary together."
                    )
                    .start();
                }}
                options={{
                  delay: 20,
                  deleteSpeed: 1,
                }}
              />
            ) : (
              <TypewriterEffect
                onInit={(typewriter) => {
                  typewriter
                    .typeString("")
                    .pauseFor(5000)
                    .typeString("Hi, I am Sheng Rong 👋")
                    .pauseFor(1000)
                    .typeString("<br/><br/>")
                    .typeString(
                      "From crafting games that generated $2M monthly "
                    )
                    .pauseFor(500)
                    .typeString(
                      "to building AI-powered platforms that connect people and ideas. "
                    )
                    .pauseFor(1000)
                    .typeString("<br/><br/>")
                    .typeString(
                      "As an AI fullstack engineer with 8+ years of experience, I blend technical expertise with entrepreneurial vision. My journey spans from game development to founding SFMeal.com, and now pioneering AI systems at Pominis. "
                    )
                    .pauseFor(1000)
                    .typeString("<br/><br/>")
                    .typeString(
                      "I'm passionate about creating scalable, user-centric products that make a real impact. Let's build something extraordinary together."
                    )
                    .start();
                }}
                options={{
                  delay: 20,
                  deleteSpeed: 1,
                }}
              />
            )}
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <motion.div
          className="flex items-center gap-2 text-gray-400 cursor-pointer bg-[#0B1120]/80 backdrop-blur-sm px-4 py-2 rounded-full"
          onClick={() =>
            window.scrollTo({
              top:
                (document.querySelector("#projects-section") as HTMLElement)
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
          <span className="text-sm">View Projects</span>
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
    </section>
  );
};

export default Hero;
