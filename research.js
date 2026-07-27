// ── Research data ─────────────────────────────────────────────────────────────
const RESEARCH = [
  {
    num: '01',
    title: 'The Extended Liminal',
    imgSrc: 'images/explore/01-01.png',
    tag: 'Multidisciplinary',
    year: 2022,
    method: 0.85,
    href: 'research-01.html',
    color: [89, 44, 56],
    abstract:
      'Summerschool group exploration on the liminality of wifi signal strength as a spatial arrangement of architecture of interior and exterior.'
  },
  {
    num: '02',
    title: 'Photogrammetric Typologies of the Spheres of Influence project',
    imgSrc: 'images/explore/02-01.png',
    tag: 'Forensic',
    year: 2022,
    method: 0.68,
    href: 'research-02.html',
    color: [42, 30, 60],
    abstract:
      'Photogrammetric documentation and typological analysis of the Spheres of Influence project.'
  },
  {
    num: '03',
    title: 'Landscape, Ecology and Urbanism; Second Year Research Paper',
    tag: 'Forensic',
    year: 2022,
    method: 0.5,
    href: 'research-03.html',
    color: [42, 30, 60],
    abstract:
      'Beauty as a tool within a sustainable ecological approach in landscape design projects.'
  },
  {
    num: '04',
    title: 'Generative explorations for Venice, Lido.',
    imgSrc: 'images/explore/04-01.png',
    tag: 'Computational',
    year: 2023,
    method: 0.9,
    href: 'research-04.html',
    color: [89, 44, 56],
    abstract:
      'Generative what-if scenarios for the future of Venice and Lido, as part of the Learning from Lungomare master thesis project.'
  },
  {
    num: '05',
    title: 'UNBUILDINGS: RCDHL Group Exhibition / The Spheres of Influence',
    imgSrc: 'images/explore/05-01.jpg',
    tag: 'Exhibition',
    year: 2024,
    method: 0.48,
    href: 'research-05.html',
    color: [60, 30, 48],
    abstract:
      'An architectural and art group exhibition at Versus Art Project in Istanbul, curated by Bahar Avanoğlu, İpek Avanoğlu, and Ece Duran.'
  },
  {
    num: '06',
    title: 'Glitches of Architecture in the making.',
    imgSrc: 'images/explore/06-01.png',
    tag: 'Computational',
    year: 2024,
    method: 0.65,
    href: 'research-06.html',
    color: [26, 46, 60],
    abstract:
      'Messy, incomplete, and glitchy states—not failures—of computational design processes as a way of engaging with architecture in the making, 2023–2026.'
  },
  {
    num: '07',
    title: 'Bestek GUI application.',
    imgSrc: 'images/explore/07-01.jpeg',
    tag: 'Digital Documentation',
    year: 2025,
    method: 0.38,
    href: 'research-07.html',
    color: [30, 40, 70],
    abstract:
      'A playful, interactive application for querying and automating the generation of in-house architectural project documentation.'
  },
  {
    num: '08',
    title: 'Animating the threshold: Curtain simulation',
    imgSrc: 'images/explore/08-01.PNG',
    tag: 'Computational',
    year: 2025,
    method: 0.88,
    href: 'research-08.html',
    color: [89, 44, 56],
    abstract:
      'Simulation of the physical behaviour of curtains and patterns of their movement as a design-research method for project CO.',

    // Video first, then image. Add more objects here later.
    gallery: [
      {
        type: 'video',
        src: 'videos/08-01.mp4',
        poster: 'images/explore/08-01.PNG',
        caption: 'Curtain simulation — motion study'
      },
      {
        type: 'image',
        src: 'images/explore/08-01.PNG',
        alt: 'Still image from the curtain simulation study',
        caption: 'Curtain simulation — still image'
      }
    ]
  },
  {
    num: '09',
    title: 'Playing Models 2025 Image Open Call',
    tag: 'Computational',
    year: 2025,
    method: 0.72,
    href: 'research-09.html',
    color: [26, 46, 60],
    abstract:
      'Accepted and presented media submission for the Playing Models 2025 Image Open Call.'
  },
  {
    num: '10',
    title: 'Photogrammetric Nonsense',
    imgSrc: 'images/explore/10-01.jpeg',
    tag: 'Representation',
    year: 2026,
    method: 0.82,
    href: 'research-10.html',
    color: [89, 44, 56],
    abstract:
      'Nonsense drawings derived from photogrammetric capture of architectural spaces, liminal objects, and the uncanny, 2023–2026.'
  },
  {
    num: '11',
    title: '(Visual) Essays',
    imgSrc: 'images/explore/11-01.jpeg',
    tag: 'Representation',
    year: 2026,
    method: 0.58,
    href: 'research-11.html',
    color: [60, 30, 48],
    abstract:
      'Open call entries for abstracts.',
      gallery: [
      {
        type: 'image',
        src: 'images/explore/11-01.jpeg',
        poster: 'images/explore/11-01.jpeg',
        caption: 'Essays'
      },
      {
        type: 'image',
        src: 'images/explore/11-02.jpeg',
        alt: 'Still image from the Arduino projects study',
        caption: 'Essays'
      }
    ]
  },
  {
    num: '12',
    title: 'ARCH/TECH',
    imgSrc: 'images/explore/12-01.jpeg',
    tag: 'Multidisciplinary',
    year: 2026,
    method: 0.46,
    href: 'research-12.html',
    color: [30, 40, 70],
    abstract:
      'Ongoing research into Arduino and ESP microcontroller boards for interactive architectural, artistic, and technological applications.',

      gallery: [
      {
        type: 'image',
        src: 'images/explore/12-02.jpeg',
        poster: 'images/explore/12-02.jpeg',
        caption: 'Multidisciplinary Integration'
      },
      {
        type: 'image',
        src: 'images/explore/12-03.jpeg',
        alt: 'Still image from the Arduino projects study',
        caption: 'Multidisciplinary Integration'
      }
    ]
  }
];

