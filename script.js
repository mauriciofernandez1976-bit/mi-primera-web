document.addEventListener('DOMContentLoaded', () => {
    
    /* 1. MODO OSCURO */
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark' && darkModeToggle) {
            darkModeToggle.querySelector('i').className = 'fas fa-sun';
        }
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme');
            const icon = darkModeToggle.querySelector('i');
            
            if (theme === 'dark') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                icon.className = 'fas fa-moon';
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                icon.className = 'fas fa-sun';
            }
        });
    }

    /* 2. MENU HAMBURGUESA (3 RAYITAS) */
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            const icon = hamburger.querySelector('i');
            if (navMenu.classList.contains('open')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                hamburger.querySelector('i').className = 'fas fa-bars';
            });
        });
    }

    /* 3. LÓGICA DE INTRO Y LECTURA OCULTA DEL BLOG ("LEER MÁS") */
    const readMoreButtons = document.querySelectorAll('.btn-read-more');
    const closeMoreButtons = document.querySelectorAll('.btn-close-more');

    readMoreButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const extendedContent = document.getElementById(targetId);
            if (extendedContent) {
                extendedContent.style.display = 'block';
                button.parentElement.style.display = 'none'; // Oculta la intro corta temporalmente
            }
        });
    });

    closeMoreButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const extendedContent = document.getElementById(targetId);
            if (extendedContent) {
                extendedContent.style.display = 'none';
                // Volvemos a mostrar el botón de intro correspondiente
                const postBody = extendedContent.parentElement;
                const introDiv = postBody.querySelector('.post-intro');
                if (introDiv) {
                    introDiv.style.display = 'block';
                }
            }
        });
    });

    /* Interceptamos clics al enlace de menú "#blog" o links externos para desplegarlos automáticamente */
    document.querySelectorAll('a[href="#blog"]').forEach(link => {
        link.addEventListener('click', () => {
            // Cuando hacen clic en "Blog" desde el menú, forzamos que se muestren las intros principales por orden
            readMoreButtons.forEach(btn => {
                const targetId = btn.getAttribute('data-target');
                const extendedContent = document.getElementById(targetId);
                if (extendedContent) {
                    extendedContent.style.display = 'none';
                }
                btn.parentElement.style.display = 'block';
            });
        });
    });

    /* 4. CARRUSEL DE TESTIMONIOS */
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('prev-test');
    const nextBtn = document.getElementById('next-test');
    let currentSlide = 0;

    if (slides.length > 0) {
        function showSlide(index) {
            slides[currentSlide].classList.remove('active');
            currentSlide = (index + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
        }

        if (nextBtn) nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
        if (prevBtn) prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));

        setInterval(() => {
            showSlide(currentSlide + 1);
        }, 8000);
    }

    /* 5. ACORDEÓN PREGUNTAS FRECUENTES (FAQ) */
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isOpen = item.classList.contains('open');

            document.querySelectorAll('.accordion-item').forEach(i => {
                i.classList.remove('open');
                const icon = i.querySelector('.accordion-header i');
                if (icon) icon.className = 'fas fa-plus';
            });

            if (!isOpen) {
                item.classList.add('open');
                header.querySelector('i').className = 'fas fa-minus';
            }
        });
    });

    /* 6. BOTÓN FLOTANTE VOLVER ARRIBA */
    const scrollTopBtn = document.getElementById('btn-scroll-top');

    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.style.display = 'flex';
            } else {
                scrollTopBtn.style.display = 'none';
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
