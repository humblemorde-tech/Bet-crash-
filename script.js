/* ==========================================================================
   BET-CRASH ARCHITECTURE ENGINE SYSTEM SCRIPT MODULE v4.2
   ========================================================================== */

// System Master Database Mock Registry (25 Games Hardcoded Explicitly)
const GLOBAL_GAMES_CATALOG = [
    { key: "aviator", name: "Aviator Classic", provider: "Spribe", type: "crash", label: "AVIATOR", players: "14.8K", theme: "card-theme-aviator" },
    { key: "jetx", name: "JetX Space", provider: "SmartSoft", type: "crash", label: "JETX", players: "8.4K", theme: "card-theme-jetx" },
    { key: "spaceman", name: "Spaceman Cosmic", provider: "Pragmatic", type: "crash", label: "SPACEMAN", players: "11.2K", border: "border-purple-500" },
    { key: "rocketman", name: "Rocketman Burn", provider: "Elbet Systems", type: "crash", label: "ROCKETMAN", players: "6.1K", theme: "card-theme-rocketman" },
    { key: "spacexy", name: "Space XY Vectors", provider: "BGaming", type: "crash", label: "SPACE XY", players: "4.3K", border: "border-teal-400" },
    { key: "crashx", name: "CrashX Premium", provider: "Turbo Games", type: "crash", label: "CRASHX", players: "9.7K", theme: "card-theme-crash" },
    { key: "cricketx", name: "Cricket Stadium", provider: "SmartSoft", type: "crash", label: "CRICKET X", players: "14.1K", border: "border-emerald-400" },
    { key: "mines", name: "Mines Risk Sweep", provider: "Spribe Engine", type: "crash", label: "MINES", players: "19.5K", border: "border-orange-500" },
    { key: "zeppelin", name: "Zeppelin Airship", provider: "Betsolutions", type: "crash", label: "ZEPPELIN", players: "3.2K", border: "border-yellow-600" },
    { key: "aero", name: "Aero Vintage Lift", provider: "Turbo Matrix", type: "crash", label: "AERO", players: "2.1K", border: "border-cyan-400" },
    { key: "magnifyman", name: "Magnify Superhero", provider: "Fugaso Play", type: "crash", label: "MAGNIFY MAN", players: "1.9K", border: "border-red-500" },
    { key: "highstriker", name: "High Striker Logic", provider: "Evoplay Charts", type: "crash", label: "STRIKER", players: "5.4K", border: "border-indigo-500" },
    { key: "f777", name: "F777 Fighter Jet", provider: "OnlyPlay Suite", type: "crash", label: "F777 STRK", players: "4.1K", border: "border-lime-500" },
    { key: "goblinrun", name: "Goblin 3D Escape", provider: "Evoplay Run", type: "crash", label: "GOBLIN RUN", players: "2.8K", border: "border-amber-700" },
    { key: "dragonscrash", name: "Dragon Gold Crash", provider: "BGaming Horde", type: "crash", label: "DRAGON FIRE", players: "7.3K", border: "border-yellow-500" },
    { key: "roulette", name: "European Single Zero", provider: "Evolution Studio", type: "casino", label: "ROULETTE", players: "12.4K", theme: "card-theme-roulette" },
    { key: "blackjack", name: "Classic Strat 21", provider: "Evolution Floor", type: "casino", label: "BLACKJACK", players: "9.1K", theme: "card-theme-blackjack" },
    { key: "baccarat", name: "Punto Banco Tracker", provider: "Pragmatic Dealer", type: "casino", label: "BACCARAT", players: "6.5K", theme: "card-theme-baccarat" },
    { key: "slots", name: "Wild Cascades Reels", provider: "NetEnt Matrix", type: "casino", label: "MEGA SLOTS", players: "22.1K", theme: "card-theme-gold" },
    { key: "jackpots", name: "Global Linked Pool", provider: "Microgaming", type: "casino", label: "JACKPOTS", players: "18.3K", border: "border-yellow-500" },
    { key: "poker", name: "Hold'em Strategy", provider: "Playtech Engine", type: "casino", label: "TEXAS POKER", players: "4.4K", border: "border-emerald-600" },
    { key: "craps", name: "Vegas Board Layout", provider: "Evolution Live", type: "casino", label: "CRAPS DICE", players: "1.8K", border: "border-teal-500" },
    { key: "moneywheel", name: "Dream Spin Multiplier", provider: "Studio Host Arena", type: "casino", label: "DREAM SPIN", players: "13.9K", border: "border-pink-500" },
    { key: "sicbo", name: "Traditional 3-Dice", provider: "BGaming Dealer", type: "casino", label: "SIC BO", players: "2.7K", border: "border-orange-600" },
    { key: "videopoker", name: "Jacks or Better", provider: "Microgaming Labs", type: "casino", label: "JACKS BETTER", players: "1.1K", border: "border-slate-500" }
];

