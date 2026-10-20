var root = document.documentElement, nav = document.getElementById('nav'), menu = document.getElementById('menu');
document.getElementById('year').textContent = new Date().getFullYear();
menu.addEventListener('click', function () {
    var open = nav.classList.toggle('open'); menu.setAttribute('aria-expanded', open); menu.textContent = open ? '✕' : '☰';
});
nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.textContent = '☰'; }
});
document.getElementById('theme').addEventListener('click', function () {
    var dark = getComputedStyle(root).colorScheme === 'dark';
    root.setAttribute('data-theme', dark ? 'light' : 'dark');
});
document.getElementById('form').addEventListener('submit', function (e) {
    e.preventDefault();
    var f = e.target, body = f.message.value + '\n\n– ' + f.name.value + ' (' + f.email.value + ')';
    location.href = 'mailto:shweta2@gmail.com?subject=' + encodeURIComponent('Portfolio message from ' + f.name.value) + '&body=' + encodeURIComponent(body);
});