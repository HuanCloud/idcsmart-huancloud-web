
document.addEventListener('DOMContentLoaded', function () {
    // Header scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            header.classList.add('bg-white/80', 'dark:bg-black/80', 'shadow-sm');
            header.classList.remove('bg-transparent');
        } else {
            header.classList.remove('bg-white/80', 'dark:bg-black/80', 'shadow-sm');
            header.classList.add('bg-transparent');
        }
    });

    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = mobileMenuToggle.querySelector('.menu-icon');
    const xIcon = mobileMenuToggle.querySelector('.x-icon');

    mobileMenuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        menuIcon.classList.toggle('hidden');
        xIcon.classList.toggle('hidden');
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.mobile-menu-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            menuIcon.classList.remove('hidden');
            xIcon.classList.add('hidden');
        });
    });

    // Theme toggle
    const themeToggles = [document.getElementById('theme-toggle'), document.getElementById('theme-toggle-mobile')];
    const sunIcons = document.querySelectorAll('.sun-icon');
    const moonIcons = document.querySelectorAll('.moon-icon');
    const htmlEl = document.documentElement;

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            htmlEl.classList.add('dark');
            sunIcons.forEach(i => i.classList.remove('hidden'));
            moonIcons.forEach(i => i.classList.add('hidden'));
        } else {
            htmlEl.classList.remove('dark');
            sunIcons.forEach(i => i.classList.add('hidden'));
            moonIcons.forEach(i => i.classList.remove('hidden'));
        }
    };

    const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme(currentTheme);

    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const newTheme = htmlEl.classList.contains('dark') ? 'light' : 'dark';
            localStorage.setItem('theme', newTheme);
            applyTheme(newTheme);
        });
    });


    // Accordion functionality
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
        const trigger = item.querySelector('.accordion-trigger');
        const content = item.querySelector('.accordion-content');
        const icon = trigger.querySelector('svg');

        trigger.addEventListener('click', () => {
            const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

            // Close all other items
            accordionItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false');
                    otherItem.querySelector('.accordion-content').style.maxHeight = 0;
                    otherItem.querySelector('.accordion-trigger svg').style.transform = 'rotate(0deg)';
                }
            });

            if (isExpanded) {
                trigger.setAttribute('aria-expanded', 'false');
                content.style.maxHeight = 0;
                icon.style.transform = 'rotate(0deg)';
            } else {
                trigger.setAttribute('aria-expanded', 'true');
                content.style.maxHeight = content.scrollHeight + 'px';
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });

    // Pricing tabs functionality
    const tabsContainer = document.querySelector('.pricing-tabs');
    const tabsList = tabsContainer.querySelector('.tabs-list');
    const tabButtons = tabsList.querySelectorAll('button');
    const tabContents = tabsContainer.querySelectorAll('.tab-content');

    tabsList.addEventListener('click', (e) => {
        const clickedTab = e.target.closest('button');
        if (!clickedTab) return;

        const targetTab = clickedTab.dataset.tab;

        tabButtons.forEach(button => {
            button.setAttribute('aria-selected', button === clickedTab);
        });

        tabContents.forEach(content => {
            if (content.id === targetTab) {
                content.classList.remove('hidden');
            } else {
                content.classList.add('hidden');
            }
        });
    });

    // Set initial active tab
    tabButtons[0].setAttribute('aria-selected', 'true');

    // Mobile dropdown menu toggle
    const productDropdown = document.querySelector('.mobile-menu .group');
    if (productDropdown) {
        const button = productDropdown.querySelector('button');
        const dropdown = productDropdown.querySelector('.absolute');

        button.addEventListener('click', function (e) {
            e.preventDefault();
            const isOpen = dropdown.classList.contains('opacity-100');

            if (isOpen) {
                dropdown.classList.remove('opacity-100', 'visible');
                dropdown.classList.add('opacity-0', 'invisible');
            } else {
                dropdown.classList.remove('opacity-0', 'invisible');
                dropdown.classList.add('opacity-100', 'visible');
            }
        });
    }
});