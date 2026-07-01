/* ==========================================================================
   BET-CRASH PREMIUM PLATFORM MOTOR SCRIPT ENGINE (COMPLETE)
   ========================================================================== */

// --- Global Application State Architecture ---
let appState = {
    user: null,
    balance: 0.00,
    activeTab: 'home',
    isExcluded: false,
    exclusionExpiry: null
};

// --- Initialization Lifecycle Hook ---
document.addEventListener("DOMContentLoaded", () => {
    loadSessionFromStorage();
    updateUIElements();
    initLiveMarqueeTicker();
    
    // Check for self-exclusion ban instantly on system mount
    checkExclusionSanityGuard();
});

// --- Tab View Routing System ---
function switchTab(targetTabId) {
    if (appState.isExcluded) {
        openResponsibleGamingModal();
        return;
    }

    const eligibleTabs = ['home', 'casino', 'wallet', 'profile'];
    if (!eligibleTabs.includes(targetTabId)) return;

    appState.activeTab = targetTabId;

    // Toggle active classes on view containers
    eligibleTabs.forEach(tab => {
        const viewNode = document.getElementById(`view-${tab}`);
        const navNode = document.getElementById(`nav-${tab}`);
        
        if (viewNode) {
            if (tab === targetTabId) {
                viewNode.classList.remove('hidden');
            } else {
                viewNode.classList.add('hidden');
            }
        }

        if (navNode) {
            if (tab === targetTabId) {
                navNode.classList.add('text-emerald-400', 'font-black');
                navNode.classList.remove('text-slate-500');
            } else {
                navNode.classList.remove('text-emerald-400', 'font-black');
                navNode.classList.add('text-slate-500');
            }
        }
    });
}

// --- Live Client Simulated Launch Frame ---
function launchGame(gameKey) {
    if (appState.isExcluded) {
        openResponsibleGamingModal();
        return;
    }

    if (!appState.user) {
        alert("🔒 Unauthorized Access: Please sign up or login with a valid Safaricom line identifier to run this betting module.");
        openAuthModal('login');
        return;
    }

    // Advanced dynamic system modal generator representing real-money module hookups
    const alertOverlay = document.createElement('div');
    alertOverlay.className = 'fixed inset-0 bg-slate-950/90 backdrop-blur-md z-[3000] flex flex-col items-center justify-center p-6 text-center';
    alertOverlay.innerHTML = `
        <div class="space-y-6 max-w-sm w-full bg-[#212936] p-6 rounded-2xl border border-slate-800 shadow-2xl force-smooth-rendering">
            <div class="relative w-20 h-20 mx-auto flex items-center justify-center bg-emerald-500/10 rounded-full border border-emerald-500/20">
                <i class="fa-solid fa-gamepad text-3xl text-emerald-400 animate-pulse"></i>
            </div>
            <div>
                <h3 class="text-base font-black uppercase text-slate-100 tracking-wider">Syncing Game Node...</h3>
                <p class="text-xs text-slate-400 mt-1 font-mono text-cyan-400">${gameKey.toUpperCase()}_CLUSTER_01</p>
            </div>
            <div class="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                <div class="bg-gradient-to-r from-emerald-500 to-cyan-400 h-1.5 rounded-full w-0" id="game-progress-bar" style="transition: width 2s cubic-bezier(0.25, 1, 0.5, 1)"></div>
            </div>
            <p class="text-[11px] text-slate-500 leading-snug">Allocating secure betting matrix buffers and loading random number seed chains...</p>
        </div>
    `;
    
    document.body.appendChild(alertOverlay);
    
    // Smooth progress bar deployment simulation
    setTimeout(() => {
        const bar = document.getElementById('game-progress-bar');
        if (bar) bar.style.width = '100%';
    }, 50);

    setTimeout(() => {
        alertOverlay.remove();
        alert(`🎮 Live Connection Established: ${gameKey.toUpperCase()} engine is mounted. Your balance of ${appState.balance.toFixed(2)} KES is locked in live sync.`);
    }, 2100);
}

// --- Core Auth Management Controllers ---
let activeAuthMode = 'login';

