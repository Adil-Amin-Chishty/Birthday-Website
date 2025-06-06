// Create floating hearts animation
function createFloatingHearts() {
    const container = document.querySelector('.floating-hearts');
    const heartCount = 20;

    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'absolute';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = Math.random() * 100 + 'vh';
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';
        heart.style.opacity = Math.random() * 0.5 + 0.5;
        heart.style.animation = `float ${Math.random() * 3 + 2}s linear infinite`;
        container.appendChild(heart);
    }
}

// Add floating animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Intersection Observer for section animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Add special animation for tease items
            if (entry.target.classList.contains('tease-item')) {
                entry.target.style.animationDelay = `${Math.random() * 0.5}s`;
            }
        }
    });
}, {
    threshold: 0.1
});

// Observe all sections and interactive elements
document.querySelectorAll('section, .tease-item, .fact, .wish').forEach(element => {
    observer.observe(element);
});

// Eye follow mouse movement
document.addEventListener('mousemove', (e) => {
    const eyes = document.querySelectorAll('.eye');
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    eyes.forEach(eye => {
        const rect = eye.getBoundingClientRect();
        const eyeX = rect.left + rect.width / 2;
        const eyeY = rect.top + rect.height / 2;

        const angle = Math.atan2(mouseY - eyeY, mouseX - eyeX);
        const distance = Math.min(15, Math.hypot(mouseX - eyeX, mouseY - eyeY) / 20);

        const pupil = eye.querySelector('::after');
        if (pupil) {
            pupil.style.transform = `translate(calc(-50% + ${Math.cos(angle) * distance}px), calc(-50% + ${Math.sin(angle) * distance}px))`;
        }
    });
});

// Add hover effect for tease items
document.querySelectorAll('.tease-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        const icon = item.querySelector('i');
        icon.style.transform = 'scale(1.2) rotate(10deg)';
        icon.style.transition = 'transform 0.3s ease';
    });

    item.addEventListener('mouseleave', () => {
        const icon = item.querySelector('i');
        icon.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Add click effect for facts
document.querySelectorAll('.fact').forEach(fact => {
    fact.addEventListener('click', () => {
        fact.style.transform = 'scale(0.95)';
        setTimeout(() => {
            fact.style.transform = 'translateY(-5px)';
        }, 100);
    });
});

// Add confetti effect on page load
function createConfetti() {
    const colors = ['#ff69b4', '#ff1493', '#ffd700', '#fff'];
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '1000';
    document.body.appendChild(container);

    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = -20 + 'px';
        confetti.style.opacity = Math.random() * 0.5 + 0.5;
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
        container.appendChild(confetti);
    }

    // Remove confetti after animation
    setTimeout(() => {
        container.remove();
    }, 5000);
}

// Add confetti animation
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes fall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);

// Initialize animations when the page loads
window.addEventListener('load', () => {
    createFloatingHearts();
    createConfetti();
    
    // Add a subtle parallax effect to the stars
    document.addEventListener('mousemove', (e) => {
        const stars = document.querySelector('.stars');
        const twinkling = document.querySelector('.twinkling');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        stars.style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px)`;
        twinkling.style.transform = `translate(${mouseX * 30}px, ${mouseY * 30}px)`;
    });
});

// Nickname message popup functionality
function showNicknameMessage(element) {
    const messages = {
        'ghost': "Because she appears out of nowhere and disappears just as quickly! 👻",
        'magic': "Her magical powers of making everyone smile and feel better ✨",
        'sparkles': "Because she's always sparkling with energy and mischief ✨",
        'bug': "That's our little Tiddi, always buzzing around with excitement! 🐞",
        'crown': "And many more names that make her special... but we'll keep those a secret! 😉"
    };

    const icon = element.querySelector('i');
    const type = icon.className.split('fa-')[1].split(' ')[0];
    const message = messages[type];

    // Create popup if it doesn't exist
    let popup = document.querySelector('.nickname-message');
    if (!popup) {
        popup = document.createElement('div');
        popup.className = 'nickname-message';
        popup.innerHTML = `
            <button class="close-btn">&times;</button>
            <p></p>
        `;
        document.body.appendChild(popup);

        // Add close button functionality
        popup.querySelector('.close-btn').addEventListener('click', () => {
            popup.classList.remove('active');
        });
    }

    // Update and show popup
    popup.querySelector('p').textContent = message;
    popup.classList.add('active');

    // Add click outside to close
    document.addEventListener('click', function closePopup(e) {
        if (!popup.contains(e.target) && e.target !== element) {
            popup.classList.remove('active');
            document.removeEventListener('click', closePopup);
        }
    });
}

// Add hover effect for nickname cards
document.querySelectorAll('.nickname-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('i');
        icon.style.transform = 'scale(1.2) rotate(10deg)';
        icon.style.transition = 'transform 0.3s ease';
    });

    card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('i');
        icon.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Add click effect for nickname cards
document.querySelectorAll('.nickname-card').forEach(card => {
    card.addEventListener('click', () => {
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
        }, 100);
    });
}); 