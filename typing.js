// Run this code only after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  
  // Typing effect for changing roles
  const texts = ["Web Developer", "Video Editor"]; // Texts to cycle through
  let count = 0;        // Index for the current text
  let index = 0;        // Character index within the current text
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
      speed = 1500;        // Wait before starting to delete
      isDeleting = true;   // Switch to delete mode
    } 
    // If finished deleting
    else if (isDeleting && index === 0) {
      isDeleting = false;              // Switch back to typing
      count = (count + 1) % texts.length; // Move to next word
      speed = 500;                     // Small delay before typing next word
    }

    setTimeout(type, speed); // Recursively call the type function
  }

  type(); // Start typing animation

  // ==========================
  // Animate Skill Bars on Scroll
  // ==========================
/*
  // Create an observer that watches when the about section is in view
  const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const fills = entry.target.querySelectorAll('.fill'); // Get all fill bars
      if (entry.isIntersecting) {
        // Animate skill bars (fill width)
        fills.forEach(fill => {
          const levelClass = Array.from(fill.classList).find(cls => cls.startsWith('fill-'));
          let percentage = '0%';

          // Match each fill class to a percentage width
          switch (levelClass) {
            case 'fill-5': percentage = '100%'; break;
            case 'fill-4': percentage = '80%'; break;
            case 'fill-3': percentage = '60%'; break;
            case 'fill-2': percentage = '40%'; break;
            case 'fill-1': percentage = '20%'; break;
            case 'fill-6': percentage = '70%'; break;
            case 'fill-7': percentage = '50%'; break; // Custom class for Premiere Pro
          }

          fill.style.width = percentage; // Animate bar to the right width
        });
      } else {
        // Reset skill bars when not visible
        fills.forEach(fill => {
          fill.style.width = '0%';
        });
      }
    });
  }, { threshold: 0.5 }); // 50% of section must be visible to trigger

  const aboutSection = document.querySelector('.about-section');
  if (aboutSection) {
    skillObserver.observe(aboutSection); // Start observing the section
  }
*/
  // ===============================
  // Video Hover Play Effect
  // ===============================

  document.querySelectorAll(".hover-video").forEach(video => {
    video.volume = 0.4; // Set lower volume for all videos
    video.muted = true; // Keep videos muted to allow autoplay on hover

    // On hover: play video from start
    video.addEventListener("mouseenter", () => {
      if (video.paused) {
        video.currentTime = 0;
        video.play();
      }
    });

    /*
    // Optional fade-out effect when mouse leaves
    video.addEventListener("mouseleave", () => {
      const fadeOut = setInterval(() => {
        if (video.volume > 0.05) {
          video.volume -= 0.05;
        } else {
          clearInterval(fadeOut);
          video.pause();
          video.currentTime = 0;
          video.volume = 0.4; // Reset volume
        }
      }, 30);
    });
    */
  });

  // ===============================
  // Particles.js Background Setup
  // ===============================

  // Initialize particle animation in the #particles-js container
  particlesJS("particles-js", {
    "particles": {
      "number": {
        "value": 100, // Total number of particles
        "density": {
          "enable": true,
          "value_area": 800 // Spread area of particles
        }
      },
      "color": { "value": "#00ff00" }, // Particle color (hacker green)
      "shape": {
        "type": "circle", // Shape of particles
        "stroke": {
          "width": 0,
          "color": "#000000"
        }
      },
      "opacity": {
        "value": 0.5, // Transparency level
        "random": true
      },
      "size": {
        "value": 3, // Particle size
        "random": true
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#00ff00",
        "opacity": 0.3,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 1, // Movement speed
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out", // Particles go out of canvas
        "bounce": false
      }
    },
    "interactivity": {
      "events": {
        "onhover": { "enable": true, "mode": "repulse" }, // Repel particles on hover
        "onclick": { "enable": true, "mode": "push" }      // Add particles on click
      },
      "modes": {
        "repulse": { "distance": 100 }, // Distance to repel
        "push": { "particles_nb": 4 }   // Particles added on click
      }
    },
    "retina_detect": true // High-res support
  });

});
