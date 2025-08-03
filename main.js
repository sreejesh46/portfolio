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

  // ===============================
  // Contact Form with EmailJS
  // ===============================

  // Initialize EmailJS - REPLACE 'demo_key' with your actual public key from EmailJS
  emailjs.init("QLgI6IHw0GioNMn9e"); // 👈 STEP 4: Replace this with your Public Key

  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    // Form validation functions
    function validateName(name) {
      return name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name.trim());
    }

    function validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email.trim());
    }

    function validateSubject(subject) {
      return subject.trim().length >= 5;
    }

    function validateMessage(message) {
      return message.trim().length >= 10;
    }

    // Show error message
    function showError(fieldId, message) {
      const field = document.getElementById(fieldId);
      const errorElement = document.getElementById(fieldId + 'Error');
      const formGroup = field.closest('.form-group');
      
      formGroup.classList.add('error');
      formGroup.classList.remove('success');
      errorElement.textContent = message;
      errorElement.classList.add('show');
    }

    // Show success state
    function showSuccess(fieldId) {
      const field = document.getElementById(fieldId);
      const errorElement = document.getElementById(fieldId + 'Error');
      const formGroup = field.closest('.form-group');
      
      formGroup.classList.add('success');
      formGroup.classList.remove('error');
      errorElement.textContent = '';
      errorElement.classList.remove('show');
    }

    // Clear validation state
    function clearValidation(fieldId) {
      const field = document.getElementById(fieldId);
      const errorElement = document.getElementById(fieldId + 'Error');
      const formGroup = field.closest('.form-group');
      
      formGroup.classList.remove('error', 'success');
      errorElement.textContent = '';
      errorElement.classList.remove('show');
    }

    // Real-time validation on input
    document.getElementById('name').addEventListener('input', function() {
      const name = this.value;
      if (name === '') {
        clearValidation('name');
      } else if (!validateName(name)) {
        showError('name', 'Please enter a valid name (letters only, minimum 2 characters)');
      } else {
        showSuccess('name');
      }
    });

    document.getElementById('email').addEventListener('input', function() {
      const email = this.value;
      if (email === '') {
        clearValidation('email');
      } else if (!validateEmail(email)) {
        showError('email', 'Please enter a valid email address');
      } else {
        showSuccess('email');
      }
    });

    document.getElementById('subject').addEventListener('input', function() {
      const subject = this.value;
      if (subject === '') {
        clearValidation('subject');
      } else if (!validateSubject(subject)) {
        showError('subject', 'Subject must be at least 5 characters long');
      } else {
        showSuccess('subject');
      }
    });

    document.getElementById('message').addEventListener('input', function() {
      const message = this.value;
      if (message === '') {
        clearValidation('message');
      } else if (!validateMessage(message)) {
        showError('message', 'Message must be at least 10 characters long');
      } else {
        showSuccess('message');
      }
    });

    // Form submission handler with EmailJS
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      let isValid = true;

      // Validate all fields
      if (!validateName(name)) {
        showError('name', 'Please enter a valid name (letters only, minimum 2 characters)');
        isValid = false;
      } else {
        showSuccess('name');
      }

      if (!validateEmail(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
      } else {
        showSuccess('email');
      }

      if (!validateSubject(subject)) {
        showError('subject', 'Subject must be at least 5 characters long');
        isValid = false;
      } else {
        showSuccess('subject');
      }

      if (!validateMessage(message)) {
        showError('message', 'Message must be at least 10 characters long');
        isValid = false;
      } else {
        showSuccess('message');
      }

      // If all validations pass
      if (isValid) {
        const submitBtn = document.querySelector('.submit-btn');
        const originalContent = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        submitBtn.style.background = 'linear-gradient(45deg, #6b7280, #4b5563)';
        
        // Prepare email parameters
        const emailParams = {
          from_name: name,
          from_email: email,
          subject: subject,
          message: message,
          to_email: 'sreejeshmohan46@gmail.com'
        };

        // Send email using EmailJS
        // 👈 STEP 4: Replace 'demo_service' and 'demo_template' with your actual IDs
        emailjs.send('service_rpy309r', 'template_63rrpxn', emailParams)
          .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            
            // Show success message
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent Successfully!';
            submitBtn.style.background = 'linear-gradient(45deg, #10b981, #059669)';
            
            // Reset form after 3 seconds
            setTimeout(() => {
              contactForm.reset();
              ['name', 'email', 'subject', 'message'].forEach(clearValidation);
              submitBtn.innerHTML = originalContent;
              submitBtn.style.background = 'linear-gradient(45deg, #38bdf8, #00f6ff)';
              submitBtn.disabled = false;
            }, 3000);
            
          }, function(error) {
            console.error('FAILED...', error);
            
            // Show error message
            submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Failed to Send';
            submitBtn.style.background = 'linear-gradient(45deg, #ef4444, #dc2626)';
            
            // Reset button after 3 seconds
            setTimeout(() => {
              submitBtn.innerHTML = originalContent;
              submitBtn.style.background = 'linear-gradient(45deg, #38bdf8, #00f6ff)';
              submitBtn.disabled = false;
            }, 3000);
          });
      }
    });
  }
});

// ===============================
// Resume Options Modal Functions
// ===============================

function openResumeModal() {
  const modal = document.getElementById('resumeModal');
  
  // Show modal
  modal.style.display = 'flex';
  setTimeout(() => {
    modal.classList.add('active');
  }, 10);
  
  // Prevent body scrolling when modal is open
  document.body.style.overflow = 'hidden';
}

function closeResumeModal() {
  const modal = document.getElementById('resumeModal');
  
  // Hide modal with animation
  modal.classList.remove('active');
  setTimeout(() => {
    modal.style.display = 'none';
  }, 300);
  
  // Restore body scrolling
  document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
  const modal = document.getElementById('resumeModal');
  const modalContent = document.querySelector('.resume-modal-content');
  
  if (modal && event.target === modal && !modalContent.contains(event.target)) {
    closeResumeModal();
  }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    const modal = document.getElementById('resumeModal');
    if (modal && modal.classList.contains('active')) {
      closeResumeModal();
    }
  }
});

// Direct download function (can be used as alternative)
function downloadResume() {
  const link = document.createElement('a');
  link.href = 'Sreejesh_Mohan_Resume.pdf';
  link.download = 'Sreejesh_Mohan_Resume.pdf';
  link.click();
}