function openAuthModal(mode) {
    if (appState.isExcluded) return;
    activeAuthMode = mode;
    const modal = document.getElementById('auth-modal');
    const title = document.getElementById('modal-title');
    const btn = document.getElementById('modal-submit-btn');
    
    if (!modal) return;
    
    if (mode === 'signup') {
        title.innerHTML = '<i class="fa-solid fa-user-plus text-emerald-400 mr-1.5"></i>Create Player Profile';
        btn.innerText = 'Register Account';
    } else {
        title.innerHTML = '<i class="fa-solid fa-shield-halved text-cyan-400 mr-1.5"></i>Secure Portal Entry';
        btn.innerText = 'Authorize Verification';
    }
    
    modal.classList.remove('hidden');
}

function closeAuthModal() {
    const modal = document.getElementById('auth-modal');
    if (modal) modal.classList.add('hidden');
}

function handleAuthSubmit() {
    const usernameInput = document.getElementById('auth-username').value.trim();
    const passwordInput = document.getElementById('auth-password').value.trim();

    if (!usernameInput || !passwordInput) {
        alert("⚠️ Input Mismatch: Fields cannot remain blank during identity verification.");
        return;
    }

    // Set mock user profile parameters
    appState.user = usernameInput;
    if (activeAuthMode === 'signup') {
        appState.balance = 250.00; // Registration loyalty bonus credit
        alert("🎉 Success: Profile compiled! 250.00 KES sign-on balance voucher has been injected into your wallet.");
    } else {
        appState.balance = appState.balance > 0 ? appState.balance : 1050.75; // Mock existing balance recovery
        alert("🔐 Authorization Confirmed: Session tokens verified successfully.");
    }

    saveSessionToStorage();
    updateUIElements();
    closeAuthModal();
}

function logout() {
    appState.user = null;
    appState.balance = 0.00;
    saveSessionToStorage();
    updateUIElements();
    switchTab('home');
    alert("🚪 Session Terminated: Profile credentials flushed successfully.");
}

// --- Safaricom M-Pesa Integrated Simulator Matrix ---
function triggerMpesaPush(actionType) {
    if (appState.isExcluded) return;
    if (!appState.user) {
        alert("🔒 Unauthorized: Authenticate your profile before querying the transaction API pipelines.");
        openAuthModal('login');
        return;
    }

    const amountInput = document.getElementById(`${actionType}-amount`).value;
    const phoneInput = document.getElementById(`${actionType}-phone`).value.trim();

    if (!amountInput || parseFloat(amountInput) <= 0) {
        alert("⚠️ Valuation Error: Please allocate a logical currency volume.");
        return;
    }
    if (!phoneInput.startsWith('254') || phoneInput.length < 12) {
        alert("⚠️ Routing Error: Target must conform to standard international Safaricom MSISDN schemas (2547XXXXXXXX).");
        return;
    }

    const parsedVal = parseFloat(amountInput);

    if (actionType === 'deposit') {
        alert(`📲 M-Pesa STK Push Broadcasted: Input your secret service PIN on mobile phone line ${phoneInput} to authorize KES ${parsedVal.toFixed(2)} transfer.`);
        
        // Simulating high-speed automated callback webhook performance
        setTimeout(() => {
            appState.balance += parsedVal;
            saveSessionToStorage();
            updateUIElements();
            alert(`✅ Transaction Completed: Ledger credited with +${parsedVal.toFixed(2)} KES via Safaricom Callback.`);
        }, 3500);

    } else {
        if (parsedVal > appState.balance) {
            alert("❌ Core Overdraft Blocked: Available account balance allocation metrics are insufficient.");
            return;
        }

        alert(`💸 B2C Payout Protocol Sent: Remitting KES ${parsedVal.toFixed(2)} straight to Safaricom endpoint balance of ${phoneInput}.`);
        
        setTimeout(() => {
            appState.balance -= parsedVal;
            saveSessionToStorage();
            updateUIElements();
            alert(`✅ Withdrawal Completed: -${parsedVal.toFixed(2)} KES routed directly to mobile storage.`);
        }, 3000);
    }
}

// --- Responsible Gaming Safety Rails Engine ---
function openResponsibleGamingModal() {
    const modal = document.getElementById('exclusion-modal');
    if (modal) modal.classList.remove('hidden');
}

function closeExclusionModal() {
    if (appState.isExcluded) {
        alert("🔒 Absolute Lockdown Active: You have enforced a mandatory 30-day self-exclusion security ban.");
        return;
    }
    const modal = document.getElementById('exclusion-modal');
    if (modal) modal.classList.add('hidden');
}

