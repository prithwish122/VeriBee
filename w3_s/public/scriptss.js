document.addEventListener('DOMContentLoaded', function () {
    const foodItems = document.querySelectorAll('.food-item');

    foodItems.forEach(item => {
        const text = item.getAttribute('data-text');
        const description = item.getAttribute('data-description');
        const link = item.getAttribute('data-link');

        const foodInfo = document.createElement('div');
        foodInfo.classList.add('food-info');
        
        foodInfo.innerHTML = `
            <a href="${link}" class="food-link">
                <h3>${text}</h3>
                <p>${description}</p>
            </a>
        `;

        item.appendChild(foodInfo);
    });
});
