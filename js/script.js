
// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Button click handlers (with null checks)
const btnPrimary = document.querySelector('.btn-primary');
if (btnPrimary) {
    btnPrimary.addEventListener('click', function () {
        // Redirecting to need-blood.html for Find Donors makes more sense now
        window.location.href = 'need-blood.html';
    });
}

const btnSecondary = document.querySelector('.btn-secondary');
if (btnSecondary) {
    btnSecondary.addEventListener('click', function () {
        // Redirect to donate page
        window.location.href = 'donate.html';
    });
}

const navBtn = document.querySelector('.nav-btn');
if (navBtn) {
    navBtn.addEventListener('click', function () {
        alert('Sign Up feature coming soon!');
    });
}


// FAQ Accordion - Premium Logic
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        if (!question || !answer) return;

        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');

            // Close all other items first
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherBtn = otherItem.querySelector('.faq-question');
                    if (otherAnswer) otherAnswer.style.maxHeight = null;
                    if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
                    if (otherAnswer) otherAnswer.setAttribute('aria-hidden', 'true');
                }
            });

            // Toggle current item
            if (isOpen) {
                item.classList.remove('active');
                answer.style.maxHeight = null;
                question.setAttribute('aria-expanded', 'false');
                answer.setAttribute('aria-hidden', 'true');
            } else {
                item.classList.add('active');
                // Set max-height to scrollHeight for smooth animation
                answer.style.maxHeight = answer.scrollHeight + "px";
                question.setAttribute('aria-expanded', 'true');
                answer.setAttribute('aria-hidden', 'false');
            }
        });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFAQ);
} else {
    initFAQ();
}


// Donate Form Logic
function initDonateForm() {
    const form = document.getElementById('donate-form');
    if (!form) return;

    const submitBtn = document.getElementById('donate-submit-btn');
    if (!submitBtn) return;

    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');

    // Success View Elements
    const successSection = document.getElementById('donate-success');
    const contentSection = document.getElementById('donate-content');
    const successName = document.getElementById('success-name');
    const successBlood = document.getElementById('success-blood');
    const successPhone = document.getElementById('success-phone');
    const successCity = document.getElementById('success-city');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // 1. Show Loading
        submitBtn.disabled = true;
        if (btnText) btnText.style.display = 'none';
        if (btnLoader) {
            btnLoader.classList.remove('hidden');
            btnLoader.style.display = 'flex'; // Ensure flex for centering
        }

        // 2. Simulate API Call
        setTimeout(() => {
            // Get values
            const formData = {
                name: document.getElementById('full-name').value,
                blood: document.getElementById('blood-group').value,
                phone: document.getElementById('phone').value,
                city: document.getElementById('city').value
            };

            // 3. Populate Success
            if (successName) successName.textContent = formData.name;
            if (successBlood) successBlood.textContent = formData.blood;
            if (successPhone) successPhone.textContent = formData.phone;
            if (successCity) successCity.textContent = formData.city;

            // 4. Hide Form / Show Success
            if (contentSection) contentSection.classList.add('hidden');
            if (successSection) successSection.classList.remove('hidden');

            // Scroll to top of section
            const donateSection = document.getElementById('donate');
            if (donateSection) donateSection.scrollIntoView({ behavior: 'smooth' });

        }, 1500);
    });
}

// Initialize Donate Form on load
document.addEventListener('DOMContentLoaded', initDonateForm);

// Need Blood Search Logic - React Port
// mockDonors is loaded from ../data/mockDonors.js

