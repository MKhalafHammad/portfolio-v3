import React from 'react';
import { Shield } from 'lucide-react';

const Header: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -64; // Adjust this value based on your header height
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-gray-800 py-4 fixed top-0 left-0 right-0 z-10">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Shield className="text-cyan-500 mr-2" />
          <span className="text-xl font-bold">Mohamed K. Hammad</span>
        </div>
        <ul className="flex space-x-4">
          <li><button onClick={() => scrollToSection('about')} className="hover:text-cyan-500">About</button></li>
          <li><button onClick={() => scrollToSection('projects')} className="hover:text-cyan-500">Projects</button></li>
          <li><button onClick={() => scrollToSection('contact')} className="hover:text-cyan-500">Contact</button></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;