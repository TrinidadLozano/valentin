// ===== FLOATING HEARTS BACKGROUND =====
const heartsBg = document.getElementById("hearts-bg");
const heartSymbols = ["\u2665", "\u2661"];

function createFloatingHeart() {
  const heart = document.createElement("span");
  heart.classList.add("floating-heart");
  heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = Math.random() * 18 + 12 + "px";
  heart.style.animationDuration = Math.random() * 6 + 6 + "s";
  heart.style.animationDelay = Math.random() * 2 + "s";
  heart.style.color = `hsl(${340 + Math.random() * 30}, ${70 + Math.random() * 30}%, ${60 + Math.random() * 25}%)`;
  heartsBg.appendChild(heart);

  setTimeout(() => heart.remove(), 14000);
}

// Start hearts immediately
setInterval(createFloatingHeart, 400);
for (let i = 0; i < 15; i++) {
  setTimeout(createFloatingHeart, i * 200);
}

// ===== BACKGROUND MUSIC =====
const backgroundMusic = document.getElementById("background-music");
let musicStarted = false;

if (backgroundMusic) {
  backgroundMusic.volume = 0.4; // Volumen al 40%
  
  // Intentar reproducir automáticamente (puede fallar por políticas del navegador)
  backgroundMusic.play().catch(() => {
    // Si falla, se reproducirá cuando el usuario interactúe
  });
  
  // Iniciar música en el primer clic del usuario en cualquier parte
  const startMusicOnInteraction = () => {
    if (!musicStarted && backgroundMusic.paused) {
      backgroundMusic.play().catch(() => {});
      musicStarted = true;
    }
  };
  
  document.addEventListener("click", startMusicOnInteraction, { once: true });
  document.addEventListener("touchstart", startMusicOnInteraction, { once: true });
}

// ===== ENVELOPE LOGIC =====
const envelope = document.getElementById("envelope-container");
const presentation = document.getElementById("presentation");

envelope.addEventListener("click", () => {
  // Iniciar música cuando el usuario interactúe
  if (backgroundMusic) {
    backgroundMusic.play().catch(() => {
      // Si falla, no hacer nada
    });
  }
  
  envelope.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  envelope.style.opacity = "0";
  envelope.style.transform = "scale(0.8)";

  setTimeout(() => {
    envelope.style.display = "none";
    presentation.style.display = "block";
    showSlide(1);
  }, 600);
});

// ===== SLIDE NAVIGATION =====
let currentSlide = 0;

function showSlide(num) {
  const prevSlide = document.querySelector(".slide.active");

  if (prevSlide) {
    prevSlide.classList.remove("active");
    prevSlide.classList.add("exit");
    setTimeout(() => {
      prevSlide.classList.remove("exit");
      prevSlide.style.display = "none";
    }, 500);
  }

  setTimeout(() => {
    const nextSlide = document.getElementById("slide-" + num);
    if (nextSlide) {
      nextSlide.style.display = "flex";
      // Force reflow
      nextSlide.offsetHeight;
      nextSlide.classList.add("active");
      currentSlide = num;
    }
  }, prevSlide ? 400 : 0);
}

// Next buttons
document.querySelectorAll(".next-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const nextNum = parseInt(btn.getAttribute("data-next"));
    showSlide(nextNum);
  });
});

// ===== NO BUTTON DODGES =====
const noBtn = document.querySelector(".no-btn");

noBtn.addEventListener("mouseover", dodgeNo);
noBtn.addEventListener("touchstart", dodgeNo);

function dodgeNo() {
  const distance = 200;
  const angle = Math.random() * Math.PI * 2;
  const moveX = Math.cos(angle) * distance;
  const moveY = Math.sin(angle) * distance;

  noBtn.style.transition = "transform 0.3s ease";
  noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
}

// ===== YES BUTTON =====
const yesBtn = document.querySelector(".yes-btn");
const letterButtons = document.getElementById("letter-buttons");
const celebration = document.getElementById("celebration");

yesBtn.addEventListener("click", () => {
  // Hide question elements
  const finalSlide = document.getElementById("slide-7");
  const question = finalSlide.querySelector(".final-question");
  const catFinal = finalSlide.querySelector(".cat-final");
  const finalMessage = finalSlide.querySelector(".final-message");
  const finalTitle = finalSlide.querySelector(".final-title");

  question.style.display = "none";
  letterButtons.style.display = "none";
  catFinal.style.display = "none";
  finalMessage.style.display = "none";
  finalTitle.textContent = "\u2665";

  // Show celebration
  celebration.style.display = "block";

  // Launch confetti
  launchConfetti();

  // Extra hearts burst
  for (let i = 0; i < 30; i++) {
    setTimeout(createFloatingHeart, i * 80);
  }
});

// ===== CONFETTI =====
function launchConfetti() {
  const confettiChars = ["\u2665", "\u2661", "\u2605", "\u2726", "\u2727", "\u273B", "\u2736", "\u2734"];

  for (let i = 0; i < 60; i++) {
    setTimeout(() => {
      const confetti = document.createElement("span");
      confetti.classList.add("confetti");
      confetti.textContent = confettiChars[Math.floor(Math.random() * confettiChars.length)];
      confetti.style.left = Math.random() * 100 + "vw";
      confetti.style.fontSize = Math.random() * 16 + 14 + "px";
      confetti.style.animationDuration = Math.random() * 2 + 2 + "s";
      confetti.style.color = `hsl(${340 + Math.random() * 40}, ${70 + Math.random() * 30}%, ${60 + Math.random() * 30}%)`;
      document.body.appendChild(confetti);

      setTimeout(() => confetti.remove(), 5000);
    }, i * 60);
  }
}

// ===== KEYBOARD NAVIGATION =====
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight" || e.key === " ") {
    if (currentSlide > 0 && currentSlide < 7) {
      showSlide(currentSlide + 1);
    }
  }
});