const EDGES = [
  [0, 1], [0, 3], [0, 4], [0, 8], [0, 9], [0, 11], [7, 10],
  [1, 5], [1, 8], [1, 9], [5, 6], [5, 7], [5, 10],
  [3, 2], [4, 10], [6, 11], [3, 5], [8, 9], [6, 7], [9, 10]
];

// ── DOM references ─────────────────────────────────────────────────────────────
const field = document.getElementById('research-field');
const edgeCanvas = document.getElementById('edge-canvas');
const ctx = edgeCanvas.getContext('2d');

const popup = document.getElementById('popup');
const popupClose = document.getElementById('popup-close');
const popupCanvas = document.getElementById('popup-canvas');
const popupNum = document.getElementById('popup-num');
const popupTitle = document.getElementById('popup-title');
const popupTag = document.getElementById('popup-tag');
const popupAbstract = document.getElementById('popup-abstract');
const popupBtn = document.getElementById('popup-btn');

const galleryView = document.getElementById('gallery-view');
const galleryTrack = document.getElementById('gallery-track');
const galleryClose = document.getElementById('gallery-close');
const galleryPrev = document.getElementById('gallery-prev');
const galleryNext = document.getElementById('gallery-next');
const galleryNum = document.getElementById('gallery-num');
const galleryTitle = document.getElementById('gallery-title');
const galleryTag = document.getElementById('gallery-tag');
const galleryCounter = document.getElementById('gallery-counter');
const galleryDots = document.getElementById('gallery-dots');

const menuDropdown = document.getElementById('menu-dropdown');
const menuDropdownMobile = document.getElementById('menu-dropdown-mobile');
const btnMenu = document.getElementById('btn-menu');
const btnMenuMobile = document.getElementById('btn-menu-mobile');

// ── Layout state ───────────────────────────────────────────────────────────────
let W = window.innerWidth;
let H = window.innerHeight;
let DPR = 1;

