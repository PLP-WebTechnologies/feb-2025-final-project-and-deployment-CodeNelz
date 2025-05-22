// Initialize the contact page
document.addEventListener('DOMContentLoaded', function() {
    // Add event listener to contact form
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (validateForm()) {
                // Submit form (in a real application, this would send data to a server)
                submitForm();
            }
        });
    }
});

// Validate form
function validateForm() {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const subjectError = document.getElementById('subject-error');
    const messageError = document.getElementById('message-error');
    
    let isValid = true;
    
    // Reset error messages
    nameError.textContent = '';
    emailError.textContent = '';
    subjectError.textContent = '';
    messageError.textContent = '';
    
    // Validate name
    if (nameInput.value.trim() === '') {
        nameError.textContent = 'Please enter your name';
        isValid = false;
    }
    
    // Validate email
    if (emailInput.value.trim() === '') {
        emailError.textContent = 'Please enter your email';
        isValid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
        emailError.textContent = 'Please enter a valid email address';
        isValid = false;
    }
    
    // Validate subject
    if (subjectInput.value.trim() === '') {
        subjectError.textContent = 'Please enter a subject';
        isValid = false;
    }
    
    // Validate message
    if (messageInput.value.trim() === '') {
        messageError.textContent = 'Please enter your message';
        isValid = false;
    }
    
    return isValid;
}

// Check if email is valid
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Submit form
function submitForm() {
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    
    if (!contactForm || !formSuccess) return;
    
    // Hide form and show success message
    contactForm.style.display = 'none';
    formSuccess.style.display = 'block';
    
    // In a real application, you would send the form data to a server here
}
