import React from 'react';

// ====================================================================
// SECTION 1: DATA DEFINITION
// ====================================================================

const PROJECTS_DATA = [
    {
        title: "CodeDuel – Real-Time 1v1 Coding Battle Platform",
        description: "Full-stack MERN app with real-time WebSockets for 1v1 competitive coding duels and live leaderboards. Engineered a code execution backend in Node.js.",
        tags: ["MERN", "WebSockets", "Node.js", "MongoDB"],
        github: "https://github.com/Sukheshram14/CodeDuel",
        liveDemo: null,//"https://codeduel-live.vercel.app/", // Live Demo added
        featured: true, 
        imageKeyword: "Code Duel Platform"
    },
    {
        title: "AI-Powered Social Media Sentiment Analysis",
        description: "React dashboard visualizing real-time sentiment and emotion metrics from BERT-family models, integrated with a secure MERN backend.",
        tags: ["React.js", "BERT", "Tailwind CSS", "Analytics"],
        github: "https://github.com/Sukheshram14/CAS13_AIML03",
        liveDemo: null,// "https://sentiment-dashboard-ai.netlify.app/", // Live Demo added
        featured: true, 
        imageKeyword: "AI Sentiment Dashboard"
    },
    {
        title: "DSA – Data Structures & Algorithms Repository",
        description: "Implemented core data structures and algorithmic solutions in Java, covering sorting, recursion, and dynamic programming.",
        tags: ["Java", "DSA", "Algorithms"],
        github: "https://github.com/Sukheshram14/DSA",
        liveDemo: null, // No Live Demo
        featured: false,
        imageKeyword: "DSA Repository"
    },
    {
        title: "Portfolio Website (Personal)",
        description: "Personal portfolio built with React.js and Vite. Highlights technical projects, skills, and achievements through a responsive UI.",
        tags: ["React", "Vite", "UI/UX"],
        github: "https://github.com/Sukheshram14/Sukhesh-Ram-Portfolio",
        liveDemo: null,//"https://my-portfolio-live.com", // Mock Live Demo
        featured: false,
        imageKeyword: "Portfolio Design"
    },
    {
        title: "Java-MiniProject – URL Shortener",
        description: "Lightweight, secure URL shortening service implemented in Java, focusing on efficient string hashing and modular design.",
        tags: ["Java", "Core Java", "Hashing"],
        github: "https://github.com/Sukheshram14/Java-MiniProject-UrlShortener",
        liveDemo: null, // No Live Demo
        featured: false,
        imageKeyword: "Java Utility"
    },
    {
        title: "Login and Authentication System",
        description: "Implemented a secure authentication system using Node.js, Express.js, and MongoDB with JWT-based sessions.",
        tags: ["Node.js", "Express.js", "JWT"],
        github: "https://github.com/Sukheshram14/LoginAndAuthenticationSystem",
        liveDemo: null, // No Live Demo
        featured: false,
        imageKeyword: "Secure API"
    },
    {
        title: "Career Guidance (ML Project)",
        description: "ML-powered recommendation system to guide students toward suitable career paths using Python and scikit-learn models.",
        tags: ["Python", "Machine Learning", "Scikit-learn"],
        github: "https://github.com/Sukheshram14/Career-Guidance",
        liveDemo: null,
        featured: false,
        imageKeyword: "ML Guidance"
    },
    {
        title: "Clever FOX – Website",
        description: "Modern, responsive multipage website using HTML, CSS, and JavaScript, focused on clean structure and smooth animations.",
        tags: ["HTML", "CSS", "JavaScript", "UX"],
        github: "https://github.com/Sukheshram14/Clever-FOX---Website",
        liveDemo: "https://sukheshram14.github.io/Clever-FOX---Website/",//null,
        featured: false,
        imageKeyword: "Responsive Web"
    },
    {
        title: "TEAM NEBULA – AI Research Project",
        description: "Collaborative research project analyzing AI/ML datasets and visualizations using Jupyter Notebook for model interpretability.",
        tags: ["AI/ML", "Research", "Jupyter"],
        github: "https://github.com/Sukheshram14/TEAM-NEBULA",
        liveDemo: null,
        featured: false,
        imageKeyword: "AI Research"
    },
    {
        title: "GitHub Training – Collaborative Workflow Practice",
        description: "Hands-on training repository for understanding Git and GitHub collaboration workflows, including branching and merging.",
        tags: ["Git", "GitHub", "Collaboration"],
        github: "https://github.com/Sukheshram14/GitHub_Training",
        liveDemo: null,
        featured: false,
        imageKeyword: "Git Workflow"
    },
];

