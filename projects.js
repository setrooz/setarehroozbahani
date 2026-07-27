const PROJECTS = [
  {
    num: '01',
    title: 'The Spheres of Influence',
    cat: 'Master Studio · 2022',
    href: 'project-1.html',
    imgSrc: 'images/Spheres of Influence_00.jpg',
    overlaySrc: 'images/Spheres of Influence_00.jpg',
    color: [89, 44, 56]
  },
  {
    num: '02',
    title: 'Learning from Lungomare G.M',
    cat: 'Master Thesis · 2022–2023',
    href: 'project-2.html',
    imgSrc: 'images/LLGM.png',
    overlaySrc: 'images/LLGM.png',
    color: [42, 30, 60]
  },
  {
    num: '03',
    title: 'Prof. CO',
    cat: 'Architectural Practice · 2023–2026',
    href: 'project-3.html',
    imgSrc: 'images/CAS01.png',
    overlaySrc: 'images/CAS01overlay.png',
    color: [26, 46, 60]
  },
  {
    num: '04',
    title: 'Prof. ZP',
    cat: 'Architectural Practice · 2023–2026',
    href: 'project-4.html',
    imgSrc: 'images/cieo02.png',
    overlaySrc: 'images/cieo02overlay.png',
    color: [26, 60, 40]
  },
  {
    num: '05',
    title: 'Prof. KT',
    cat: 'Architectural Practice · 2023–2026',
    href: 'project-5.html',
    imgSrc: 'images/cieo03.png',
    overlaySrc: 'images/cieo04overlay.png',
    color: [60, 26, 14]
  },
  {
    num: '06',
    title: 'Prof. SJ',
    cat: 'Architectural Practice · 2023–2026',
    href: 'project-6.html',
    imgSrc: 'images/SJ.png',
    overlaySrc: 'images/SJoverlay.png',
    color: [60, 26, 14]
  },
  {
    num: '07',
    title: 'Prof. DE',
    cat: 'Architectural Practice · 2023–2026',
    href: 'project-7.html',
    imgSrc: 'images/detoverlay02.png',
    overlaySrc: 'images/detoverlay02.png',
    color: [60, 26, 14]
  },
  {
    num: '08',
    title: 'Prof. LV',
    cat: 'Architectural Traineeship · 2023',
    href: 'project-8.html',
    imgSrc: 'images/PVH01.jpg',
    overlaySrc: 'images/PVH01overlay.png',
    color: [30, 40, 70]
  },
  {
    num: '09',
    title: 'Prof. BT',
    cat: 'Architectural Photography · 2023',
    href: 'project-9.html',
    imgSrc: 'images/BT.png',
    overlaySrc: 'images/BToverlay02.png',
    color: [30, 40, 70]
  },
  {
    num: '10',
    title: 'Extended Liminal',
    cat: 'Summer School · 2022',
    href: 'project-10.html',
    imgSrc: 'images/Extended Liminal_00.jpg',
    overlaySrc: 'images/Extended Liminaloverlay.png',
    color: [60, 30, 48]
  },
  {
    num: '11',
    title: 'Forbidden to Play',
    cat: 'Studio 1 · 2021',
    href: 'project-11.html',
    imgSrc: 'images/lep03.png',
    overlaySrc: 'images/lepoverlay02.png',
    color: [255, 255, 255]
  }
];

/*
 * Three rows of projects placed around an implied sphere.
 * longitude 0 is the front of the globe.
 */
const SPHERE_SLOTS = [
  { latitude: -0.68, longitude: -1.48 },
  { latitude: -0.74, longitude:  0.00 },
  { latitude: -0.68, longitude:  1.48 },

  { latitude: -0.12, longitude: -2.52 },
  { latitude: -0.12, longitude: -1.24 },
  { latitude: -0.10, longitude:  0.00 },
  { latitude: -0.12, longitude:  1.24 },
  { latitude: -0.12, longitude:  2.52 },

  { latitude:  0.64, longitude: -1.38 },
  { latitude:  0.70, longitude:  0.00 },
  { latitude:  0.64, longitude:  1.38 }
];

initProjectsSphere();
initMenu();

