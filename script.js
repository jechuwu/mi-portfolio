// Typewriter Animation logic
const typewriterEffect = (element, newText, isHTML = false, duration = 800) => {
    if (!element) return;
    
    const targetText = isHTML ? newText : newText.replace(/<[^>]*>/g, '');
    const startTime = performance.now();
    const originalHTML = element.innerHTML;
    
    // Create a cursor element
    const cursor = document.createElement('span');
    cursor.className = 'inline-block w-[2px] h-[1.1em] bg-[#FF4F00] ml-1 align-middle animate-pulse';
    cursor.id = 'typewriter-cursor';

    element.innerHTML = '';
    element.appendChild(cursor);

    const update = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const charCount = Math.floor(progress * targetText.length);
        const currentText = targetText.slice(0, charCount);
        
        if (isHTML) {
            element.innerHTML = newText.slice(0, Math.floor(progress * newText.length));
        } else {
            element.innerText = currentText;
        }
        
        element.appendChild(cursor);

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            if (isHTML) {
                element.innerHTML = newText;
            } else {
                element.innerText = targetText;
            }
            cursor.remove();
        }
    };
    requestAnimationFrame(update);
};

const translations = {
    es: {
        projects: 'Proyectos',
        services: 'Capacidades',
        about: 'Sobre mi',
        contact: 'Contacto',
        heroDesc: 'Explora una visión donde la precisión técnica se encuentra con la estética emocional. Diseño industrial de alto impacto.',
        scroll: 'Desliza',
        enfoque: 'Enfoque',
        di_title: 'Diseño Industrial',
        experiencia: 'Experiencia',
        reconocimiento: 'Reconocimiento',
        base: 'Base',
        location: 'Berlín, Alemania',
        portfolioTitle: 'Portfolio',
        selectedWorks: 'Trabajos Seleccionados',
        archive: 'Archivo / 2024',
        capacidades: 'Capacidades',
        especialidad: 'Especialidad',
        ctaTitle: 'Construyamos <br/> el <span class="text-[#FF4F00] italic">futuro</span>.',
        startProject: 'Iniciar Proyecto',
        di_conceptual: 'DI Conceptual',
        di_desc: 'Visualizando la próxima generación de productos físicos con modelado de alta fidelidad.',
        cmf_title: 'CMF y Producción',
        cmf_desc: 'Definiendo materiales y acabados que elevan la identidad y el valor de marca.',
        digital_title: 'Integración Digital',
        digital_desc: 'Diseñando interfaces que viven dentro de objetos físicos para experiencias fluidas.',
        footer_copy: '© 2024 Jesus Elisaleco Portfolio.',
        ind_cat1: 'Ingeniería Óptica & CMF',
        ind_cat2: 'Relojería Contemporánea',
        ind_cat3: 'Ergonomía Acústica',
        ind_cat4: 'Sistemas de Iluminación',
        ind_cat5: 'Mobiliario de Autor',
        ind_cat6: 'Diseño Minimalista',
        list1: ['Desarrollo de Forma', 'Lenguajes de Diseño', 'Ergonomía'],
        list2: ['Innovación en Materiales', 'Enlace de Producción', 'Prototipado'],
        list3: ['IU Embebida', 'Retroalimentación Háptica', 'Ecosistemas']
    },
    en: {
        projects: 'Projects',
        services: 'Capabilities',
        about: 'About',
        contact: 'Contact',
        heroDesc: 'Explore a vision where technical precision meets emotional aesthetics. High-impact industrial design.',
        scroll: 'Scroll',
        enfoque: 'Focus',
        di_title: 'Industrial Design',
        experiencia: 'Experience',
        reconocimiento: 'Recognition',
        base: 'Base',
        location: 'Berlin, Germany',
        portfolioTitle: 'Works',
        selectedWorks: 'Selected Works',
        archive: 'Archive / 2024',
        capacidades: 'Capabilities',
        especialidad: 'Specialty',
        ctaTitle: 'Let\'s build <br/> the <span class="text-[#FF4F00] italic">future</span>.',
        startProject: 'Start Project',
        di_conceptual: 'Conceptual ID',
        di_desc: 'Visualizing the next generation of physical products with high-fidelity modeling.',
        cmf_title: 'CMF & Production',
        cmf_desc: 'Defining materials and finishes that elevate brand identity and value.',
        digital_title: 'Digital Integration',
        digital_desc: 'Designing interfaces that live within physical objects for seamless experiences.',
        footer_copy: '© 2024 Jesus Elisaleco Portfolio.',
        ind_cat1: 'Optical Engineering & CMF',
        ind_cat2: 'Contemporary Horology',
        ind_cat3: 'Acoustic Ergonomics',
        ind_cat4: 'Lighting Systems',
        ind_cat5: 'Signature Furniture',
        ind_cat6: 'Minimalist Design',
        list1: ['Form Development', 'Design Languages', 'Ergonomics'],
        list2: ['Material Innovation', 'Production Liaison', 'Prototyping'],
        list3: ['Embedded UI', 'Haptic Feedback', 'Ecosystems']
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const langBtn = document.getElementById('language-toggle');
    let currentLang = 'es';

    langBtn.addEventListener('click', () => {
        currentLang = currentLang === 'es' ? 'en' : 'es';
        const t = translations[currentLang];
        
        document.querySelectorAll('.nav-link').forEach(link => {
            const key = link.getAttribute('data-key');
            if (t[key]) typewriterEffect(link, t[key]);
        });

        document.querySelectorAll('[data-key]').forEach(el => {
            const key = el.getAttribute('data-key');
            if (t[key] && !el.classList.contains('nav-link') && !el.classList.contains('list-item')) {
                const isHTML = key === 'ctaTitle';
                typewriterEffect(el, t[key], isHTML);
            }
        });

        document.querySelectorAll('.list-item').forEach(li => {
            const group = li.getAttribute('data-group');
            const index = parseInt(li.getAttribute('data-index'));
            if (t[group] && t[group][index]) {
                typewriterEffect(li, t[group][index]);
            }
        });
    });

    const themeBtn = document.getElementById('dark-mode-toggle');
    const themePath = document.getElementById('theme-path');
    const themeSvg = document.getElementById('theme-svg');
    const html = document.documentElement;

    themeBtn.addEventListener('click', () => {
        const isDark = html.classList.toggle('dark');
        themeSvg.style.transform = 'rotate(180deg)';
        setTimeout(() => {
           themePath.setAttribute('d', isDark ? 'M12 3a9 9 0 100 18V3z' : 'M12 3a9 9 0 110 18V3z');
           themeSvg.style.transform = 'rotate(0deg)';
        }, 150);
    });

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-[#FF4F00]', 'opacity-100');
            link.classList.add('text-[#1b1c1b]', 'opacity-60');
            
            const href = link.getAttribute('href');
            if (href && href.split('#')[1] === current) {
                link.classList.add('text-[#FF4F00]', 'opacity-100');
                link.classList.remove('text-[#1b1c1b]', 'opacity-60');
            }
        });
    });

    const heroSection = document.getElementById('hero');
    const cursorGlow = document.getElementById('cursor-glow');
    if (heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            cursorGlow.style.left = `${x}px`;
            cursorGlow.style.top = `${y}px`;
        });
    }

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-10');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.project-card').forEach(card => {
        card.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-1000');
        revealObserver.observe(card);
    });
});
