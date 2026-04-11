// Gamification Engine for Academic Portfolio
// Handles XP, Levelling, Achievements, Modals, and Logic Sandbox

window.gameEngine = {
    xp: 0,
    level: 1,
    puzzleSolved: false,
    levels: [
        { max: 50, title: "Freshman" },
        { max: 150, title: "Sophomore" },
        { max: 300, title: "Junior" },
        { max: 500, title: "Senior" },
        { max: 800, title: "Master's Student" },
        { max: 1200, title: "Doctoral Student" },
        { max: 2000, title: "Doctoral Candidate" },
        { max: 3000, title: "PhD / Post-Doc" }
    ],
    achievements: {
        networker: false,
        reader: false,
        engineer: false,
        researcher: false
    },

    init() {
        try {
            this.loadProgress();
            this.updateHUD();
            this.attachEventListeners();
            this.initModals();
            this.initLogicSandbox();
            
            // Initial welcome toast if new
            if (this.xp === 0) {
                setTimeout(() => {
                    this.showToast("Welcome to the Portfolio!", "Interact with elements, read tags, and learn to gain XP!");
                }, 1000);
            }
        } catch(e) {
            alert("Gamification Engine Error: " + e.message + "\n\nStack: " + e.stack);
            console.error(e);
        }
    },

    loadProgress() {
        try {
            const savedXP = localStorage.getItem('nto_portfolio_xp');
            const savedPuzzle = localStorage.getItem('nto_portfolio_puzzle');
            
            if (savedXP) this.xp = parseInt(savedXP);
            if (savedPuzzle === 'true') {
                this.puzzleSolved = true;
                this.unlockCVUIOnly(); // Just unlock the UI if already solved previously
            }
        } catch(e) {
            console.warn("localStorage not available, likely running via file://", e);
        }

        this.calculateLevel();
    },

    saveProgress() {
        try {
            localStorage.setItem('nto_portfolio_xp', this.xp.toString());
            localStorage.setItem('nto_portfolio_puzzle', this.puzzleSolved.toString());
        } catch(e) {
            // Ignore error
        }
    },

    calculateLevel() {
        let currentLvl = 1;
        for (let i = 0; i < this.levels.length; i++) {
            if (this.xp >= this.levels[i].max) {
                currentLvl = Math.min(i + 2, this.levels.length);
            } else {
                break;
            }
        }
        
        if (currentLvl > this.level) {
            this.level = currentLvl;
            const levelData = this.levels[this.level-1] || this.levels[this.levels.length-1];
            this.showToast("LEVEL UP! 🎉", `You are now a ${levelData.title}!`);
            const hud = document.getElementById('player-hud');
            if(hud) {
                hud.classList.add('level-up');
                setTimeout(() => hud.classList.remove('level-up'), 600);
            }
            if(window.confetti) {
                confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
            }
        }
    },

    addXP(amount) {
        this.xp += amount;
        this.calculateLevel();
        this.updateHUD();
        this.saveProgress();
    },

    updateHUD() {
        const lvlEl = document.getElementById('player-level');
        const xpTextEl = document.getElementById('player-xp-text');
        const xpMaxEl = document.getElementById('player-xp-max');
        const xpBarEl = document.getElementById('xp-bar');

        if (!lvlEl) return;

        const currentLevelData = this.levels[Math.min(this.level - 1, this.levels.length - 1)];
        const prevMax = this.level === 1 ? 0 : this.levels[this.level - 2].max;
        const currentMax = currentLevelData.max;
        
        lvlEl.textContent = `Lvl ${this.level}: ${currentLevelData.title}`;
        xpTextEl.textContent = this.xp;
        xpMaxEl.textContent = currentMax;

        const progressPercent = Math.min(100, Math.max(0, ((this.xp - prevMax) / (currentMax - prevMax)) * 100));
        xpBarEl.style.width = `${progressPercent}%`;
    },

    showToast(title, message) {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <div class="toast-icon"><i class="fas fa-trophy"></i></div>
            <div class="toast-text">
                <h4>${title}</h4>
                <p>${message}</p>
            </div>
        `;
        
        container.appendChild(toast);
        
        // Trigger reflow
        void toast.offsetWidth;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }, 4000);
    },

    unlockCVUIOnly() {
        const btn = document.getElementById('cv-vault-btn');
        const icon = document.getElementById('cv-lock-icon');
        if(btn && icon) {
            btn.classList.remove('locked-vault');
            btn.classList.add('unlocked-vault');
            btn.innerHTML = `<i class="fas fa-file-download" style="margin-right: 5px;"></i> Download CV`;
            btn.href = "assets/docs/cv.pdf"; // Re-enable real download
            btn.removeEventListener('click', this.preventLockedClick);
        }
    },

    preventLockedClick(e) {
        e.preventDefault();
        const lab = document.getElementById('fun-lab');
        if(lab) {
            lab.scrollIntoView({ behavior: 'smooth' });
            window.gameEngine.showToast("Vault Locked", "Complete the Logic Sandbox to unlock!");
        }
    },

    unlockCVSandbox() {
        if(this.puzzleSolved) return;
        this.puzzleSolved = true;
        this.saveProgress();
        this.addXP(150);
        
        this.showToast("Achievement Unlocked: The Engineer ⚡", "You successfully engaged the logic circuit!");
        
        if (window.confetti) {
            var duration = 3 * 1000;
            var animationEnd = Date.now() + duration;
            var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
            var interval = setInterval(function() {
                var timeLeft = animationEnd - Date.now();
                if (timeLeft <= 0) { return clearInterval(interval); }
                var particleCount = 50 * (timeLeft / duration);
                confetti(Object.assign({}, defaults, { particleCount, origin: { x: Math.random(), y: Math.random() - 0.2 } }));
            }, 250);
        }
        this.unlockCVUIOnly();
    },

    attachEventListeners() {
        // XP Triggers
        document.querySelectorAll('.btn-xp-trigger').forEach(btn => {
            btn.addEventListener('click', () => this.addXP(15));
        });

        // Reading XP
        let lastScrollY = window.scrollY;
        window.addEventListener('scroll', () => {
            if (Math.abs(window.scrollY - lastScrollY) > 500) {
                this.addXP(5);
                lastScrollY = window.scrollY;
            }
        });

        // Social Tracking
        document.querySelectorAll('.social-links a').forEach(link => {
            link.addEventListener('click', () => {
                if(!this.achievements.networker) {
                    this.achievements.networker = true;
                    this.addXP(50);
                    this.showToast("Achievement Unlocked: The Networker 🤝", "Connected via socials.");
                }
            });
        });

        const lockBtn = document.getElementById('cv-vault-btn');
        if(lockBtn && !this.puzzleSolved) {
            lockBtn.href = "#"; // Disable link
            lockBtn.addEventListener('click', this.preventLockedClick);
        }
    },

    initModals() {
        const modal = document.getElementById('research-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalDesc = document.getElementById('modal-desc');
        const closeBtn = document.querySelector('.modal-close');

        if (!modal) return;

        // Open Modal
        document.querySelectorAll('.tag-interactive').forEach(tag => {
            tag.addEventListener('click', (e) => {
                const title = e.currentTarget.getAttribute('data-title');
                const desc = e.currentTarget.getAttribute('data-definition');
                modalTitle.textContent = title;
                modalDesc.textContent = desc;
                modal.classList.add('show');
                
                if(!this.achievements.researcher) {
                    this.achievements.researcher = true;
                    this.addXP(20);
                    this.showToast("Achievement Unlocked: The Researcher 🔍", "Explored theoretical concepts.");
                }
            });
        });

        // Close Modal
        const closeModal = () => modal.classList.remove('show');
        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        window.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    },

    initLogicSandbox() {
        const in1 = document.getElementById('sb-in1');
        const in2 = document.getElementById('sb-in2');
        const in3 = document.getElementById('sb-in3');
        const in4 = document.getElementById('sb-in4');
        const gateA = document.getElementById('sb-gateA');
        const gateB = document.getElementById('sb-gateB');
        const gateC = document.getElementById('sb-gateC');
        
        const stateOut = document.getElementById('sb-stateOut');
        const lightbulb = document.getElementById('sandbox-lightbulb');
        const successMsg = document.getElementById('sb-success');
        
        if(!in1) return; // Not on this page

        const evaluateGate = (val1, val2, type) => {
            switch(type) {
                case 'AND': return val1 && val2;
                case 'OR': return val1 || val2;
                case 'XOR': return val1 !== val2;
                case 'NAND': return !(val1 && val2);
                case 'NOR': return !(val1 || val2);
                default: return false;
            }
        };

        const updateSandbox = () => {
            const v1 = in1.checked;
            const v2 = in2.checked;
            const v3 = in3.checked;
            const v4 = in4.checked;

            const tA = gateA.value;
            const tB = gateB.value;
            const tC = gateC.value;

            const resA = evaluateGate(v1, v2, tA);
            const resB = evaluateGate(v3, v4, tB);
            const finalRes = evaluateGate(resA, resB, tC);

            stateOut.textContent = finalRes ? '1' : '0';

            if (finalRes) {
                lightbulb.classList.add('on');
                stateOut.classList.add('active');
                successMsg.style.opacity = '1';
                this.unlockCVSandbox();
            } else {
                lightbulb.classList.remove('on');
                stateOut.classList.remove('active');
                successMsg.style.opacity = '0';
            }
        };

        const triggers = [in1, in2, in3, in4, gateA, gateB, gateC];
        triggers.forEach(t => t.addEventListener('change', updateSandbox));
        
        // Initial Evaluation
        updateSandbox();
    }
};

// Initialize immediately since script is deferred or at bottom of body
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.gameEngine.init());
} else {
    window.gameEngine.init();
}