const PAD_L = 60;
const PAD_R = 60;
const PAD_T = 110;
const PAD_B = 50;
const MIN_YEAR = 2022;
const MAX_YEAR = 2026;

let activeNode = -1;
let gallerySlideIndex = 0;
let galleryScrollFrame = null;

function pseudoRandom(seed) {
  const value = Math.sin(seed + 1) * 10000;
  return value - Math.floor(value);
}

function clamp(value, minimum, maximum) {
  return Math.max(minimum, Math.min(maximum, value));
}

function nodePos(researchItem) {
  return {
    x:
      PAD_L +
      ((researchItem.year - MIN_YEAR) / (MAX_YEAR - MIN_YEAR)) *
        (W - PAD_L - PAD_R),
    y:
      PAD_T +
      (1 - researchItem.method) *
        (H - PAD_T - PAD_B)
  };
}

function hasGallery(researchItem) {
  return Array.isArray(researchItem.gallery) && researchItem.gallery.length > 0;
}

// ── Graph drawing ─────────────────────────────────────────────────────────────
function resizeEdgeCanvas() {
  W = window.innerWidth;
  H = window.innerHeight;
  DPR = Math.min(window.devicePixelRatio || 1, 2);

  edgeCanvas.width = Math.round(W * DPR);
  edgeCanvas.height = Math.round(H * DPR);
  edgeCanvas.style.width = `${W}px`;
  edgeCanvas.style.height = `${H}px`;

  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
}

function drawEdges(hoveredIndex) {
  ctx.clearRect(0, 0, W, H);

  ctx.setLineDash([2, 8]);
  ctx.lineWidth = 0.5;

  for (let year = MIN_YEAR; year <= MAX_YEAR; year++) {
    const x =
      PAD_L +
      ((year - MIN_YEAR) / (MAX_YEAR - MIN_YEAR)) *
        (W - PAD_L - PAD_R);

    ctx.beginPath();
    ctx.moveTo(x, PAD_T);
    ctx.lineTo(x, H - PAD_B);
    ctx.strokeStyle = 'rgba(141,106,115,0.8)';
    ctx.stroke();
  }

  ctx.setLineDash([]);

  EDGES.forEach(([a, b]) => {
    const pointA = nodePos(RESEARCH[a]);
    const pointB = nodePos(RESEARCH[b]);
    const highlighted = hoveredIndex === a || hoveredIndex === b;

    ctx.beginPath();
    ctx.moveTo(pointA.x, pointA.y);
    ctx.lineTo(pointB.x, pointB.y);
    ctx.strokeStyle = highlighted
      ? 'rgba(200,120,130,0.85)'
      : 'rgba(144, 96, 109, 0.82)';
    ctx.lineWidth = highlighted ? 1 : 0.5;
    ctx.setLineDash(highlighted ? [] : [3, 7]);
    ctx.stroke();
    ctx.setLineDash([]);
  });
}

function buildYearTicks() {
  field.querySelectorAll('.year-tick').forEach(tick => tick.remove());

  for (let year = MIN_YEAR; year <= MAX_YEAR; year++) {
    const tick = document.createElement('div');
    tick.className = 'year-tick';
    tick.textContent = year;
    field.appendChild(tick);
  }

  positionYearTicks();
}

function positionYearTicks() {
  field.querySelectorAll('.year-tick').forEach((tick, index) => {
    const year = MIN_YEAR + index;
    const x =
      PAD_L +
      ((year - MIN_YEAR) / (MAX_YEAR - MIN_YEAR)) *
        (W - PAD_L - PAD_R);

    tick.style.left = `${x}px`;
    tick.style.bottom = `${PAD_B + 5}px`;
  });
}

