// Typing animation
const typingElement = document.querySelector('.typing');
const texts = ["Front End Developer", "Video Editor"];
let index = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const currentText = texts[index];
  typingElement.textContent = currentText.substring(0, charIndex);

  if (!isDeleting) {
    if (charIndex < currentText.length) {
      charIndex++;
      setTimeout(type, 100);
    } else {
      isDeleting = true;
      setTimeout(type, 1200);
    }
  } else {
    if (charIndex > 0) {
      charIndex--;
      setTimeout(type, 60);
    } else {
      isDeleting = false;
      index = (index + 1) % texts.length;
      setTimeout(type, 300);
    }
  }
}

document.addEventListener('DOMContentLoaded', type);

// Skill bar animation
// Typing animation (no change)
const typingElement = document.querySelector('.typing');
const texts = ["Front End Developer", "Video Editor"];
let index = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const currentText = texts[index];
  typingElement.textContent = currentText.substring(0, charIndex);

  if (!isDeleting) {
    if (charIndex < currentText.length) {
      charIndex++;
      setTimeout(type, 100);
    } else {
      isDeleting = true;
      setTimeout(type, 1200);
    }
  } else {
    if (charIndex > 0) {
      charIndex--;
      setTimeout(type, 60);
    } else {
      isDeleting = false;
      index = (index + 1) % texts.length;
      setTimeout(type, 300);
    }
  }
}
document.addEventListener('DOMContentLoaded', type);

// Skill bar animation when scrolled into view

