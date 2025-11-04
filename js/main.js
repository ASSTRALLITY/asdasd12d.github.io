// Плавная прокрутка для якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Функционал переключения темы
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.material-icons');

// Проверка сохраненных настроек темы или предпочтений системы
const savedTheme = localStorage.getItem('theme');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

let currentTheme = 'light';

// Установка начальной темы на основе сохраненных настроек или системных предпочтений
if (savedTheme) {
    currentTheme = savedTheme;
} else if (prefersDarkScheme.matches) {
    currentTheme = 'dark';
}

// Применение темы
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcon();

function updateThemeIcon() {
    if (currentTheme === 'dark') {
        themeIcon.textContent = 'light_mode';
    } else {
        themeIcon.textContent = 'dark_mode';
    }
}

themeToggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Плавное переключение темы с размытием
    document.body.style.transition = 'all 0.7s ease';
    document.body.style.filter = 'blur(3px)';
    
    setTimeout(() => {
        document.documentElement.setAttribute('data-theme', currentTheme);
        localStorage.setItem('theme', currentTheme);
        updateThemeIcon();
        
        // Убираем размытие после смены темы
        setTimeout(() => {
            document.body.style.filter = 'none';
            document.body.style.transition = 'background-color 1.5s ease, color 1.5s ease';
        }, 500);
    }, 500);
});

// Функционал карусели
document.addEventListener('DOMContentLoaded', function() {
    // Элементы карусели
    const carouselInner = document.querySelector('.carousel-inner');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicators = document.querySelectorAll('.indicator');
    const currentCounter = document.querySelector('.current');
    const totalCounter = document.querySelector('.total');
    
    // Установка общего количества
    if (totalCounter) {
        totalCounter.textContent = carouselItems.length;
    }
    
    let currentIndex = 0;
    
    // Показать определенный слайд
    function showSlide(index) {
        // Обновить активный класс для слайдов
        carouselItems.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
        
        // Обновить активный индикатор
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
        
        // Обновить счетчик
        if (currentCounter) {
            currentCounter.textContent = index + 1;
        }
        
        currentIndex = index;
    }
    
    // Следующий слайд
    function nextSlide() {
        const nextIndex = (currentIndex + 1) % carouselItems.length;
        showSlide(nextIndex);
    }
    
    // Предыдущий слайд
    function prevSlide() {
        const prevIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
        showSlide(prevIndex);
    }
    
    // Обработчики событий для кнопок
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
        });
    }
    
    // Обработчики событий для индикаторов
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Автоматическая смена слайдов
    let carouselInterval = setInterval(nextSlide, 5000);
    
    // Пауза при наведении
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', () => {
            clearInterval(carouselInterval);
        });
        
        carousel.addEventListener('mouseleave', () => {
            carouselInterval = setInterval(nextSlide, 5000);
        });
    }
    
    // Инициализация первого слайда
    showSlide(0);
});

// Анимация появления элементов при прокрутке
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observerCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

// Наблюдение за элементами для анимации появления
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.category, .about-container, .gallery-content, .contact-card, .menu-item'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
});