let appState = {
    user: null,
    balance: 0.00,
    activeTab: 'home',
    currentTheme: 'black',
    activeWalletAction: 'deposit'
};

document.addEventListener("DOMContentLoaded", () => {
    loadSession();
    renderAllGameMatrices();
    updateUI();
});

// Switch Tab Router Context
function switchTab(targetTab) {
    const validTabs = ['home', 'crash', 'casino'];
    if (!validTabs.includes(targetTab)) return;

    appState.activeTab = targetTab;
    validTabs.forEach(tab => {
        const viewNode = document.getElementById(`view-${tab}`);
        const navNode = document.getElementById(`nav-${tab}`);
        
        if (viewNode) {
            if (tab === targetTab) viewNode.classList.remove('hidden');
            else viewNode.classList.add('hidden');
        }
        if (navNode) {
            if (tab === targetTab) {
                navNode.classList.add('text-emerald-400', 'font-black');
                navNode.classList.remove('text-slate-500');
            } else {
                navNode.classList.remove('text-emerald-400', 'font-black');
                navNode.classList.add('text-slate-500');
            }
        }
    });
    closeTopMenu();
}

// Populate Grid Blocks Dynamically with Catalog Items
function renderAllGameMatrices() {
    const mixedContainer = document.getElementById('all-games-mix-container');
    const crashContainer = document.getElementById('crash-only-container');
    const casinoContainer = document.getElementById('casino-only-container');

    if (!mixedContainer || !crashContainer || !casinoContainer) return;

    mixedContainer.innerHTML = '';
    crashContainer.innerHTML = '';
    casinoContainer.innerHTML = '';

    GLOBAL_GAMES_CATALOG.forEach(game => {
        // Skip index entry 0 (Aviator Hero) on the mixed home menu to prevent duplication
        if (game.key !== 'aviator') {
            mixedContainer.appendChild(createCardNode(game));
        }
        
        // Populate dedicated categorical tabs
        if (game.type === 'crash') {
            crashContainer.appendChild(createCardNode(game));
        } else if (game.type === 'casino') {
            casinoContainer.appendChild(createCardNode(game));
        }
    });
}

function createCardNode(game) {
    const div = document.createElement('div');
    const customBorder = game.border ? game.border : 'border-transparent';
    const classTheme = game.theme ? game.theme : 'bg-gradient-to-br from-slate-800/60 to-slate-900/90';
    
    div.className = `game-card ${classTheme} ${customBorder} border-bottom-3 rounded-xl p-3.5 flex flex-col justify-between h-28 border border-transparent cursor-pointer`;
    div.onclick = () => launchGame(game.key);
    
    div.innerHTML = `
        <div class="flex justify-between items-start">
            <span class="text-xs font-black tracking-tight ${game.type === 'crash' ? 'text-emerald-400' : 'text-purple-400'}">${game.label}</span>
            <span class="text-[9px] text-slate-500 font-bold font-numeric-sync">${game.players}</span>
        </div>
        <div>
            <div class="text-[11px] font-bold text-slate-200 truncate">${game.name}</div>
            <div class="text-[8px] text-slate-500 uppercase tracking-wider font-bold">${game.provider}</div>
        </div>
    `;
    return div;
}

