import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-6 left-0 right-0 z-50 px-4 transition-all duration-300"
    >
      <nav className="max-w-7xl mx-auto backdrop-blur-md bg-black/20 border border-gray-400/30 rounded-2xl p-4 shadow-lg shadow-black/10">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <a 
              href="#" 
              className="text-2xl font-bold bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent"
            >
              Mohamed K. Hammad
            </a>
          </motion.div>

          <motion.ul 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-8"
          >
            {['About', 'Projects', 'Contact'].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="text-base font-medium text-secondary hover:text-white transition-colors duration-200 hover:underline decoration-blue-300/50 underline-offset-4"
                >
                  {item}
                </a>
              </li>
            ))}
          </motion.ul>
        </div>
      </nav>
    </motion.header>
  );
};

export default Header;
