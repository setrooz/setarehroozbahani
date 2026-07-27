const desktopMenuButton =
  document.getElementById('btn-menu');

const desktopMenu =
  document.getElementById('menu-dropdown');

const mobileMenuButton =
  document.getElementById('btn-menu-mobile');

const mobileMenu =
  document.getElementById('menu-dropdown-mobile');

const canvas =
  document.getElementById('ambient-canvas');

const context =
  canvas.getContext('2d');

const reducedMotion =
  window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

let width = window.innerWidth;
let height = window.innerHeight;
let pixelRatio = 1;
let animationFrame = null;

function pseudoRandom(seed) {
  const value =
    Math.sin(seed + 1) *
    10000;

  return value -
    Math.floor(value);
}

const particles = Array.from(
  { length: 34 },
  (_, index) => ({
    angle:
      (index / 34) *
      Math.PI *
      2,

    radius:
      0.16 +
      pseudoRandom(index * 17) *
      0.34,

    speed:
      0.000018 +
      pseudoRandom(index * 31) *
      0.000025,

    size:
      0.5 +
      pseudoRandom(index * 47) *
      1.3,

    depth:
      pseudoRandom(index * 73)
  })
);

function setMenuState(
  button,
  menu,
  isOpen
) {
  if (!button || !menu) return;

  button.classList.toggle(
    'active',
    isOpen
  );

  button.setAttribute(
    'aria-expanded',
    String(isOpen)
  );

  menu.classList.toggle(
    'open',
    isOpen
  );
}

function closeMenus() {
  setMenuState(
    desktopMenuButton,
    desktopMenu,
    false
  );

  setMenuState(
    mobileMenuButton,
    mobileMenu,
    false
  );
}

desktopMenuButton.addEventListener(
  'click',
  event => {
    event.stopPropagation();

    const isOpen =
      !desktopMenu.classList.contains(
        'open'
      );

    setMenuState(
      desktopMenuButton,
      desktopMenu,
      isOpen
    );

    setMenuState(
      mobileMenuButton,
      mobileMenu,
      false
    );
  }
);

mobileMenuButton.addEventListener(
  'click',
  event => {
    event.stopPropagation();

    const isOpen =
      !mobileMenu.classList.contains(
        'open'
      );

    setMenuState(
      mobileMenuButton,
      mobileMenu,
      isOpen
    );

    setMenuState(
      desktopMenuButton,
      desktopMenu,
      false
    );
  }
);

document.addEventListener(
  'click',
  event => {
    if (
      !event.target.closest(
        '#menu-wrapper'
      ) &&
      !event.target.closest(
        '#btn-menu-mobile'
      ) &&
      !event.target.closest(
        '#menu-dropdown-mobile'
      )
    ) {
      closeMenus();
    }
  }
);

window.addEventListener(
  'keydown',
  event => {
    if (event.key === 'Escape') {
      closeMenus();
    }
  }
);

function resizeCanvas() {
  width =
    window.innerWidth;

  height =
    window.innerHeight;

  pixelRatio =
    Math.min(
      window.devicePixelRatio || 1,
      2
    );

  canvas.width =
    Math.round(
      width *
      pixelRatio
    );

  canvas.height =
    Math.round(
      height *
      pixelRatio
    );

  canvas.style.width =
    `${width}px`;

  canvas.style.height =
    `${height}px`;

  context.setTransform(
    pixelRatio,
    0,
    0,
    pixelRatio,
    0,
    0
  );
}

function drawAmbientScene(time) {
  context.clearRect(
    0,
    0,
    width,
    height
  );

  const centerX =
    width * 0.5;

  const centerY =
    height * 0.49;

  const baseRadius =
    Math.min(
      width,
      height
    );

  const orbitSettings = [
    {
      width: 0.28,
      height: 0.09,
      rotation: -0.22,
      alpha: 0.12
    },
    {
      width: 0.34,
      height: 0.13,
      rotation: 0.38,
      alpha: 0.08
    },
    {
      width: 0.22,
      height: 0.18,
      rotation: 1.04,
      alpha: 0.07
    }
  ];

  orbitSettings.forEach(
    (orbit, index) => {
      context.save();

      context.translate(
        centerX,
        centerY
      );

      context.rotate(
        orbit.rotation +
        Math.sin(
          time * 0.00008 +
          index
        ) *
        0.018
      );

      context.setLineDash(
        index === 1
          ? [2, 9]
          : []
      );

      context.lineDashOffset =
        time *
        (
          index % 2
            ? 0.0015
            : -0.001
        );

      context.strokeStyle =
        `rgba(200,120,130,${orbit.alpha})`;

      context.lineWidth =
        0.55;

      context.beginPath();

      context.ellipse(
        0,
        0,
        baseRadius * orbit.width,
        baseRadius * orbit.height,
        0,
        0,
        Math.PI * 2
      );

      context.stroke();
      context.restore();
    }
  );

  context.setLineDash([]);

  particles.forEach(
    (particle, index) => {
      const movingAngle =
        particle.angle +
        time *
        particle.speed;

      const radiusX =
        baseRadius *
        particle.radius;

      const radiusY =
        radiusX *
        (
          0.34 +
          particle.depth *
          0.32
        );

      const x =
        centerX +
        Math.cos(movingAngle) *
        radiusX;

      const y =
        centerY +
        Math.sin(movingAngle) *
        radiusY;

      const pulse =
        0.55 +
        Math.sin(
          time * 0.001 +
          index
        ) *
        0.22;

      context.beginPath();

      context.arc(
        x,
        y,
        particle.size,
        0,
        Math.PI * 2
      );

      context.fillStyle =
        `rgba(220,140,150,${
          0.08 +
          particle.depth *
          0.18 *
          pulse
        })`;

      context.fill();
    }
  );
}

function animate(time) {
  drawAmbientScene(time);

  animationFrame =
    window.requestAnimationFrame(
      animate
    );
}

function startAnimation() {
  if (reducedMotion) {
    drawAmbientScene(0);
    return;
  }

  animationFrame =
    window.requestAnimationFrame(
      animate
    );
}

window.addEventListener(
  'resize',
  () => {
    resizeCanvas();

    if (reducedMotion) {
      drawAmbientScene(0);
    }
  }
);

document.addEventListener(
  'visibilitychange',
  () => {
    if (reducedMotion) return;

    if (document.hidden) {
      if (animationFrame) {
        window.cancelAnimationFrame(
          animationFrame
        );
      }

      animationFrame = null;
    } else if (!animationFrame) {
      animationFrame =
        window.requestAnimationFrame(
          animate
        );
    }
  }
);

resizeCanvas();
startAnimation();
