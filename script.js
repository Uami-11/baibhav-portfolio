// ─────────────────────────────────────────────
// ✏️  EDIT YOUR ARTWORKS HERE
// Replace `src` with the path to each image file
// e.g.  src: "images/portrait-1.jpg"
// ─────────────────────────────────────────────
const artworks = [
  {
    src: "images/1.png", // e.g. "images/work1.jpg"
    placeholder: "p1",
    title: "Sora",
    meta: "2026",
    desc: "Lighting practice",
  },
  {
    src: "images/2.png",
    placeholder: "p2",
    title: "Rien",
    meta: "2025",
    desc: "First time trying cloth shading",
  },
  {
    src: "images/3.png",
    placeholder: "p3",
    title: "Gabriel",
    meta: "2026",
    desc: "Practice of pose",
  },
  {
    src: "images/4.png",
    placeholder: "p4",
    title: "Space Man",
    meta: "2024",
    desc: "Lighting practice from a source",
  },
  {
    src: "images/5.png",
    placeholder: "p5",
    title: "Robin",
    meta: "2026",
    desc: "Practicing new tools",
  },
];

// ── Build gallery grid ──
const grid = document.getElementById("galleryGrid");

artworks.forEach((art, i) => {
  const card = document.createElement("div");
  card.className = `art-card ${art.placeholder}`;
  card.dataset.index = i;

  if (art.src) {
    const img = document.createElement("img");
    img.src = art.src;
    img.alt = art.title;
    card.appendChild(img);
  }

  const overlay = document.createElement("div");
  overlay.className = "overlay";
  overlay.innerHTML = `<span class="overlay-title">${art.title}</span>`;
  card.appendChild(overlay);

  card.addEventListener("click", () => openModal(i));
  grid.appendChild(card);
});

// ── Modal logic ──
let currentIndex = 0;

const backdrop = document.getElementById("modalBackdrop");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalMeta = document.getElementById("modalMeta");
const modalDesc = document.getElementById("modalDesc");
const modalCounter = document.getElementById("modalCounter");

function openModal(i) {
  currentIndex = i;
  populateModal();
  backdrop.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  backdrop.classList.remove("open");
  document.body.style.overflow = "";
}

function populateModal() {
  const art = artworks[currentIndex];

  modalImg.src = art.src || "";
  modalImg.alt = art.title;
  modalImg.style.display = art.src ? "block" : "none";
  modalImg.parentElement.className = `modal-image-wrap ${art.placeholder}`;

  modalTitle.textContent = art.title;
  modalMeta.textContent = art.meta;
  modalDesc.textContent = art.desc;
  modalCounter.textContent = `${String(currentIndex + 1).padStart(2, "0")} / ${String(artworks.length).padStart(2, "0")}`;
}

document.getElementById("modalClose").addEventListener("click", closeModal);

backdrop.addEventListener("click", (e) => {
  if (e.target === backdrop) closeModal();
});

document.getElementById("modalPrev").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + artworks.length) % artworks.length;
  populateModal();
});

document.getElementById("modalNext").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % artworks.length;
  populateModal();
});

document.addEventListener("keydown", (e) => {
  if (!backdrop.classList.contains("open")) return;
  if (e.key === "Escape") closeModal();
  if (e.key === "ArrowLeft") {
    currentIndex = (currentIndex - 1 + artworks.length) % artworks.length;
    populateModal();
  }
  if (e.key === "ArrowRight") {
    currentIndex = (currentIndex + 1) % artworks.length;
    populateModal();
  }
});
