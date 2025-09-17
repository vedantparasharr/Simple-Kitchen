document.addEventListener('DOMContentLoaded', () => {
    // Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const contactBtn = document.querySelector('.nav-center > .contact');
    let contactCloned = null;

    // Function to handle contact button positioning
    function handleContactButton() {
        if (window.innerWidth <= 768) {
            // Mobile: Move contact button into nav-links
            if (contactBtn && !contactCloned) {
                contactCloned = contactBtn.cloneNode(true);
                contactCloned.classList.add('mobile-contact');
                navLinks.appendChild(contactCloned);
                contactBtn.style.display = 'none';
            }
        } else {
            // Desktop: Restore original contact button
            if (contactCloned) {
                contactCloned.remove();
                contactCloned = null;
            }
            if (contactBtn) {
                contactBtn.style.display = 'block';
            }
        }
    }

    // Initialize contact button position
    if (navToggle && navLinks && contactBtn) {
        handleContactButton();

        // Handle window resize
        window.addEventListener('resize', handleContactButton);

        // Toggle navigation
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close nav when clicking on a link
        navLinks.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });

        // Close nav when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-header')) {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }

    // Sidebar Toggle
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.class-container') || document.querySelector('.recipe-sidebar');

    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            sidebarToggle.classList.toggle('active');
            sidebar.classList.toggle('active');
        });

        // Close sidebar when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.sidebar-toggle') &&
                !e.target.closest('.class-container') &&
                !e.target.closest('.recipe-sidebar')) {
                sidebarToggle.classList.remove('active');
                sidebar.classList.remove('active');
            }
        });

        // Close sidebar when clicking on sidebar links
        const sidebarLinks = document.querySelectorAll('.tags-list a, .recipe-sidebar a');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', () => {
                sidebarToggle.classList.remove('active');
                sidebar.classList.remove('active');
            });
        });
    }

    // Close menus on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close navigation
            if (navToggle && navLinks) {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
            // Close sidebar
            if (sidebarToggle && sidebar) {
                sidebarToggle.classList.remove('active');
                sidebar.classList.remove('active');
            }
        }
    });
});