// Helper function to generate a text-based placeholder image URL
const getPlaceholderImage = (keyword) => {
    // Colors that fit the clay theme
    const bgColor = 'E9ECF0';
    const textColor = '475569';

    // Default Aspect Ratio
    const width = 800;
    const height = 450;

    return `https://placehold.co/${width}x${height}/${bgColor}/${textColor}?text=${encodeURIComponent(keyword.toUpperCase())}`;
};

// ====================================================================
// SECTION 2: UI COMPONENTS (Icons)
// ====================================================================

// Inline SVG for GitHub
const GitHubIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.37-1-3.37.5-1.37.16-2.9-1-3.79 0 0-1 0-2 1.25-.92-.25-1.92-.38-3-.38s-2.08.13-3 .38c-1.12-1.25-2-1.25-2-1.25-1.14.89-1.5 2.52-1 3.37-.73 1-1.2 2.12-1 3.37 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.8 1.62v4"/>
        <path d="M9 18c-4.51 2-5-2-7-2"/>
    </svg>
);

// Inline SVG for External Link
const ExternalLinkIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
        <polyline points="15 3 21 3 21 9"/>
        <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
);


// ====================================================================
// SECTION 3: PROJECT CARD COMPONENT
// ====================================================================

const ProjectCard = ({ project }) => {
    const imageUrl = getPlaceholderImage(project.imageKeyword);

    // Featured projects will have more vertical space (taller card)
    const heightClass = project.featured ? 'h-[35rem]' : 'h-[30rem]';
    // For featured projects, we increase the image size ratio
    const imageHeight = project.featured ? 'h-52' : 'h-36';

    return (
        <div 
            className={`
                p-6 rounded-[2rem] physical-clay-card transition duration-300 ease-in-out flex flex-col overflow-hidden 
                hover:shadow-lg hover:scale-[1.01] hover:shadow-[var(--shadow-dark)]/50 
                ${heightClass}
            `}
        >
            {/* Image Placeholder - Sunken effect */}
            <div className={`w-full overflow-hidden rounded-2xl mb-4 flex-shrink-0 bg-[var(--bg-color)] shadow-inner-clay ${imageHeight}`}>
                <img 
                    src={imageUrl} 
                    alt={`Mockup for ${project.title}`} 
                    className="w-full h-full object-cover opacity-80"
                    onError={(e) => { 
                        // Fallback to text if image fails
                        e.target.onerror = null; 
                        e.target.style.display = 'none'; 
                        e.target.parentNode.classList.add('flex', 'items-center', 'justify-center', 'text-[var(--text-secondary)]', 'font-bold', 'text-sm');
                        e.target.parentNode.innerHTML = `<p class="p-4 text-center">${project.imageKeyword.toUpperCase()}</p>`;
                    }}
                />
            </div>

            {/* Content */}
            <div className="flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-sans text-xl font-extrabold text-[var(--text-color)] leading-snug">
                        {project.title}
                        {project.featured && (
                            <span className="ml-3 inline-block px-3 py-0.5 text-xs font-bold rounded-full bg-[var(--accent-color)] text-white shadow-md">
                                FEATURED
                            </span>
                        )}
                    </h3>
                </div>

                <p className="text-[var(--text-secondary)] text-sm mb-4 leading-relaxed flex-grow">
                    {project.description}
                </p>
            </div>


            {/* Tags */}
            <div className="flex gap-2 flex-wrap pt-4 border-t border-[var(--shadow-dark)]/10 mt-auto">
                {project.tags.slice(0, 4).map((tag, i) => (
                    <span key={i} className={`px-3 py-1 rounded-full text-xs font-semibold tag-clay`}>
                        {tag}
                    </span>
                ))}
            </div>

            {/* Links - Conditional Layout */}
            <div className={`flex gap-4 mt-5 ${project.liveDemo ? 'flex-row' : 'flex-row'}`}>

                {/* GitHub Button - Takes full width if no live demo */}
                <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={`clay-button ${project.liveDemo ? 'flex-1' : 'w-full'} primary-clay`}
                >
                    <GitHubIcon className="mr-2" />
                    GitHub
                </a>

                {/* Live Demo Button - Only shows if liveDemo is available */}
                {project.liveDemo && (
                    <a 
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="clay-button flex-1 secondary-clay"
                    >
                        <ExternalLinkIcon className="mr-2" />
                        Live Demo
                    </a>
                )}
            </div>

        </div>
    );
};


