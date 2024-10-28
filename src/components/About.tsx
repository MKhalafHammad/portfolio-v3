import React from 'react';
import { GraduationCap, Code, Server } from 'lucide-react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
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
    <section id="about" className="relative py-20 bg-gradient-to-b from-accent/50 to-secondary/50 scroll-mt-16 overflow-hidden">
      {generateSparks()}
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-center">About Me</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
            <GraduationCap className="w-12 h-12 mb-4 mx-auto text-cyan-500" />
            <h3 className="text-xl font-semibold mb-2 text-center">Education</h3>
            <p className="text-center">
              Graduated from Qatar University with a major in Computer Science - Cybersecurity Concentration
            </p>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
            <Code className="w-12 h-12 mb-4 mx-auto text-cyan-500" />
            <h3 className="text-xl font-semibold mb-2 text-center">Skills</h3>
            <ul className="list-disc list-inside">
              <li>C, C++, Java, JavaScript, Python</li>
              <li>CSS, HTML, Shell Script, Oracle SQL</li>
              <li>Full Stack Web Development</li>
              <li>Data Structures & Algorithms</li>
            </ul>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
            <Server className="w-12 h-12 mb-4 mx-auto text-cyan-500" />
            <h3 className="text-xl font-semibold mb-2 text-center">Expertise</h3>
            <ul className="list-disc list-inside">
              <li>Penetration Testing</li>
              <li>Digital Forensics</li>
              <li>Software Engineering</li>
              <li>Problem Solving</li>
              <li>Teamwork</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;