import Destroyer from 'domain-destroyer';
import 'domain-destroyer/dist/css/destroyer.min.css';

// Tabs
const tabs = document.querySelectorAll('.tab');
const frames = document.querySelectorAll('.site-frame');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        frames.forEach(f => f.classList.remove('active'));
        tab.classList.add('active');
        document.querySelector(`.site-frame[data-site="${tab.dataset.site}"]`).classList.add('active');
    });
});

// Destroyer
const container = document.getElementById('destroyer-container');
const destroyToggle = document.getElementById('destroyToggle');
const clearBtn = document.getElementById('clearBtn');
const weaponBtns = document.querySelectorAll('.weapon-btn');

let destroyer = null;
let isActive = false;

// Initialize destroyer immediately but keep it inactive
destroyer = new Destroyer(container, {
    defaultVolume: 0.3,
    particleLimit: 50,
    zIndexStart: 200
});
destroyer.inject();

destroyToggle.addEventListener('click', () => {
    isActive = !isActive;
    destroyToggle.classList.toggle('active', isActive);
    container.classList.toggle('active', isActive);
    
    if (isActive) {
        destroyToggle.textContent = '🔨 DESTROY MODE ON';
    } else {
        destroyToggle.textContent = '🔨 DESTROY MODE';
    }
});

// Weapon switching via buttons
weaponBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (!destroyer) return;
        weaponBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        destroyer.setWeapon(parseInt(btn.dataset.weapon));
    });
});

// Keyboard weapon switching (1, 2, 3)
document.addEventListener('keydown', (e) => {
    if (!destroyer) return;
    
    if (e.key === '1' || e.key === '2' || e.key === '3') {
        const weaponId = parseInt(e.key);
        destroyer.setWeapon(weaponId);
        weaponBtns.forEach(b => {
            b.classList.toggle('active', parseInt(b.dataset.weapon) === weaponId);
        });
    }
    
    if (e.key === 'c' || e.key === 'C') {
        destroyer.clear();
    }
});

// Clear button
clearBtn.addEventListener('click', () => {
    if (destroyer) destroyer.clear();
});

// FAQ
document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
        q.parentElement.classList.toggle('open');
    });
});

// Copy contract
window.copyContract = function() {
    const addr = document.getElementById('contractAddress').textContent;
    navigator.clipboard.writeText(addr);
    alert('Copied!');
};