// ── Popup image ───────────────────────────────────────────────────────────────
function drawPopupImage(researchItem, index) {
  const popupContext = popupCanvas.getContext('2d');
  const popupWidth = popupCanvas.width;
  const popupHeight = popupCanvas.height;
  const [red, green, blue] = researchItem.color;

  popupContext.clearRect(0, 0, popupWidth, popupHeight);
  popupContext.fillStyle =
    `rgb(${(red * 0.18) | 0},${(green * 0.18) | 0},${(blue * 0.18) | 0})`;
  popupContext.fillRect(0, 0, popupWidth, popupHeight);

  function drawLabel() {
    popupContext.fillStyle = 'rgba(10,6,8,0.56)';
    popupContext.fillRect(0, popupHeight - 22, popupWidth, 22);
    popupContext.font = '7px monospace';
    popupContext.fillStyle = 'rgba(220,140,150,0.9)';
    popupContext.fillText(
      `${researchItem.num} — ${researchItem.tag.toUpperCase()}`,
      8,
      popupHeight - 8
    );
  }

  function drawFallback() {
    const seed = index * 173;
    popupContext.lineWidth = 0.5;

    for (let lineIndex = 0; lineIndex < 100; lineIndex++) {
      const ax = pseudoRandom(seed + lineIndex) * popupWidth;
      const ay = pseudoRandom(seed + lineIndex + 500) * popupHeight;
      const bx = ax + (pseudoRandom(seed + lineIndex + 1000) - 0.5) * 55;
      const by = ay + (pseudoRandom(seed + lineIndex + 1500) - 0.5) * 55;
      const length = Math.hypot(bx - ax, by - ay);

      if (length > 4 && length < 48) {
        popupContext.strokeStyle =
          `rgba(${Math.min(255, red + 120)},` +
          `${Math.min(255, green + 100)},` +
          `${Math.min(255, blue + 110)},0.6)`;
        popupContext.beginPath();
        popupContext.moveTo(ax, ay);
        popupContext.lineTo(bx, by);
        popupContext.stroke();
      }
    }

    drawLabel();
  }

  if (!researchItem.imgSrc) {
    drawFallback();
    return;
  }

  const image = new Image();

  image.onload = () => {
    const scale = Math.max(
      popupWidth / image.naturalWidth,
      popupHeight / image.naturalHeight
    );
    const sourceWidth = popupWidth / scale;
    const sourceHeight = popupHeight / scale;
    const sourceX = (image.naturalWidth - sourceWidth) / 2;
    const sourceY = (image.naturalHeight - sourceHeight) / 2;

    popupContext.drawImage(
      image,
      sourceX,
      sourceY,
      sourceWidth,
      sourceHeight,
      0,
      0,
      popupWidth,
      popupHeight
    );

    drawLabel();
  };

  image.onerror = drawFallback;
  image.src = researchItem.imgSrc;
}

// ── Node popup ────────────────────────────────────────────────────────────────
function positionPopup(researchItem) {
  const position = nodePos(researchItem);
  const popupWidth = window.innerWidth <= 600 ? 200 : 240;
  const popupHeight = Math.min(340, popup.scrollHeight || 320);

  let left = position.x + 16;
  let top = position.y - 60;

  if (left + popupWidth > W - 8) {
    left = position.x - popupWidth - 16;
  }

  left = clamp(left, 8, Math.max(8, W - popupWidth - 8));
  top = clamp(top, PAD_T, Math.max(PAD_T, H - popupHeight - 10));

  popup.style.left = `${left}px`;
  popup.style.top = `${top}px`;
}

function showPopup(index) {
  const researchItem = RESEARCH[index];

  activeNode = index;
  popupNum.textContent = researchItem.num;
  popupTitle.textContent = researchItem.title;
  popupTag.textContent = `${researchItem.tag} · ${researchItem.year}`;
  popupAbstract.textContent = researchItem.abstract;

  if (hasGallery(researchItem)) {
    popupBtn.href = '#gallery-view';
    popupBtn.textContent = 'OPEN GALLERY →';
    popupBtn.dataset.mode = 'gallery';
  } else {
    popupBtn.href = researchItem.href;
    popupBtn.textContent = 'READ MORE →';
    popupBtn.dataset.mode = 'link';
  }

  popupCanvas.width = 220;
  popupCanvas.height = 120;

  drawPopupImage(researchItem, index);
  drawEdges(index);

  popup.classList.add('visible');
  popup.setAttribute('aria-hidden', 'false');

  requestAnimationFrame(() => positionPopup(researchItem));
}

