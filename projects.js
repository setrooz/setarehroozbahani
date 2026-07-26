const PROJECTS = [
  {
    num: '01',
    title: 'The Spheres of Influence',
    cat: 'Master Studio · 2022',
    href: 'project-1.html',
    imgSrc: 'images/Spheres of Influence_00.jpg',
    overlaySrc: 'images/Spheres of Influenceoverlay.png',
    color: [89, 44, 56]
  },
  {
    num: '02',
    title: 'Learning from Lungomare G.M',
    cat: 'Master Thesis · 2022–2023',
    href: 'project-2.html',
    imgSrc: 'images/LLGM.jpeg',
    overlaySrc: 'images/LLGMoverlay.png',
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
    imgSrc: 'images/det.png',
    overlaySrc: 'images/detoverlay.png',
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
    overlaySrc: 'images/BToverlay.png',
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

initCanvas();
initMenu();

function initCanvas() {
  const field = document.getElementById('project-field');
  const canvas = document.getElementById('project-canvas');
  const curEl = document.getElementById('cur');
  const ring = document.getElementById('cur-ring');

  const isTouch = 'ontouchstart' in window;

  if (isTouch) {
    curEl.style.display = 'none';
    ring.style.display = 'none';
    field.style.cursor = 'default';
  }

  let W = window.innerWidth;
  let H = window.innerHeight;

  canvas.width = W;
  canvas.height = H;

  const ctx = canvas.getContext('2d');

  // ── Bottom project-number navigation ──────────────────────────────────────

  const navStrip = document.getElementById('nav-strip');

  navStrip.innerHTML = '';

  PROJECTS.forEach(project => {
    const link = document.createElement('a');

    link.className = 'nav-item';
    link.href = project.href;
    link.innerHTML = `<span class="nav-num">${project.num}</span>`;

    navStrip.appendChild(link);
  });

  let NAV_H = navStrip.offsetHeight || 44;

  // ── Elastic-string anchors ────────────────────────────────────────────────

  let stringAnchors = [];

  function updateStringAnchors() {
    const canvasRect = canvas.getBoundingClientRect();
    const navRect = navStrip.getBoundingClientRect();
    const numberElements = navStrip.querySelectorAll('.nav-num');

    NAV_H = navStrip.offsetHeight || 44;

    stringAnchors = Array.from(numberElements).map(numberElement => {
      const numberRect = numberElement.getBoundingClientRect();

      return {
        x:
          numberRect.left -
          canvasRect.left +
          numberRect.width / 2,

        y:
          navRect.top -
          canvasRect.top +
          1
      };
    });
  }

  requestAnimationFrame(updateStringAnchors);

  // ── Shared helpers ────────────────────────────────────────────────────────

  function pseudoRandom(seed) {
    const value = Math.sin(seed + 1) * 10000;
    return value - Math.floor(value);
  }

  function clamp(value, minimum, maximum) {
    return Math.max(minimum, Math.min(maximum, value));
  }

  // Card dimensions.
  const CW = Math.round(
    Math.min(
      Math.max(W * 0.2, 155),
      195
    )
  );

  const CH = Math.round(CW * 1.28);

  function buildWireframe(seed) {
    const lines = [];

    for (let i = 0; i < 160; i++) {
      const ax = pseudoRandom(seed + i) * CW;
      const ay = pseudoRandom(seed + i + 500) * CH;

      const bx =
        ax +
        (pseudoRandom(seed + i + 1000) - 0.5) * 58;

      const by =
        ay +
        (pseudoRandom(seed + i + 1500) - 0.5) * 58;

      const length = Math.sqrt(
        (bx - ax) ** 2 +
        (by - ay) ** 2
      );

      if (length > 3 && length < 50) {
        lines.push({
          ax,
          ay,
          bx,
          by
        });
      }
    }

    return lines;
  }

  // ── Load images ───────────────────────────────────────────────────────────

  const loadedImages = {};

  PROJECTS.forEach(project => {
    if (!project.imgSrc) return;

    const image = new Image();

    image.crossOrigin = 'anonymous';
    image.src = project.imgSrc;

    loadedImages[project.num] = image;
  });

  const loadedOverlays = {};

  PROJECTS.forEach(project => {
    if (!project.overlaySrc) return;

    const image = new Image();

    image.crossOrigin = 'anonymous';
    image.src = project.overlaySrc;

    loadedOverlays[project.num] = image;
  });

  // ── Resting project composition ───────────────────────────────────────────
  //
  // x and y are relative to the centre of the composition.
  // Smaller differences create more overlap.
  // r is the resting rotation in degrees.

  const CARD_LAYOUT = [
    { x: -1.45, y: -0.48, r: -7 },
    { x: -0.72, y: -0.82, r: 5 },
    { x: 0.02, y: -0.90, r: -2 },
    { x: 0.78, y: -0.78, r: 6 },
    { x: 1.43, y: -0.42, r: -6 },

    { x: -1.18, y: 0.16, r: 4 },
    { x: -0.43, y: 0.06, r: -5 },
    { x: 0.34, y: 0.00, r: 3 },
    { x: 1.08, y: 0.18, r: -4 },

    { x: -0.52, y: 0.72, r: 6 },
    { x: 0.58, y: 0.68, r: -3 }
  ];

  const cards = PROJECTS.map((project, index) => {
    const seed = index * 197;
    const layout = CARD_LAYOUT[index];

    return {
      p: project,
      wf: buildWireframe(seed),
      seed,

      x: 0,
      y: 0,

      anchorX: 0,
      anchorY: 0,

      vx: 0,
      vy: 0,

      baseRot: layout.r,
      rot: layout.r,

      revealAmt: 0,
      targetReveal: 0,

      hovered: false,
      selected: false
    };
  });

  function layoutCards(snap = false) {
    const safeTop = Math.max(118, H * 0.14);
    const safeBottom = Math.max(150, NAV_H + 102);

    const usableHeight = Math.max(
      CH + 20,
      H - safeTop - safeBottom
    );

    const horizontalExtent = 2.88 * CW * 0.7;
    const verticalExtent = 1.62 * CH * 0.42;

    const scaleX = Math.min(
      1,
      Math.max(
        0.48,
        (W - CW - 28) / horizontalExtent
      )
    );

    const scaleY = Math.min(
      1,
      Math.max(
        0.58,
        (usableHeight - CH) / verticalExtent
      )
    );

    const layoutScale = Math.min(scaleX, scaleY);

    const centreX = W * 0.5;
    const centreY = safeTop + usableHeight * 0.5;

    const minimumY = safeTop;

    const maximumY = Math.max(
      minimumY,
      H - safeBottom - CH
    );

    cards.forEach((card, index) => {
      const slot = CARD_LAYOUT[index];

      const previousAnchorX = card.anchorX;
      const previousAnchorY = card.anchorY;

      card.anchorX =
        centreX -
        CW / 2 +
        slot.x * CW * 0.7 * layoutScale;

      card.anchorY =
        centreY -
        CH / 2 +
        slot.y * CH * 0.42 * layoutScale;

      card.anchorX = clamp(
        card.anchorX,
        12,
        W - CW - 12
      );

      card.anchorY = clamp(
        card.anchorY,
        minimumY,
        maximumY
      );

      if (
        snap ||
        !Number.isFinite(card.x) ||
        !Number.isFinite(card.y)
      ) {
        card.x = card.anchorX;
        card.y = card.anchorY;
      } else {
        card.x += card.anchorX - previousAnchorX;
        card.y += card.anchorY - previousAnchorY;
      }
    });
  }

  layoutCards(true);

  // ── Card drawing ──────────────────────────────────────────────────────────

  function drawImageCover(
    drawContext,
    image,
    x,
    y,
    width,
    height
  ) {
    const imageWidth = image.naturalWidth;
    const imageHeight = image.naturalHeight;

    if (!imageWidth || !imageHeight) return;

    const scale = Math.max(
      width / imageWidth,
      height / imageHeight
    );

    const sourceWidth = width / scale;
    const sourceHeight = height / scale;

    const sourceX =
      (imageWidth - sourceWidth) / 2;

    const sourceY =
      (imageHeight - sourceHeight) / 2;

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
  }

  function drawCard(
    card,
    drawContext = ctx,
    overrideX,
    overrideY,
    scale = 1,
    forceReveal
  ) {
    const x =
      overrideX !== undefined
        ? overrideX
        : card.x;

    const y =
      overrideY !== undefined
        ? overrideY
        : card.y;

    const revealAmount =
      forceReveal !== undefined
        ? forceReveal
        : card.revealAmt;

    const {
      p,
      wf,
      seed,
      rot,
      hovered,
      selected
    } = card;

    const [r, g, b] = p.color;

    const renderedWidth = CW * scale;
    const renderedHeight = CH * scale;

    drawContext.save();

    drawContext.translate(
      x + renderedWidth / 2,
      y + renderedHeight / 2
    );

    if (
      forceReveal === undefined &&
      drawContext === ctx
    ) {
      drawContext.rotate(
        rot * Math.PI / 180
      );
    }

    drawContext.scale(scale, scale);

    drawContext.translate(
      -CW / 2,
      -CH / 2
    );

    // Clip project image and overlay to card.
    drawContext.save();

    drawContext.beginPath();
    drawContext.rect(0, 0, CW, CH);
    drawContext.clip();

    const projectImage = loadedImages[p.num];

    if (
      projectImage &&
      projectImage.complete &&
      projectImage.naturalWidth > 0
    ) {
      drawContext.globalAlpha =
        revealAmount * 0.9;

      drawImageCover(
        drawContext,
        projectImage,
        0,
        0,
        CW,
        CH
      );

      drawContext.globalAlpha = 1;

      const vignette =
        drawContext.createLinearGradient(
          0,
          CH * 0.55,
          0,
          CH
        );

      vignette.addColorStop(
        0,
        'rgba(10,6,8,0)'
      );

      vignette.addColorStop(
        1,
        `rgba(10,6,8,${0.55 + revealAmount * 0.2})`
      );

      drawContext.fillStyle = vignette;

      drawContext.fillRect(
        0,
        CH * 0.55,
        CW,
        CH * 0.45
      );
    } else {
      drawContext.fillStyle =
        `rgba(${r},${g},${b},${0.08 + revealAmount * 0.25})`;

      drawContext.fillRect(
        0,
        0,
        CW,
        CH
      );
    }

    const overlayImage =
      loadedOverlays[p.num];

    if (
      overlayImage &&
      overlayImage.complete &&
      overlayImage.naturalWidth > 0
    ) {
      drawContext.globalAlpha = Math.max(
        0.08,
        0.7 - revealAmount * 0.65
      );

      drawImageCover(
        drawContext,
        overlayImage,
        0,
        0,
        CW,
        CH
      );

      drawContext.globalAlpha = 1;
    }

    drawContext.restore();

    // Wireframe.
    const wireframeAlpha = Math.max(
      0,
      1 - revealAmount * 0.8
    );

    if (wireframeAlpha > 0.015) {
      drawContext.lineWidth = 0.5;

      wf.forEach(line => {
        drawContext.strokeStyle =
          `rgba(` +
          `${Math.min(255, r + 120) | 0},` +
          `${Math.min(255, g + 100) | 0},` +
          `${Math.min(255, b + 110) | 0},` +
          `${wireframeAlpha * 0.15})`;

        drawContext.beginPath();
        drawContext.moveTo(line.ax, line.ay);
        drawContext.lineTo(line.bx, line.by);
        drawContext.stroke();
      });

      for (let i = 0; i < 24; i++) {
        drawContext.beginPath();

        drawContext.arc(
          pseudoRandom(seed + i + 3000) * CW,
          pseudoRandom(seed + i + 4000) * CH,
          0.9,
          0,
          Math.PI * 2
        );

        drawContext.fillStyle =
          `rgba(220,140,150,${wireframeAlpha * 0.65})`;

        drawContext.fill();
      }
    }

    if (revealAmount > 0.35) {
      drawContext.lineWidth = 0.4;

      wf.slice(0, 50).forEach(line => {
        drawContext.strokeStyle =
          `rgba(255,225,235,${revealAmount * 0.1})`;

        drawContext.beginPath();
        drawContext.moveTo(line.ax, line.ay);
        drawContext.lineTo(line.bx, line.by);
        drawContext.stroke();
      });
    }

    // Hover border.
    if (hovered || selected) {
      drawContext.strokeStyle =
        `rgba(200,120,130,${0.2 + revealAmount * 0.5})`;

      drawContext.lineWidth = 0.5;

      drawContext.strokeRect(
        0.5,
        0.5,
        CW - 1,
        CH - 1
      );
    }

    // Card dot.
    drawContext.beginPath();

    drawContext.arc(
      7,
      7,
      hovered || selected ? 3.2 : 1.8,
      0,
      Math.PI * 2
    );

    drawContext.fillStyle =
      `rgba(200,120,130,${0.45 + revealAmount * 0.5})`;

    drawContext.fill();

    // Project number.
    drawContext.font = '8px monospace';

    drawContext.fillStyle =
      `rgba(220,140,150,${0.85 + revealAmount * 0.15})`;

    drawContext.fillText(
      p.num,
      7,
      CH - 28
    );

    // Project title.
    drawContext.font = '9px monospace';

    drawContext.fillStyle =
      `rgba(255,255,255,${0.75 + revealAmount * 0.25})`;

    const words = p.title.split(' ');
    const titleLines = [];

    let currentLine = '';

    words.forEach(word => {
      const testLine =
        currentLine
          ? `${currentLine} ${word}`
          : word;

      if (
        drawContext.measureText(testLine).width >
          CW - 14 &&
        currentLine
      ) {
        titleLines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    });

    if (currentLine) {
      titleLines.push(currentLine);
    }

    titleLines
      .slice(0, 2)
      .forEach((line, index) => {
        drawContext.fillText(
          line.toUpperCase(),
          7,
          CH - 16 + index * 11
        );
      });

    // Category.
    drawContext.font = '7px monospace';

    drawContext.fillStyle =
      `rgba(255,255,255,${0.45 + revealAmount * 0.25})`;

    drawContext.fillText(
      p.cat,
      7,
      CH - 4
    );

    drawContext.restore();
  }

  function hitTest(card, mouseX, mouseY) {
    const centreX = card.x + CW / 2;
    const centreY = card.y + CH / 2;

    const reverseRotation =
      -card.rot * Math.PI / 180;

    const dx = mouseX - centreX;
    const dy = mouseY - centreY;

    const localX =
      dx * Math.cos(reverseRotation) -
      dy * Math.sin(reverseRotation) +
      CW / 2;

    const localY =
      dx * Math.sin(reverseRotation) +
      dy * Math.cos(reverseRotation) +
      CH / 2;

    const padding = 10;

    return (
      localX >= -padding &&
      localX <= CW + padding &&
      localY >= -padding &&
      localY <= CH + padding
    );
  }

  // ── Elastic strings ───────────────────────────────────────────────────────

  function getCardStringPoint(card) {
    const centreX = card.x + CW / 2;
    const centreY = card.y + CH / 2;

    const angle =
      card.rot * Math.PI / 180;

    // Attach slightly inside the lower edge.
    const localDistance =
      CH * 0.43;

    return {
      x:
        centreX -
        Math.sin(angle) *
        localDistance,

      y:
        centreY +
        Math.cos(angle) *
        localDistance
    };
  }

  function drawElasticStrings() {
    cards.forEach((card, index) => {
      const start = stringAnchors[index];

      if (!start) return;

      const end =
        getCardStringPoint(card);

      const dx = end.x - start.x;
      const dy = end.y - start.y;

      const stringLength =
        Math.sqrt(
          dx * dx +
          dy * dy
        );

      if (stringLength < 1) return;

      const movementX =
        card.x - card.anchorX;

      const movementY =
        card.y - card.anchorY;

      const movementDistance =
        Math.sqrt(
          movementX * movementX +
          movementY * movementY
        );

      const tension = clamp(
        movementDistance /
          REPEL_DISTANCE,
        0,
        1
      );

      const directionX =
        dx / stringLength;

      const directionY =
        dy / stringLength;

      const perpendicularX =
        -directionY;

      const perpendicularY =
        directionX;

      const alternatingDirection =
        index % 2 === 0
          ? -1
          : 1;

      // Initial resting curvature.
      const restingBend =
        alternatingDirection *
        (10 + (index % 3) * 4);

      // Additional bend caused by movement.
      const movementBend =
        movementX * 0.14 +
        card.vx * 2.4;

      const bend =
        restingBend +
        movementBend;

      const control1X =
        start.x +
        dx * 0.28 +
        perpendicularX *
          bend *
          0.35;

      const control1Y =
        start.y +
        dy * 0.28 +
        perpendicularY *
          bend *
          0.35;

      const control2X =
        start.x +
        dx * 0.72 +
        perpendicularX *
          bend;

      const control2Y =
        start.y +
        dy * 0.72 +
        perpendicularY *
          bend;

      const active =
        card.hovered ||
        card.selected;

      const alpha =
        active
          ? 0.8
          : 0.2 + tension * 0.45;

      const lineWidth =
        active
          ? 1
          : 0.42 + tension * 0.65;

      ctx.save();

      // Faint outer glow.
      ctx.beginPath();

      ctx.moveTo(
        start.x,
        start.y
      );

      ctx.bezierCurveTo(
        control1X,
        control1Y,
        control2X,
        control2Y,
        end.x,
        end.y
      );

      ctx.strokeStyle =
        `rgba(200,120,130,${alpha * 0.12})`;

      ctx.lineWidth =
        lineWidth + 4;

      ctx.stroke();

      // Main string.
      ctx.beginPath();

      ctx.moveTo(
        start.x,
        start.y
      );

      ctx.bezierCurveTo(
        control1X,
        control1Y,
        control2X,
        control2Y,
        end.x,
        end.y
      );

      ctx.strokeStyle =
        `rgba(200,120,130,${alpha})`;

      ctx.lineWidth =
        lineWidth;

      ctx.stroke();

      // Attachment point above bottom number.
      ctx.beginPath();

      ctx.arc(
        start.x,
        start.y,
        active ? 2.4 : 1.4,
        0,
        Math.PI * 2
      );

      ctx.fillStyle =
        `rgba(200,120,130,${Math.min(0.95, alpha + 0.15)})`;

      ctx.fill();

      // Attachment point on project card.
      ctx.beginPath();

      ctx.arc(
        end.x,
        end.y,
        active ? 2.7 : 1.4,
        0,
        Math.PI * 2
      );

      ctx.fillStyle =
        `rgba(220,140,150,${Math.min(1, alpha + 0.18)})`;

      ctx.fill();

      ctx.restore();
    });
  }

  // ── Project overlay ───────────────────────────────────────────────────────

  const overlay =
    document.getElementById('card-overlay');

  const overlayCanvas =
    document.getElementById('overlay-canvas');

  const overlayNum =
    document.getElementById('overlay-num');

  const overlayTitle =
    document.getElementById('overlay-title');

  const overlayCat =
    document.getElementById('overlay-cat');

  const overlayLink =
    document.getElementById('overlay-link');

  const overlayClose =
    document.getElementById('overlay-close');

  let selectedCard = null;

  function showOverlay(card) {
    selectedCard = card;

    card.selected = true;
    card.targetReveal = 1;

    const scale = Math.min(
      2.2,
      (W * 0.35) / CW,
      (H * 0.6) / CH
    );

    const overlayWidth =
      Math.round(CW * scale);

    const overlayHeight =
      Math.round(CH * scale);

    overlayCanvas.width =
      overlayWidth;

    overlayCanvas.height =
      overlayHeight;

    overlayCanvas.style.width =
      `${overlayWidth}px`;

    overlayCanvas.style.height =
      `${overlayHeight}px`;

    const overlayContext =
      overlayCanvas.getContext('2d');

    overlayContext.clearRect(
      0,
      0,
      overlayWidth,
      overlayHeight
    );

    drawCard(
      {
        ...card,
        rot: 0,
        revealAmt: 1,
        hovered: false,
        selected: true
      },
      overlayContext,
      0,
      0,
      scale,
      1
    );

    overlayNum.textContent =
      card.p.num;

    overlayTitle.textContent =
      card.p.title;

    overlayCat.textContent =
      card.p.cat;

    overlayLink.href =
      card.p.href;

    overlay.classList.add('visible');
  }

  function hideOverlay() {
    overlay.classList.remove('visible');

    if (selectedCard) {
      selectedCard.selected = false;
      selectedCard.targetReveal = 0;
      selectedCard.vx = 0;
      selectedCard.vy = 0;
      selectedCard = null;
    }
  }

  overlayClose.addEventListener(
    'click',
    hideOverlay
  );

  overlay.addEventListener(
    'click',
    event => {
      if (event.target === overlay) {
        hideOverlay();
      }
    }
  );

  // ── Grid view ─────────────────────────────────────────────────────────────

  const gridView =
    document.getElementById('grid-view');

  const gridInner =
    document.getElementById('grid-view-inner');

  const showAllBtn =
    document.getElementById('show-all-btn');

  const gridCloseBtn =
    document.getElementById('grid-close-btn');

  let gridBuilt = false;

  function buildGridView() {
    if (gridBuilt) return;

    gridBuilt = true;

    PROJECTS.forEach(project => {
      const cell =
        document.createElement('div');

      cell.className = 'grid-cell';

      const image =
        document.createElement('div');

      image.className = 'grid-cell-img';

      if (project.imgSrc) {
        image.style.backgroundImage =
          `url('${project.imgSrc}')`;
      } else {
        image.style.background =
          `rgb(` +
          `${project.color[0] * 0.4 | 0},` +
          `${project.color[1] * 0.4 | 0},` +
          `${project.color[2] * 0.4 | 0})`;
      }

      const info =
        document.createElement('div');

      info.className =
        'grid-cell-info';

      info.innerHTML =
        `<span class="grid-cell-num">${project.num}</span>` +
        `<span class="grid-cell-title">${project.title}</span>` +
        `<span class="grid-cell-cat">${project.cat}</span>`;

      cell.appendChild(image);
      cell.appendChild(info);

      cell.addEventListener(
        'click',
        () => {
          window.location.href =
            project.href;
        }
      );

      let touchStartY = 0;

      cell.addEventListener(
        'touchstart',
        event => {
          touchStartY =
            event.touches[0].clientY;
        },
        {
          passive: true
        }
      );

      cell.addEventListener(
        'touchend',
        event => {
          const moved =
            Math.abs(
              event.changedTouches[0].clientY -
              touchStartY
            );

          if (moved > 8) return;

          event.preventDefault();

          window.location.href =
            project.href;
        },
        {
          passive: false
        }
      );

      gridInner.appendChild(cell);
    });
  }

  function showGridView() {
    buildGridView();

    gridView.classList.add('visible');
    showAllBtn.classList.add('active');

    showAllBtn.textContent =
      'HIDE GRID';
  }

  function hideGridView() {
    gridView.classList.remove('visible');
    showAllBtn.classList.remove('active');

    showAllBtn.textContent =
      'SHOW GRID';
  }

  showAllBtn.addEventListener(
    'click',
    () => {
      if (
        gridView.classList.contains('visible')
      ) {
        hideGridView();
      } else {
        showGridView();
      }
    }
  );

  gridCloseBtn.addEventListener(
    'click',
    hideGridView
  );

  gridView.addEventListener(
    'click',
    event => {
      if (event.target === gridView) {
        hideGridView();
      }
    }
  );

  // ── Mouse interaction ─────────────────────────────────────────────────────

  let mouseX = W / 2;
  let mouseY = H / 2;
  let mouseActive = false;

  let dragCard = null;
  let dragOffsetX = 0;
  let dragOffsetY = 0;
  let dragStartX = 0;
  let dragStartY = 0;

  canvas.addEventListener(
    'mousedown',
    event => {
      if (
        overlay.classList.contains('visible') ||
        gridView.classList.contains('visible')
      ) {
        return;
      }

      dragStartX = event.clientX;
      dragStartY = event.clientY;

      const existingHoveredCard =
        cards.find(card =>
          card.hovered &&
          hitTest(
            card,
            event.clientX,
            event.clientY
          )
        );

      const candidates =
        existingHoveredCard
          ? [existingHoveredCard]
          : [...cards].reverse();

      for (const card of candidates) {
        if (
          hitTest(
            card,
            event.clientX,
            event.clientY
          )
        ) {
          dragCard = card;

          dragOffsetX =
            event.clientX - card.x;

          dragOffsetY =
            event.clientY - card.y;

          card.hovered = true;
          card.targetReveal = 1;
          card.vx = 0;
          card.vy = 0;

          break;
        }
      }
    }
  );

  canvas.addEventListener(
    'mousemove',
    event => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      mouseActive = true;

      curEl.style.left =
        `${mouseX}px`;

      curEl.style.top =
        `${mouseY}px`;

      ring.style.left =
        `${mouseX}px`;

      ring.style.top =
        `${mouseY}px`;

      if (dragCard) {
        dragCard.x =
          event.clientX - dragOffsetX;

        dragCard.y =
          event.clientY - dragOffsetY;

        dragCard.vx = 0;
        dragCard.vy = 0;

        return;
      }

      let hoveredCard =
        cards.find(card =>
          card.hovered &&
          !card.selected &&
          hitTest(
            card,
            mouseX,
            mouseY
          )
        ) || null;

      if (!hoveredCard) {
        for (
          let index = cards.length - 1;
          index >= 0;
          index--
        ) {
          const card = cards[index];

          if (
            !card.selected &&
            hitTest(
              card,
              mouseX,
              mouseY
            )
          ) {
            hoveredCard = card;
            break;
          }
        }
      }

      cards.forEach(card => {
        if (card.selected) return;

        card.hovered =
          card === hoveredCard;

        card.targetReveal =
          card.hovered ? 1 : 0;
      });

      ring.classList.toggle(
        'hovered',
        Boolean(hoveredCard)
      );
    }
  );

  window.addEventListener(
    'mouseup',
    event => {
      if (!dragCard) return;

      const moved =
        Math.abs(
          event.clientX - dragStartX
        ) +
        Math.abs(
          event.clientY - dragStartY
        );

      if (
        moved < 6 &&
        !overlay.classList.contains('visible')
      ) {
        showOverlay(dragCard);
      } else {
        dragCard.vx = 0;
        dragCard.vy = 0;
        dragCard.hovered = false;
        dragCard.targetReveal = 0;
      }

      dragCard = null;
    }
  );

  canvas.addEventListener(
    'mouseleave',
    () => {
      mouseActive = false;

      if (dragCard) {
        dragCard.vx = 0;
        dragCard.vy = 0;
        dragCard.hovered = false;
        dragCard.targetReveal = 0;
        dragCard = null;
      }

      cards.forEach(card => {
        if (!card.selected) {
          card.hovered = false;
          card.targetReveal = 0;
        }
      });

      ring.classList.remove('hovered');
    }
  );

  // ── Touch interaction ─────────────────────────────────────────────────────

  let touchDragCard = null;
  let touchDragOffsetX = 0;
  let touchDragOffsetY = 0;

  let touchStartX = 0;
  let touchStartY = 0;
  let touchMoved = false;

  canvas.addEventListener(
    'touchstart',
    event => {
      event.preventDefault();

      if (
        overlay.classList.contains('visible') ||
        gridView.classList.contains('visible')
      ) {
        return;
      }

      const bounds =
        canvas.getBoundingClientRect();

      const touchX =
        event.touches[0].clientX -
        bounds.left;

      const touchY =
        event.touches[0].clientY -
        bounds.top;

      touchStartX = touchX;
      touchStartY = touchY;
      touchMoved = false;

      for (
        let index = cards.length - 1;
        index >= 0;
        index--
      ) {
        const card = cards[index];

        if (
          hitTest(
            card,
            touchX,
            touchY
          )
        ) {
          touchDragCard = card;

          touchDragOffsetX =
            touchX - card.x;

          touchDragOffsetY =
            touchY - card.y;

          card.hovered = true;
          card.targetReveal = 1;
          card.vx = 0;
          card.vy = 0;

          break;
        }
      }
    },
    {
      passive: false
    }
  );

  canvas.addEventListener(
    'touchmove',
    event => {
      event.preventDefault();

      if (!touchDragCard) return;

      const bounds =
        canvas.getBoundingClientRect();

      const touchX =
        event.touches[0].clientX -
        bounds.left;

      const touchY =
        event.touches[0].clientY -
        bounds.top;

      if (
        Math.abs(touchX - touchStartX) +
          Math.abs(touchY - touchStartY) >
        6
      ) {
        touchMoved = true;
      }

      touchDragCard.x =
        touchX - touchDragOffsetX;

      touchDragCard.y =
        touchY - touchDragOffsetY;

      touchDragCard.vx = 0;
      touchDragCard.vy = 0;
    },
    {
      passive: false
    }
  );

  canvas.addEventListener(
    'touchend',
    event => {
      event.preventDefault();

      if (!touchDragCard) return;

      if (!touchMoved) {
        showOverlay(touchDragCard);
      } else {
        touchDragCard.vx = 0;
        touchDragCard.vy = 0;
        touchDragCard.hovered = false;
        touchDragCard.targetReveal = 0;
      }

      touchDragCard = null;
    },
    {
      passive: false
    }
  );

  // ── Movement settings ─────────────────────────────────────────────────────

  // How far from the cursor the cards begin moving.
  const REPEL_RADIUS = Math.max(
    210,
    CW * 1.45
  );

  // Maximum distance cards move away from the cursor.
  const REPEL_DISTANCE = Math.min(
    150,
    CW * 0.82
  );

  // Strength of the spring toward the target.
  const SPRING = 0.075;

  // Lower values stop faster; higher values feel more elastic.
  const DAMPING = 0.76;

  function getProximityTarget(card, index) {
    let targetX = card.anchorX;
    let targetY = card.anchorY;
    let targetRotation = card.baseRot;

    const interfaceBlocked =
      overlay.classList.contains('visible') ||
      gridView.classList.contains('visible');

    if (
      mouseActive &&
      !card.hovered &&
      !card.selected &&
      !interfaceBlocked
    ) {
      const cardCentreX =
        card.anchorX + CW / 2;

      const cardCentreY =
        card.anchorY + CH / 2;

      let dx =
        cardCentreX - mouseX;

      let dy =
        cardCentreY - mouseY;

      let distance =
        Math.sqrt(
          dx * dx +
          dy * dy
        );

      if (distance < REPEL_RADIUS) {
        if (distance < 0.001) {
          const angle =
            index /
            cards.length *
            Math.PI *
            2;

          dx = Math.cos(angle);
          dy = Math.sin(angle);
          distance = 1;
        }

        const normalized =
          1 -
          distance /
          REPEL_RADIUS;

        // Smoothstep curve.
        const influence =
          normalized *
          normalized *
          (3 - 2 * normalized);

        const directionX =
          dx / distance;

        const directionY =
          dy / distance;

        targetX +=
          directionX *
          REPEL_DISTANCE *
          influence;

        targetY +=
          directionY *
          REPEL_DISTANCE *
          influence;

        targetRotation +=
          directionX *
          3.2 *
          influence +
          (index % 2 ? 1 : -1) *
          influence;
      }
    }

    // The project directly under the cursor straightens.
    if (card.hovered) {
      targetRotation = 0;
    }

    const edgeAllowance =
      CW * 0.12;

    const lowerReserve =
      Math.max(
        138,
        NAV_H + 94
      );

    targetX = clamp(
      targetX,
      -edgeAllowance,
      W - CW + edgeAllowance
    );

    targetY = clamp(
      targetY,
      104,
      Math.max(
        104,
        H - lowerReserve - CH
      )
    );

    return {
      x: targetX,
      y: targetY,
      rot: targetRotation
    };
  }

  // ── Animation loop ────────────────────────────────────────────────────────

  function animationLoop() {
    requestAnimationFrame(animationLoop);

    ctx.clearRect(
      0,
      0,
      W,
      H
    );

    cards.forEach((card, index) => {
      card.revealAmt +=
        (
          card.targetReveal -
          card.revealAmt
        ) *
        0.07;

      if (
        card === dragCard ||
        card === touchDragCard
      ) {
        return;
      }

      const target =
        getProximityTarget(
          card,
          index
        );

      card.vx +=
        (
          target.x -
          card.x
        ) *
        SPRING;

      card.vy +=
        (
          target.y -
          card.y
        ) *
        SPRING;

      card.vx *= DAMPING;
      card.vy *= DAMPING;

      card.x += card.vx;
      card.y += card.vy;

      card.rot +=
        (
          target.rot -
          card.rot
        ) *
        0.1;
    });

    // Strings appear beneath the project cards.
    drawElasticStrings();

    const activeCard =
      dragCard ||
      touchDragCard ||
      cards.find(card => card.hovered) ||
      selectedCard;

    cards.forEach(card => {
      if (card !== activeCard) {
        drawCard(card);
      }
    });

    if (activeCard) {
      drawCard(activeCard);
    }
  }

  animationLoop();

  // ── Resize ────────────────────────────────────────────────────────────────

  window.addEventListener(
    'resize',
    () => {
      W = window.innerWidth;
      H = window.innerHeight;

      canvas.width = W;
      canvas.height = H;

      layoutCards(false);

      requestAnimationFrame(
        updateStringAnchors
      );
    }
  );
}

function initMenu() {
  const menuDropdown =
    document.getElementById(
      'menu-dropdown'
    );

  const mobileMenuDropdown =
    document.getElementById(
      'menu-dropdown-mobile'
    );

  const menuButton =
    document.getElementById(
      'btn-menu'
    );

  const mobileMenuButton =
    document.getElementById(
      'btn-menu-mobile'
    );

  function closeMenus() {
    menuDropdown.classList.remove(
      'open'
    );

    menuButton.classList.remove(
      'active'
    );

    mobileMenuDropdown.classList.remove(
      'open'
    );

    if (mobileMenuButton) {
      mobileMenuButton.classList.remove(
        'active'
      );
    }
  }

  menuButton.addEventListener(
    'click',
    event => {
      event.stopPropagation();

      const isOpen =
        menuDropdown.classList.toggle(
          'open'
        );

      menuButton.classList.toggle(
        'active',
        isOpen
      );
    }
  );

  if (mobileMenuButton) {
    mobileMenuButton.addEventListener(
      'click',
      event => {
        event.stopPropagation();

        const isOpen =
          mobileMenuDropdown.classList.toggle(
            'open'
          );

        mobileMenuButton.classList.toggle(
          'active',
          isOpen
        );
      }
    );
  }

  document.addEventListener(
    'click',
    event => {
      const clickedDesktopMenu =
        event.target.closest(
          '#menu-wrapper'
        );

      const clickedMobileButton =
        event.target.closest(
          '#btn-menu-mobile'
        );

      const clickedMobileDropdown =
        event.target.closest(
          '#menu-dropdown-mobile'
        );

      if (
        !clickedDesktopMenu &&
        !clickedMobileButton &&
        !clickedMobileDropdown
      ) {
        closeMenus();
      }
    }
  );
}