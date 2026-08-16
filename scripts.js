const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const items = document.querySelectorAll('.item');
const dots = document.querySelectorAll('.dot');
const numberIndicator = document.querySelector('.numbers');

let active = 0;
let timer;

function showSlide(index) {
    active = (index + items.length) % items.length;

    items.forEach((item, i) => {
        item.classList.toggle('active', i === active);
    });

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === active);
    });

    if (numberIndicator) {
        numberIndicator.textContent = String(active + 1).padStart(2, '0');
    }

    clearInterval(timer);
    timer = setInterval(() => {
        showSlide(active + 1);
    }, 5000);
}

prevButton?.addEventListener('click', () => {
    showSlide(active - 1);
});

nextButton?.addEventListener('click', () => {
    showSlide(active + 1);
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

showSlide(0);