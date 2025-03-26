function nextStep(step) {
    document.querySelectorAll('.step').forEach(s => s.style.display = 'none');
    document.getElementById(`step${step}`).style.display = 'block';
}

function prevStep(step) {
    document.querySelectorAll('.step').forEach(s => s.style.display = 'none');
    document.getElementById(`step${step}`).style.display = 'block';
}

function validateFileType(input) {
    const allowedTypes = [
        'application/pdf',      
        'application/msword',   
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
        'image/jpeg',           
        'image/png',          
        'image/webp'         
    ];

    const maxFileSize = 5 * 1024 * 1024; 

    const file = input.files[0];
    
    if (file) {
        if (!allowedTypes.includes(file.type)) {
            showError(input, 'Only PDF, DOC, and image files are allowed');
            input.value = '';
            return false;
        }

        if (file.size > maxFileSize) {
            showError(input, 'File size must be less than 5MB');
            input.value = '';
            return false;
        }

        clearError(input);
        return true;
    }
    return true;
}

document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('input[id="consultationType"]');
    const selectedContainer = document.querySelector('.selected-consultations');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const selectedValues = Array.from(checkboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.value);

            selectedContainer.innerHTML = '';

            selectedValues.forEach(value => {
                const tag = document.createElement('span');
                tag.classList.add('tag');
                tag.textContent = value;

                const removeBtn = document.createElement('button');
                removeBtn.textContent = 'x';
                removeBtn.classList.add('remove-btn');

                removeBtn.onclick = () => {
                    document.querySelector(`input[value="${value}"]`).checked = false;
                    tag.remove();
                };

                tag.appendChild(removeBtn);
                selectedContainer.appendChild(tag);
            });
        });
    });
});


document.addEventListener('DOMContentLoaded', function () {
    flatpickr('input[name="availability"]', {
        mode: 'multiple', 
        dateFormat: 'Y-m-d', 
        minDate: 'today', 
        enableTime: true, 
        time_24hr: true
    });

    flatpickr('input[name="dob"]', {
        dateFormat: 'Y-m-d',
        maxDate: 'today', 
        disableMobile: true 
    });

    flatpickr('input[name="submissionDate"]', {
        dateFormat: 'Y-m-d',
        minDate: 'today',
        disableMobile: true
    });

    flatpickr('input[name="validity"]', {
        dateFormat: 'Y-m-d',
        minDate: 'today',
        disableMobile: true
    });

    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => {
        input.addEventListener('change', function() {
            validateFileType(this);
        });
    });
});

function showError(input, message) {
    const existingError = input.nextElementSibling;
    if (existingError && existingError.classList.contains('error-message')) {
        existingError.remove();
    }

    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.style.color = '#f25b51';
    errorMessage.style.fontSize = '0.8em';
    errorMessage.style.marginTop = '5px';
    errorMessage.textContent = message;

    input.parentNode.insertBefore(errorMessage, input.nextSibling);
}

function clearError(input) {
    const existingError = input.nextElementSibling;
    if (existingError && existingError.classList.contains('error-message')) {
        existingError.remove();
    }
}

// validation
const validators = {
    fullName: function(input) {
        const value = input.value.trim();
        if (value.length < 2) {
            showError(input, 'Name must be at least 2 characters long');
            return false;
        }
        clearError(input);
        return true;
    },
    contact: function(input) {
        const phoneRegex = /^[6-9]\d{9}$/;
        if (!phoneRegex.test(input.value)) {
            showError(input, 'Please enter a valid 10-digit Indian mobile number');
            return false;
        }
        clearError(input);
        return true;
    },
    email: function(input) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value)) {
            showError(input, 'Please enter a valid email address');
            return false;
        }
        clearError(input);
        return true;
    },
    dob: function(input) {
        const selectedDate = new Date(input.value);
        const currentDate = new Date();
        const minAge = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());
        
        if (selectedDate > currentDate) {
            showError(input, 'Date of birth cannot be in the future');
            return false;
        }
        if (selectedDate > minAge) {
            showError(input, 'You must be at least 18 years old');
            return false;
        }
        clearError(input);
        return true;
    },
    experience: function(input) {
        const exp = parseInt(input.value);
        if (isNaN(exp) || exp < 0 || exp > 50) {
            showError(input, 'Please enter a valid years of experience (0-50)');
            return false;
        }
        clearError(input);
        return true;
    },
    fee: function(input) {
        const fee = parseFloat(input.value);
        if (isNaN(fee) || fee < 0 || fee > 10000) {
            showError(input, 'Please enter a valid consultation fee (0-10000)');
            return false;
        }
        clearError(input);
        return true;
    },
    languages: function(input) {
        const langs = input.value.trim();
        if (langs === '' || isNaN(langs) || parseInt(langs) < 1) {
            showError(input, 'Please enter the number of languages spoken');
            return false;
        }
        clearError(input);
        return true;
    },
    bankAccount: function(input) {
        const accountRegex = /^\d{9,18}$/;
        if (!accountRegex.test(input.value)) {
            showError(input, 'Please enter a valid bank account number');
            return false;
        }
        clearError(input);
        return true;
    },
    ifsc: function(input) {
        const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
        if (!ifscRegex.test(input.value)) {
            showError(input, 'Please enter a valid IFSC code');
            return false;
        }
        clearError(input);
        return true;
    },
    bio: function(input) {
        const value = input.value.trim();
        if (value.length < 10 || value.length > 250) {
            showError(input, 'Bio must be between 10 and 250 characters');
            return false;
        }
        clearError(input);
        return true;
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('onboardingForm');
    const steps = document.querySelectorAll('.step');

    const validationFields = [
        'fullName', 'contact', 'email', 'dob', 'experience', 
        'fee', 'languages', 'bankAccount', 'ifsc', 'bio'
    ];

    validationFields.forEach(fieldName => {
        const input = document.querySelector(`[name="${fieldName}"]`);
        if (input) {
            let hasInteracted = false;

            input.addEventListener('focus', () => {
                hasInteracted = false;
            });

            input.addEventListener('blur', () => {
                hasInteracted = true;
                if (input.value) {
                    validators[fieldName](input);
                }
            });

            input.addEventListener('input', () => {
                if (hasInteracted && input.value) {
                    validators[fieldName](input);
                } else {
                    clearError(input);
                }
            });
        }
    });

    // form submission validation
    form.addEventListener('submit', function(event) {
        let isValid = true;

        validationFields.forEach(fieldName => {
            const input = document.querySelector(`[name="${fieldName}"]`);
            if (input) {
                if (!validators[fieldName](input)) {
                    isValid = false;
                }
            }
        });

        if (!isValid) {
            event.preventDefault();
        }
    });
});

// google sheet code
const scriptURL = 'https://script.google.com/macros/s/AKfycbycop0qzob0WEiXMOovhhGjDGPoyj2-pOFM3EKeJhLSBdNXXpkIXsDRIBZGk4kjgobM/exec'
const form = document.getElementById('onboardingForm')

form.addEventListener('submit', e => {
  e.preventDefault()

  const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Submitting...';
  
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
  .then(response => alert("Thank you! Form is submitted" ))
  .then(() => { window.location.reload(); })
  .catch(error => console.error('Error!', error.message))
});