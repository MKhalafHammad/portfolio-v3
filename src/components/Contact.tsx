import React from 'react';
import { Mail, Linkedin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  const sparkVariants = {
    initial: { opacity: 0, scale: 0 },
    animate: { opacity: [0, 1, 0], scale: [0, 1, 0] },
  };

  const generateSparks = () => {
    const sparks = [];
    for (let i = 0; i < 50; i++) {
      const randomX = Math.random() * 100;
      const randomY = Math.random() * 100;
      const randomDelay = Math.random() * 5;
      const randomDuration = 0.5 + Math.random() * 1;

      sparks.push(
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{ left: `${randomX}%`, top: `${randomY}%` }}
          variants={sparkVariants}
          initial="initial"
          animate="animate"
          transition={{
            duration: randomDuration,
            repeat: Infinity,
            delay: randomDelay,
            ease: "easeInOut"
          }}
        />
      );
    }
    return sparks;
  };

  return (
    <section id="contact" className="relative py-20 bg-gradient-to-b from-accent/50 to-secondary/50 scroll-mt-16 overflow-hidden">
      {generateSparks()}
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-center">Contact Me</h2>
        <div className="flex flex-col items-center space-y-6">
          <motion.a 
            href="mailto:m.khalafhammad@gmail.com" 
            className="flex items-center space-x-2 text-cyan-500 hover:text-cyan-400"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail className="w-6 h-6" />
            <span>m.khalafhammad@gmail.com</span>
          </motion.a>
          <motion.a 
            href="https://www.linkedin.com/in/m-khalafhammad/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center space-x-2 text-cyan-500 hover:text-cyan-400"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Linkedin className="w-6 h-6" />
            <span>LinkedIn Profile</span>
          </motion.a>
          <motion.a 
            href="tel:+97466466813" 
            className="flex items-center space-x-2 text-cyan-500 hover:text-cyan-400"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Phone className="w-6 h-6" />
            <span>+974-66466813</span>
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default Contact;