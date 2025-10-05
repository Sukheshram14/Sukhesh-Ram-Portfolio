import React, { useEffect, useState, useRef, useCallback } from "react";
import App1 from './App1.jsx'
// import ProjectsSection from './ProjectsSection.jsx'

const skills = [
  "JavaScript", "Python", "HTML", "CSS", 
  "React.js", "Node.js", "Express.js", 
  "MongoDB", "Git", "GitHub", 
  "Postman", "Chrome DevTools"
];
const marqueeSkills = [...skills, ...skills]; // For continuous scrolling effect

// Mapping view names to their corresponding navigation item labels
const viewMap = {
  home: 0,
  about: 1,
  skills: 2,
  projects: 3,
  experience: 4,
  contact: 5,
};
const navItems = Object.keys(viewMap); // ["home", "about", "skills", "projects", "experience", "contact"]

// Utility component for Project Card (Used in the Projects section)
const ProjectCard = ({ title, description, tags, featured = false }) => (
  <div className={`p-6 sm:p-8 rounded-3xl clay-card transition duration-300 press-effect-clay flex flex-col ${featured ? 'md:col-span-2' : ''}`}>
    <div className={`h-32 clay-surface-placeholder rounded-xl mb-4 flex items-center justify-center text-[var(--text-color)] font-extrabold text-xs text-center p-2 ${featured ? 'h-40' : 'h-32'}`}>
      PROJECT MOCKUP PREVIEW
    </div>
    <h3 className="font-sans text-xl font-bold mb-1 text-[var(--text-color)]">{title}</h3>
    <p className="text-[var(--text-secondary)] text-sm sm:text-base mb-2 leading-relaxed">{description}</p>
    <div className="flex gap-2 flex-wrap mt-auto pt-2">
      {tags.map((tag, i) => (
        <span key={i} className={`px-4 py-1.5 rounded-full text-xs font-semibold tag-clay`}>
          {tag}
        </span>
      ))}
    </div>
  </div>
);

// --- Canvas Background Component (The Lively Background) ---
const CanvasBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let particles = [];
    let mouse = { x: 0, y: 0 };
    let isInitialized = false;

    // --- Particle Class ---
    class Particle {
      constructor(w, h) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.radius = 4 + Math.random() * 8; 
        this.baseRadius = this.radius;
        this.velocity = {
          x: (Math.random() - 0.5) * 0.2,
          y: (Math.random() - 0.5) * 0.2,
        };
        this.time = Math.random() * 100;
      }

      update(w, h) {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.time += 0.05;

        // Wrap particles
        if (this.x < 0) this.x = w;
        if (this.x > w) this.x = 0;
        if (this.y < 0) this.y = h;
        if (this.y > h) this.y = 0;

        // Subtle pulsing effect (mimics soft clay texture movement)
        this.radius = this.baseRadius + Math.sin(this.time * 0.5) * 1.5;

        // Simple mouse interaction (push away slightly)
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const influenceRadius = 150;
        if (distance < influenceRadius) {
            const angle = Math.atan2(dy, dx);
            const strength = 1 - (distance / influenceRadius);
            this.x -= Math.cos(angle) * strength * 0.5;
            this.y -= Math.sin(angle) * strength * 0.5;
        }
      }

      draw(ctx) {
        ctx.beginPath();
        // Radial gradient for a soft, volumetric light effect
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        gradient.addColorStop(0, 'rgba(255, 69, 0, 0.7)'); // Center (bright accent/vermiliion)
        gradient.addColorStop(0.5, 'rgba(255, 69, 0, 0.3)'); // Mid-range
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.1)'); // Edge (very soft)

        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
      }
    }

    // --- Setup & Resize ---
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Initialize or re-initialize particles only if not already done or on major size change
      if (!isInitialized) {
        particles = [];
        // Calculate number of particles based on screen size (density control)
        const numParticles = Math.floor(canvas.width * canvas.height / 15000); 
        for (let i = 0; i < numParticles; i++) {
          particles.push(new Particle(canvas.width, canvas.height));
        }
        isInitialized = true;
      }
    };

    // --- Animation Loop ---
    const animate = () => {
      // Clear the canvas and apply a semi-transparent layer of the background color
      // This creates the "streaking"/fade effect for the particles
      ctx.fillStyle = 'rgba(249, 250, 251, 0.6)'; // Soft fade layer (lighter than background for light mode)
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.update(canvas.width, canvas.height);
        p.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // --- Event Listeners ---
    const handleMouseMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);

    resizeCanvas();
    animate();

    // --- Cleanup ---
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 bg-transparent"></canvas>;
};


