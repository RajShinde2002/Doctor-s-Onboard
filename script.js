const Validators = {

    fullName: function(value) {
        const nameRegex = /^[A-Za-z\s]{3,}$/;
        if (!value.trim()) return "Full Name is required.";
        if (!nameRegex.test(value)) return "Please enter a valid full name (minimum 4 characters, letters only).";
        if (value.split(' ').length < 2) return "Please enter both first and last name.";
        return '';
    },

    accountHolder: function(value) {
        const nameRegex = /^[A-Za-z\s]{3,}$/;
        if (!value.trim()) return "Full Name is required.";
        if (!nameRegex.test(value)) return "Please enter a valid account holder's name (minimum 3 characters, letters only).";
        if (value.split(' ').length < 2) return "Please enter both first and last name.";
        return '';
    },

    signature: function(value) {
        const nameRegex = /^[A-Za-z\s]{3,}$/;
        if (!value.trim()) return "Full Name is required.";
        if (!nameRegex.test(value)) return "Please enter a valid account holder's name (minimum 3 characters, letters only).";
        if (value.split(' ').length < 2) return "Please enter both first and last name.";
        return '';
    },

    bankName: function(value) {
        const nameRegex = /^[A-Za-z\s]{3,}$/;
        if (!value.trim()) return "Bank Name is required.";
        return '';
    },

    affiliation: function(value) {
        const nameRegex = /^[A-Za-z\s]{3,}$/;
        if (!value.trim()) return "Current Clinic/Hospital name is required.";
        return '';
    },

    dob: function(value) {
        if (!value) return "Date of Birth is required.";
        
        const selectedDate = new Date(value);
        const currentDate = new Date();
        
        let age = currentDate.getFullYear() - selectedDate.getFullYear();
        const monthDiff = currentDate.getMonth() - selectedDate.getMonth();
        const dayDiff = currentDate.getDate() - selectedDate.getDate();
        
        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
        }
        
        if (age < 18) return "You must be at least 18 years old to register.";
        if (age > 100) return "Please enter a valid birth date.";
        return '';
    },

    contact: function(value) {
        const phoneRegex = /^[6-9]\d{9}$/;
        if (!value) return "Contact Number is required.";
        if (!phoneRegex.test(value)) return "Please enter a valid 10-digit mobile number starting with 6-9.";
        return '';
    },

    email: function(value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) return "Email Address is required.";
        if (!emailRegex.test(value)) return "Please enter a valid email address.";
        return '';
    },

    Gender: function(value) {
        if (!value) return "Gender is required.";
        return '';
    },

    expertise: function(value) {
        if (!value) return "Expertise is required.";
        return '';
    },

    specialization: function(value) {
        if (!value) return "Specialization is required.";
        return '';
    },

    registration: function(value) {
        const regexPattern = /^[A-Z]{2}\d{6}$/;
        if (!value) return "Medical Registration Number is required.";
        if (!regexPattern.test(value)) return "Invalid Registration Number. Format should be 2 uppercase letters followed by 6 digits.";
        return '';
    },

    experience: function(value) {
        if (!value) return "Years of Experience is required.";
        const exp = parseInt(value);
        if (isNaN(exp) || exp < 0) return "Please enter a valid number of years.";
        if (exp > 50) return "Years of experience seems unrealistic.";
        return '';
    },

    fee: function(value) {
        if (!value) return "Consultation Fee is required.";
        const feeAmount = parseInt(value);
        if (isNaN(feeAmount) || feeAmount < 0) return "Please enter a valid fee amount.";
        if (feeAmount > 10000) return "Consultation fee seems unusually high.";
        return '';
    },

    bankAccount: function(value) {
        const accountRegex = /^\d{9,18}$/;
        if (!value) return "Bank Account Number is required.";
        if (!accountRegex.test(value)) return "Invalid Bank Account Number (9-18 digits).";
        return '';
    },

    ifsc: function(value) {
        const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
        if (!value) return "IFSC Code is required.";
        if (!ifscRegex.test(value)) return "Invalid IFSC Code format.";
        return '';
    },

    bio: function(value) {
        if (!value.trim()) return "Short Bio is required.";
        if (value.length < 50) return "Bio should be at least 50 characters long.";
        if (value.length > 250) return "Bio should not exceed 250 characters.";
        return '';
    },

    languages: function(value) {
        if (!value) return "Languages Spoken is required.";
        const langCount = parseInt(value);
        if (isNaN(langCount) || langCount < 1) return "Please enter a valid number of languages.";
        if (langCount > 10) return "Number of languages seems unrealistic.";
        return '';
    },

    validity: function(value) {
        if (!value) return "License Validity Period is required.";
        
        const selectedDate = new Date(value);
        const currentDate = new Date();
        
        if (selectedDate < currentDate) {
            return "License validity date must be in the future.";
        }
        
        const maxValidityDate = new Date();
        maxValidityDate.setFullYear(maxValidityDate.getFullYear() + 5);
        
        if (selectedDate > maxValidityDate) {
            return "License validity cannot exceed 5 years from today.";
        }
        
        return '';
    },

    availability: function(value) {
        if (!value) return "Availability dates are required.";
        
        const dates = value.split(', ');
        
        if (dates.length === 0) {
            return "Please select at least one availability date.";
        }
        
        for (let dateStr of dates) {
            const selectedDate = new Date(dateStr);
            const currentDate = new Date();
            
            if (selectedDate < currentDate) {
                return "All availability dates must be in the future.";
            }
            
            const maxAvailabilityDate = new Date();
            maxAvailabilityDate.setMonth(maxAvailabilityDate.getMonth() + 6);
            
            if (selectedDate > maxAvailabilityDate) {
                return "Availability dates cannot be more than 6 months in the future.";
            }
        }
        
        return '';
    },

    submissionDate: function(value) {
        if (!value) return "Submission Date is required.";
        
        const selectedDate = new Date(value);
        const currentDate = new Date();
        
        if (selectedDate < currentDate) {
            return "Submission date cannot be in the past.";
        }
        
        const maxSubmissionDate = new Date();
        maxSubmissionDate.setMonth(maxSubmissionDate.getMonth() + 3);
        
        if (selectedDate > maxSubmissionDate) {
            return "Submission date cannot be more than 3 months in the future.";
        }
        
        return '';
    }
};

