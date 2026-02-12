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

// Weapon IDs: 0=hammer, 1=gun, 2=stamp
const WEAPONS = {
    hammer: 0,
    gun: 1,
    stamp: 2
};

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

// Weapon switching via buttons - use correct 0-indexed IDs
weaponBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!destroyer) return;
        
        const weaponName = btn.dataset.weapon;
        const weaponId = WEAPONS[weaponName];
        
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
    
    let weaponId = null;
    let weaponName = null;
    
    if (e.key === '1') {
        weaponId = WEAPONS.hammer;
        weaponName = 'hammer';
    } else if (e.key === '2') {
        weaponId = WEAPONS.gun;
        weaponName = 'gun';
    } else if (e.key === '3') {
        weaponId = WEAPONS.stamp;
        weaponName = 'stamp';
    }
    
    if (weaponId !== null) {
        destroyer.setWeapon(weaponId);
        weaponBtns.forEach(b => {
            b.classList.toggle('active', b.dataset.weapon === weaponName);
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
