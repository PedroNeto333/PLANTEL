document.addEventListener('DOMContentLoaded', function() {
    // 1. Smooth Scroll (Rolagem Suave)
    document.querySelectorAll('.menu a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('href');
            const section = document.querySelector(sectionId);
            if (section) {
                window.scrollTo({
                    top: section.offsetTop - 80, // Compensa a altura do header fixo
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. Animação de Entrada ao Rolar (Intersection Observer)
    const observerOptions = { threshold: 0.15 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.secao').forEach(secao => {
        observer.observe(secao);
    });
});

// 3. Botão Voltar ao Topo
const backToTopButton = document.querySelector("#backToTop");

window.addEventListener("scroll", function() {
    // Mostra o botão quando rolar mais de 400px para baixo
    if (window.pageYOffset > 400) {
        backToTopButton.classList.add("show");
    } else {
        backToTopButton.classList.remove("show");
    }
});

backToTopButton.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// 4. Lógica do Dark Mode
const darkModeToggle = document.querySelector('#dark-mode-toggle');
const body = document.body;

// Verifica se o usuário já tinha uma preferência salva
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-theme');
    darkModeToggle.querySelector('.icon').textContent = '☀️';
}

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    
    // Salva a preferência e troca o ícone
    if (body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
        darkModeToggle.querySelector('.icon').textContent = '☀️';
    } else {
        localStorage.setItem('theme', 'light');
        darkModeToggle.querySelector('.icon').textContent = '🌙';
    }
});