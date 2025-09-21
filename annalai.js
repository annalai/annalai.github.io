const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLink = document.querySelectorAll(".nav-link");

hamburger.addEventListener("click", mobileMenu);

navLink.forEach(n => n.addEventListener("click", closeMenu));

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}

document.addEventListener('DOMContentLoaded', () => {
  // Blur-up
  document.querySelectorAll("img[loading='lazy']").forEach(img => img.addEventListener('load', () => img.classList.add('loaded')));

  // Filter
  const filterButtons = document.querySelectorAll('.filter-buttons button');
  const projectCards = document.querySelectorAll('.project-card');
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      button.classList.add('active');
      const filter = button.dataset.filter;
      projectCards.forEach(card => {
        card.style.display = (filter === 'all' || card.classList.contains(filter)) ? 'block' : 'none';
      });
    });
  });

  // Lightbox for multiple images per project
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox.querySelector('img');
  const caption = lightbox.querySelector('.caption');
  const closeBtn = lightbox.querySelector('.close');
  const prevBtn = lightbox.querySelector('.prev');
  const nextBtn = document.querySelector('.next');

  let currentProjectImages = [];
  let currentIndex = 0;

  function getFullSrc(img) { return img.dataset.full || img.currentSrc || img.src; }

  function openLightboxForProject(projectCard, startIndex = 0) {
    currentProjectImages = Array.from(projectCard.querySelectorAll('img'));
    currentIndex = startIndex;
    updateLightbox();
    lightbox.style.display = 'flex';
  }

  function updateLightbox() {
    const img = currentProjectImages[currentIndex];
    lightboxImg.src = getFullSrc(img);
    lightboxImg.alt = img.alt || '';
    caption.textContent = img.dataset.caption || img.alt || '';
  }

  // Click on first thumbnail of each project
  document.querySelectorAll('.project-card').forEach(card => {
    const images = card.querySelectorAll('img');
    images[0].addEventListener('click', () => openLightboxForProject(card, 0));
  });

  // Close lightbox
  closeBtn.addEventListener('click', () => lightbox.style.display='none');
  lightbox.addEventListener('click', e => { if(e.target===lightbox) lightbox.style.display='none'; });

  // Arrow navigation for the current project's images
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + currentProjectImages.length) % currentProjectImages.length;
    updateLightbox();
  });
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % currentProjectImages.length;
    updateLightbox();
  });

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if(lightbox.style.display==='flex'){
      if(e.key==='ArrowLeft') prevBtn.click();
      if(e.key==='ArrowRight') nextBtn.click();
      if(e.key==='Escape') closeBtn.click();
    }
  });
});