function App() {
  const [currentView, setCurrentView] = useState("home"); // Tracks which section is currently full-screen
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // === Sonic Feedback Implementation (Web Audio API) ===
  const playClickSound = useCallback((isPrimary = false) => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;

      const audioContext = new AudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Higher frequency for a crisp "pop"
      const frequency = isPrimary ? 780 : 660; 

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      // Short, exponential decay for a clean pop (0.1 second)
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1); 

      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (error) {
      console.error("Failed to play sound:", error);
    }
  }, []);

  // --- Navigation Logic ---
  const handleNavigate = useCallback((view) => {
    playClickSound(); // Trigger sound on navigation menu click
    setCurrentView(view);
    setIsMobileMenuOpen(false);
  }, [playClickSound]);

  const getCurrentViewIndex = () => viewMap[currentView];
  const totalViews = navItems.length;

  const handlePrev = () => {
    playClickSound(true); // Trigger sound
    const currentIndex = getCurrentViewIndex();
    const prevIndex = (currentIndex - 1 + totalViews) % totalViews;
    handleNavigate(navItems[prevIndex]);
  };

  const handleNext = () => {
    playClickSound(true); // Trigger sound
    const currentIndex = getCurrentViewIndex();
    const nextIndex = (currentIndex + 1) % totalViews;
    handleNavigate(navItems[nextIndex]);
  };

  // === Content Sections based on currentView state ===
  const renderContent = () => {
    switch (currentView) {
      case "home":
        return (
          // <div className="text-center md:text-left p-4">
          //   <p className="text-2xl sm:text-3xl font-extrabold text-[var(--text-color)] mb-4 tracking-tighter">
          //     Hello, I'm S Sukhesh Ram.
          //   </p>
          //   <h1 className="text-6xl sm:text-8xl md:text-[8rem] font-extrabold mb-4 leading-none text-[var(--accent-color)]">
          //     FULL STACK <br className="hidden sm:inline" />
          //     <span className="text-[var(--text-color)]">DEVELOPER</span>
          //   </h1>
          //   <p className="text-lg sm:text-xl md:text-2xl text-[var(--text-secondary)] max-w-xl mb-10 mx-auto md:mx-0 font-medium tracking-tight">
          //     I focus on building scalable, real-time web applications with MERN & Python. I specialize in clean architecture, rapid iteration, and delivering complex solutions that directly impact user experience.
          //   </p>
          //   <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          //     <button 
          //       onClick={() => { playClickSound(true); handleNavigate('projects'); }} 
          //       className="clay-button primary-clay"
          //     >
          //       Crafted Creations
          //     </button>
          //     <button 
          //       onClick={() => { playClickSound(); handleNavigate('contact'); }} 
          //       className="clay-button secondary-clay"
          //     >
          //       Request a Commission
          //     </button>
          //   </div>
          // </div>
          <div className="text-center md:text-left p-4">
            <p className="text-2xl sm:text-3xl font-extrabold text-[var(--text-color)] mb-4 tracking-tighter">
              Hello, I'm S Sukhesh Ram.
            </p>
            <h1 className="text-6xl sm:text-8xl md:text-[8rem] font-extrabold mb-4 leading-none text-[var(--accent-color)]">
              DIGITAL <br className="hidden sm:inline" />
              <span className="text-[var(--text-color)]">CRAFTSMAN</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-[var(--text-secondary)] max-w-xl mb-10 mx-auto md:mx-0 font-medium tracking-tight">
              I shape interactive web experiences using MERN and Python — blending design, logic, and flow. 
              I’m driven by curiosity across multiple fields, crafting ideas that connect technology and creativity through clean, thoughtful code.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button 
                onClick={() => { playClickSound(true); handleNavigate('projects'); }} 
                className="clay-button primary-clay"
              >
                Crafted Creations
              </button>
              <button 
                onClick={() => { playClickSound(); handleNavigate('contact'); }} 
                className="clay-button secondary-clay"
              >
                Request a Commission
              </button>
            </div>
          </div>

        );

      case "about":
        return (
            // <div className="max-w-4xl w-full mx-auto text-center p-4">
            //     <h2 className="text-4xl sm:text-5xl font-extrabold mb-8 section-title-clay">
            //         About The Full Stack Developer
            //     </h2>
            //     <div className="flex justify-center mb-6">
            //         <div className="h-40 w-40 rounded-full bg-white flex-shrink-0 clay-card-round shadow-lg shadow-[var(--shadow-dark)]/50">
            //             <div className="h-full w-full flex items-center justify-center text-[var(--secondary-color)] text-sm font-bold">
            //                 My Seal
            //             </div>
            //         </div>
            //     </div>
            //     <p className="text-xl text-[var(--text-secondary)] leading-relaxed mb-6 font-medium">
            //         Full Stack Developer with proven experience in MERN & Python, focused on building scalable, real-time web apps. Specializes in clean architecture, rapid iteration, and practical product design. Driven to solve complex problems that directly impact user experience and system performance.
            //     </p>
            //     <div className="p-4 rounded-xl clay-card-1 text-[var(--text-secondary)] text-base shadow-md transition duration-300">
            //         <span className="font-extrabold text-[var(--secondary-color)]">Achievements:</span> Global Rank #2,626 (Top 0.5%) in TCS CodeVita Season 12 and 3rd Place in CASTILO-25 Hackathon.
            //     </div>
            // </div>
          <div className="max-w-4xl w-full mx-auto text-center p-4">
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-8 section-title-clay">
              About The Digital Craftsman
            </h2>

            <div className="flex justify-center mb-6">
              <div className="h-40 w-40 rounded-full bg-white flex-shrink-0 clay-card-round shadow-lg shadow-[var(--shadow-dark)]/50">
                <div className="h-full w-full flex items-center justify-center text-[var(--secondary-color)] text-sm font-bold">
                  My Seal
                </div>
              </div>
            </div>

            <p className="text-xl text-[var(--text-secondary)] leading-relaxed mb-6 font-medium">
              A curious developer and creative technologist exploring how design and logic shape digital experiences.
              I build with MERN and Python, focusing on clean architecture, real-time interactions, and systems that
              feel as good to use as they are to build. Every project is an experiment in structure, usability, and flow.
            </p>

            <div className="p-4 rounded-xl clay-card-1 text-[var(--text-secondary)] text-base shadow-md transition duration-300">
              <span className="font-extrabold text-[var(--secondary-color)]">Milestones : </span> 
              Global Rank #2,626 (Top 0.5%) in TCS CodeVita Season 12 and 3rd Place in CASTILO-25 Hackathon.
            </div>
          </div>

        );

      case "skills":
        return (
            // <div className="max-w-4xl w-full mx-auto text-center p-4">
            //     <h2 className="text-4xl sm:text-5xl font-extrabold mb-12 section-title-clay">
            //         Technical Toolkit
            //     </h2>
            //     <div className="clay-card p-6 rounded-[3rem] shadow-xl">
            //         <h3 className="text-2xl text-[var(--accent-color)] font-extrabold mb-4 tracking-wide">MERN & Python Stack</h3>
            //         <div className="overflow-hidden">
            //             <div className="flex animate-marquee gap-8 w-max py-4">
            //             {marqueeSkills.map((skill, i) => (
            //                 <span key={i} className="inline-block bg-white text-[var(--text-color)] px-6 py-3 rounded-full text-base sm:text-xl font-bold whitespace-nowrap press-effect-clay skill-badge-clay">
            //                 {skill}
            //                 </span>
            //             ))}
            //             </div>
            //         </div>
            //     </div>
            // </div>
          <div className="max-w-4xl w-full mx-auto text-center p-4">
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-12 section-title-clay">
              Technical Toolkit
            </h2>

            <div className="clay-card p-6 rounded-[3rem] shadow-xl">
              <h3 className="text-2xl text-[var(--accent-color)] font-extrabold mb-4 tracking-wide">
                MERN & Python Stack
              </h3>

              <p className="text-lg text-[var(--text-secondary)] mb-6 font-medium">
                The core instruments I use to mold interactive, real-time experiences — crafted with structure, precision, and flow.
              </p>

              <div className="overflow-hidden">
                <div className="flex animate-marquee gap-8 w-max py-4">
                  {marqueeSkills.map((skill, i) => (
                    <span
                      key={i}
                      className="inline-block bg-white text-[var(--text-color)] px-6 py-3 rounded-full text-base sm:text-xl font-bold whitespace-nowrap press-effect-clay skill-badge-clay"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        );

      case "projects":
        return (
            
          // <ProjectsSection />
            <div className="max-w-5xl w-full text-center overflow-y-auto max-h-full p-4">
                <h2 className="text-4xl sm:text-5xl font-extrabold mb-10 section-title-clay">
                  Crafted Creations
                </h2>
                <div className="">
                    {/* <ProjectCard
                        featured={true}
                        title="CodeDuel – Real-Time 1v1 Coding Battle Platform"
                        description="Engineered a full-stack MERN web application with real-time WebSocket matchmaking, a code execution backend in Node.js, and a virtual token system ('MockCoins') tracked in MongoDB."
                        tags={["MERN Stack", "WebSockets", "Node.js", "Real-Time"]}
                    />
                    <ProjectCard
                       featured={true}
                        title="AI-Powered Social Media Sentiment Analysis"
                        description="Developed a modular React.js dashboard that visualized sentiment and emotion metrics by consuming REST APIs powered by BERT-family transformer models, using Tailwind CSS and Material-UI."
                        tags={["React.js", "Tailwind CSS", "BERT Models", "Sentiment Analysis"]}
                    />
                    {/* Keeping two placeholder projects to maintain the grid layout, but adding relevant tags *}
                    <ProjectCard
                       featured={true}
                        title="Secure Authentication System"
                        description="Built a secure user login & authentication system using Node.js, Express.js, and MongoDB with JWT. Integrated React frontend with AI engine for real-time assessment monitoring."
                        tags={["Node.js", "Express.js", "JWT", "Authentication"]}
                    />
                    <ProjectCard
                        featured={true}
                        title="Responsive E-Commerce Platform"
                        description="Implemented a responsive UI with a strong focus on user experience and rapid feature prototyping for real-world e-commerce use cases."
                        tags={["React", "Tailwind CSS", "Prototyping", "UI/UX"]}
                    /> */}
                  <App1 />
          
                </div>
            </div>
        );

      case "experience":
        return (
            <div className="max-w-4xl w-full mx-auto text-center p-4">
                <h2 className="text-4xl sm:text-5xl font-extrabold mb-12 section-title-clay">
                    Internship Timeline
                </h2>
                <div className="space-y-8">
                    <div className="clay-card p-6 rounded-3xl transition duration-300 hover:shadow-xl hover:shadow-[var(--shadow-dark)]/50">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-xl text-[var(--text-color)]">MERN Stack Intern @ UptoSkills, Delhi</h3>
                            <p className="text-sm text-[var(--secondary-color)] flex-shrink-0">3 Months</p>
                        </div>
                        <p className="text-[var(--text-secondary)] text-base font-medium mt-2">Worked on full-stack applications, implementing backend APIs and frontend integration. Gained hands-on exposure to scalable architecture design.</p>
                    </div>
                    <div className="clay-card p-6 rounded-3xl transition duration-300 hover:shadow-xl hover:shadow-[var(--shadow-dark)]/50">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-xl text-[var(--text-color)]">Frontend Intern @ Edunet Foundation</h3>
                            <p className="text-sm text-[var(--secondary-color)] flex-shrink-0">1 Month</p>
                        </div>
                        <p className="text-[var(--text-secondary)] text-base font-medium mt-2">Focused on building user interfaces for web applications with React and Tailwind CSS. Learned to rapidly prototype features for real-world use cases.</p>
                    </div>
                </div>
            </div>
        );

      case "contact":
        return (
          <div className="max-w-4xl w-full mx-auto text-center p-4">
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-2 section-title-clay">
              Request a Commission
            </h2>
            <p className="text-gray-600 mb-8">Reach out to collaborate on a project or idea.</p>

            <form 
              className="space-y-6 max-w-lg mx-auto p-8 rounded-[2.5rem] clay-card-1 shadow-xl"
              onSubmit={(e) => { e.preventDefault(); playClickSound(); /* handle form submission */ }}
            >
              <input 
                type="text" 
                placeholder="Your Name (e.g., Sir Sukhesh Ram)" 
                className="w-full p-4 rounded-xl clay-input" 
                required
              />

              <input 
                type="email" 
                placeholder="Your Email (we'll respond promptly)" 
                className="w-full p-4 rounded-xl clay-input" 
                required
              />

              <textarea 
                placeholder="Your Vision / Project Idea" 
                rows="4" 
                className="w-full p-4 rounded-xl clay-input" 
                required
              ></textarea>

              <button 
                type="submit"
                className="w-full clay-button primary-clay text-lg"
                title="Send your message"
              >
                Affix Seal and Send
              </button>
            </form>
          </div>

        );

      default:
        return null;
    }
  };


  // Get the name of the next view in the sequence (for the background effect)
  // const getNextViewName = () => {
  //   const currentIndex = viewMap[currentView];
  //   const nextIndex = (currentIndex + 1) % totalViews;
  //   return navItems[nextIndex];
  // }

  return (
    <div className="text-[var(--text-color)] relative h-screen overflow-hidden app-background-clay">

        {/* ================= Lively Background: Animated Canvas ================= */}
        <CanvasBackground />

      {/* ================= Fixed Navbar (Header for Desktop/Mobile) ================= */}
      <nav className="fixed top-0 left-0 w-full z-50 nav-clay shadow-xl" id="header">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 py-4">
          <h1 className="font-extrabold text-3xl cursor-pointer text-[var(--text-color)] tracking-tighter" onClick={() => handleNavigate('home')}>SUKHESH RAM.<span className="text-[var(--accent-color)]">DEV</span></h1>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex gap-6 text-[var(--text-secondary)]">
                {navItems.map((item) => (
                    <li key={item}>
                        <button
                            className={`nav-link font-bold text-lg transition-colors duration-200 ${
                                currentView === item ? 'text-[var(--accent-color)] border-b-2 border-[var(--accent-color)]' : 'hover:text-[var(--accent-color)]'
                            }`}
                            onClick={() => handleNavigate(item)}
                        >
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                        </button>
                    </li>
                ))}
            </ul>

          {/* Mobile Menu Button */}
          <button 
            className="text-[var(--text-color)] p-3 rounded-2xl clay-card-1 transition-all duration-200 shadow-lg md:hidden press-effect-clay"
            onClick={() => { playClickSound(); setIsMobileMenuOpen(!isMobileMenuOpen); }}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            )}
          </button>
        </div>
      </nav>

      {/* ================= Mobile Menu (Off-Canvas) ================= */}
      <div 
        className={`fixed top-0 right-0 h-full w-64 z-40 transform transition-transform duration-300 ease-out nav-clay p-6 pt-20 md:hidden border-l border-[var(--shadow-dark)] ${isMobileMenuOpen ? 'translate-x-0 shadow-2xl' : 'translate-x-full'}`}
      >
        <ul className="flex flex-col gap-6 text-xl text-[var(--text-color)]">
          {navItems.map((item) => (
            <li key={item}>
              <button
                className={`nav-link font-bold block py-2 press-effect-clay ${currentView === item ? 'text-[var(--accent-color)]' : 'hover:text-[var(--accent-color)]'}`}
                onClick={() => handleNavigate(item)}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Overlay to close menu when clicking outside */}
      {isMobileMenuOpen && (
        <div 
            className="fixed inset-0 z-30 md:hidden bg-[var(--text-color)]/20"
            onClick={() => { playClickSound(); setIsMobileMenuOpen(false); }}
        ></div>
      )}

      {/* ================= Main Content View (Centered) ================= */}
      {/* FIX: Use absolute positioning and calculated margins/padding to ensure it sits between header and footer, with scrolling enabled. */}
      <main 
        className="absolute top-[80px] bottom-[80px] left-0 right-0 z-10 w-full flex items-center justify-center transition-opacity duration-500 overflow-y-auto"
      >
        {/* Inner container to restrict width and apply clay card styling to the main view */}
        <div className="w-full max-w-7xl h-full py-0 md:py-0 px-4 sm:px-6">
            {/* The main card itself should have a full height and allow its content to scroll if needed */}
            <div className="h-full w-full p-6 sm:p-12 rounded-[3rem] clay-card flex items-center justify-center transition-all duration-300 overflow-y-auto">
                {renderContent()}
            </div>
        </div>
      </main>

      {/* ================= Bottom Navigation Controls (Prev/Next) ================= */}
      <div className="fixed bottom-0 left-0 w-full z-50 p-4 nav-clay flex justify-between items-center md:justify-center md:gap-12 shadow-[0_-4px_6px_-1px_var(--shadow-dark)]" id="footer">
        <button 
            onClick={handlePrev} 
            className="clay-button secondary-clay flex items-center gap-2 text-base md:text-lg px-6 py-3"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            PREV
        </button>

        <div className="hidden md:block text-lg font-bold text-[var(--accent-color)] tracking-wider">
            {getCurrentViewIndex() + 1} / {totalViews}
        </div>

        <button 
            onClick={handleNext} 
            className="clay-button primary-clay flex items-center gap-2 text-base md:text-lg px-6 py-3"
        >
            NEXT
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>


      {/* ================= Custom CSS Styles & High-Contrast Monochromatic Clay Theme (Palette F: Light) ================= */}
      <style>{`
        /* ================= CSS Variables for High-Contrast Monochromatic Clay (Palette F: Light) ================= */
        :root {
            /* Palette F Light: High-Contrast Monochromatic Clay (Off-White, Vermillion) */
            --bg-color: #F9FAFB;     /* Very Light Gray/Off-White (Background) */
            --card-color: #FFFFFF;   /* Pure White (Card surface) */

            --accent-color: #FF4500; /* Bold Vermillion Orange (Primary Action) */
            --secondary-color: #475569; /* Dark Slate Gray (Secondary/Highlight) */

            --text-color: #1F2937;   /* Near Black/Very Dark Blue-Gray (Text) */
            --text-secondary: #6B7280; /* Medium Gray for subtext */

            /* Clay Shadows for LIGHT MODE: High Contrast and slightly sharper */
            --shadow-light: rgba(255, 255, 255, 1); /* Top-left highlight */
            --shadow-dark: rgba(200, 200, 200, 0.9); /* Bottom-right shadow, closer to gray */
            --border-color: rgba(230, 230, 230, 1); /* Subtle border for definition */

            --glass-bg:  rgba(255, 255, 255, 0.8);
        }

        /* ================= Global Styles (Crucial for Fullscreen Layout) ================= */
        html, body {
          font-family: 'Inter', system-ui, sans-serif;
          background-color: var(--bg-color);
          overflow: hidden; /* Prevent default scrolling */
          width: 100vw;
          height: 100vh;
        }

        .app-background-clay {
             background-color: var(--bg-color);
        }

        /* Titles are heavy and playful */
        .section-title-clay {
            font-weight: 900;
            letter-spacing: -0.05em;
        }

        /* Navbar Style (Slightly raised, subtle shadow) */
        .nav-clay {
            background-color: var(--card-color);
            border-bottom: 1px solid var(--border-color);
            /* Soft shadow for light mode */
            box-shadow: 0 4px 6px -1px var(--shadow-dark), 0 2px 4px -2px var(--shadow-dark);
        }

        /* ================= Clay Card Style (The defining feature) ================= */
        .clay-card {
          background-color: var(--card-color); 
          border: 1px solid var(--border-color);
          /* Soft, large shadows for light neumorphism/clay effect */
          box-shadow: 
            8px 8px 16px 0 var(--shadow-dark), /* Main soft dark shadow (bottom-right) */
            -8px -8px 16px 0 var(--shadow-light), /* Main soft light highlight (top-left) */
            0 0 0 1px var(--border-color); /* Crisp light border for definition */
          transition: all 0.2s cubic-bezier(0.17, 0.84, 0.44, 1);
        }

        .clay-card-1 {
          background-color: var(--glass-bg); 
          border: 1px solid var(--border-color);
          /* Soft, large shadows for light neumorphism/clay effect */
          box-shadow: 
            8px 8px 16px 0 var(--shadow-dark), /* Main soft dark shadow (bottom-right) */
            -8px -8px 16px 0 var(--shadow-light), /* Main soft light highlight (top-left) */
            0 0 0 1px var(--border-color); /* Crisp light border for definition */
          transition: all 0.2s cubic-bezier(0.17, 0.84, 0.44, 1);
        }

        /* Clay Card Hover/Glow */
        .clay-card:hover {
            box-shadow: 
              10px 10px 20px 0 var(--shadow-dark), 
              -10px -10px 20px 0 var(--shadow-light),
              0 0 0 1px var(--border-color);
            transform: translateY(-2px); /* Lifts it slightly */
        }

        .clay-card-round {
            background-color: var(--bg-color);
            border: 2px solid var(--border-color);
            box-shadow: 
                8px 8px 16px 0 var(--shadow-dark), 
                -8px -8px 16px 0 var(--shadow-light);
        }

        .clay-surface-placeholder {
            background-color: var(--bg-color); 
            border: 2px solid var(--secondary-color);
            color: var(--secondary-color);
            box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1); /* Subtle sunken effect for placeholder */
        }

        /* ================= Interactions & Haptics (Physical Press) ================= */

        /* Clay Press Effect: Mimics pushing a soft physical button INTO the surface */
        .press-effect-clay:active {
            transform: translate(0, 0) !important; /* No movement needed, just sunken look */
            box-shadow: 
              inset 4px 4px 8px var(--shadow-dark), 
              inset -4px -4px 8px var(--shadow-light),
              0 0 0 1px var(--border-color);
            transition-duration: 0.1s;
        }

        /* Clay Button Style (Primary) */
        .clay-button {
            font-weight: 700;
            padding: 1rem 2rem;
            border-radius: 1.5rem; /* Chunky rounded corners */
            transition: all 0.2s ease-in-out;
            cursor: pointer;
            border: 2px solid var(--accent-color); 
            box-shadow: 4px 4px 0 0 var(--text-color); /* Strong offset shadow for punch */
        }

        .primary-clay {
            background-color: var(--accent-color);
            color: var(--card-color); /* White text on Vermillion */
            border-color: var(--accent-color);
        }

        .primary-clay:hover {
            transform: translate(-1px, -1px); /* Slight lift on hover */
            box-shadow: 6px 6px 0 0 var(--text-color);
            background-color: #e03d00; /* Darker Vermillion on hover */
        }

        .primary-clay:active {
            transform: translate(2px, 2px) !important;
            box-shadow: 2px 2px 0 0 var(--text-color) !important;
        }

        /* Clay Button Style (Secondary - Outline/Ghost) */
        .secondary-clay {
            background-color: transparent;
            color: var(--text-color);
            border-color: var(--text-color);
            box-shadow: 4px 4px 0 0 var(--text-color);
        }

        .secondary-clay:hover {
            background-color: var(--card-color); /* Subtle background fill on hover */
            color: var(--text-color);
            transform: translate(-1px, -1px);
            box-shadow: 6px 6px 0 0 var(--text-color);
        }
        .secondary-clay:active {
            transform: translate(2px, 2px) !important;
            box-shadow: 2px 2px 0 0 var(--text-color) !important;
        }

        /* Clay Input Field (Sunken/Inset look for light mode) */
        .clay-input {
            background-color: var(--bg-color); /* Matches background to appear sunken */
            border: 1px solid var(--border-color);
            color: var(--text-color);
            border-radius: 0.75rem;
            box-shadow: inset 4px 4px 8px var(--shadow-dark), inset -4px -4px 8px var(--shadow-light); /* Sunken look */
            transition: border-color 0.2s, box-shadow 0.2s;
        }
        .clay-input:focus {
            outline: none;
            border-color: var(--accent-color);
            box-shadow: inset 4px 4px 8px var(--shadow-dark), inset -4px -4px 8px var(--shadow-light), 0 0 0 3px rgba(255, 69, 0, 0.4); /* Focus ring based on accent color */
            background-color: var(--bg-color);
        }
        .clay-input::placeholder {
            color: var(--text-secondary);
        }

        /* Tag style (Pill-shaped, colored) */
        .tag-clay {
            background-color: var(--secondary-color);
            color: var(--card-color); /* White text on dark slate */
            font-weight: 700;
            box-shadow: 2px 2px 0 0 var(--text-color); /* Dark offset shadow */
            border: 1px solid var(--secondary-color);
            transition: all 0.1s;
        }

        /* ================= Animations ================= */
        @keyframes marquee { 0% { transform: translateX(0%);} 100% { transform: translateX(-50%);} }
        .animate-marquee {
          display: flex;
          animation: marquee 35s linear infinite;
          width: 200%; 
          padding: 1rem 0;
          justify-content: space-around;
        }

        /* Backdrop Filter is no longer needed since we use Canvas */
        /* .backdrop-blur-xl {
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
        } */

      `}</style>
    </div>
  );
}

export default App;