function initNeedBloodSearch() {
    const form = document.getElementById('search-form');
    if (!form) return;

    // Key Elements
    const searchBtn = document.getElementById('search-btn');
    const btnText = searchBtn ? searchBtn.querySelector('.btn-text') : null;
    const btnLoader = searchBtn ? searchBtn.querySelector('.btn-loader') : null;

    const initialState = document.getElementById('initial-state');
    const loadingState = document.getElementById('loading-state');
    const resultsContainer = document.getElementById('results-container');
    const noResults = document.getElementById('no-results');
    const donorsList = document.getElementById('donors-list');
    const donorCount = document.getElementById('donor-count');
    const filterBadge = document.getElementById('active-filter-badge');

    const rangeInput = document.getElementById('radius');
    const rangeValue = document.querySelector('.slider-value');

    // Slider Logic with dynamic track fill
    function updateSliderFill(slider) {
        const min = slider.min || 5;
        const max = slider.max || 50;
        const value = slider.value;
        const percentage = ((value - min) / (max - min)) * 100;
        slider.style.background = `linear-gradient(to right, #1e4620 0%, #1e4620 ${percentage}%, #E5E7EB ${percentage}%, #E5E7EB 100%)`;
    }

    if (rangeInput && rangeValue) {
        // Initialize on load
        updateSliderFill(rangeInput);

        rangeInput.addEventListener('input', (e) => {
            rangeValue.textContent = `${e.target.value} km`;
            updateSliderFill(e.target);
        });
    }

    // Handle Search
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get Values
        const bloodGroup = document.getElementById('blood-group').value;
        const city = document.getElementById('city').value;
        const radius = rangeInput ? parseInt(rangeInput.value) : 25;

        // --- STATE: SEARCHING ---
        // 1. Update Button State
        if (searchBtn) searchBtn.disabled = true;
        if (btnText) btnText.style.display = 'none';
        if (btnLoader) {
            btnLoader.style.display = 'flex';
            btnLoader.classList.remove('hidden');
        }

        // 2. Update UI Areas
        if (initialState) initialState.classList.add('hidden');
        if (resultsContainer) resultsContainer.classList.add('hidden');
        if (noResults) noResults.classList.add('hidden');
        if (loadingState) loadingState.classList.remove('hidden');

        // 3. Simulate API Delay (1500ms)
        setTimeout(() => {
            // --- STATE: SEARCHED ---
            if (loadingState) loadingState.classList.add('hidden');
            if (searchBtn) searchBtn.disabled = false;
            if (btnText) btnText.style.display = 'flex';
            if (btnLoader) {
                btnLoader.style.display = 'none';
                btnLoader.classList.add('hidden');
            }

            const donorsData = window.mockDonors || [];

            // Filtering Logic
            let results = [...donorsData];

            if (bloodGroup) {
                results = results.filter(d => d.bloodGroup === bloodGroup);
            }
            if (city) { // React Logic: city.toLowerCase().includes(city.toLowerCase())
                results = results.filter(d => d.city.toLowerCase().includes(city.toLowerCase()));
            }

            // Radius logic
            results = results.filter(d => d.distance <= radius);

            // Render Results
            if (results.length > 0) {
                if (donorsList) {
                    donorsList.innerHTML = results.map((donor, index) => `
                  <div class="donor-card animate-fade-in" style="animation-delay: ${Math.min(index * 0.05, 1)}s">
                    <div class="card-left">
                        <div class="avatar-circle">
                             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                        </div>
                        <div class="info-content">
                            <h3 class="donor-name">${donor.name}</h3>
                            <div class="info-row">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                    <circle cx="12" cy="10" r="3"></circle>
                                </svg>
                                <span>${donor.distance} km away</span>
                            </div>
                            <div class="info-row">
                                <span class="status-badge">Available</span>
                                <span>${donor.city}</span>
                            </div>
                             <div class="info-row">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                </svg>
                                <span>${donor.phone}</span>
                            </div>
                        </div>
                    </div>
                    <div class="card-right">
                        <div class="blood-badge">
                            ${donor.bloodGroup}
                        </div>
                        <a href="tel:${donor.phone}" class="btn-call-now">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                 <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                            </svg>
                            Call Now
                        </a>
                    </div>
                </div>
              `).join('');
                }

                // Update Header
                if (donorCount) donorCount.textContent = results.length;
                if (filterBadge) {
                    if (bloodGroup) {
                        filterBadge.textContent = bloodGroup;
                        filterBadge.classList.remove('hidden');
                    } else {
                        filterBadge.classList.add('hidden');
                    }
                }

                if (resultsContainer) resultsContainer.classList.remove('hidden');
            } else {
                // Show No Results
                if (noResults) noResults.classList.remove('hidden');
            }

        }, 1500);
    });
}

function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

// Initialize logic
document.addEventListener('DOMContentLoaded', initNeedBloodSearch);

// Custom Dropdown Logic
function initCustomDropdowns() {
    const dropdowns = document.querySelectorAll('.custom-dropdown');

    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('.dropdown-trigger');
        const menu = dropdown.querySelector('.dropdown-menu');
        const items = dropdown.querySelectorAll('.dropdown-item');
        const hiddenInput = dropdown.querySelector('input[type="hidden"]');
        const valueDisplay = dropdown.querySelector('.dropdown-value');

        if (!trigger || !menu) return;

        // Toggle dropdown
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = dropdown.classList.contains('open');

            // Close all other dropdowns
            document.querySelectorAll('.custom-dropdown.open').forEach(d => {
                if (d !== dropdown) {
                    d.classList.remove('open');
                    d.querySelector('.dropdown-trigger').setAttribute('aria-expanded', 'false');
                }
            });

            // Toggle current dropdown
            dropdown.classList.toggle('open');
            trigger.setAttribute('aria-expanded', !isOpen);
        });

        // Handle item selection
        items.forEach(item => {
            item.addEventListener('click', () => {
                const value = item.dataset.value;
                const text = item.textContent;

                // Update hidden input
                if (hiddenInput) hiddenInput.value = value;

                // Update display text
                if (valueDisplay) {
                    valueDisplay.textContent = text;
                    if (value) {
                        valueDisplay.classList.add('has-value');
                    } else {
                        valueDisplay.classList.remove('has-value');
                    }
                }

                // Update selected state
                items.forEach(i => i.classList.remove('selected'));
                item.classList.add('selected');

                // Close dropdown
                dropdown.classList.remove('open');
                trigger.setAttribute('aria-expanded', 'false');
            });
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.custom-dropdown')) {
            document.querySelectorAll('.custom-dropdown.open').forEach(dropdown => {
                dropdown.classList.remove('open');
                dropdown.querySelector('.dropdown-trigger').setAttribute('aria-expanded', 'false');
            });
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.custom-dropdown.open').forEach(dropdown => {
                dropdown.classList.remove('open');
                dropdown.querySelector('.dropdown-trigger').setAttribute('aria-expanded', 'false');
            });
        }
    });
}

// Initialize custom dropdowns
document.addEventListener('DOMContentLoaded', initCustomDropdowns);

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function () {
    const menuBtn = document.querySelector('.menu-button');
    const navMenuWrapper = document.querySelector('.nav-menu-wrapper');

    if (menuBtn && navMenuWrapper) {
        menuBtn.addEventListener('click', function () {
            navMenuWrapper.classList.toggle('open');
            const isOpen = navMenuWrapper.classList.contains('open');
            menuBtn.setAttribute('aria-expanded', isOpen);
        });
    }
});

// Floating Image Animation (GPU Accelerated)
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll(".floating-image");

    if (images.length > 0) {
        images.forEach((img, index) => {
            let y = 0;
            // Alternate direction for a more organic feel
            let direction = index % 2 === 0 ? 1 : -1;

            function animate() {
                y += direction * 0.3;

                if (y > 12 || y < -12) direction *= -1;

                img.style.transform = `translate3d(0px, ${y}px, 0px)`;

                requestAnimationFrame(animate);
            }

            animate();
        });
    }
});
