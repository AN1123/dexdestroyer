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
const headerReset = document.getElementById('headerReset');

let destroyer = null;
let isActive = false;
let currentWeapon = 1;

// Initialize destroyer
destroyer = new Destroyer(container, {
    defaultVolume: 0.3,
    particleLimit: 100,
    zIndexStart: 200
});
destroyer.inject();

function activateDestroy() {
    isActive = true;
    destroyToggle.classList.add('active');
    container.classList.add('active');
    destroyToggle.textContent = '🔨 DESTROY MODE ON';
    headerReset.classList.add('visible');
}

function deactivateDestroy() {
    isActive = false;
    destroyToggle.classList.remove('active');
    container.classList.remove('active');
    destroyToggle.textContent = '🔨 DESTROY MODE';
    headerReset.classList.remove('visible');
}

destroyToggle.addEventListener('click', () => {
    if (isActive) {
        deactivateDestroy();
    } else {
        activateDestroy();
    }
});

// Header reset button
headerReset.addEventListener('click', () => {
    deactivateDestroy();
    if (destroyer) destroyer.clear();
});

// Weapon switching via buttons
weaponBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!destroyer) return;
        
        const weaponId = parseInt(btn.dataset.weapon);
        currentWeapon = weaponId;
        
        // Update UI
        weaponBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Set weapon
        destroyer.setWeapon(weaponId);
    });
});

// Keyboard weapon switching (1, 2, 3)
document.addEventListener('keydown', (e) => {
    if (!destroyer) return;
    
    if (e.key === '1' || e.key === '2' || e.key === '3') {
        const weaponId = parseInt(e.key);
        currentWeapon = weaponId;
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
