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