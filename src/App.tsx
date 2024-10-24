import React, { Suspense } from 'react';
import CyberScene from './components/CyberScene';
import Header from './components/Header';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main>
        <section className="h-screen sticky top-0">
          <Suspense fallback={null}>
            <CyberScene />
          </Suspense>
        </section>
        <section className="relative z-10 bg-gray-900">
          <About />
          <Projects />
          <Contact />
        </section>
      </main>
      <footer className="bg-gray-800 py-4 text-center">
        <p>&copy; 2024 Mohamed K. Hammad. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;