// Top Right Hamburger Dropdown Handler
function toggleTopMenu() {
    const menu = document.getElementById('top-dropdown-menu');
    if (menu) menu.classList.toggle('hidden');
}

function closeTopMenu() {
    const menu = document.getElementById('top-dropdown-menu');
    if (menu) menu.classList.add('hidden');
}

// Menu Navigation Router Redirect Hooks
function openMenuAction(action) {
    closeTopMenu();
    if (!appState.user) {
        alert("🔒 Access Denied: Create an account profile or log in to manage your wallet operations.");
        openAuthModal('login');
        return;
    }

    if (action === 'invite') {
        alert("🔗 Referral Inbound Program: Copy your personal invite link from clipboard! Invite friends and get a 200% match credit when they complete their initial balance deposit.");
        return;
    }
    if (action === 'freebet') {
        alert("🎁 Token Voucher Console: No free bets are currently linked to your terminal profile.");
        return;
    }

    // Load Wallet Configuration Sheets
    appState.activeWalletAction = action;
    const wModal = document.getElementById('wallet-modal');
    const wTitle = document.getElementById('wallet-modal-title');
    const wLabel = document.getElementById('wallet-limits-lbl');
    const wBtn = document.getElementById('wallet-submit-btn');

    if (action === 'deposit') {
        wTitle.innerText = "M-Pesa Express Deposit";
        wLabel.innerText = "Transaction Limits: Min 50 KES / Max 40,000 KES";
        wBtn.innerText = "Authorize STK Push Request";
        wBtn.className = "w-full bg-emerald-500 text-slate-950 font-black py-3 rounded-xl text-xs uppercase tracking-wider";
    } else {
        wTitle.innerText = "B2C Vault Liquidation";
        wLabel.innerText = "Transaction Limits: Min 100 KES / Max 300,000 KES";
        wBtn.innerText = "Process Secure Payout";
        wBtn.className = "w-full bg-rose-500 text-white font-black py-3 rounded-xl text-xs uppercase tracking-wider";
    }
    if (wModal) wModal.classList.remove('hidden');
}

function closeWalletModal() {
    const modal = document.getElementById('wallet-modal');
    if (modal) modal.classList.add('hidden');
}

// Transaction Validation Layer
function executeWalletTransaction() {
    const amt = parseFloat(document.getElementById('wallet-amount').value);
    const phone = document.getElementById('wallet-phone').value.trim();

    if (!phone.startsWith('254') || phone.length < 12) {
        alert("⚠️ Schema Alert: Input must follow international format guidelines (2547XXXXXXXX).");
        return;
    }

    if (appState.activeWalletAction === 'deposit') {
        if (amt < 50 || amt > 40000) {
            alert("❌ Bounds Invalidation: Safe deposit entries must fall strictly between KES 50 and KES 40,000.");
            return;
        }
        alert(`📲 Callback Processing: Safaricom STK prompt dispatched to line ${phone}. Confirm your mobile security pin to deposit ${amt.toFixed(2)} KES.`);
        setTimeout(() => {
            appState.balance += amt;
            saveSession();
            updateUI();
            closeWalletModal();
            alert(`✅ Verified: Successfully credited +${amt.toFixed(2)} KES to your digital wallet ledger balance.`);
        }, 2000);
    } else {
        if (amt < 100 || amt > 300000) {
            alert("❌ Bounds Invalidation: Payout payouts must fall strictly between KES 100 and KES 300,000.");
            return;
        }
        if (amt > appState.balance) {
            alert("❌ Ledger Collision: Attempted cashout volume exceeds your available balance metrics.");
            return;
        }
        alert(`💸 Wire Processing: Remitting KES ${amt.toFixed(2)} transfer straight to your Safaricom terminal...`);
        setTimeout(() => {
            appState.balance -= amt;
            saveSession();
            updateUI();
            closeWalletModal();
            alert(`✅ Complete: Sent KES ${amt.toFixed(2)} to destination line ${phone}. Check your standard SMS dashboard for validation confirmation.`);
        }, 2000);
    }
}

