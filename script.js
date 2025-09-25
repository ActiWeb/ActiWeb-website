document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.fade-text');
    
    // تبدیل متن درباره ما به کلمات
    const aboutText = document.querySelector('.about-content p');
    if (aboutText) {
        const text = aboutText.textContent;
        const words = text.split(' ');
        aboutText.innerHTML = '';
        
        words.forEach(word => {
            const span = document.createElement('span');
            span.textContent = word + ' ';
            span.classList.add('word');
            span.style.opacity = '0';
            span.style.transition = 'opacity 0.3s ease';
            aboutText.appendChild(span);
        });
    }

    // Intersection Observer برای انیمیشنها
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.classList.add('visible');
            } else {
                const element = entry.target;
                element.classList.remove('visible');
            }
        });
    }, observerOptions);

    // مشاهده همه عناصر
    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // انیمیشن parallax و کنترل اسکرول
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const scrollPercent = (scrolled / windowHeight) * 100;
        
        // کنترل هدر دینامیک
        const header = document.querySelector('.header');
        if (header) {
            if (scrolled > windowHeight * 0.03) {
                header.classList.add('compact');
            } else {
                header.classList.remove('compact');
            }
        }
        
        // محو کردن کد های بکگراند بعد از 5 درصد اسکرول
        const backgroundBlur = document.querySelector('.background-blur');
        if (backgroundBlur) {
            if (scrollPercent > 5) {
                const fadeOpacity = Math.max(0, 1 - (scrollPercent - 5) / 10);
                backgroundBlur.style.opacity = fadeOpacity;
            } else {
                backgroundBlur.style.opacity = 1;
            }
        }
        
        // انیمیشن کلمه به کلمه برای بخش درباره ما
        const aboutSection = document.querySelector('.about');
        const words = document.querySelectorAll('.about-content .word');
        
        if (aboutSection && words.length > 0) {
            const sectionTop = aboutSection.offsetTop;
            const sectionHeight = aboutSection.offsetHeight;
            
            const sectionStart = sectionTop - windowHeight + 200;
            const sectionEnd = sectionTop + sectionHeight - 200;
            const scrollProgress = Math.max(0, Math.min(1, (scrolled - sectionStart) / (sectionEnd - sectionStart)));
            
            const visibleWords = Math.floor(scrollProgress * words.length);
            
            words.forEach((word, index) => {
                if (index < visibleWords) {
                    word.style.opacity = '1';
                } else {
                    word.style.opacity = '0';
                }
            });
        }
    });

    // انیمیشن ورودی برای hero
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.classList.add('visible');
        }
    }, 300);

    // ناوبری هدر با انیمیشن موشن بلور
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const text = item.textContent;
            let targetSection;
            
            document.body.style.filter = 'blur(3px)';
            document.body.style.transition = 'filter 0.3s ease';
            
            if (text === 'حرفه ما') {
                targetSection = document.querySelector('.skills');
            } else if (text === 'نمونه کار') {
                targetSection = document.querySelector('.portfolio');
            } else if (text === 'همکاری') {
                targetSection = document.querySelector('.contact');
            }
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                setTimeout(() => {
                    document.body.style.filter = 'none';
                }, 800);
            }
        });
    });

    // دسترسی سریع موبایل
    const quickIcon = document.querySelector('.quick-icon');
    const quickMenu = document.querySelector('.quick-menu');
    const quickItems = document.querySelectorAll('.quick-item');
    
    if (quickIcon && quickMenu) {
        quickIcon.addEventListener('click', () => {
            const quickAccess = document.querySelector('.quick-access');
            quickAccess.classList.toggle('active');
            quickMenu.classList.toggle('active');
        });
    }
    
    quickItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const target = item.getAttribute('data-target');
            let targetSection;
            
            document.body.style.filter = 'blur(3px)';
            document.body.style.transition = 'filter 0.3s ease';
            
            if (target === 'skills') {
                targetSection = document.querySelector('.skills');
            } else if (target === 'portfolio') {
                targetSection = document.querySelector('.portfolio');
            } else if (target === 'contact') {
                targetSection = document.querySelector('.contact');
            }
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // بستن منو
                const quickAccess = document.querySelector('.quick-access');
                quickAccess.classList.remove('active');
                quickMenu.classList.remove('active');
                
                setTimeout(() => {
                    document.body.style.filter = 'none';
                }, 800);
            }
        });
    });
});

