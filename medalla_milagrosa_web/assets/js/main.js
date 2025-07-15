/*
===============================================
COOPERATIVA MEDALLA MILAGROSA - MAIN JAVASCRIPT
Sistema avanzado y modular para una experiencia excepcional
===============================================
*/

// ===== CONFIGURACIÓN GLOBAL =====
const CONFIG = {
    animationDuration: 1000,
    scrollOffset: 80,
    particlesEnabled: true,
    preloaderDuration: 3000,
    chatbotEnabled: true,
    whatsappNumber: '+595991234567'
};

// ===== INICIALIZACIÓN DEL SISTEMA =====
class MedallaMilagrosa {
    constructor() {
        this.init();
    }

    init() {
        this.initPreloader();
        this.initNavigation();
        this.initAnimations();
        this.initParticles();
        this.initScrollEffects();
        this.initContactForm();
        this.initWhatsApp();
        this.initChatbot();
        this.initCounters();
        this.initLazyLoading();
    }

    // ===== PRELOADER ESPECTACULAR =====
    initPreloader() {
        const preloader = document.getElementById('preloader');
        const progressBar = document.querySelector('.progress-bar');
        
        if (!preloader) return;

        // Animación de la barra de progreso
        progressBar.style.width = '0%';
        
        setTimeout(() => {
            progressBar.style.width = '100%';
        }, 500);

        // Ocultar preloader después de la animación
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.style.overflow = 'auto';
            
            // Remover el preloader del DOM después de la transición
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, CONFIG.preloaderDuration);
    }

    // ===== NAVEGACIÓN INTELIGENTE =====
    initNavigation() {
        const nav = document.querySelector('.navigation');
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-menu a');

        if (!nav) return;

        // Efecto de scroll en la navegación
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });

        // Navegación smooth scroll
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - CONFIG.scrollOffset;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Menú móvil
        if (navToggle) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });
        }
    }

    // ===== ANIMACIONES AVANZADAS =====
    initAnimations() {
        // Inicializar AOS
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: CONFIG.animationDuration,
                once: true,
                offset: 100,
                easing: 'ease-out-cubic'
            });
        }

        // Inicializar GSAP
        if (typeof gsap !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
            
            // Animación del hero
            gsap.timeline()
                .from('.hero-content', {
                    y: 100,
                    opacity: 0,
                    duration: 1,
                    ease: 'power3.out'
                })
                .from('.hero-visual', {
                    x: 100,
                    opacity: 0,
                    duration: 1,
                    ease: 'power3.out'
                }, '-=0.5');

            // Animación de las tarjetas de servicios
            gsap.from('.service-card', {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: '.services-grid',
                    start: 'top 80%'
                }
            });
        }
    }

    // ===== PARTÍCULAS INTERACTIVAS =====
    initParticles() {
        if (!CONFIG.particlesEnabled || typeof particlesJS === 'undefined') return;

        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: { enable: true, value_area: 800 }
                },
                color: { value: '#4CAF50' },
                shape: {
                    type: 'circle',
                    stroke: { width: 0, color: '#000000' }
                },
                opacity: {
                    value: 0.3,
                    random: false,
                    anim: { enable: false }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: { enable: false }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#4CAF50',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'grab' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                },
                modes: {
                    grab: { distance: 140, line_linked: { opacity: 1 } },
                    push: { particles_nb: 4 }
                }
            },
            retina_detect: true
        });
    }

    // ===== EFECTOS DE SCROLL =====
    initScrollEffects() {
        // Parallax suave
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax');
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });

        // Revelar elementos al hacer scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }

    // ===== FORMULARIO DE CONTACTO =====
    initContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            // Estado de carga
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;
            
            try {
                // Simular envío (aquí iría la lógica real)
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Mensaje de éxito
                this.showNotification('¡Mensaje enviado exitosamente!', 'success');
                contactForm.reset();
                
            } catch (error) {
                console.error('Error al enviar el formulario:', error);
                this.showNotification('Error al enviar el mensaje. Intenta nuevamente.', 'error');
            } finally {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }
        });
    }

    // ===== WHATSAPP MEJORADO =====
    initWhatsApp() {
        const whatsappBtn = document.getElementById('whatsapp-btn');
        if (!whatsappBtn) return;

        whatsappBtn.addEventListener('click', () => {
            const message = encodeURIComponent('¡Hola! Me gustaría obtener más información sobre los servicios de la Cooperativa Medalla Milagrosa.');
            window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${message}`, '_blank');
        });

        // Animación de entrada
        setTimeout(() => {
            whatsappBtn.classList.add('animate-bounce');
        }, 3000);
    }

    // ===== CHATBOT INTEGRADO =====
    initChatbot() {
        if (!CONFIG.chatbotEnabled) return;
        
        // El chatbot se inicializa en su propio archivo
        if (typeof MedBotAI !== 'undefined') {
            new MedBotAI();
        }
    }

    // ===== CONTADORES ANIMADOS =====
    initCounters() {
        const counters = document.querySelectorAll('.counter');
        
        const animateCounter = (counter) => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                counter.textContent = Math.floor(current);
                
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                }
            }, 16);
        };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        });

        counters.forEach(counter => counterObserver.observe(counter));
    }

    // ===== LAZY LOADING =====
    initLazyLoading() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // ===== SISTEMA DE NOTIFICACIONES =====
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">&times;</button>
        `;
        
        document.body.appendChild(notification);
        
        // Mostrar notificación
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Auto-cerrar después de 5 segundos
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
        
        // Cerrar manualmente
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        });
    }
}

// ===== UTILIDADES =====
const Utils = {
    // Formatear números
    formatNumber: (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    },
    
    // Detectar dispositivo móvil
    isMobile: () => {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },
    
    // Throttle para optimizar eventos
    throttle: (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Debounce para optimizar eventos
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    new MedallaMilagrosa();
});

// ===== MANEJO DE ERRORES =====
window.addEventListener('error', (e) => {
    console.error('Error capturado:', e.error);
});

// ===== OPTIMIZACIÓN DE RENDIMIENTO =====
// Optimizar scroll
window.addEventListener('scroll', Utils.throttle(() => {
    // Lógica de scroll optimizada
}, 16));

// Optimizar resize
window.addEventListener('resize', Utils.debounce(() => {
    // Lógica de redimensionamiento
}, 250));

// ===== EXPORTAR PARA USO GLOBAL =====
window.MedallaMilagrosa = MedallaMilagrosa;
window.Utils = Utils;
