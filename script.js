const loader = document.getElementById("loader");
const openBtn = document.getElementById("openBtn");
const loveBtn = document.getElementById("loveBtn");
const finalMessage = document.getElementById("finalMessage");
const hearts = document.getElementById("hearts");
const musicBtn = document.getElementById("musicBtn");

window.addEventListener("load", () => {
  setTimeout(() => loader.classList.add("hide"), 1000);
  startHearts();
  startParticles();
});

openBtn.addEventListener("click", () => {
  document.querySelector(".intro").scrollIntoView({ behavior: "smooth" });
  heartBurst(24);
});

loveBtn.addEventListener("click", () => {
  finalMessage.classList.add("show");
  heartBurst(55);
  startConfetti();
  loveBtn.textContent = "My heart is yours ❤️";
});

const revealItems = document.querySelectorAll(".reveal");
const photoCards = document.querySelectorAll(".photo-card");

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => revealObserver.observe(item));

const photoObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      photoObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

photoCards.forEach((card, index) => {
  card.style.transitionDelay = `${Math.min(index * 70, 500)}ms`;
  photoObserver.observe(card);
});

function startHearts() {
  setInterval(() => {
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = ["♥", "♡", "❤", "✦"][Math.floor(Math.random() * 4)];
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.color = Math.random() > .45 ? "#f07198" : "#f4d48a";
    heart.style.fontSize = `${12 + Math.random() * 18}px`;
    const duration = 6 + Math.random() * 6;
    heart.style.animationDuration = `${duration}s`;
    hearts.appendChild(heart);
    setTimeout(() => heart.remove(), duration * 1000);
  }, 850);
}

function heartBurst(count) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const heart = document.createElement("span");
      heart.className = "floating-heart";
      heart.textContent = ["♥", "♡", "❤", "✦"][Math.floor(Math.random() * 4)];
      heart.style.left = `${40 + (Math.random() * 20)}vw`;
      heart.style.bottom = `${25 + Math.random() * 25}vh`;
      heart.style.color = Math.random() > .5 ? "#f07198" : "#f4d48a";
      heart.style.fontSize = `${15 + Math.random() * 22}px`;
      const duration = 2 + Math.random() * 2;
      heart.style.animationDuration = `${duration}s`;
      hearts.appendChild(heart);
      setTimeout(() => heart.remove(), duration * 1000);
    }, i * 45);
  }
}

// Small ambient particle canvas
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth * devicePixelRatio;
  canvas.height = window.innerHeight * devicePixelRatio;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
}

function createParticles() {
  particles = Array.from({ length: Math.min(55, Math.floor(window.innerWidth / 20)) }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 1.7 + .3,
    speed: Math.random() * .35 + .08,
    alpha: Math.random() * .5 + .15
  }));
}

function startParticles() {
  resizeCanvas();
  createParticles();
  animateParticles();
}

function animateParticles() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  particles.forEach(p => {
    p.y -= p.speed;
    if (p.y < -5) {
      p.y = window.innerHeight + 5;
      p.x = Math.random() * window.innerWidth;
    }

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(244, 212, 138, ${p.alpha})`;
    ctx.fill();
  });

  requestAnimationFrame(animateParticles);
}

window.addEventListener("resize", () => {
  resizeCanvas();
  createParticles();
});

// Optional local music support.
// Put a file at music/birthday.mp3 if you want music.
// Browsers require a user gesture before audio can play.
const audio = new Audio("music/birthday.mp3");
audio.loop = true;
audio.volume = 0.45;
let musicOn = false;

musicBtn.addEventListener("click", async () => {
  try {
    if (!musicOn) {
      await audio.play();
      musicOn = true;
      musicBtn.textContent = "🔊";
    } else {
      audio.pause();
      musicOn = false;
      musicBtn.textContent = "♫";
    }
  } catch {
    alert("Add your birthday.mp3 inside the music folder, then tap this button again.");
  }
});

// Confetti using DOM particles, no library required.
function startConfetti() {
  const symbols = ["✦", "♥", "✧", "●", "❤"];

  for (let i = 0; i < 90; i++) {
    setTimeout(() => {
      const piece = document.createElement("span");
      piece.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      piece.style.position = "fixed";
      piece.style.left = `${Math.random() * 100}vw`;
      piece.style.top = "-20px";
      piece.style.zIndex = "20";
      piece.style.pointerEvents = "none";
      piece.style.color = Math.random() > .5 ? "#f4d48a" : "#f07198";
      piece.style.fontSize = `${10 + Math.random() * 18}px`;

      const duration = 2.2 + Math.random() * 2.4;
      piece.style.transition = `transform ${duration}s cubic-bezier(.2,.8,.2,1), opacity ${duration}s ease`;
      document.body.appendChild(piece);

      requestAnimationFrame(() => {
        piece.style.transform =
          `translate(${(Math.random() - .5) * 220}px, ${window.innerHeight + 80}px) rotate(${Math.random() * 720 - 360}deg)`;
        piece.style.opacity = "0";
      });

      setTimeout(() => piece.remove(), duration * 1000 + 100);
    }, i * 18);
  }
}
