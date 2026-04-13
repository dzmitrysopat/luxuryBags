let sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", navHighlighter);

function navHighlighter() {
  let scrollY = window.scrollY;

  sections.forEach(current => {
    let sectionHeight = current.offsetHeight;
    let sectionTop = current.offsetTop - 200;
    let sectionId = current.getAttribute("id");

    let navLink = document.querySelector(
      `header nav a[href*="${sectionId}"]`
    );

    if (!navLink) return; // предотвращает ошибку

    if (
      scrollY > sectionTop &&
      scrollY <= sectionTop + sectionHeight
    ) {
      navLink.classList.add("active-link");
    } else {
      navLink.classList.remove("active-link");
    }
  });
}


fetch('./shop.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`Ошибка загрузки JSON: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        const container = document.getElementById("shopContainer");
        container.innerHTML = "";

        data.forEach((product, index) => {
            const card = document.createElement('article');
            card.classList.add('shop-item');

            // Собираем изображения из JSON
            const images = [
                product.image,
                product.image2,
                product.image3
            ].filter(Boolean); // удаляет отсутствующие значения

            // Генерация слайдов
            let slidesHTML = images.map(img => `
                <div class="swiper-slide">
                    <img src="${img}" alt="${product.name}" class="photo">
                </div>
            `).join('');

            // Уникальные классы для каждого свайпера
            const swiperClass = `swiper-${index}`;
            const paginationClass = `swiper-pagination-${index}`;

            card.innerHTML = `
                <div class="swiper ${swiperClass}">
                    <div class="swiper-wrapper">
                        ${slidesHTML}
                    </div>
                    ${images.length > 1 ? `<div class="swiper-pagination ${paginationClass}"></div>` : ""}
                </div>
                <span class="name">${product.name}</span>
                <span class="price">${product.price} бел.руб</span>
            `;

            container.appendChild(card);

            // Инициализация Swiper только после добавления в DOM
            new Swiper(`.${swiperClass}`, {
    loop: images.length > 1,
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
        el: `.${paginationClass}`,
        clickable: true,
        dynamicBullets: true
    },
    autoplay: images.length > 1 ? {
        delay: 3000,
        disableOnInteraction: false
    } : false,
    grabCursor: true
});
        });
    })
    .catch(error => console.error('Ошибка:', error));


function updateDateTime() {
    const date = new Date();
    const yearOption = { year: 'numeric' };        
    const currentYear = date.toLocaleString('ru-RU', yearOption);                

// document.getElementById('year').textContent = currentYear;
document.querySelector('.year').textContent = currentYear;
}

setInterval(updateDateTime, 1000);

document.querySelectorAll('.no-redirect').forEach(link => {
  link.addEventListener('click', function (event) {
    event.preventDefault();
  });
});

document.addEventListener("DOMContentLoaded", () => {
    const burger = document.getElementById("burger");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-header a");

    burger.addEventListener("click", () => {
        burger.classList.toggle("active");
        navMenu.classList.toggle("active");
        document.body.classList.toggle("no-scroll");
    });

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            burger.classList.remove("active");
            navMenu.classList.remove("active");
            document.body.classList.remove("no-scroll");
        });
    });
});