// Appearance Theme Configuration Controls
function setTheme(themeKey) {
    const body = document.getElementById('app-body');
    if (!body) return;
    
    appState.currentTheme = themeKey;
    if (themeKey === 'white') {
        body.className = "theme-white text-slate-900 font-sans min-h-screen pb-28 select-none no-select-forced scroll-chain-kill";
    } else {
        body.className = "theme-black text-slate-200 font-sans min-h-screen pb-28 select-none no-select-forced scroll-chain-kill";
    }
    saveSession();
    closeTopMenu();
}

// Core Game Launch Logic
function launchGame(gameKey) {
    if (!appState.user) {
        alert("🔒 Authorization Required: Establish user identity validation strings before entering real-money betting matrices.");
        openAuthModal('login');
        return;
    }
    alert(`🎯 Synchronizing Cluster: Mounting ${gameKey.toUpperCase()} engine core buffers. Live Balance Sync of ${appState.balance.toFixed(2)} KES active.`);
}

// Auth Panel Management
function openAuthModal(mode) {
    closeTopMenu();
    const modal = document.getElementById('auth-modal');
    const title = document.getElementById('modal-title');
    const btn = document.getElementById('modal-submit-btn');
    if (!modal) return;

    if (mode === 'signup') {
        title.innerText = "Register New Account Profile";
        btn.innerText = "Create Identity Profile";
    } else {
        title.innerText = "Secure Credentials Access Verification";
        btn.innerText = "Authenticate Profile";
    }
    modal.classList.remove('hidden');
}

function closeAuthModal() {
    const modal = document.getElementById('auth-modal');
    if (modal) modal.classList.add('hidden');
}

function handleAuthSubmit() {
    const phone = document.getElementById('auth-username').value.trim();
    if (!phone) {
        alert("⚠️ Validation Failure: Identity phone entry form cannot remain empty.");
        return;
    }
    appState.user = phone;
    saveSession();
    updateUI();
    closeAuthModal();
    alert(`🎉 Success: Profile verification token active for identifier connection: ${phone}`);
}

function logout() {
    appState.user = null;
    appState.balance = 0.00;
    saveSession();
    updateUI();
    closeTopMenu();
    switchTab('home');
    alert("🚪 Logged Out: Active profile credentials wiped successfully.");
}

// Persistent Storage Connectors
function updateUI() {
    const bal = document.getElementById('user-balance');
    const az = document.getElementById('auth-zone');
    const mId = document.getElementById('menu-user-identifier');
    const mAuth = document.getElementById('menu-auth-actions');
    const mLogout = document.getElementById('menu-logout-btn');

    if (bal) bal.innerText = appState.balance.toFixed(2);
    
    if (appState.user) {
        if (az) az.classList.add('hidden');
        if (mId) mId.innerText = `Line: ${appState.user}`;
        if (mAuth) mAuth.classList.add('hidden');
        if (mLogout) mLogout.classList.remove('hidden');
    } else {
        if (az) az.classList.remove('hidden');
        if (mId) mId.innerText = "Guest Session";
        if (mAuth) mAuth.classList.remove('hidden');
        if (mLogout) mLogout.classList.add('hidden');
    }
}

function saveSession() {
    localStorage.setItem('bet_crash_v42_state', JSON.stringify(appState));
}

function loadSession() {
    const stored = localStorage.getItem('bet_crash_v42_state');
    if (stored) {
        try {
            appState = JSON.parse(stored);
            setTheme(appState.currentTheme || 'black');
        } catch(e) { console.error("Cache system trace anomaly:", e); }
    }
  }
     
