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

destroyToggle.addEventListener('click', () => {
    isActive = !isActive;
    destroyToggle.classList.toggle('active', isActive);
    container.classList.toggle('active', isActive);

    if (isActive && !destroyer) {
        destroyer = new Destroyer(container, {
            defaultVolume: 0.3,
            particleLimit: 50,
            zIndexStart: 200
        });
        destroyer.inject();
    }
});

// Weapon switching
weaponBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        weaponBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        if (destroyer) {
            destroyer.setWeapon(parseInt(btn.dataset.weapon));
        }
    });
});

// Clear
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
