var IMGS = [
  { s: 'imgs/0c860b17-b11d-4cae-a277-164726f07abe.jpg', a: 'Selfie en el auditorio' },
  { s: 'imgs/0d311efd-66dc-4dc2-8652-d2b413cd5edf.jpg', a: 'Ponente en el escenario' },
  { s: 'imgs/02cd0b62-67d7-4868-b476-335823997465.jpg', a: 'Presentacion con banderas' },
  { s: 'imgs/6aca6aae-49c4-4ef3-ae0e-d60aa57ab982.jpg', a: 'Grupo de amigos' },
  { s: 'imgs/65f6a414-4181-4d92-ad58-0a836e07afb8.jpg', a: 'Auditorio lleno' },
  { s: 'imgs/201ec875-fa28-46cb-961f-a0a38639fb23.jpg', a: 'Selfie con gorra' },
  { s: 'imgs/722d590b-98c3-409b-b017-f69e9f62f519.jpg', a: 'Exhibicion de pinturas' },
  { s: 'imgs/14136b54-4f30-4126-95e6-9eafc86335b2.jpg', a: 'Panoramica auditorio' },
  { s: 'imgs/a6fdc6db-5f09-492f-8422-61c66ad58a68.jpg', a: 'Actuacion central' },
  { s: 'imgs/b553cb06-0674-4e16-9056-a634f86a0bd1.jpg', a: 'Presentadores en escenario' },
  { s: 'imgs/c5669960-cef6-4354-a123-a137f9e925aa.jpg', a: 'Actuacion de baile' },
  { s: 'imgs/db45ea2d-7936-4159-b98a-8d396b035c69.jpg', a: 'Breakdance' },
  { s: 'imgs/ec700153-a168-40ca-a601-2fc9320489aa.jpg', a: 'Actuacion final' }
];

var cur = 0;

function openLb(i) {
  cur = i;
  document.getElementById('lbImg').src = IMGS[i].s;
  document.getElementById('lbImg').alt = IMGS[i].a;
  document.getElementById('lbCount').textContent = (i + 1) + ' / ' + IMGS.length;
  document.getElementById('lb').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLb() {
  document.getElementById('lb').classList.remove('open');
  document.body.style.overflow = '';
}

function bgClose(e) {
  if (e.target === document.getElementById('lb')) closeLb();
}

function lbNav(dir, e) {
  e.stopPropagation();
  cur = (cur + dir + IMGS.length) % IMGS.length;
  var img = document.getElementById('lbImg');
  img.style.opacity = '0';
  setTimeout(function () {
    img.src = IMGS[cur].s;
    img.alt = IMGS[cur].a;
    document.getElementById('lbCount').textContent = (cur + 1) + ' / ' + IMGS.length;
    img.style.opacity = '1';
  }, 150);
}

document.addEventListener('keydown', function (e) {
  var lb = document.getElementById('lb');
  if (!lb.classList.contains('open')) return;
  if (e.key === 'Escape') closeLb();
  if (e.key === 'ArrowRight') {
    cur = (cur + 1) % IMGS.length;
    document.getElementById('lbImg').src = IMGS[cur].s;
    document.getElementById('lbCount').textContent = (cur + 1) + ' / ' + IMGS.length;
  }
  if (e.key === 'ArrowLeft') {
    cur = (cur - 1 + IMGS.length) % IMGS.length;
    document.getElementById('lbImg').src = IMGS[cur].s;
    document.getElementById('lbCount').textContent = (cur + 1) + ' / ' + IMGS.length;
  }
});

var observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal-block').forEach(function (b) {
  observer.observe(b);
});
