
const FAB_HTML = `
<!-- FAB Button -->
<div class="fab-container">
    <button class="brutalist-fab" id="fab-trigger" aria-label="Open Command Palette">
        <div class="fab-icon-wrapper">
            <svg class="fab-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3z"/>
            </svg>
        </div>
    </button>
</div>

<!-- Command Palette Backdrop -->
<div class="cmd-backdrop" id="cmd-backdrop">
    <div class="cmd-container">
        <div class="cmd-surface">
            <!-- Input -->
            <div class="cmd-input-wrapper">
                <svg class="cmd-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                <input type="text" class="cmd-input" id="cmd-input" placeholder="Type a command or search...">
                <span class="cmd-esc">esc</span>
            </div>

            <!-- List -->
            <div class="cmd-list" id="cmd-list">

                <!-- Pages Group -->
                <div class="cmd-group">
                    <div class="cmd-group-heading">Pages</div>
                    


                    <a href="index.html" class="cmd-item">
                        <div class="cmd-item-left">
                            <svg class="cmd-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                            <span>Home</span>
                        </div>
                        <span class="cmd-shortcut">H</span>
                    </a>
                    
                    <a href="index.html#faq" class="cmd-item">
                        <div class="cmd-item-left">
                            <svg class="cmd-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                                <line x1="12" y1="17" x2="12.01" y2="17"></line>
                            </svg>
                            <span>FAQ</span>
                        </div>
                        <span class="cmd-shortcut">Q</span>
                    </a>
                    
                    <a href="need-blood.html" class="cmd-item">
                        <div class="cmd-item-left">
                            <svg class="cmd-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                            <span>Find Donors</span>
                        </div>
                        <span class="cmd-shortcut">F</span>
                    </a>
                    
                    <a href="donate.html" class="cmd-item">
                        <div class="cmd-item-left">
                            <svg class="cmd-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                            <span>Donate</span>
                        </div>
                        <span class="cmd-shortcut">D</span>
                    </a>
                    
                    <a href="dashboard.html" class="cmd-item">
                        <div class="cmd-item-left">
                             <svg class="cmd-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
                            <span>Dashboard</span>
                        </div>
                        <span class="cmd-shortcut">B</span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>
`;

document.addEventListener('DOMContentLoaded', () => {

    const componentPath = 'components/fab.html';


    if (document.querySelector('.fab-container') || document.querySelector('.cmd-backdrop')) {
        initCommandPalette();
        return;
    }

    fetch(componentPath)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.text();
        })
        .then(html => {
            injectHtml(html);
        })
        .catch(err => {
            console.log('Fetching fab.html failed. Using fallback.');
            injectHtml(FAB_HTML);
        });
});

function injectHtml(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    document.body.appendChild(div);


    setTimeout(initCommandPalette, 100);
}

function initCommandPalette() {
    const fabButton = document.getElementById('fab-trigger');
    const backdrop = document.getElementById('cmd-backdrop');

    if (!fabButton || !backdrop) {
        console.error('Command Palette elements not found');
        return;
    }

    const input = document.getElementById('cmd-input');
    const list = document.getElementById('cmd-list');
    const items = list.querySelectorAll('.cmd-item');


    let isOpen = false;


    function togglePalette() {
        isOpen = !isOpen;
        if (isOpen) {
            backdrop.classList.add('open');
            document.body.style.overflow = 'hidden';
            input.value = '';
            filterItems('');
            setTimeout(() => input.focus(), 50);
        } else {
            backdrop.classList.remove('open');
            document.body.style.overflow = '';
        }
    }


    fabButton.addEventListener('click', (e) => {
        e.stopPropagation();
        togglePalette();
    });

    backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
            togglePalette();
        }
    });




    document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            if (!isOpen) togglePalette();
        }
        if (e.key === 'Escape' && isOpen) {
            togglePalette();
        }


        if (isOpen && document.activeElement === input && e.altKey) {

        }
    });


    input.addEventListener('input', (e) => {
        filterItems(e.target.value.toLowerCase());
    });

    function filterItems(query) {
        items.forEach(item => {

            const text = item.textContent.toLowerCase();
            if (text.includes(query)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    }
}