function hidePopup() {
  popup.classList.remove('visible');
  popup.setAttribute('aria-hidden', 'true');
  activeNode = -1;
  drawEdges(-1);
}

popupClose.addEventListener('click', hidePopup);

field.addEventListener('click', event => {
  if (
    !event.target.closest('.node') &&
    !event.target.closest('#popup') &&
    !event.target.closest('#gallery-view')
  ) {
    hidePopup();
  }
});

// ── Horizontal gallery ────────────────────────────────────────────────────────
function pauseGalleryVideos() {
  galleryTrack.querySelectorAll('video').forEach(video => video.pause());
}

function playCurrentGalleryVideo() {
  pauseGalleryVideos();

  const activeSlide = galleryTrack.children[gallerySlideIndex];
  if (!activeSlide) return;

  const video = activeSlide.querySelector('video');
  if (!video) return;

  video.play().catch(() => {
    // Native controls remain available if autoplay is blocked.
  });
}

function updateGalleryControls() {
  const slideCount = galleryTrack.children.length;
  const currentNumber = String(gallerySlideIndex + 1).padStart(2, '0');
  const totalNumber = String(slideCount).padStart(2, '0');

  galleryCounter.textContent = `${currentNumber} / ${totalNumber}`;
  galleryPrev.disabled = gallerySlideIndex === 0;
  galleryNext.disabled = gallerySlideIndex >= slideCount - 1;

  galleryDots.querySelectorAll('.gallery-dot').forEach((dot, index) => {
    const active = index === gallerySlideIndex;
    dot.classList.toggle('active', active);
    dot.setAttribute('aria-current', active ? 'true' : 'false');
  });
}

function selectGallerySlide(requestedIndex, shouldScroll = true) {
  const slideCount = galleryTrack.children.length;
  if (!slideCount) return;

  gallerySlideIndex = clamp(requestedIndex, 0, slideCount - 1);

  if (shouldScroll) {
    galleryTrack.scrollTo({
      left: galleryTrack.clientWidth * gallerySlideIndex,
      behavior: 'smooth'
    });
  }

  updateGalleryControls();
  playCurrentGalleryVideo();
}

function createGallerySlide(media, mediaIndex) {
  const slide = document.createElement('section');
  const mediaWrap = document.createElement('div');
  const caption = document.createElement('div');

  slide.className = 'gallery-slide';
  mediaWrap.className = 'gallery-media-wrap';
  caption.className = 'gallery-caption';
  slide.setAttribute('aria-label', `Media ${mediaIndex + 1}`);

  let mediaElement;

  if (media.type === 'video') {
    mediaElement = document.createElement('video');
    mediaElement.src = media.src;
    mediaElement.controls = true;
    mediaElement.muted = true;
    mediaElement.defaultMuted = true;
    mediaElement.loop = true;
    mediaElement.playsInline = true;
    mediaElement.preload = 'metadata';
    mediaElement.setAttribute('muted', '');
    mediaElement.setAttribute('playsinline', '');
    mediaElement.setAttribute('webkit-playsinline', '');

    if (media.poster) {
      mediaElement.poster = media.poster;
    }
  } else {
    mediaElement = document.createElement('img');
    mediaElement.src = media.src;
    mediaElement.alt = media.alt || 'Exploration gallery image';
    mediaElement.loading = 'eager';
  }

  mediaElement.className = 'gallery-media';
  caption.textContent = media.caption || '';

  mediaWrap.appendChild(mediaElement);
  mediaWrap.appendChild(caption);
  slide.appendChild(mediaWrap);

  return slide;
}