function initProjectsSphere() {
  const field = document.getElementById('project-field');
  const canvas = document.getElementById('project-canvas');
  const ctx = canvas.getContext('2d');
  const curEl = document.getElementById('cur');
  const ring = document.getElementById('cur-ring');
  const statusNum = document.getElementById('sphere-status-num');

  const overlay = document.getElementById('card-overlay');
  const overlayCanvas = document.getElementById('overlay-canvas');
  const overlayNum = document.getElementById('overlay-num');
  const overlayTitle = document.getElementById('overlay-title');
  const overlayCat = document.getElementById('overlay-cat');
  const overlayLink = document.getElementById('overlay-link');
  const overlayClose = document.getElementById('overlay-close');

  const gridView = document.getElementById('grid-view');
  const gridInner = document.getElementById('grid-view-inner');
  const showAllBtn = document.getElementById('show-all-btn');
  const gridCloseBtn = document.getElementById('grid-close-btn');
  const navStrip = document.getElementById('nav-strip');

  const isTouch = window.matchMedia('(pointer: coarse)').matches;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (isTouch) {
    curEl.style.display = 'none';
    ring.style.display = 'none';
    field.style.cursor = 'default';
  }

  let W = window.innerWidth;
  let H = window.innerHeight;
  let DPR = 1;

  let sphereCenterX = W * 0.5;
  let sphereCenterY = H * 0.45;
  let sphereRadius = 300;
  let cardWidth = 180;
  let cardHeight = 230;

  let yaw = 0.18;
  let pitch = -0.05;
  let velocityYaw = 0;
  let velocityPitch = 0;

  let pointerX = W * 0.5;
  let pointerY = H * 0.5;
  let pointerInside = false;

  let dragging = false;
  let activePointerId = null;
  let dragStartX = 0;
  let dragStartY = 0;
  let lastPointerX = 0;
  let lastPointerY = 0;
  let lastPointerTime = 0;
  let movedDistance = 0;
  let pressedCard = null;

  let hoveredCard = null;
  let selectedCard = null;
  let navFocusIndex = null;
  let frontProjectIndex = -1;
  let projectedCards = [];
  let gridBuilt = false;

  const AUTO_ROTATE_SPEED = reducedMotion ? 0 : 0.000015;
  const DRAG_SPEED = 0.006;
  const PITCH_LIMIT = 0.58;
  const CAMERA_DISTANCE = 3.25;

  function pseudoRandom(seed) {
    const value = Math.sin(seed + 1) * 10000;
    return value - Math.floor(value);
  }

  function clamp(value, minimum, maximum) {
    return Math.max(minimum, Math.min(maximum, value));
  }

  function smoothstep(value) {
    const x = clamp(value, 0, 1);
    return x * x * (3 - 2 * x);
  }

  function nearestEquivalentAngle(target, current) {
    let result = target;

    while (result - current > Math.PI) result -= Math.PI * 2;
    while (result - current < -Math.PI) result += Math.PI * 2;

    return result;
  }

  function createSpherePoint(latitude, longitude, radius = 1) {
    const latitudeRadius = Math.cos(latitude) * radius;

    return {
      x: Math.sin(longitude) * latitudeRadius,
      y: Math.sin(latitude) * radius,
      z: Math.cos(longitude) * latitudeRadius
    };
  }

  function rotatePoint(point, rotationYaw, rotationPitch) {
    const cosYaw = Math.cos(rotationYaw);
    const sinYaw = Math.sin(rotationYaw);

    const xAfterYaw = point.x * cosYaw + point.z * sinYaw;
    const zAfterYaw = -point.x * sinYaw + point.z * cosYaw;

    const cosPitch = Math.cos(rotationPitch);
    const sinPitch = Math.sin(rotationPitch);

    return {
      x: xAfterYaw,
      y: point.y * cosPitch - zAfterYaw * sinPitch,
      z: point.y * sinPitch + zAfterYaw * cosPitch
    };
  }

  function projectPoint(point) {
    const perspective = CAMERA_DISTANCE / (CAMERA_DISTANCE - point.z * 0.92);

    return {
      x: sphereCenterX + point.x * sphereRadius * perspective,
      y: sphereCenterY + point.y * sphereRadius * perspective,
      z: point.z,
      perspective
    };
  }

  function buildWireframe(seed) {
    const lines = [];

    for (let i = 0; i < 90; i++) {
      const ax = pseudoRandom(seed + i);
      const ay = pseudoRandom(seed + i + 500);
      const bx = ax + (pseudoRandom(seed + i + 1000) - 0.5) * 0.32;
      const by = ay + (pseudoRandom(seed + i + 1500) - 0.5) * 0.32;
      const length = Math.hypot(bx - ax, by - ay);

      if (length > 0.025 && length < 0.3) {
        lines.push({ ax, ay, bx, by });
      }
    }

    return lines;
  }

  const loadedImages = {};
  const loadedOverlays = {};

  PROJECTS.forEach(project => {
    const image = new Image();
    image.src = project.imgSrc;
    loadedImages[project.num] = image;

    const overlayImage = new Image();
    overlayImage.src = project.overlaySrc;
    loadedOverlays[project.num] = overlayImage;
  });

  const cards = PROJECTS.map((project, index) => {
    const slot = SPHERE_SLOTS[index];

    return {
      project,
      index,
      basePoint: createSpherePoint(slot.latitude, slot.longitude),
      latitude: slot.latitude,
      longitude: slot.longitude,
      reveal: 0.08,
      targetReveal: 0.08,
      hovered: false,
      navHovered: false,
      selected: false,
      wireframe: buildWireframe(index * 197)
    };
  });

  const particles = Array.from({ length: 58 }, (_, index) => {
    const y = 1 - (index / 57) * 2;
    const radial = Math.sqrt(Math.max(0, 1 - y * y));
    const angle = index * 2.399963229728653;
    const radius = 1.05 + pseudoRandom(index * 31) * 0.32;

    return {
      point: {
        x: Math.cos(angle) * radial * radius,
        y: y * radius,
        z: Math.sin(angle) * radial * radius
      },
      size: 0.65 + pseudoRandom(index * 17) * 1.5,
      glow: pseudoRandom(index * 43) > 0.76
    };
  });

  function resizeCanvas() {
    W = window.innerWidth;
    H = window.innerHeight;
    DPR = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.round(W * DPR);
    canvas.height = Math.round(H * DPR);
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;

    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

    const mobile = W <= 700;

    cardWidth = mobile
      ? clamp(W * 0.28, 94, 118)
      : clamp(W * 0.115, 145, 190);

    cardHeight = cardWidth * 1.28;

    sphereRadius = mobile
      ? Math.min(W * 0.39, H * 0.29, 175)
      : Math.min(W * 0.255, H * 0.345, 350);

    sphereCenterX = W * 0.5;
    sphereCenterY = mobile ? H * 0.43 : H * 0.445;
  }

  resizeCanvas();

  // ── Bottom navigation ────────────────────────────────────────────────────
  navStrip.innerHTML = '';

  PROJECTS.forEach((project, index) => {
    const link = document.createElement('a');
    link.className = 'nav-item';
    link.href = project.href;
    link.setAttribute('aria-label', `${project.num} ${project.title}`);
    link.innerHTML = `<span class="nav-num">${project.num}</span>`;

    link.addEventListener('pointerenter', event => {
      if (event.pointerType === 'touch') return;

      navFocusIndex = index;
      cards[index].navHovered = true;
      cards[index].targetReveal = 1;
    });

    link.addEventListener('pointerleave', () => {
      navFocusIndex = null;
      cards[index].navHovered = false;
    });

    navStrip.appendChild(link);
  });

  const navItems = Array.from(navStrip.querySelectorAll('.nav-item'));

  function updateActiveProject(index) {
    if (index === frontProjectIndex) return;

    frontProjectIndex = index;
    statusNum.textContent = PROJECTS[index].num;

    navItems.forEach((item, itemIndex) => {
      item.classList.toggle('active', itemIndex === index);
    });
  }

  // ── Canvas drawing helpers ───────────────────────────────────────────────
  function drawImageCover(drawContext, image, x, y, width, height) {
    if (!image || !image.complete || !image.naturalWidth) return false;

    const imageWidth = image.naturalWidth;
    const imageHeight = image.naturalHeight;
    const scale = Math.max(width / imageWidth, height / imageHeight);
    const sourceWidth = width / scale;
    const sourceHeight = height / scale;
    const sourceX = (imageWidth - sourceWidth) / 2;
    const sourceY = (imageHeight - sourceHeight) / 2;

    drawContext.drawImage(
      image,
      sourceX,
      sourceY,
      sourceWidth,
      sourceHeight,
      x,
      y,
      width,
      height
    );

    return true;
  }

  function drawCardVisual(
    drawContext,
    card,
    centreX,
    centreY,
    width,
    height,
    rotation,
    opacity,
    depth,
    revealAmount,
    emphasized = false
  ) {
    const project = card.project;
    const [r, g, b] = project.color;
    const left = -width / 2;
    const top = -height / 2;
    const backAmount = 1 - depth;

    drawContext.save();
    drawContext.translate(centreX, centreY);
    drawContext.rotate(rotation);
    drawContext.globalAlpha = opacity;

    if (emphasized) {
      drawContext.shadowColor = 'rgba(200,120,130,0.22)';
      drawContext.shadowBlur = 24;
    } else if (depth > 0.72) {
      drawContext.shadowColor = 'rgba(0,0,0,0.34)';
      drawContext.shadowBlur = 18;
    }

    drawContext.fillStyle = `rgba(${Math.max(8, r * 0.16)},${Math.max(6, g * 0.16)},${Math.max(8, b * 0.16)},0.98)`;
    drawContext.fillRect(left, top, width, height);

    drawContext.save();
    drawContext.beginPath();
    drawContext.rect(left, top, width, height);
    drawContext.clip();

    const photoAlpha = 0.24 + revealAmount * 0.76;
    const projectImage = loadedImages[project.num];

    if (projectImage && projectImage.complete && projectImage.naturalWidth) {
      drawContext.globalAlpha = photoAlpha;
      drawImageCover(drawContext, projectImage, left, top, width, height);
      drawContext.globalAlpha = 1;
    }

    const overlayImage = loadedOverlays[project.num];

    if (overlayImage && overlayImage.complete && overlayImage.naturalWidth) {
     drawContext.globalAlpha = Math.max(
  0.04,
  0.46 - revealAmount * 0.40
);
      drawImageCover(drawContext, overlayImage, left, top, width, height);
      drawContext.globalAlpha = 1;
    }

    if (backAmount > 0.08) {
      drawContext.fillStyle = `rgba(7,4,6,${backAmount * 0.72})`;
      drawContext.fillRect(left, top, width, height);
    }

    const bottomGradient = drawContext.createLinearGradient(
      0,
      top + height * 0.48,
      0,
      top + height
    );

    bottomGradient.addColorStop(
  0,
  'rgba(12,8,11,0)'
);

bottomGradient.addColorStop(
  1,
  `rgba(12,8,11,${0.62 + backAmount * 0.10})`
);

    drawContext.fillStyle = bottomGradient;
    drawContext.fillRect(left, top + height * 0.45, width, height * 0.55);

    drawContext.restore();
    drawContext.shadowBlur = 0;

    // Fine wireframe layer.
    const wireAlpha = Math.max(0, (1 - revealAmount) * 0.22 * (0.4 + depth * 0.6));

    if (wireAlpha > 0.008) {
      drawContext.lineWidth = Math.max(0.35, width / 420);

      card.wireframe.forEach(line => {
        drawContext.beginPath();
        drawContext.moveTo(left + line.ax * width, top + line.ay * height);
        drawContext.lineTo(left + line.bx * width, top + line.by * height);
        drawContext.strokeStyle = `rgba(${Math.min(255, r + 135)},${Math.min(255, g + 110)},${Math.min(255, b + 120)},${wireAlpha})`;
        drawContext.stroke();
      });
    }

    // Border and corner node.
    drawContext.strokeStyle = emphasized
      ? 'rgba(200,120,130,0.72)'
      : `rgba(255,255,255,${0.05 + depth * 0.09})`;

    drawContext.lineWidth = emphasized ? 0.8 : 0.45;
    drawContext.strokeRect(left + 0.5, top + 0.5, width - 1, height - 1);

    const padding = Math.max(6, width * 0.045);
    const dotRadius = emphasized ? Math.max(2.3, width * 0.014) : Math.max(1.2, width * 0.009);

    drawContext.beginPath();
    drawContext.arc(left + padding, top + padding, dotRadius, 0, Math.PI * 2);
    drawContext.fillStyle = emphasized
      ? 'rgba(220,140,150,0.98)'
      : `rgba(200,120,130,${0.36 + depth * 0.44})`;
    drawContext.fill();

    const numberSize = clamp(width * 0.043, 6, 9);
    const titleSize = clamp(width * 0.049, 7, 10);
    const catSize = clamp(width * 0.034, 5.5, 7.5);

    drawContext.font = `${numberSize}px monospace`;
    drawContext.fillStyle = `rgba(220,140,150,${0.52 + depth * 0.42})`;
    drawContext.fillText(`PROJ. ${project.num}`, left + padding, top + height - padding - titleSize * 2.6);

    drawContext.font = `${titleSize}px monospace`;
    drawContext.fillStyle = `rgba(255,255,255,${0.42 + depth * 0.52})`;

    const maxTitleWidth = width - padding * 2;
    const titleWords = project.title.toUpperCase().split(' ');
    const titleLines = [];
    let currentLine = '';

    titleWords.forEach(word => {
      const testLine = currentLine ? `${currentLine} ${word}` : word;

      if (drawContext.measureText(testLine).width > maxTitleWidth && currentLine) {
        titleLines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    });

    if (currentLine) titleLines.push(currentLine);

    titleLines.slice(0, 2).forEach((line, lineIndex) => {
      drawContext.fillText(
        line,
        left + padding,
        top + height - padding - titleSize * (1.25 - lineIndex)
      );
    });

    drawContext.font = `${catSize}px monospace`;
    drawContext.fillStyle = `rgba(255,255,255,${0.2 + depth * 0.28})`;
    drawContext.fillText(project.cat, left + padding, top + height - Math.max(3, padding * 0.38));

    drawContext.restore();
  }

  function drawAtmosphere(time, displayYaw, displayPitch) {
    const radius = sphereRadius;

    const halo = ctx.createRadialGradient(
      sphereCenterX,
      sphereCenterY,
      radius * 0.18,
      sphereCenterX,
      sphereCenterY,
      radius * 1.35
    );

    halo.addColorStop(0, 'rgba(89,44,56,0.09)');
    halo.addColorStop(0.52, 'rgba(89,44,56,0.035)');
    halo.addColorStop(1, 'rgba(89,44,56,0)');

    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(sphereCenterX, sphereCenterY, radius * 1.38, 0, Math.PI * 2);
    ctx.fill();

    const orbitSettings = [
      { rotate: -0.18, rx: 1.15, ry: 0.78, dash: [4, 9], alpha: 0.13 },
      { rotate:  0.42, rx: 1.20, ry: 0.47, dash: [],     alpha: 0.10 },
      { rotate: -0.62, rx: 1.08, ry: 0.62, dash: [2, 8], alpha: 0.09 },
      { rotate:  1.04, rx: 1.00, ry: 0.52, dash: [],     alpha: 0.07 }
    ];

    orbitSettings.forEach((orbit, index) => {
      ctx.save();
      ctx.translate(sphereCenterX, sphereCenterY);
      ctx.rotate(orbit.rotate + Math.sin(time * 0.00008 + index) * 0.025);
      ctx.setLineDash(orbit.dash);
      ctx.lineDashOffset = time * (index % 2 ? 0.002 : -0.0015);
      ctx.strokeStyle = `rgba(200,120,130,${orbit.alpha})`;
      ctx.lineWidth = 0.55;
      ctx.beginPath();
      ctx.ellipse(0, 0, radius * orbit.rx, radius * orbit.ry, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    });

    ctx.setLineDash([]);

    // Faint spherical boundary.
    ctx.strokeStyle = 'rgba(255,255,255,0.035)';
    ctx.lineWidth = 0.6;
    ctx.beginPath();
    ctx.arc(sphereCenterX, sphereCenterY, radius * 1.02, 0, Math.PI * 2);
    ctx.stroke();

    // Floating points surrounding the project sphere.
    particles.forEach((particle, index) => {
      const rotated = rotatePoint(
        particle.point,
        displayYaw * 0.72 + time * 0.0000025,
        displayPitch * 0.65
      );

      const projected = projectPoint(rotated);
      const depth = clamp((rotated.z + 1.35) / 2.7, 0, 1);
      const alpha = 0.05 + depth * 0.34;
      const pulse = particle.glow
        ? 0.72 + Math.sin(time * 0.002 + index) * 0.28
        : 1;

      if (particle.glow) {
        ctx.beginPath();
        ctx.arc(projected.x, projected.y, particle.size * 4.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,120,130,${alpha * 0.08 * pulse})`;
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(projected.x, projected.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(220,140,150,${alpha * pulse})`;
      ctx.fill();
    });

    // Rotation arrows at the sides.
    if (W > 780) {
      const arrowOffset = radius * 1.18;
      const arrowHeight = radius * 0.35;

      ctx.strokeStyle = 'rgba(200,120,130,0.42)';
      ctx.fillStyle = 'rgba(200,120,130,0.55)';
      ctx.lineWidth = 0.8;

      drawRotationArrow(sphereCenterX - arrowOffset, sphereCenterY, arrowHeight, false);
      drawRotationArrow(sphereCenterX + arrowOffset, sphereCenterY, arrowHeight, true);
    }
  }

  function drawRotationArrow(x, y, height, pointsUp) {
    const direction = pointsUp ? -1 : 1;

    ctx.beginPath();
    ctx.moveTo(x, y + height * 0.52 * direction);
    ctx.bezierCurveTo(
      x - 12 * direction,
      y + height * 0.2 * direction,
      x - 12 * direction,
      y - height * 0.2 * direction,
      x,
      y - height * 0.52 * direction
    );
    ctx.stroke();

    const tipY = y - height * 0.52 * direction;
    ctx.beginPath();
    ctx.moveTo(x, tipY);
    ctx.lineTo(x - 5, tipY + 8 * direction);
    ctx.lineTo(x + 3, tipY + 6 * direction);
    ctx.closePath();
    ctx.fill();
  }

  function projectCards(displayYaw, displayPitch) {
    projectedCards = cards.map(card => {
      const rotated = rotatePoint(card.basePoint, displayYaw, displayPitch);
      const projected = projectPoint(rotated);
      const depth = clamp((rotated.z + 1) * 0.5, 0, 1);
      const depthCurve = smoothstep(depth);
      const hoverScale = card.hovered || card.navHovered ? 1.085 : 1;
      const scale = (0.48 + depthCurve * 0.73) * hoverScale;
      const width = cardWidth * scale;
      const height = cardHeight * scale;
      const alpha = clamp(0.08 + Math.pow(depth, 1.28) * 0.94, 0.07, 1);
      const rotation = rotated.x * 0.075 + Math.sin(card.index * 1.7) * 0.006;

      return {
        card,
        x: projected.x,
        y: projected.y,
        z: rotated.z,
        depth,
        width,
        height,
        rotation,
        alpha
      };
    });

    projectedCards.sort((a, b) => a.z - b.z);
  }

  function hitTestProjected(projected, x, y) {
    if (projected.alpha < 0.28 || projected.z < -0.38) return false;

    const dx = x - projected.x;
    const dy = y - projected.y;
    const cos = Math.cos(-projected.rotation);
    const sin = Math.sin(-projected.rotation);
    const localX = dx * cos - dy * sin;
    const localY = dx * sin + dy * cos;

    return (
      Math.abs(localX) <= projected.width * 0.5 + 7 &&
      Math.abs(localY) <= projected.height * 0.5 + 7
    );
  }

  function updateHoveredCard() {
    if (!pointerInside || dragging || overlay.classList.contains('visible') || gridView.classList.contains('visible')) {
      setHoveredCard(null);
      return;
    }

    let match = null;

    for (let index = projectedCards.length - 1; index >= 0; index--) {
      if (hitTestProjected(projectedCards[index], pointerX, pointerY)) {
        match = projectedCards[index].card;
        break;
      }
    }

    setHoveredCard(match);
  }

  function setHoveredCard(card) {
    if (hoveredCard === card) return;

    hoveredCard = card;

    cards.forEach(item => {
      item.hovered = item === card;
    });

    ring.classList.toggle('hovered', Boolean(card));
  }

  function drawCards() {
    const hoveredProjection = hoveredCard
      ? projectedCards.find(projected => projected.card === hoveredCard)
      : null;

    projectedCards.forEach(projected => {
      if (hoveredProjection && projected.card === hoveredProjection.card) return;

      drawCardVisual(
        ctx,
        projected.card,
        projected.x,
        projected.y,
        projected.width,
        projected.height,
        projected.rotation,
        projected.alpha,
        projected.depth,
        projected.card.reveal,
        projected.card.navHovered
      );
    });

    if (hoveredProjection) {
      drawCardVisual(
        ctx,
        hoveredProjection.card,
        hoveredProjection.x,
        hoveredProjection.y,
        hoveredProjection.width,
        hoveredProjection.height,
        hoveredProjection.rotation,
        Math.min(1, hoveredProjection.alpha + 0.12),
        hoveredProjection.depth,
        hoveredProjection.card.reveal,
        true
      );
    }
  }

  // ── Project preview overlay ──────────────────────────────────────────────
  function showOverlay(card) {
    selectedCard = card;
    card.selected = true;
    card.targetReveal = 1;

    const mobile = W <= 700;
    const previewWidth = mobile
      ? Math.min(W * 0.72, 270)
      : Math.min(W * 0.27, 360);

    const previewHeight = previewWidth * 1.28;
    const overlayDpr = Math.min(window.devicePixelRatio || 1, 2);

    overlayCanvas.width = Math.round(previewWidth * overlayDpr);
    overlayCanvas.height = Math.round(previewHeight * overlayDpr);
    overlayCanvas.style.width = `${previewWidth}px`;
    overlayCanvas.style.height = `${previewHeight}px`;

    const overlayContext = overlayCanvas.getContext('2d');
    overlayContext.setTransform(overlayDpr, 0, 0, overlayDpr, 0, 0);
    overlayContext.clearRect(0, 0, previewWidth, previewHeight);

    drawCardVisual(
      overlayContext,
      card,
      previewWidth * 0.5,
      previewHeight * 0.5,
      previewWidth,
      previewHeight,
      0,
      1,
      1,
      1,
      true
    );

    overlayNum.textContent = card.project.num;
    overlayTitle.textContent = card.project.title;
    overlayCat.textContent = card.project.cat;
    overlayLink.href = card.project.href;

    overlay.classList.add('visible');
    overlay.setAttribute('aria-hidden', 'false');
  }

  function hideOverlay() {
    overlay.classList.remove('visible');
    overlay.setAttribute('aria-hidden', 'true');

    if (selectedCard) {
      selectedCard.selected = false;
      selectedCard = null;
    }
  }

  overlayClose.addEventListener('click', hideOverlay);

  overlay.addEventListener('click', event => {
    if (event.target === overlay) hideOverlay();
  });

  // ── Grid view retained from the existing page ───────────────────────────
  function buildGridView() {
    if (gridBuilt) return;

    gridBuilt = true;

    PROJECTS.forEach(project => {
      const cell = document.createElement('div');
      const image = document.createElement('div');
      const info = document.createElement('div');

      cell.className = 'grid-cell';
      image.className = 'grid-cell-img';
      info.className = 'grid-cell-info';

      image.style.backgroundImage = `url('${project.imgSrc}')`;
      info.innerHTML =
        `<span class="grid-cell-num">${project.num}</span>` +
        `<span class="grid-cell-title">${project.title}</span>` +
        `<span class="grid-cell-cat">${project.cat}</span>`;

      cell.appendChild(image);
      cell.appendChild(info);

      cell.addEventListener('click', () => {
        window.location.href = project.href;
      });

      gridInner.appendChild(cell);
    });
  }

  function showGridView() {
    buildGridView();
    setHoveredCard(null);
    gridView.classList.add('visible');
    gridView.setAttribute('aria-hidden', 'false');
    showAllBtn.classList.add('active');
    showAllBtn.textContent = 'HIDE GRID';
  }

  function hideGridView() {
    gridView.classList.remove('visible');
    gridView.setAttribute('aria-hidden', 'true');
    showAllBtn.classList.remove('active');
    showAllBtn.textContent = 'SHOW GRID';
  }

  showAllBtn.addEventListener('click', () => {
    if (gridView.classList.contains('visible')) {
      hideGridView();
    } else {
      showGridView();
    }
  });

  gridCloseBtn.addEventListener('click', hideGridView);

  gridView.addEventListener('click', event => {
    if (event.target === gridView) hideGridView();
  });

  // ── Pointer interaction ──────────────────────────────────────────────────
  canvas.addEventListener('pointerenter', event => {
    pointerInside = true;
    pointerX = event.clientX;
    pointerY = event.clientY;
  });

  canvas.addEventListener('pointermove', event => {
    pointerX = event.clientX;
    pointerY = event.clientY;
    pointerInside = true;

    if (!isTouch) {
      curEl.style.left = `${pointerX}px`;
      curEl.style.top = `${pointerY}px`;
      ring.style.left = `${pointerX}px`;
      ring.style.top = `${pointerY}px`;
    }

    if (!dragging || event.pointerId !== activePointerId) {
      updateHoveredCard();
      return;
    }

    const now = performance.now();
    const dx = event.clientX - lastPointerX;
    const dy = event.clientY - lastPointerY;
    const elapsed = Math.max(8, now - lastPointerTime);

    yaw += dx * DRAG_SPEED;
    pitch = clamp(pitch + dy * DRAG_SPEED * 0.72, -PITCH_LIMIT, PITCH_LIMIT);

    velocityYaw = (dx * DRAG_SPEED) / elapsed;
    velocityPitch = (dy * DRAG_SPEED * 0.72) / elapsed;

    movedDistance += Math.abs(dx) + Math.abs(dy);
    lastPointerX = event.clientX;
    lastPointerY = event.clientY;
    lastPointerTime = now;
  });

  canvas.addEventListener('pointerdown', event => {
    if (overlay.classList.contains('visible') || gridView.classList.contains('visible')) return;

    pointerInside = true;
    pointerX = event.clientX;
    pointerY = event.clientY;
    updateHoveredCard();

    dragging = true;
    activePointerId = event.pointerId;
    dragStartX = event.clientX;
    dragStartY = event.clientY;
    lastPointerX = event.clientX;
    lastPointerY = event.clientY;
    lastPointerTime = performance.now();
    movedDistance = 0;
    pressedCard = hoveredCard;
    velocityYaw = 0;
    velocityPitch = 0;

    canvas.setPointerCapture(event.pointerId);
    ring.classList.add('dragging');
  });

  canvas.addEventListener('pointerup', event => {
    if (!dragging || event.pointerId !== activePointerId) return;

    dragging = false;
    ring.classList.remove('dragging');

    if (canvas.hasPointerCapture(event.pointerId)) {
      canvas.releasePointerCapture(event.pointerId);
    }

    const clickDistance = Math.hypot(
      event.clientX - dragStartX,
      event.clientY - dragStartY
    );

    updateHoveredCard();

    if (clickDistance < 7 && movedDistance < 14 && pressedCard && pressedCard === hoveredCard) {
      showOverlay(pressedCard);
    }

    activePointerId = null;
    pressedCard = null;
  });

  canvas.addEventListener('pointercancel', event => {
    dragging = false;
    activePointerId = null;
    pressedCard = null;
    ring.classList.remove('dragging');

    if (canvas.hasPointerCapture(event.pointerId)) {
      canvas.releasePointerCapture(event.pointerId);
    }
  });

  canvas.addEventListener('pointerleave', () => {
    if (dragging) return;

    pointerInside = false;
    setHoveredCard(null);
  });

  window.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;

    if (overlay.classList.contains('visible')) {
      hideOverlay();
    } else if (gridView.classList.contains('visible')) {
      hideGridView();
    }
  });

  // ── Animation ────────────────────────────────────────────────────────────
  let previousTime = performance.now();

  function animationLoop(time) {
    requestAnimationFrame(animationLoop);

    const deltaTime = Math.min(40, Math.max(0, time - previousTime));
    previousTime = time;

    const interfaceBlocked =
      overlay.classList.contains('visible') ||
      gridView.classList.contains('visible');

    if (!dragging && !interfaceBlocked) {
      if (navFocusIndex !== null) {
        const targetYaw = nearestEquivalentAngle(-cards[navFocusIndex].longitude, yaw);
        const targetPitch = clamp(-cards[navFocusIndex].latitude * 0.58, -0.38, 0.38);

        yaw += (targetYaw - yaw) * Math.min(1, deltaTime * 0.008);
        pitch += (targetPitch - pitch) * Math.min(1, deltaTime * 0.006);
        velocityYaw *= 0.78;
        velocityPitch *= 0.78;
      } else {
        yaw += velocityYaw * deltaTime;
        pitch = clamp(pitch + velocityPitch * deltaTime, -PITCH_LIMIT, PITCH_LIMIT);

        const inertiaDecay = Math.exp(-deltaTime * 0.0048);
        velocityYaw *= inertiaDecay;
        velocityPitch *= inertiaDecay;

        const hoverSlowdown = hoveredCard ? 0.2 : 1;
        yaw += AUTO_ROTATE_SPEED * deltaTime * hoverSlowdown;
      }
    }

    const parallaxYaw = pointerInside && !dragging
      ? (pointerX / Math.max(1, W) - 0.5) * 0.045
      : 0;

    const parallaxPitch = pointerInside && !dragging
      ? (pointerY / Math.max(1, H) - 0.5) * 0.035
      : 0;

    const displayYaw = yaw + parallaxYaw;
    const displayPitch = pitch + parallaxPitch;

    cards.forEach(card => {
      const isActive = card.hovered || card.navHovered || card.selected;
      const restingReveal = card.index === frontProjectIndex ? 0.14 : 0.07;
      card.targetReveal = isActive ? 1 : restingReveal;
      card.reveal += (card.targetReveal - card.reveal) * Math.min(1, deltaTime * 0.008);
    });

    ctx.clearRect(0, 0, W, H);

    drawAtmosphere(time, displayYaw, displayPitch);
    projectCards(displayYaw, displayPitch);

    const nearestFront = projectedCards.reduce((best, projected) => {
      return !best || projected.z > best.z ? projected : best;
    }, null);

    if (nearestFront) updateActiveProject(nearestFront.card.index);

    updateHoveredCard();
    drawCards();
  }

  requestAnimationFrame(animationLoop);

  window.addEventListener('resize', resizeCanvas);
}

function initMenu() {
  const menuDropdown = document.getElementById('menu-dropdown');
  const mobileMenuDropdown = document.getElementById('menu-dropdown-mobile');
  const menuButton = document.getElementById('btn-menu');
  const mobileMenuButton = document.getElementById('btn-menu-mobile');

  function setButtonState(button, isOpen) {
    if (!button) return;

    button.classList.toggle('active', isOpen);
    button.setAttribute('aria-expanded', String(isOpen));
  }

  function closeMenus() {
    menuDropdown.classList.remove('open');
    mobileMenuDropdown.classList.remove('open');
    setButtonState(menuButton, false);
    setButtonState(mobileMenuButton, false);
  }

  menuButton.addEventListener('click', event => {
    event.stopPropagation();

    const isOpen = menuDropdown.classList.toggle('open');
    mobileMenuDropdown.classList.remove('open');
    setButtonState(menuButton, isOpen);
    setButtonState(mobileMenuButton, false);
  });

  mobileMenuButton.addEventListener('click', event => {
    event.stopPropagation();

    const isOpen = mobileMenuDropdown.classList.toggle('open');
    menuDropdown.classList.remove('open');
    setButtonState(mobileMenuButton, isOpen);
    setButtonState(menuButton, false);
  });

  document.addEventListener('click', event => {
    if (
      !event.target.closest('#menu-wrapper') &&
      !event.target.closest('#btn-menu-mobile') &&
      !event.target.closest('#menu-dropdown-mobile')
    ) {
      closeMenus();
    }
  });

  window.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenus();
  });
}
