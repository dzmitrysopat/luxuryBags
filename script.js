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

// card.innerHTML = `
//             <article class="card">
//                 <img src="" alt="">
//                 <span class="name"></span>
//                 <span class="price"></span>
//             </article>
//    


