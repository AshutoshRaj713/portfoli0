document.addEventListener('DOMContentLoaded', () => {
    // ===== Mobile Menu Toggle =====
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // ===== Smooth Scrolling =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== Active Navigation Link =====
    const navLinkItems = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinkItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // ===== Form Submission =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Show success animation
            const button = contactForm.querySelector('button');
            const originalText = button.textContent;
            button.textContent = '✓ Message Sent!';
            button.style.background = 'linear-gradient(135deg, #00d9ff, #8338ec)';
            
            setTimeout(() => {
                contactForm.reset();
                button.textContent = originalText;
                button.style.background = '';
            }, 2000);

            console.log('Form submitted:', { name, email, message });
        });
    }

    // ===== Scroll Animations =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply animations to cards and elements
    const animatedElements = document.querySelectorAll(
        '.skill-card, .project-card, .stat, .section-title, .about-text'
    );
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // ===== Mouse Cursor Effect =====
    const createSparkle = (e) => {
        if (Math.random() > 0.95) { // Sparkle effect on hover
            const sparkle = document.createElement('div');
            sparkle.style.cssText = `
                position: fixed;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                pointer-events: none;
                font-size: 1.5rem;
                z-index: 999;
                animation: sparkleFloat 1s ease-out forwards;
            `;
            sparkle.textContent = '✨';
            document.body.appendChild(sparkle);

            setTimeout(() => sparkle.remove(), 1000);
        }
    };

    // Add sparkle animation to stylesheet
    if (!document.querySelector('style[data-sparkle]')) {
        const styleSheet = document.createElement('style');
        styleSheet.setAttribute('data-sparkle', 'true');
        styleSheet.textContent = `
            @keyframes sparkleFloat {
                0% {
                    opacity: 1;
                    transform: translate(0, 0) scale(1);
                }
                100% {
                    opacity: 0;
                    transform: translate(${Math.random() * 100 - 50}px, -100px) scale(0);
                }
            }
        `;
        document.head.appendChild(styleSheet);
    }

    document.addEventListener('mousemove', createSparkle);

    // ===== Parallax Effect =====
    const parallaxElements = document.querySelectorAll('.blob');
    
    window.addEventListener('scroll', () => {
        parallaxElements.forEach((element, index) => {
            const scrollPosition = window.pageYOffset;
            const parallaxValue = scrollPosition * (0.5 + index * 0.1);
            element.style.transform = `translateY(${parallaxValue}px)`;
        });
    });

    // ===== Floating Cards Interactive =====
    const floatingCards = document.querySelectorAll('.floating-card');
    
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        floatingCards.forEach(card => {
            const offsetX = (mouseX - 0.5) * 30;
            const offsetY = (mouseY - 0.5) * 30;
            
            card.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        });
    });

    // ===== Button Hover Effects =====
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.letterSpacing = '1px';
        });
        btn.addEventListener('mouseleave', function() {
            this.style.letterSpacing = 'normal';
        });
    });

    // ===== Card Tilt Effect =====
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });

    // ===== Type Animation for Hero =====
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let index = 0;

        const type = () => {
            if (index < text.length) {
                heroTitle.textContent += text.charAt(index);
                index++;
                setTimeout(type, 50);
            }
        };

        type();
    }

    // ===== Skill Bars Animation =====
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillSection = document.querySelector('#skills');

    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const width = bar.parentElement.parentElement.querySelector('.skill-progress').style.width;
                if (width) {
                    bar.style.animation = 'fillBar 1.5s ease-out forwards';
                }
            }
        });
    };

    window.addEventListener('scroll', animateSkillBars);

    // ===== Form Input Focus Effect =====
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });

    console.log('✨ Portfolio loaded and ready!');
});

// ===== Dynamic Text in Hero Section =====
document.addEventListener("DOMContentLoaded", () => {
  const roles = [
    "Creative Developer",
    "Full Stack Developer",
    "Graphic Designer",
    "Landing Page Designer"
  ];

  let current = 0;
  const textElement = document.getElementById("fade-text");

  if (!textElement) {
    console.error("fade-text not found");
    return;
  }

  setInterval(() => {
    textElement.classList.add("fade-out");

    setTimeout(() => {
      current = (current + 1) % roles.length;
      textElement.textContent = roles[current];
      textElement.classList.remove("fade-out");
      textElement.classList.add("fade-in");
    }, 500);

  }, 2000);
});