// ====================================================================
// SECTION 4: MAIN PROJECT SECTION COMPONENT
// ====================================================================

const ProjectsSection = () => {
    return (
        // <div className="p-4 md:p-8 app-background-clay min-h-screen">
        //     <div className="max-w-6xl mx-auto py-12 md:py-20">
        <div>

                {/* Section Header */}
                {/* <header className="text-center mb-12 md:mb-16">
                    <p className="text-[var(--accent-color)] font-extrabold text-base uppercase tracking-widest mb-2">
                        My Portfolio
                    </p>
                    <h2 className="text-5xl md:text-6xl font-extrabold text-[var(--text-color)] leading-tight tracking-tighter">
                        Architectural <span className="text-[var(--text-secondary)]">Commissions</span>
                    </h2>
                    <p className="text-lg text-[var(--text-secondary)] mt-4 max-w-2xl mx-auto">
                        A curated selection of my most impactful projects, designed with a focus on full-stack architecture and machine learning implementation.
                    </p>
                </header> */}

                {/* Projects Grid: Consistent 2-column layout, variable heights based on featured status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8"> 
                    {PROJECTS_DATA.map((project, index) => (
                        <ProjectCard key={index} project={project} />
                    ))}
                </div>
                {/* Optional: Call to action for more projects */}
                <div className="text-center mt-16">
                    <a 
                        href="https://github.com/Sukheshram14"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="clay-button primary-clay mx-auto w-fit px-8"
                    >
                        View All Projects on GitHub
                    </a>
                </div>
            </div>
        //     </div>
        // </div>
    );
};

// ====================================================================
// SECTION 5: STYLING & EXPORT
// ====================================================================

