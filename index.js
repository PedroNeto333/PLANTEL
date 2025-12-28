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

    // Mobile menu: abrir / fechar com animação
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    const openMobile = () => {
        if (!mobileMenu) return;
        mobileMenu.classList.add('open');
        hamburger && hamburger.classList.add('open');
        mobileMenu.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        document.body.classList.add('menu-open');
    };

    const closeMobile = () => {
        if (!mobileMenu) return;
        mobileMenu.classList.remove('open');
        hamburger && hamburger.classList.remove('open');
        mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        document.body.classList.remove('menu-open');
    };

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            if (mobileMenu && mobileMenu.classList.contains('open')) closeMobile();
            else openMobile();
        });
    }

    // Não há botão separado de fechar: o próprio hambúrguer atua como 'voltar'/'fechar'.

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Fecha o menu ao navegar
            closeMobile();
        });
    });

    // Fechar ao clicar fora do conteúdo (overlay)
    if (mobileMenu) {
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) closeMobile();
        });
    }

    // ESC para fechar
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMobile();
    });

    // Social FAB: abrir/fechar ações (Instagram/Discord/YouTube)
    const socialFab = document.querySelector('.social-fab');
    const socialToggle = document.getElementById('social-toggle');
    const socialActions = document.getElementById('social-actions');

    if (socialToggle && socialFab) {
        socialToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const opened = socialFab.classList.toggle('open');
            if (opened) {
                socialActions.setAttribute('aria-hidden', 'false');
            } else {
                socialActions.setAttribute('aria-hidden', 'true');
            }
        });

        // Fecha se clicar fora
        document.addEventListener('click', (e) => {
            if (!socialFab.contains(e.target)) {
                socialFab.classList.remove('open');
                socialActions.setAttribute('aria-hidden', 'true');
            }
        });

        // ESC fecha
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                socialFab.classList.remove('open');
                socialActions.setAttribute('aria-hidden', 'true');
            }
        });
    }
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

const startCounting = () => {
    const counters = document.querySelectorAll('.count-up');
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const updateCount = () => {
            const count = +counter.innerText;
            const increment = target / 100; // Ajusta a velocidade da contagem

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 20); // Velocidade da transição
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
};

// Isso faz a animação começar só quando você rolar a página até os números
const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        startCounting();
        observer.disconnect(); // Roda a animação apenas uma vez
    }
}, { threshold: 0.5 });

const targetSection = document.querySelector('.container-numbers');
if (targetSection) {
    observer.observe(targetSection);
}