function buildGallery(researchItem) {
  galleryTrack.innerHTML = '';
  galleryDots.innerHTML = '';

  researchItem.gallery.forEach((media, index) => {
    const slide = createGallerySlide(media, index);
    const dot = document.createElement('button');

    dot.type = 'button';
    dot.className = 'gallery-dot';
    dot.setAttribute('aria-label', `Show media ${index + 1}`);
    dot.addEventListener('click', () => selectGallerySlide(index));

    galleryTrack.appendChild(slide);
    galleryDots.appendChild(dot);
  });
}

function openGallery(index) {
  const researchItem = RESEARCH[index];
  if (!researchItem || !hasGallery(researchItem)) return;

  gallerySlideIndex = 0;
  galleryNum.textContent = `EXPLORATION ${researchItem.num}`;
  galleryTitle.textContent = researchItem.title;
  galleryTag.textContent = `${researchItem.tag} · ${researchItem.year}`;

  buildGallery(researchItem);
  hidePopup();

  galleryView.classList.add('visible');
  galleryView.setAttribute('aria-hidden', 'false');

  requestAnimationFrame(() => {
    galleryTrack.scrollLeft = 0;
    selectGallerySlide(0, false);
    galleryClose.focus();
  });
}

function closeGallery() {
  pauseGalleryVideos();
  galleryView.classList.remove('visible');
  galleryView.setAttribute('aria-hidden', 'true');
}

popupBtn.addEventListener('click', event => {
  if (activeNode < 0) return;

  const researchItem = RESEARCH[activeNode];
  if (!hasGallery(researchItem)) return;

  event.preventDefault();
  openGallery(activeNode);
});

galleryClose.addEventListener('click', closeGallery);
galleryPrev.addEventListener('click', () => selectGallerySlide(gallerySlideIndex - 1));
galleryNext.addEventListener('click', () => selectGallerySlide(gallerySlideIndex + 1));

galleryView.addEventListener('click', event => {
  if (event.target === galleryView) closeGallery();
});

galleryTrack.addEventListener(
  'scroll',
  () => {
    if (galleryScrollFrame) cancelAnimationFrame(galleryScrollFrame);

    galleryScrollFrame = requestAnimationFrame(() => {
      const slideWidth = galleryTrack.clientWidth;
      if (!slideWidth) return;

      const nextIndex = clamp(
        Math.round(galleryTrack.scrollLeft / slideWidth),
        0,
        Math.max(0, galleryTrack.children.length - 1)
      );

      if (nextIndex !== gallerySlideIndex) {
        gallerySlideIndex = nextIndex;
        updateGalleryControls();
        playCurrentGalleryVideo();
      }
    });
  },
  { passive: true }
);

galleryTrack.addEventListener(
  'wheel',
  event => {
    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
    event.preventDefault();
    galleryTrack.scrollLeft += event.deltaY;
  },
  { passive: false }
);

let galleryDragging = false;
let galleryPointerId = null;
let galleryDragStartX = 0;
let galleryDragScrollStart = 0;

galleryTrack.addEventListener('pointerdown', event => {
  if (
    event.pointerType === 'touch' ||
    event.target.closest('video') ||
    event.target.closest('button')
  ) {
    return;
  }

  galleryDragging = true;
  galleryPointerId = event.pointerId;
  galleryDragStartX = event.clientX;
  galleryDragScrollStart = galleryTrack.scrollLeft;

  galleryTrack.classList.add('dragging');
  galleryTrack.setPointerCapture(event.pointerId);
});

galleryTrack.addEventListener('pointermove', event => {
  if (!galleryDragging || event.pointerId !== galleryPointerId) return;

  event.preventDefault();
  const movement = event.clientX - galleryDragStartX;
  galleryTrack.scrollLeft = galleryDragScrollStart - movement;
});

function finishGalleryDrag(event) {
  if (!galleryDragging || event.pointerId !== galleryPointerId) return;

  galleryDragging = false;
  galleryTrack.classList.remove('dragging');

  if (galleryTrack.hasPointerCapture(event.pointerId)) {
    galleryTrack.releasePointerCapture(event.pointerId);
  }

  galleryPointerId = null;

  const nearestSlide = Math.round(
    galleryTrack.scrollLeft / Math.max(1, galleryTrack.clientWidth)
  );

  selectGallerySlide(nearestSlide);
}

