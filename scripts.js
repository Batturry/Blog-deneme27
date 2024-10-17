const bloglar = JSON.parse(localStorage.getItem('bloglar')) || [];
let duzenlenecekIndex = null;

function bloglariGoster() {
    const blogListesi = document.getElementById('blogList');
    blogListesi.innerHTML = '';

    for (let i = bloglar.length - 1; i >= 0; i--) {
        const li = document.createElement('li');
        const blogContent = document.createElement('span');
        blogContent.classList.add('blog-content');
        blogContent.textContent = bloglar[i];

        const menu = document.createElement('div');
        menu.classList.add('menu');

        const menuButton = document.createElement('button');
        menuButton.textContent = '⋮';
        menuButton.classList.add('menu-button');

        const menuOptions = document.createElement('div');
        menuOptions.classList.add('menu-options');

        const duzenleBtn = document.createElement('button');
        duzenleBtn.textContent = 'Düzenle';
        duzenleBtn.onclick = function () {
            blogDuzenle(i);
        };

        const silBtn = document.createElement('button');
        silBtn.textContent = 'Sil';
        silBtn.onclick = function () {
            blogSil(i);
        };

        menuOptions.appendChild(duzenleBtn);
        menuOptions.appendChild(silBtn);
        menu.appendChild(menuButton);
        menu.appendChild(menuOptions);
        li.appendChild(blogContent);
        li.appendChild(menu);
        blogListesi.appendChild(li);
    }
}

function ekle() {
    const yeniBlog = document.getElementById('blogInput').value;
    if (duzenlenecekIndex !== null) {
        bloglar[duzenlenecekIndex] = yeniBlog;
        duzenlenecekIndex = null;
        document.getElementById('blogInput').value = '';
    } else if (yeniBlog.trim() !== '') {
        bloglar.push(yeniBlog);
        document.getElementById('blogInput').value = '';
    } else {
        alert('Lütfen bir blog yazısı girin.');
    }

    localStorage.setItem('bloglar', JSON.stringify(bloglar));
    bloglariGoster();
}

function blogDuzenle(index) {
    document.getElementById('blogInput').value = bloglar[index];
    duzenlenecekIndex = index;
}

function blogSil(index) {
    bloglar.splice(index, 1);
    localStorage.setItem('bloglar', JSON.stringify(bloglar));
    bloglariGoster();
}

document.addEventListener('DOMContentLoaded', bloglariGoster);
