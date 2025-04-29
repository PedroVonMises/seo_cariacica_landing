// Esperar que o DOM seja completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    // Menu Mobile Toggle
    const menuMobile = document.querySelector('.menu-mobile');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuMobile && mainNav) {
        menuMobile.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            const icon = menuMobile.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
    }

    // Animação de contagem para estatísticas
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000; // 2 segundos
            const step = target / (duration / 16); // 16ms é aproximadamente 60fps
            let current = 0;
            
            const updateCount = () => {
                if (current < target) {
                    current += step;
                    if (current > target) current = target;
                    stat.textContent = Math.floor(current) + '%';
                    requestAnimationFrame(updateCount);
                } else {
                    stat.textContent = target + '%';
                }
            };
            
            updateCount();
        });
    }

    // Verificar se o elemento está visível na viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Iniciar animação quando o elemento estiver visível
    function checkVisibility() {
        if (statNumbers.length > 0 && isElementInViewport(statNumbers[0])) {
            animateStats();
            window.removeEventListener('scroll', checkVisibility);
        }
    }

    // Verificar visibilidade inicial e adicionar listener de scroll
    checkVisibility();
    window.addEventListener('scroll', checkVisibility);

    // FAQ Toggle
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                // Fechar todos os outros itens
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Alternar o estado do item atual
                item.classList.toggle('active');
            });
        }
    });

    // Slider de Depoimentos
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;

    if (testimonials.length > 0 && prevBtn && nextBtn) {
        // Esconder todos os depoimentos exceto o primeiro
        testimonials.forEach((testimonial, index) => {
            if (index !== 0) {
                testimonial.style.display = 'none';
            }
        });

        // Função para mostrar um depoimento específico
        function showTestimonial(index) {
            testimonials.forEach((testimonial, i) => {
                testimonial.style.display = i === index ? 'block' : 'none';
                
                // Adicionar animação de fade
                if (i === index) {
                    testimonial.style.opacity = '0';
                    testimonial.style.transition = 'opacity 0.5s ease';
                    
                    setTimeout(() => {
                        testimonial.style.opacity = '1';
                    }, 50);
                }
            });
        }

        // Event listeners para os botões
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            showTestimonial(currentIndex);
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        });

        // Rotação automática a cada 5 segundos
        setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        }, 5000);
    }

    // Animações de scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.service-card, .benefit-item, .step, .testimonial');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    };

    // Adicionar classes CSS para animação
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.5s ease, transform 0.5s ease ${index * 0.1}s`;
    });

    const benefitItems = document.querySelectorAll('.benefit-item');
    benefitItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = `opacity 0.5s ease, transform 0.5s ease ${index * 0.1}s`;
    });

    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateX(30px)';
        step.style.transition = `opacity 0.5s ease, transform 0.5s ease ${index * 0.1}s`;
    });

    // Adicionar classe 'animate' quando o elemento estiver visível
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);

    // Smooth scroll para links de âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Fechar menu mobile se estiver aberto
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    if (menuMobile.querySelector('i')) {
                        menuMobile.querySelector('i').classList.remove('fa-times');
                        menuMobile.querySelector('i').classList.add('fa-bars');
                    }
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Ajuste para o header fixo
                    behavior: 'smooth'
                });
            }
        });
    });

    // Adicionar efeito de parallax ao hero
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        });
    }

    // Adicionar efeito de hover nos cards de serviço
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.service-icon i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.service-icon i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // Formulário de contato - prevenção de envio e feedback
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulação de envio bem-sucedido
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.disabled = true;
            submitButton.textContent = 'Enviando...';
            
            setTimeout(() => {
                // Criar elemento de feedback
                const feedback = document.createElement('div');
                feedback.className = 'form-feedback success';
                feedback.innerHTML = '<i class="fas fa-check-circle"></i> Mensagem enviada com sucesso! Entraremos em contato em breve.';
                feedback.style.color = '#2ecc71';
                feedback.style.padding = '15px';
                feedback.style.marginTop = '20px';
                feedback.style.borderRadius = '5px';
                feedback.style.backgroundColor = '#e8f8f5';
                feedback.style.display = 'flex';
                feedback.style.alignItems = 'center';
                feedback.style.justifyContent = 'center';
                
                // Adicionar feedback após o formulário
                contactForm.appendChild(feedback);
                
                // Resetar formulário
                contactForm.reset();
                
                // Restaurar botão
                submitButton.disabled = false;
                submitButton.textContent = originalText;
                
                // Remover feedback após 5 segundos
                setTimeout(() => {
                    feedback.style.opacity = '0';
                    feedback.style.transition = 'opacity 0.5s ease';
                    
                    setTimeout(() => {
                        contactForm.removeChild(feedback);
                    }, 500);
                }, 5000);
            }, 1500);
        });
    }

    // Formulário de newsletter - prevenção de envio e feedback
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.disabled = true;
            submitButton.textContent = 'Inscrevendo...';
            
            setTimeout(() => {
                // Criar elemento de feedback
                const feedback = document.createElement('div');
                feedback.className = 'form-feedback success';
                feedback.innerHTML = '<i class="fas fa-check-circle"></i> Inscrição realizada com sucesso!';
                feedback.style.color = '#2ecc71';
                feedback.style.padding = '10px';
                feedback.style.marginTop = '10px';
                feedback.style.fontSize = '0.9rem';
                
                // Adicionar feedback após o formulário
                newsletterForm.appendChild(feedback);
                
                // Resetar formulário
                newsletterForm.reset();
                
                // Restaurar botão
                submitButton.disabled = false;
                submitButton.textContent = originalText;
                
                // Remover feedback após 5 segundos
                setTimeout(() => {
                    feedback.style.opacity = '0';
                    feedback.style.transition = 'opacity 0.5s ease';
                    
                    setTimeout(() => {
                        newsletterForm.removeChild(feedback);
                    }, 500);
                }, 5000);
            }, 1000);
        });
    }

    // Adicionar efeito de destaque nos links de navegação ao scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.main-nav a');
    
    function highlightNavOnScroll() {
        const scrollPosition = window.scrollY + 100; // Ajuste para o header fixo
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavOnScroll);

    // Efeito de typing para o título principal
    const heroTitle = document.querySelector('.hero h2');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typingEffect = setInterval(() => {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
            } else {
                clearInterval(typingEffect);
            }
        }, 50);
    }

    // Adicionar efeito de pulsação ao botão CTA
    const ctaButton = document.querySelector('.cta .btn-primary');
    if (ctaButton) {
        setInterval(() => {
            ctaButton.classList.add('pulse');
            
            setTimeout(() => {
                ctaButton.classList.remove('pulse');
            }, 1000);
        }, 3000);
    }

    // Adicionar classe CSS para efeito de pulsação
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .pulse {
            animation: pulse 1s ease;
        }
        
        .service-card.animate, .benefit-item.animate, .step.animate {
            opacity: 1 !important;
            transform: translateY(0) translateX(0) !important;
        }
    `;
    document.head.appendChild(style);
});
