
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const showPassword = document.getElementById('show-password');
const showPassword2 = document.getElementById('show-password2');

// Define an array of input fields
const inputFields = [username, email, password, password2];

// Show error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Show success state
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// Validate email format
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(input.value)) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}

// Check for required fields
function checkRequired(inputArray) {
    inputArray.forEach(function(input) {
    if (input.value.trim() === '') {
      showError(input, `${capFirstLet(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

function checkPasswordMatch(input1, input2) {
  if (input2.value === '' || input1.value !== input2.value) {
    showError(input2, 'Password do not match');
  } else {
    showSuccess(input2);
  }
}

// Check the length of username and password
function checkLength(input, min, max) {
  if (input.value.length < min || input.value.length > max) {
    showError(input, `${capFirstLet(input)} must be ${min}-${max} characters`);
  } else {
    showSuccess(input);
  }
}

// Capitalize the first letter of a string
function capFirstLet(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Function to handle input event in the password field
function handlePasswordInput() {
  toggleEyeIconVisibility();
}

// Function to toggle the visibility of the eye icon
function toggleEyeIconVisibility() {
  showPassword.style.visibility = password.value.trim() === '' ? 'hidden' : 'visible';
  showPassword2.style.visibility = password2.value.trim() === '' ? 'hidden' : 'visible';
}

// Function to toggle the password visibility
function togglePasswordVisibility() {
  const type = password.type === 'password' ? 'text' : 'password';
  password.type = type;
  showPassword.classList.toggle('fa-eye');
  showPassword.classList.toggle('fa-eye-slash');
}

// Function to toggle the password2 visibility
function togglePassword2Visibility() {
  const type = password2.type === 'password' ? 'text' : 'password';
  password2.type = type;
  showPassword2.classList.toggle('fa-eye');
  showPassword2.classList.toggle('fa-eye-slash');
}

// Add input event listeners to the password fields
password.addEventListener('input', handlePasswordInput);
password2.addEventListener('input', handlePasswordInput);

// Add click event listeners to the eye icons
showPassword.addEventListener('click', togglePasswordVisibility);
showPassword2.addEventListener('click', togglePassword2Visibility);

// Initial visibility check for the eye icons
toggleEyeIconVisibility();



// Add event listeners to input fields for real-time validation
inputFields.forEach(function(input) {
  input.addEventListener('input', function() {
    if (input === username) {
      checkLength(input, 6, 10);
    } else if (input === email) {
      checkEmail(input);
    } else if (input === password) {
      checkLength(input, 8, 15);
    } else if (input === password2) {
      checkPasswordMatch(password, password2);
      if (password.value.length < 8) {
        checkPasswordMatch(password, password2);
        showError(password2, 'Password must be 8-15 characters');
      }
    }
  });
});


// Event listener for form submission
form.addEventListener('submit', function(e) {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 6, 10);
  checkLength(password, 8, 15);
  checkLength(password2, 8, 15);
  checkEmail(email);
  checkPasswordMatch(password, password2);
});
