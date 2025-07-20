document.addEventListener('DOMContentLoaded', function() {
    // Animate progress bars when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressFill = entry.target.querySelector('.progress-fill');
                if (progressFill) {
                    const width = progressFill.style.getPropertyValue('--progress');
                    progressFill.style.width = width;
                }
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.cause-card').forEach(card => {
        observer.observe(card);
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.style.display === 'flex') {
                    navLinks.style.display = 'none';
                }
            }
        });
    });

    // Amount selection
    document.querySelectorAll('.amount-option').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.amount-option').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            document.getElementById('amount').value = this.dataset.amount;
        });
    });

    // Form submission
    document.getElementById('donationForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const cause = document.querySelector('input[name="cause"]:checked').value;
        const amount = document.getElementById('amount').value;
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        
        console.log('Donation:', { cause, amount, name, email });
        alert(`Thank you ${name} for your $${amount} donation to ${getCauseName(cause)}!`);
        closeModal();
    });
});

function openDonationModal(cause) {
    const modal = document.getElementById('donationModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    
    // Pre-select cause if specified
    if (cause) {
        document.querySelector(`input[value="${cause}"]`).checked = true;
    }
    
    // Scroll to top of modal
    modal.scrollTop = 0;
}

function closeModal() {
    document.getElementById('donationModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('donationModal');
    if (event.target === modal) {
        closeModal();
    }
}

function getCauseName(value) {
    const causes = {
        education: "Education for All",
        healthcare: "Healthcare Access",
        water: "Clean Water Initiative"
    };
    return causes[value] || "our cause";
}
