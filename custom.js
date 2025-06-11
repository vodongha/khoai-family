// custom.js

const images = [
  "https://link_anh_1.jpg",
  "https://link_anh_2.jpg",
  // thêm ảnh tùy ý
];

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

const counter = document.createElement('div');
counter.id = 'counter';

slideshow.appendChild(counter);
slideshow.appendChild(prevBtn);
slideshow.appendChild(nextBtn);

document.body.appendChild(slideshow);

let currentIndex = 0;
let interval;

images.forEach((src, i) => {
  const img = document.createElement('img');
  img.src = src;
  if (i === 0) img.classList.add('active');
  slideshow.appendChild(img);
});

const imgs = slideshow.querySelectorAll('img');

function updateCounter() {
  counter.textContent = `${currentIndex + 1} / ${images.length}`;
}

function showImage(index) {
  imgs.forEach((img, i) => {
    img.classList.toggle('active', i === index);
  });
  currentIndex = index;
  updateCounter();
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

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') {
    nextImage();
    resetInterval();
  } else if (e.key === 'ArrowLeft') {
    prevImage();
    resetInterval();
  }
});

function startInterval() {
  interval = setInterval(nextImage, 4000);
}
function resetInterval() {
  clearInterval(interval);
  startInterval();
}

startInterval();
updateCounter();

// Chặn F12, Ctrl+Shift+I, Ctrl+U, chuột phải, copy, quét khối
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
document.addEventListener('selectstart', function(e) {
  e.preventDefault();
});