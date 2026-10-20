const btn = document.querySelector('.menu-btn');
const links = document.querySelector('.nav-links');
btn.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
});
links.addEventListener('click', () => links.classList.remove('open'));