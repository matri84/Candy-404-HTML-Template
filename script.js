// ===== Sparkle Generator =====
function createSparkles() {
    const container = document.getElementById('sparkles');
    if (!container) return;

    const count = 28;

    for (let i = 0; i < count; i++) {
        const dot = document.createElement('div');
        dot.classList.add('sparkle-dot');

        // Random position
        dot.style.left = Math.random() * 100 + '%';
        dot.style.top = Math.random() * 100 + '%';

        // Random size
        const size = 2 + Math.random() * 4;
        dot.style.width = size + 'px';
        dot.style.height = size + 'px';

        // Random color from candy palette
        const colors = ['#fee440', '#f15bb5', '#9b5de5', '#ff006e', '#ffd60a'];
        dot.style.background = colors[Math.floor(Math.random() * colors.length)];

        // Random animation delay & duration
        dot.style.animationDelay = Math.random() * 4 + 's';
        dot.style.animationDuration = (2 + Math.random() * 3) + 's';

        container.appendChild(dot);
    }
}

// ===== Home Button Interaction =====
function setupHomeButton() {
    const btn = document.getElementById('homeBtn');
    if (!btn) return;

    btn.addEventListener('click', () => {
        // Fun bounce animation before "navigating"
        btn.style.transition = 'transform 0.15s ease';
        btn.style.transform = 'scale(0.9)';

        setTimeout(() => {
            btn.style.transform = 'scale(1.05)';
        }, 150);

        setTimeout(() => {
            // In a real site this would be: window.location.href = '/';
            // For demo we show a playful message
            btn.querySelector('span').textContent = 'در حال پرواز... 🚀';
            btn.style.pointerEvents = 'none';

            // Optional: create a burst of candies
            createBurst(btn);
        }, 300);
    });
}

// ===== Candy Burst on Click =====
function createBurst(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '10px';
        particle.style.height = '10px';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '100';

        const colors = ['#9b5de5', '#f15bb5', '#fee440', '#ff006e'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];

        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';

        document.body.appendChild(particle);

        const angle = (i / 12) * Math.PI * 2;
        const velocity = 80 + Math.random() * 60;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;

        particle.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
        ], {
            duration: 700 + Math.random() * 300,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)'
        }).onfinish = () => particle.remove();
    }
}

// ===== Subtle Parallax on Mouse Move =====
function setupParallax() {
    const candies = document.querySelectorAll('.candy');

    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;

        candies.forEach((candy, i) => {
            const depth = (i + 1) * 4;
            candy.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
        });
    });
}

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
    createSparkles();
    setupHomeButton();
    setupParallax();
});