const App1 = () => (
    <>
        <ProjectsSection />
        <style>{`
            /* ================= CSS Variables for Physical Clay Theme (PERFECTED) ================= */
            :root {
                --bg-color: #ECEFF3;         /* Slightly cool, neutral background */
                --card-color: #F8FBFF;       /* Very light off-white card surface */
                --accent-color: #007bff;     /* Primary Blue (GitHub/Key Action) */
                --secondary-accent: #337ab7; /* Slightly darker blue for secondary link */
                --text-color: #212529;       /* Dark Text */
                --text-secondary: #6c757d;   /* Medium Gray for subtext */

                /* The key to the 'perfect' look: low opacity dark, high opacity light, high blur */
                --shadow-light: rgba(255, 255, 255, 1);    /* Full white opacity for bright highlight */
                --shadow-dark: rgba(45, 62, 80, 0.12);     /* Very subtle, low-opacity blue-grey shadow */
            }

            html, body {
                font-family: 'Inter', system-ui, sans-serif;
                background-color: var(--bg-color);
            }

            .app-background-clay {
                 background-color: var(--bg-color);
            }

            /* ================= Physical Clay Card Styles (Perfected) ================= */
            .physical-clay-card {
                background-color: var(--card-color);
                transition: all 0.3s cubic-bezier(0.17, 0.84, 0.44, 1);
                border: none; /* Crucial: Rely only on shadows */

                /* Increased spread and offset for maximum softness and dimension */
                box-shadow: 
                    10px 10px 30px var(--shadow-dark),   
                    -10px -10px 30px var(--shadow-light); 
            }

            .physical-clay-card:hover {
                transform: translateY(-2px); /* Subtle lift */
                /* Slightly stronger shadows on hover */
                box-shadow: 
                    15px 15px 35px var(--shadow-dark), 
                    -8px -8px 20px var(--shadow-light);
            }

            .shadow-inner-clay {
                /* Inset shadow for the image placeholder (Sunken effect) */
                background-color: var(--bg-color); /* Matches container background */
                box-shadow: inset 5px 5px 10px var(--shadow-dark), inset -5px -5px 10px var(--shadow-light);
            }

            /* ================= Tag Styles (Slightly sunken) ================= */
            .tag-clay {
                background-color: var(--bg-color);
                color: var(--text-color); 
                font-weight: 600;
                /* Small inset shadow for a subtle engraved look */
                box-shadow: inset 1px 1px 3px var(--shadow-dark), inset -1px -1px 3px var(--shadow-light);
                border: none;
            }

            /* ================= Button/Link Styles (Raised) ================= */
            .clay-link-button {
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 0.75rem 1rem;
                border-radius: 1.5rem; 
                font-weight: 700;
                font-size: 0.9rem;
                transition: all 0.2s ease-in-out;
                cursor: pointer;
                text-decoration: none;
                border: none;

                /* Base Raised Clay Button Look */
                background-color: var(--bg-color);
                color: var(--text-color);
                box-shadow: 4px 4px 8px var(--shadow-dark), -4px -4px 8px var(--shadow-light);
            }

            .clay-link-button:hover:not(:disabled) {
                transform: translateY(-1px);
                box-shadow: 6px 6px 12px var(--shadow-dark), -6px -6px 12px var(--shadow-light);
            }

            .clay-link-button:active:not(:disabled) {
                /* Pressed (Inset) Look */
                transform: translate(1px, 1px) !important;
                box-shadow: 
                    inset 3px 3px 6px var(--shadow-dark), 
                    inset -3px -3px 6px var(--shadow-light);
                background-color: var(--bg-color);
            }

            /* Primary Button Accent (GitHub) */
            .primary-link-clay {
                background-color: var(--accent-color);
                color: white;
                box-shadow: 4px 4px 8px rgba(0, 123, 255, 0.4), -4px -4px 8px rgba(255, 255, 255, 0.1);
            }

            .primary-link-clay:active {
                background-color: var(--secondary-accent) !important; /* Slightly darker on press */
                box-shadow: 
                    inset 3px 3px 6px rgba(0, 0, 0, 0.2), 
                    inset -3px -3px 6px rgba(255, 255, 255, 0.3) !important;
            }

            /* Secondary Button Accent (Live Demo) */
            .secondary-link-clay {
                color: var(--text-color);
                background-color: var(--card-color); /* Matches card for a subtle secondary button */
                box-shadow: 4px 4px 8px var(--shadow-dark), -4px -4px 8px var(--shadow-light);
            }

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

                display: flex;
                align-items: center;
                justify-content: center;
                padding: 0.75rem 1rem;
                border-radius: 1.5rem; 
                font-weight: 700;
                font-size: 0.9rem;
                transition: all 0.2s ease-in-out;
                cursor: pointer;
                text-decoration: none;
                border: none;
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
    </>
);

export default App1;