galleryTrack.addEventListener('pointerup', finishGalleryDrag);
galleryTrack.addEventListener('pointercancel', finishGalleryDrag);

// ── Build nodes ───────────────────────────────────────────────────────────────
const nodeElements = [];

RESEARCH.forEach((researchItem, index) => {
  const node = document.createElement('div');

  node.className = 'node';
  node.tabIndex = 0;
  node.setAttribute('aria-label', `${researchItem.num}. ${researchItem.title}`);
  node.innerHTML =
    `<div class="node-dot"></div>` +
    `<div class="node-num">${researchItem.num}</div>`;

  node.addEventListener('mouseenter', () => {
    if (activeNode !== index) showPopup(index);
  });

  node.addEventListener('focus', () => showPopup(index));

  node.addEventListener('click', event => {
    event.stopPropagation();
    if (activeNode === index) hidePopup();
    else showPopup(index);
  });

  node.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (activeNode === index) hidePopup();
      else showPopup(index);
    }
  });

  field.appendChild(node);
  nodeElements.push(node);
});

function positionNodes() {
  RESEARCH.forEach((researchItem, index) => {
    const position = nodePos(researchItem);
    nodeElements[index].style.left = `${position.x}px`;
    nodeElements[index].style.top = `${position.y}px`;
  });
}

// ── Menu ──────────────────────────────────────────────────────────────────────
function setMenuButtonState(button, open) {
  if (!button) return;
  button.classList.toggle('active', open);
  button.setAttribute('aria-expanded', String(open));
}

function closeMenus() {
  menuDropdown.classList.remove('open');
  menuDropdownMobile.classList.remove('open');
  setMenuButtonState(btnMenu, false);
  setMenuButtonState(btnMenuMobile, false);
}

btnMenu.addEventListener('click', event => {
  event.stopPropagation();
  const open = menuDropdown.classList.toggle('open');
  menuDropdownMobile.classList.remove('open');
  setMenuButtonState(btnMenu, open);
  setMenuButtonState(btnMenuMobile, false);
});

if (btnMenuMobile) {
  btnMenuMobile.addEventListener('click', event => {
    event.stopPropagation();
    const open = menuDropdownMobile.classList.toggle('open');
    menuDropdown.classList.remove('open');
    setMenuButtonState(btnMenuMobile, open);
    setMenuButtonState(btnMenu, false);
  });
}

document.addEventListener('click', event => {
  if (
    !event.target.closest('#menu-wrapper') &&
    !event.target.closest('#btn-menu-mobile') &&
    !event.target.closest('#menu-dropdown-mobile')
  ) {
    closeMenus();
  }
});

// ── Keyboard controls ─────────────────────────────────────────────────────────
window.addEventListener('keydown', event => {
  if (galleryView.classList.contains('visible')) {
    if (event.key === 'Escape') {
      closeGallery();
      return;
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      selectGallerySlide(gallerySlideIndex - 1);
      return;
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      selectGallerySlide(gallerySlideIndex + 1);
      return;
    }
  }

  if (event.key === 'Escape') {
    hidePopup();
    closeMenus();
  }
});

// ── Resize and initial render ─────────────────────────────────────────────────
function handleResize() {
  resizeEdgeCanvas();
  positionNodes();
  positionYearTicks();
  drawEdges(activeNode);

  if (activeNode >= 0) {
    positionPopup(RESEARCH[activeNode]);
  }

  if (galleryView.classList.contains('visible')) {
    galleryTrack.scrollLeft = gallerySlideIndex * galleryTrack.clientWidth;
  }
}

window.addEventListener('resize', handleResize);

resizeEdgeCanvas();
buildYearTicks();
positionNodes();
drawEdges(-1);
