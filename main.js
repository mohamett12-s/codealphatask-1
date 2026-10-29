const cards = [...document.querySelectorAll('.gallery-card')];
const filters = [...document.querySelectorAll('.filter')];
const count = document.querySelector('#photo-count');
const dialog = document.querySelector('#lightbox');
const modalImage = document.querySelector('#lightbox-image');
const modalTitle = document.querySelector('#lightbox-title');
const modalDescription = document.querySelector('#lightbox-description');
let visibleCards = cards;
let activeIndex = 0;

function showImage(index) {
  activeIndex = (index + visibleCards.length) % visibleCards.length;
  const card = visibleCards[activeIndex];
  const image = card.querySelector('img');
  modalImage.src = image.src;
  modalImage.alt = image.alt;
  modalTitle.textContent = card.dataset.title;
  modalDescription.textContent = card.dataset.description;
}

cards.forEach(card => card.addEventListener('click', () => {
  activeIndex = visibleCards.indexOf(card);
  showImage(activeIndex);
  dialog.showModal();
}));

filters.forEach(filter => filter.addEventListener('click', () => {
  const category = filter.dataset.filter;
  filters.forEach(item => item.classList.toggle('is-active', item === filter));
  cards.forEach(card => card.hidden = category !== 'all' && card.dataset.category !== category);
  visibleCards = cards.filter(card => !card.hidden);
  count.textContent = `${visibleCards.length} sawir`;
}));

document.querySelector('.close').addEventListener('click', () => dialog.close());
document.querySelector('.prev').addEventListener('click', () => showImage(activeIndex - 1));
document.querySelector('.next').addEventListener('click', () => showImage(activeIndex + 1));
dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});
document.addEventListener('keydown', event => {
  if (!dialog.open) return;
  if (event.key === 'ArrowLeft') showImage(activeIndex - 1);
  if (event.key === 'ArrowRight') showImage(activeIndex + 1);
});