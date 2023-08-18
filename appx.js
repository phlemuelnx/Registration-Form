const password = document.getElementById('password');
const showPassword = document.getElementById('show-password');

// Function to handle input event in the password field
function handlePasswordInput() {
  toggleEyeIconVisibility();
}

// Function to toggle the visibility of the eye icon
function toggleEyeIconVisibility() {
  if (password.value.trim() === '') {
    showPassword.style.visibility = 'hidden';
  } else {
    showPassword.style.visibility = 'visible';
  }
}

// Function to toggle the password visibility
function togglePasswordVisibility() {
  const type = password.type === 'password' ? 'text' : 'password';
  password.type = type;
  showPassword.classList.toggle('fa-eye');
  showPassword.classList.toggle('fa-eye-slash');
}

// Add input event listener to the password field
password.addEventListener('input', handlePasswordInput);

// Add click event listener to the eye icon
showPassword.addEventListener('click', togglePasswordVisibility);

// Initial visibility check for the eye icon
toggleEyeIconVisibility();