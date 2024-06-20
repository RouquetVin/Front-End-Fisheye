export function photographerTemplate(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;
    console.log(picture);

    function getUserCardDOM() {
        // Creation of elements
        const article = document.createElement('article');
        const link = document.createElement('a');
        const divImg = document.createElement('div');
        const img = document.createElement('img');
        const h2 = document.createElement('h2');
        const cityCountry = document.createElement('p');
        const tag = document.createElement('p');
        const pr = document.createElement('p');

        // Adding classes and attributes
        link.classList.add('link');
        link.setAttribute('href', `photographer.html?id=${id}`);
        link.setAttribute('target', '_self');
        divImg.classList.add('profile');
        img.setAttribute('src', picture);
        img.classList.add('img_profile');
        img.classList.add(`img_profile_${id}`);
        img.setAttribute('alt', `Photo de profil de ${name}`);
        h2.classList.add('name');
        h2.textContent = name;
        cityCountry.classList.add('location');
        cityCountry.textContent = `${city}, ${country}`;
        tag.classList.add('description');
        tag.textContent = tagline;
        pr.classList.add('price');
        pr.textContent = `${price}€/jour`;

        // Assembling the elements
        divImg.appendChild(img);
        link.appendChild(divImg);
        link.appendChild(h2);
        article.appendChild(link);
        article.appendChild(cityCountry);
        article.appendChild(tag);
        article.appendChild(pr);

        return article;
    }
    return { name, picture, getUserCardDOM }
}