function executeSelfExclusion() {
    appState.isExcluded = true;
    // Set expiry stamp to 30 days from now (represented in absolute local time)
    appState.exclusionExpiry = Date.now() + (30 * 24 * 60 * 60 * 1000);
    
    // Wipe profile configurations
    appState.user = null;
    appState.balance = 0.00;
    
    saveSessionToStorage();
    updateUIElements();
    
    const modal = document.getElementById('exclusion-modal');
    if (modal) modal.classList.add('hidden');
    
    checkExclusionSanityGuard();
}

function checkExclusionSanityGuard() {
    if (appState.isExcluded && appState.exclusionExpiry) {
        if (Date.now() >= appState.exclusionExpiry) {
            // Exclusion window expired naturally
            appState.isExcluded = false;
            appState.exclusionExpiry = null;
            saveSessionToStorage();
            return;
        }

        // Lock rendering mechanics absolutely
        document.body.innerHTML = `
            <div class="fixed inset-0 bg-[#0f141d] flex flex-col items-center justify-center p-6 text-center z-[999999] force-smooth-rendering">
                <div class="max-w-xs space-y-6">
                    <i class="fa-solid fa-hand text-6xl text-rose-500 animate-pulse"></i>
                    <h1 class="text-xl font-black text-slate-100 tracking-tight uppercase">Device Target Locked</h1>
                    <p class="text-xs text-slate-400 leading-relaxed">
                        This terminal remains frozen under self-imposed safety exclusion metrics. Access to wagering engines, cluster seed modules, and M-Pesa channels remains locked for addiction mitigation.
                    </p>
                    <div class="p-3 bg-rose-500/5 border border-rose-500/20 rounded-xl text-[11px] text-rose-400 font-mono">
                        Status: ACTIVE_SAFETY_LOCKDOWN
                    </div>
                </div>
            </div>
        `;
    }
}

// --- Peripheral Profile Module Actions ---
function profileAction(actionKey) {
    if (appState.isExcluded) return;
    alert(`⚙️ Parameter Request: Executing secure database routine fetch for [${actionKey.toUpperCase()}].`);
}

// --- Data Synchronization Core Layer ---
function updateUIElements() {
    const balanceNode = document.getElementById('user-balance');
    const authZone = document.getElementById('auth-zone');
    const userZone = document.getElementById('user-zone');
    const headerUser = document.getElementById('header-username');
    const profileName = document.getElementById('profile-name');
    const profileStatus = document.getElementById('profile-status');
    const logoutBtn = document.getElementById('logout-btn');

    if (balanceNode) balanceNode.innerText = appState.balance.toFixed(2);

    if (appState.user) {
        if (authZone) authZone.classList.add('hidden');
        if (userZone) userZone.classList.remove('hidden');
        if (headerUser) headerUser.innerText = appState.user;
        if (profileName) profileName.innerText = `User: ${appState.user}`;
        if (profileStatus) profileStatus.innerHTML = '<span class="text-emerald-400 font-black flex items-center gap-1"><i class="fa-solid fa-circle-check"></i> VIP Level 1 Verified</span>';
        if (logoutBtn) logoutBtn.classList.remove('hidden');
    } else {
        if (authZone) authZone.classList.remove('hidden');
        if (userZone) userZone.classList.add('hidden');
        if (profileName) profileName.innerText = "Guest Session Profile";
        if (profileStatus) profileStatus.innerText = "Unverified Local Memory";
        if (logoutBtn) logoutBtn.classList.add('hidden');
    }
}

function saveSessionToStorage() {
    localStorage.setItem('bet_crash_session', JSON.stringify(appState));
}

function loadSessionFromStorage() {
    const cacheData = localStorage.getItem('bet_crash_session');
    if (cacheData) {
        try {
            const parsed = JSON.parse(cacheData);
            appState = { ...appState, ...parsed };
        } catch (e) {
            console.error("Session re-indexing trace failure:", e);
        }
    }
}

// --- Ambient Marquee UI Initialization ---
function initLiveMarqueeTicker() {
    const marquee = document.querySelector('.marquee-content-wrapper');
    if (marquee) {
        marquee.style.animationPlayState = 'running';
    }
}
  
