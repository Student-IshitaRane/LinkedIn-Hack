
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
    
    // Handle both experience buttons
    const experienceButtons = document.querySelectorAll('#experienceBtn, #experienceBtn2');
    
    experienceButtons.forEach(button => {
        button.addEventListener('click', function() {
            // In a real implementation, this would open your deployed virtual office link
            // For this demo, we'll show a message and simulate loading
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading Virtual Office...';
            button.disabled = true;
            
            setTimeout(() => {
                // Replace this with your actual virtual office URL
                window.open('https://your-virtual-office-deployment-url.com', '_blank');
                
                // Reset button after delay
                setTimeout(() => {
                    button.innerHTML = '<i class="fas fa-vr-cardboard"></i> Experience Virtual Office';
                    button.disabled = false;
                }, 2000);
            }, 1500);
        });
    });
    
    // Add animation to feature cards when they come into view
    const featureCards = document.querySelectorAll('.feature-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
    
    // Sticky header
    const header = document.querySelector('header');
    const headerHeight = header.offsetHeight;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
    
    // Mobile menu toggle (would be fully implemented in production)
    const mobileMenuToggle = document.createElement('div');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    mobileMenuToggle.style.display = 'none'; // Hidden by default
    
    header.appendChild(mobileMenuToggle);
    
    // Show/hide mobile menu toggle based on screen size
    function checkMobileMenu() {
        if (window.innerWidth <= 768) {
            mobileMenuToggle.style.display = 'flex';
            document.querySelector('nav').style.display = 'none';
        } else {
            mobileMenuToggle.style.display = 'none';
            document.querySelector('nav').style.display = 'block';
        }
    }
    
    window.addEventListener('resize', checkMobileMenu);
    checkMobileMenu();
    
    // Mobile menu toggle functionality
    mobileMenuToggle.addEventListener('click', function() {
        const nav = document.querySelector('nav');
        if (nav.style.display === 'none' || !nav.style.display) {
            nav.style.display = 'block';
            mobileMenuToggle.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            nav.style.display = 'none';
            mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
});