function showError(input, errorMessage) {
    const existingError = input.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = errorMessage;
    errorElement.style.color = 'rgb(242, 91, 81)';
    errorElement.style.fontSize = '0.8em';
    errorElement.style.marginTop = '5px';
    
    input.classList.add('error');
    input.parentNode.insertBefore(errorElement, input.nextSibling);
}

function clearError(input) {
    input.classList.remove('error');
    const errorElement = input.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

function validateStep(currentStepNumber) {
    const currentStep = document.getElementById(`step${currentStepNumber}`);
    const requiredInputs = currentStep.querySelectorAll('[required]');
    let isValid = true;

    currentStep.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
    currentStep.querySelectorAll('.error-message').forEach(el => el.remove());

    requiredInputs.forEach(input => {
        let errorMessage = '';

        switch(input.name) {
            case 'fullName':
                errorMessage = Validators.fullName(input.value);
                break;
            case 'dob':
                errorMessage = Validators.dob(input.value);
                break;
            case 'contact':
                errorMessage = Validators.contact(input.value);
                break;
            case 'email':
                errorMessage = Validators.email(input.value);
                break;
            case 'specialization':
                errorMessage = Validators.specialization(input.value);
                break;
            case 'accountHolder':
                errorMessage = Validators.accountHolder(input.value);
                break;
            case 'affiliation':
                errorMessage = Validators.affiliation(input.value);
                break;
            case 'bankName':
                errorMessage = Validators.bankName(input.value);
                break;
            case 'expertise':
                errorMessage = Validators.expertise(input.value);
                break
            case 'Gender':
                errorMessage = Validators.Gender(input.value);
                break;
            case 'registration':
                errorMessage = Validators.registration(input.value);
                break;
            case 'validity':
                errorMessage = Validators.validity(input.value);
                break;
            case 'availability':
                errorMessage = Validators.availability(input.value);
                break;
            case 'submissionDate':
                errorMessage = Validators.submissionDate(input.value);
                break;
            case 'experience':
                errorMessage = Validators.experience(input.value);
                break;
            case 'fee':
                errorMessage = Validators.fee(input.value);
                break;
            case 'signature':
                errorMessage = Validators.signature(input.value);
                break;
            case 'bankAccount':
                errorMessage = Validators.bankAccount(input.value);
                break;
            case 'ifsc':
                errorMessage = Validators.ifsc(input.value);
                break;
            case 'bio':
                errorMessage = Validators.bio(input.value);
                break;
            case 'languages':
                errorMessage = Validators.languages(input.value);
                break;
            default:
                // for other required fields, check if they're empty
                if (!input.value.trim()) {
                    errorMessage = `${input.name} is required.`;
                }
        }

        // checkbox group for consultation types
        // if (input.name.startsWith('consultationType')) {
        //     const checkboxGroup = input.closest('.checkbox-container');
        //     const checkedBoxes = checkboxGroup.querySelectorAll('input[type="checkbox"]:checked');
            
        //     if (checkedBoxes.length === 0) {
        //         errorMessage = "Please select at least one consultation type.";
        //         checkboxGroup.classList.add('error');
        //     }
        // }

        if (errorMessage) {
            if (input.name.startsWith('consultationType')) {
                showError(input.closest('.checkbox-container'), errorMessage);
            } else {
                showError(input, errorMessage);
            }
            isValid = false;
        }
    });

    return isValid;
}

function nextStep(stepNumber) {
    const currentStepNumber = stepNumber - 1;
    if (!validateStep(currentStepNumber)) {
        return;
    }

    window.scrollTo({top: 0});
    
    const steps = document.querySelectorAll('.step');
    steps.forEach(step => {
        step.style.display = 'none';
    });
    
    document.getElementById(`step${stepNumber}`).style.display = 'block';
}

function prevStep(stepNumber) {
    const steps = document.querySelectorAll('.step');
    steps.forEach(step => {
        step.style.display = 'none';
    });
    
    document.getElementById(`step${stepNumber}`).style.display = 'block';
}

document.getElementById('onboardingForm').addEventListener('input', function(e) {
    if (e.target.hasAttribute('required') || e.target.closest('.checkbox-container')) {
        clearTimeout(e.target.validationTimer);
        e.target.validationTimer = setTimeout(() => {
            if (e.target.name.startsWith('consultationType')) {
                const checkboxGroup = e.target.closest('.checkbox-container');
                const checkedBoxes = checkboxGroup.querySelectorAll('input[type="checkbox"]:checked');
                
                if (checkedBoxes.length === 0) {
                    showError(checkboxGroup, "Please select at least one consultation type.");
                } else {
                    checkboxGroup.classList.remove('error');
                    const errorMsg = checkboxGroup.querySelector('.error-message');
                    if (errorMsg) errorMsg.remove();
                }
            } 
            else {
                const validatorFunc = Validators[e.target.name];
                if (validatorFunc) {
                    const errorMessage = validatorFunc(e.target.value);
                    if (errorMessage) {
                        showError(e.target, errorMessage);
                    } else {
                        clearError(e.target);
                    }
                }
            }
        }, 300);
    }
});

const styleTag = document.createElement('style');
styleTag.textContent = `
    input.error, select.error, textarea.error {
        border: 2px solid rgb(242, 91, 81); important;
        animation: shake 0.3s;
    }
    .checkbox-container.error {
        border: 2px solid rgb(242, 91, 81);;
        padding: 10px;
        border-radius: 4px;
    }
    @keyframes shake {
        0% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        50% { transform: translateX(10px); }
        75% { transform: translateX(-10px); }
        100% { transform: translateX(0); }
    }
`;
document.head.appendChild(styleTag);

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

// google sheet submission
const scriptURL = 'https://script.google.com/macros/s/AKfycbycop0qzob0WEiXMOovhhGjDGPoyj2-pOFM3EKeJhLSBdNXXpkIXsDRIBZGk4kjgobM/exec'
const form = document.getElementById('onboardingForm')

form.addEventListener('submit', e => {
  e.preventDefault();

  if (!validateStep(6)) {
    return;
}

  const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Submitting...';
  
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
  .then(response => alert("Thank you! Form is submitted" ))
  .then(() => { window.location.reload(); })
  .catch(error => console.error('Error!', error.message))
});