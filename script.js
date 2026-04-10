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


fetch('shop.json')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById("shopContainer");

        data.forEach(shop => {
            const card = document.createElement('article');
            card.classList.add('shop-item');

            card.innerHTML = `
                <img src="${shop.image}" alt="" class="photo">
                <span class="name">${shop.name}</span>
                <span class="price">${shop.price} бел.руб</span>
            `;

            container.appendChild(card);
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

