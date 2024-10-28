import React from 'react';
import { Plane, Database, Code, Network, Globe, Brain } from 'lucide-react';
import { motion } from 'framer-motion';

const Projects: React.FC = () => {
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

  const projects = [
    {
      title: "Airplane Reservation System",
      description: "A functional airplane reservation system developed in C++.",
      icon: Plane,
    },
    {
      title: "Medical Corporation Database",
      description: "A full application with a designed database for a Medical Corporation using Java and SQL.",
      icon: Database,
    },
    {
      title: "Software Engineering Project",
      description: "A comprehensive project utilizing software engineering skills, including Project Management, Java, and Visual Paradigm.",
      icon: Code,
    },
    {
      title: "Network with Dedicated Servers",
      description: "A fully functional network with dedicated servers, implemented using Cisco Packet Tracer.",
      icon: Network,
    },
    {
      title: "Conference Web Application",
      description: "A fully functional Conference Web Application built with HTML, CSS, JavaScript, and Prisma Database.",
      icon: Globe,
    },
    {
      title: "AI Loan Approval Predictor",
      description: "An AI project for predicting loan approval using machine learning techniques.",
      icon: Brain,
    },
  ];

  return (
    <section id="projects" className="relative py-20 bg-gradient-to-b from-secondary/50 to-accent/50 scroll-mt-16 overflow-hidden">
      {generateSparks()}
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-center">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <project.icon className="w-12 h-12 mb-4 mx-auto text-cyan-500" />
              <h3 className="text-xl font-semibold mb-2 text-center">{project.title}</h3>
              <p className="text-center">{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;