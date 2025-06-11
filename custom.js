  const images = [
    "https://scontent.fsgn1-1.fna.fbcdn.net/v/t39.30808-6/505382872_9060787680690569_687422788403423114_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeE1zU1sTyCRjqfm1xOVZtgPT3vD2dejNiRPe8PZ16M2JAKzBMWmcKOlApln3RlnlVpWwxSTJdqT4h0iCiIFGDBp&_nc_ohc=x6pd3kA_yOAQ7kNvwFuuAAc&_nc_oc=Adl-w5glE-dLbIMtjHEP-0LRTv46fhEJ1T51Zm6ixTDF5tic1roHbEXcR42sq0fUqy4&_nc_zt=23&_nc_ht=scontent.fsgn1-1.fna&_nc_gid=0XCeCEy16_Hnn3E1ZWt2Kg&oh=00_AfOrLB57-0E2yDVWn1PQWbr5PpYjyd5Esg3uNtC7LC7x9Q&oe=684F2661",
    "https://scontent.fsgn1-1.fna.fbcdn.net/v/t39.30808-6/505396942_9060787874023883_4075674571826652095_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeG6um2QcYHgm0ctRwT4mkeiEnm0h2yzklASebSHbLOSUOpFo1hUGYyTns2C_YzNd047kazsMBi5WYsDQByBlrUA&_nc_ohc=g8eHtQbgoK8Q7kNvwGpR3cs&_nc_oc=AdlGQDaq55wHm4n8d23KPPXFLrMSUXQS3792vJpL2PiT7aBLcN0dRuOuV4nCaxF5TGQ&_nc_zt=23&_nc_ht=scontent.fsgn1-1.fna&_nc_gid=peCi3Hwc0HROtXIOWNq-Zw&oh=00_AfMvX0oHA5OXx4tc86p8UsHDc18KcxL7etB5BODdm7vwKA&oe=684F1AF6",
  ]

  // Tạo slideshow container
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

  // Tạo div hiện số ảnh
  const imageCounter = document.createElement('div');
  imageCounter.id = 'image-counter';
  imageCounter.textContent = `1 / ${images.length}`;

  slideshow.appendChild(prevBtn);
  slideshow.appendChild(nextBtn);
  slideshow.appendChild(imageCounter);
  
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
  
  // thay đổi ngày post
  const timeEl = document.querySelector("div.post-header-line-1");

  if (timeEl) {
    const newEl = document.createElement("p");
    newEl.className = "date-travel";
    newEl.textContent = "Nội dung mới"; // Thay bằng text bạn muốn

    timeEl.replaceWith(newEl);
  }
  
  // Chặn dev tool
  // Chặn F12, Ctrl+Shift+I, Ctrl+U, Ctrl+Shift+C, chuột phải
  document.addEventListener('keydown', function(e) {
    if (
      e.key === 'F12' ||
      (e.ctrlKey && e.shiftKey && ['I', 'C', 'J'].includes(e.key)) ||
      (e.ctrlKey && e.key === 'U')
    ) {
      e.preventDefault();
    }
  });

  // Chặn chuột phải
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
  });

  // Chặn copy
  document.addEventListener('copy', function(e) {
    e.preventDefault();
  });

  // Chặn quét khối (select)
  document.addEventListener('selectstart', e => {
    e.preventDefault();
  });
