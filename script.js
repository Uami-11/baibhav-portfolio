// ─────────────────────────────────────────────
// ✏️  EDIT YOUR ARTWORKS HERE
// Replace `src` with the path to each image file
// e.g.  src: "images/portrait-1.jpg"
// ─────────────────────────────────────────────
const artworks = [
  {
    src: "",           // e.g. "images/work1.jpg"
    placeholder: "p1",
    title: "Portrait I",
    meta: "Acrylic on canvas · 2024",
    desc: "A study in bold complementary colour. The sitter's gaze holds steady against a field of deep vermilion."
  },
  {
    src: "",
    placeholder: "p2",
    title: "Golden Hour",
    meta: "Coloured pencil · 2024",
    desc: "Warm amber light pressing against the cool blues of the figure — a moment suspended in pigment."
  },
  {
    src: "",
    placeholder: "p3",
    title: "Still Blue",
    meta: "Oil pastel · 2023",
    desc: "Profile against a clear sky. Stillness and restraint rendered in layered blues."
  },
  {
    src: "",
    placeholder: "p4",
    title: "Green Study",
    meta: "Gouache · 2023",
    desc: "An experimental piece exploring how saturated grounds shift the perceived tone of skin."
  },
  {
    src: "",
    placeholder: "p5",
    title: "Violet Dusk",
    meta: "Acrylic on board · 2024",
    desc: "The figure emerges from dusk, edges softened, presence certain."
  },
  {
    src: "",
    placeholder: "p6",
    title: "Amber",
    meta: "Coloured pencil · 2025",
    desc: "A close study of texture and light — each mark deliberate, each layer transparent."
  },
  {
    src: "",
    placeholder: "p7",
    title: "Nocturne",
    meta: "Oil on canvas · 2025",
    desc: "Dark backgrounds ask more of the eye. This one asks it to slow down."
  },
];

// ── Build gallery grid ──
const grid = document.getElementById('galleryGrid');

artworks.forEach((art, i) => {
  const card = document.createElement('div');
  card.className = `art-card ${art.placeholder}`;
  card.dataset.index = i;

  if (art.src) {
    const img = document.createElement('img');
    img.src = art.src;
    img.alt = art.title;
    card.appendChild(img);
  }

  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  overlay.innerHTML = `<span class="overlay-title">${art.title}</span>`;
  card.appendChild(overlay);

  card.addEventListener('click', () => openModal(i));
  grid.appendChild(card);
});

// ── Modal logic ──
let currentIndex = 0;

const backdrop = document.getElementById('modalBackdrop');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalMeta = document.getElementById('modalMeta');
const modalDesc = document.getElementById('modalDesc');
const modalCounter = document.getElementById('modalCounter');

function openModal(i) {
  currentIndex = i;
  populateModal();
  backdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  backdrop.classList.remove('open');
  document.body.style.overflow = '';
}

function populateModal() {
  const art = artworks[currentIndex];

  modalImg.src = art.src || '';
  modalImg.alt = art.title;
  modalImg.style.display = art.src ? 'block' : 'none';
  modalImg.parentElement.className = `modal-image-wrap ${art.placeholder}`;

  modalTitle.textContent = art.title;
  modalMeta.textContent = art.meta;
  modalDesc.textContent = art.desc;
  modalCounter.textContent = `${String(currentIndex + 1).padStart(2, '0')} / ${String(artworks.length).padStart(2, '0')}`;
}

document.getElementById('modalClose').addEventListener('click', closeModal);

backdrop.addEventListener('click', e => {
  if (e.target === backdrop) closeModal();
});

document.getElementById('modalPrev').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + artworks.length) % artworks.length;
  populateModal();
});

document.getElementById('modalNext').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % artworks.length;
  populateModal();
});

document.addEventListener('keydown', e => {
  if (!backdrop.classList.contains('open')) return;
  if (e.key === 'Escape') closeModal();
  if (e.key === 'ArrowLeft') {
    currentIndex = (currentIndex - 1 + artworks.length) % artworks.length;
    populateModal();
  }
  if (e.key === 'ArrowRight') {
    currentIndex = (currentIndex + 1) % artworks.length;
    populateModal();
  }
});
