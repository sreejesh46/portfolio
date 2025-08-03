// Combined JavaScript file for Portfolio
// Contains typing animation, smooth scrolling, video effects, and particles.js setup

// Run this code only after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // ===============================
  // Typing Effect for Role Animation
  // ===============================

  const texts = ["Web Developer", "Video Editor", "AI Enthusiast"]; // Texts to cycle through
  let count = 0; // Index for the current text
  let index = 0; // Character index within the current text
  let currentText = ""; // Text being displayed
  let isDeleting = false; // Flag for deleting or typing
  const typingElement = document.querySelector(".typing"); // Target span element

  // Function to handle typing/deleting effect
  function type() {
    currentText = texts[count]; // Get current string from array

    // If deleting, reduce the index; if typing, increase it
    typingElement.textContent = isDeleting
      ? currentText.slice(0, --index)
      : currentText.slice(0, ++index);

    let speed = isDeleting ? 50 : 100; // Typing speed

    // If finished typing a word
    if (!isDeleting && index === currentText.length) {
      speed = 1500; // Wait before starting to delete
      isDeleting = true; // Switch to delete mode
    }
    // If finished deleting
    else if (isDeleting && index === 0) {
      isDeleting = false; // Switch back to typing
      count = (count + 1) % texts.length; // Move to next word
      speed = 500; // Small delay before typing next word
    }

    setTimeout(type, speed); // Recursively call the type function
  }

  type(); // Start typing animation

  // ===============================
  // Skills Section Background Animation
  // ===============================

  function createFloatingElements() {
    const skillsSection = document.querySelector(".skills-section");
    if (!skillsSection) return;

    // Create floating code symbols
    const symbols = [
      "<>",
      "{}",
      "[]",
      "/>",
      "<!--",
      "-->",
      "()",
      "=>",
      "&&",
      "||",
    ];

    for (let i = 0; i < 15; i++) {
      const element = document.createElement("div");
      element.className = "floating-symbol";
      element.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      element.style.cssText = `
        position: absolute;
        color: rgba(56, 189, 248, 0.1);
        font-family: 'Courier New', monospace;
        font-size: ${Math.random() * 20 + 10}px;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: floatSymbol ${Math.random() * 20 + 15}s infinite linear;
        pointer-events: none;
        z-index: 1;
      `;
      skillsSection.appendChild(element);
    }

    // Add CSS animation for floating symbols
    if (!document.querySelector("#floating-symbols-style")) {
      const style = document.createElement("style");
      style.id = "floating-symbols-style";
      style.textContent = `
        @keyframes floatSymbol {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }
        .floating-symbol {
          user-select: none;
        }
      `;
      document.head.appendChild(style);
    }
  }

  // Initialize floating elements when skills section is in view
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        createFloatingElements();
        skillsObserver.unobserve(entry.target); // Only create once
      }
    });
  });

  const skillsSection = document.querySelector(".skills-section");
  if (skillsSection) {
    skillsObserver.observe(skillsSection);
  }

  // ===============================
  // Smooth Scrolling for Navigation
  // ===============================

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      // Close mobile menu when a link is clicked
      const navLinks = document.getElementById("nav-links");
      const hamburger = document.getElementById("hamburger");
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        hamburger.classList.remove("active");
      }
    });
  });

  // ===============================
  // Mobile Menu Toggle
  // ===============================

  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", (e) => {
      e.stopPropagation();
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("active");
      console.log("Menu toggled:", navLinks.classList.contains("active"));
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
      }
    });

    // Close menu when window is resized to desktop
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
      }
    });
  } else {
    console.error("Hamburger or nav-links element not found");
  }

  // ===============================
  // Video Hover Play Effect
  // ===============================

  document.querySelectorAll(".hover-video").forEach((video) => {
    video.volume = 0.4; // Set lower volume for all videos
    video.muted = true; // Keep videos muted to allow autoplay on hover

    // On hover: play video from start
    video.addEventListener("mouseenter", () => {
      if (video.paused) {
        video.currentTime = 0;
        video.play();
      }
    });
  });

  // ===============================
  // Particles.js Background Setup
  // ===============================

  // Initialize particle animation in the #particles-js container
  particlesJS("particles-js", {
    particles: {
      number: {
        value: 100, // Total number of particles
        density: {
          enable: true,
          value_area: 800, // Spread area of particles
        },
      },
      color: { value: "#00ff00" }, // Particle color (hacker green)
      shape: {
        type: "circle", // Shape of particles
        stroke: {
          width: 0,
          color: "#000000",
        },
      },
      opacity: {
        value: 0.5, // Transparency level
        random: true,
      },
      size: {
        value: 3, // Particle size
        random: true,
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#00ff00",
        opacity: 0.3,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1, // Movement speed
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out", // Particles go out of canvas
        bounce: false,
      },
    },
    interactivity: {
      events: {
        onhover: { enable: true, mode: "repulse" }, // Repel particles on hover
        onclick: { enable: true, mode: "push" }, // Add particles on click
      },
      modes: {
        repulse: { distance: 100 }, // Distance to repel
        push: { particles_nb: 4 }, // Particles added on click
      },
    },
    retina_detect: true, // High-res support
  });
});
