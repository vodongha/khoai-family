  const images = window.images || [];

  const iconFullScreen = `<div style="display: flex; justify-content: center; align-items: center; height: 20px; width: 20px;">
  <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24">
          <path d="M9 3H5a2 2 0 0 0-2 2v4h2V5h4V3zm6 0v2h4v4h2V5a2 2 0 0 0-2-2h-4zm4 14h-4v2h4a2 2 0 0 0 2-2v-4h-2v4zm-14-4H3v4a2 2 0 0 0 2 				2h4v-2H5v-4z"/>
        </svg>
  </div>`

  const slideshow = document.createElement('div');
  slideshow.id = 'slideshow';

  const prevBtn = document.createElement('button');
  prevBtn.className = 'nav-btn';
  prevBtn.id = 'prevBtn';
  prevBtn.innerHTML = '&#10094;';

  const nextBtn = document.createElement('button');
  nextBtn.className = 'nav-btn';
  nextBtn.id = 'nextBtn';
  nextBtn.innerHTML = '&#10095;';

  const imageCounter = document.createElement('div');
  imageCounter.id = 'image-counter';
  imageCounter.textContent = `1 / ${images.length}`;

  const fullscreenBtn = document.createElement('button');
  fullscreenBtn.id = 'fullscreenBtn';
  fullscreenBtn.innerHTML = iconFullScreen;


  slideshow.appendChild(prevBtn);
  slideshow.appendChild(nextBtn);
  slideshow.appendChild(imageCounter);
  slideshow.appendChild(fullscreenBtn);

  document.body.appendChild(slideshow);
  document.querySelector('p.title').insertAdjacentElement('afterend', slideshow);

  let currentIndex = 0;
  let interval;

  images.forEach((src, i) => {
    const img = document.createElement('img');
    img.src = src;
    if (i === 0) img.classList.add('active');
    slideshow.appendChild(img);
  });

  const imgs = slideshow.querySelectorAll('img');

  function updateCounter(index) {
    imageCounter.textContent = `${index + 1} / ${images.length}`;
  }

  function showImage(index) {
    imgs.forEach((img, i) => {
      img.classList.toggle('active', i === index);
    });
    currentIndex = index;
    updateCounter(index);
  }

  function nextImage() {
    showImage((currentIndex + 1) % images.length);
  }

  function prevImage() {
    showImage((currentIndex - 1 + images.length) % images.length);
  }

  document.getElementById('nextBtn').addEventListener('click', () => {
    nextImage();
    resetInterval();
  });

  document.getElementById('prevBtn').addEventListener('click', () => {
    prevImage();
    resetInterval();
  });

  fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      slideshow.requestFullscreen().then(() => {
        fullscreenBtn.textContent = 'X';
      }).catch(err => {
        return;
      });
    } else {
      document.exitFullscreen().then(() => {
        fullscreenBtn.innerHTML = iconFullScreen;
      });
    }
  });

  document.addEventListener('fullscreenchange', () => {
    fullscreenBtn.innerHTML = document.fullscreenElement ? 'X' : iconFullScreen;
  });

  function startInterval() {
    interval = setInterval(nextImage, 4000);
  }

  function resetInterval() {
    clearInterval(interval);
    startInterval();
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') {
      nextImage();
      resetInterval();
    } else if (e.key === 'ArrowLeft') {
      prevImage();
      resetInterval();
    }
  });

  startInterval();

  const timeEl = document.querySelector("div.post-header-line-1");

  if (timeEl) {
    const newEl = document.createElement("p");
    newEl.className = "date-travel";
    newEl.textContent = "Nội dung mới";
    timeEl.replaceWith(newEl);
  }

  document.addEventListener('keydown', function(e) {
    if (
      e.key === 'F12' ||
      (e.ctrlKey && e.shiftKey && ['I', 'C', 'J'].includes(e.key)) ||
      (e.ctrlKey && e.key === 'U')
    ) {
      e.preventDefault();
    }
  });

  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
  });

  document.addEventListener('copy', function(e) {
    e.preventDefault();
  });

  document.addEventListener('selectstart', e => {
    e.preventDefault();
  });
