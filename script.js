// FEATURE 1: Smooth Scrolling for the Navigation Bar
document.querySelectorAll(".navbar a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault(); // Stop the default instant jump

    // Find the section the link is pointing to
    const targetId = this.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);

    // Scroll to it smoothly, offsetting for the sticky navbar
    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// FEATURE 2: Scroll Reveal Animation
// This makes the elements fade in and slide up slightly as you scroll to them.
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.15, // Triggers when 15% of the element is visible
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Add the visible styles
      entry.target.style.opacity = 1;
      entry.target.style.transform = "translateY(0)";

      // Stop observing once it has faded in
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Select all the major sections to animate
const sectionsToAnimate = document.querySelectorAll(
  ".cv-item, .gallery-card, .header-container h1, .header-container p",
);

sectionsToAnimate.forEach((section) => {
  // Set the initial hidden state
  section.style.opacity = 0;
  section.style.transform = "translateY(30px)"; // Start slightly lower
  section.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";

  // Tell the observer to watch this section
  observer.observe(section);
});

// FEATURE 3: Click-to-Change Gallery Slider
function nextImage(sliderElement) {
  // Find all the images inside the specific card you just clicked
  const images = sliderElement.querySelectorAll(".gallery-img");

  // Figure out which image is currently showing
  let currentIndex = 0;
  for (let i = 0; i < images.length; i++) {
    if (images[i].classList.contains("active")) {
      currentIndex = i;
      break;
    }
  }

  // Remove the 'active' class from the current image to hide it
  images[currentIndex].classList.remove("active");

  // Calculate the next image index, looping back to the start if we go past the end
  let nextIndex = (currentIndex + 1) % images.length;

  // Add the 'active' class to the next image to show it
  images[nextIndex].classList.add("active");
}
