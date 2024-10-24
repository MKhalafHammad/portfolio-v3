import React from 'react';
import { Mail, Linkedin, Github } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-gray-800 scroll-mt-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-center">Contact Me</h2>
        <div className="flex flex-col items-center space-y-6">
          <a href="mailto:your.email@example.com" className="flex items-center space-x-2 text-cyan-500 hover:text-cyan-400">
            <Mail className="w-6 h-6" />
            <span>your.email@example.com</span>
          </a>
          <a href="https://www.linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-cyan-500 hover:text-cyan-400">
            <Linkedin className="w-6 h-6" />
            <span>LinkedIn Profile</span>
          </a>
          <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-cyan-500 hover:text-cyan-400">
            <Github className="w-6 h-6" />
            <span>GitHub Profile</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;