// Theme Toggle Function
function toggleTheme() {
    const checkbox = document.querySelector('#checkbox');
    const body = document.body;
    
    body.classList.toggle('dark-theme');
    
    // Save theme preference
    const isDark = checkbox.checked;
    localStorage.setItem('darkTheme', isDark);
}

// Load saved theme on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('darkTheme');
    if (savedTheme === 'true') {
        document.querySelector('#checkbox').checked = true;
        document.body.classList.add('dark-theme');
    }
});
// Typing Animation for Capabilities
const capabilities = [
    'طراحی رابط کاربری مدرن',
    'طراحی وبسایت با عملکرد و سرعت بالا',
    'بهینه سازی عملکرد',
    'امنیت و حفاظت داده',
    'پشتیبانی 24/7',
    'تحویل به موقع پروژه'
];

let currentCapability = 0;
let currentChar = 0;
let isDeleting = false;

function typeCapability() {
    const typingElement = document.querySelector('.typed-text');
    if (!typingElement) return;
    
    const current = capabilities[currentCapability];
    
    if (isDeleting) {
        typingElement.textContent = current.substring(0, currentChar - 1);
        currentChar--;
    } else {
        typingElement.textContent = current.substring(0, currentChar + 1);
        currentChar++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && currentChar === current.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && currentChar === 0) {
        isDeleting = false;
        currentCapability = (currentCapability + 1) % capabilities.length;
        typeSpeed = 500;
    }
    
    setTimeout(typeCapability, typeSpeed);
}

// Start typing animation
window.addEventListener('load', () => {
    setTimeout(typeCapability, 1000);
});

// Copy phone number functionality
document.addEventListener('DOMContentLoaded', function() {
    const phoneItem = document.querySelector('.contact-item:first-child');
    if (phoneItem) {
        phoneItem.style.cursor = 'pointer';
        phoneItem.addEventListener('click', function() {
            const phoneNumber = this.querySelector('.contact-number').textContent;
            navigator.clipboard.writeText(phoneNumber).then(() => {
                const desc = this.querySelector('.contact-desc');
                const originalText = desc.textContent;
                desc.textContent = 'کپی شد!';
                desc.style.color = '#4CAF50';
                setTimeout(() => {
                    desc.textContent = originalText;
                    desc.style.color = '';
                }, 2000);
            });
        });
    }
    
    // Telegram link functionality
    const telegramItem = document.querySelector('.contact-item:nth-child(2)');
    if (telegramItem) {
        telegramItem.style.cursor = 'pointer';
        telegramItem.addEventListener('click', function() {
            window.open('https://t.me/acti_web', '_blank');
        });
    }
    
    // Instagram link functionality
    const instagramItem = document.querySelector('.contact-item:nth-child(3)');
    if (instagramItem) {
        instagramItem.style.cursor = 'pointer';
        instagramItem.addEventListener('click', function() {
            window.open('https://www.instagram.com/acti.web?igsh=MWZiOGRmYjJoc2xjNw==', '_blank');
        });
    }
    
    // GitHub link functionality
    const githubItem = document.querySelector('.contact-item:last-child');
    if (githubItem) {
        githubItem.style.cursor = 'pointer';
        githubItem.addEventListener('click', function() {
            window.open('https://github.com/ActiWeb', '_blank');
        });
    }
    
    // Portfolio link functionality
    const portfolioBox = document.querySelector('.portfolio-box');
    if (portfolioBox) {
        portfolioBox.addEventListener('click', function() {
            window.open('https://Ertebat.loredu.ir', '_blank');
        });
    }
});