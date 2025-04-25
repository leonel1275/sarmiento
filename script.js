document.addEventListener('DOMContentLoaded', function() {
    // Menú móvil mejorado
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');

    menuToggle.addEventListener('click', function() {
        navList.classList.toggle('active');
        this.classList.toggle('active');
    });

    // Cerrar menú al hacer click fuera
    document.addEventListener('click', function(e) {
        if (!menuToggle.contains(e.target) && !navList.contains(e.target)) {
            navList.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });

    // Animaciones al scroll optimizadas
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Dejar de observar después de la animación
            }
        });
    }, observerOptions);

    // Observar elementos para animaciones
    document.querySelectorAll('.section').forEach(el => {
        observer.observe(el);
    });

    // Formulario mejorado
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitButton = this.querySelector('.btn-submit');
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;

            // Simular envío
            setTimeout(() => {
                alert('Mensaje enviado correctamente');
                form.reset();
                submitButton.textContent = 'Enviar';
                submitButton.disabled = false;
            }, 1000);
        });
    }

    // Botón volver arriba suave
    const scrollButton = document.getElementById('scrollToTop'); // Asegúrate de que el ID sea correcto

    window.addEventListener('scroll', () => {
        scrollButton.classList.toggle('visible', window.pageYOffset > 300); // Corrige la visibilidad del botón
    });

    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Expandir tarjetas de subsecciones al hacer clic
    document.querySelectorAll('.subsection-card').forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('expanded');
        });
    });

    // Redirigir a un HTML individual al hacer clic en cada tarjeta
    document.querySelectorAll('.subsection-card').forEach(card => {
        card.addEventListener('click', () => {
            const sectionName = card.querySelector('h3').textContent.trim().toLowerCase().replace(/\s+/g, '-');
            window.location.href = `${sectionName}.html`;
        });
    });

    // Cargar dinámicamente las noticias desde otro archivo
    fetch('./noticias.json')
        .then(response => response.json())
        .then(data => {
            const newsContent = document.getElementById('news-content');
            data.noticias.forEach(noticia => {
                const noticiaElement = document.createElement('div');
                noticiaElement.classList.add('noticia');
                noticiaElement.innerHTML = `
                    <h3>${noticia.titulo}</h3>
                    <p>${noticia.descripcion}</p>
                `;
                newsContent.appendChild(noticiaElement);
            });
        })
        .catch(error => console.error('Error al cargar las noticias:', error));
});
