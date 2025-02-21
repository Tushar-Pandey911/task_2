document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registrationForm");
    
    form.addEventListener("submit", function (e) {
    e.preventDefault();
    clearErrors();
    
const name = document.getElementById("name").value.trim();
const email = document.getElementById("email").value.trim();
const phone = document.getElementById("phone").value.trim();
const bitsId = document.getElementById("bitsId").value.trim();
const hostel = document.getElementById("hostel").value;
const sizeNodes = document.getElementsByName("size");
const merchCheckboxes = document.querySelectorAll('input[name="merch"]:checked');
const selectedMerch = Array.from(merchCheckboxes).map(cb => cb.value);
let size = "";
for (let i = 0; i < sizeNodes.length; i++) {
  if (sizeNodes[i].checked) {
    size = sizeNodes[i].value;
    break;
  }
}
const terms = document.getElementById("terms").checked;

let valid = true;


if (name.length < 5 || name.length > 50) {
  showError("nameError", "Name must be between 5 and 50 characters.");
  valid = false;
}


const emailPattern = /^[a-zA-Z0-9._%+-]+@pilani\.bits-pilani\.ac\.in$/;
if (!emailPattern.test(email)) {
  showError(
    "emailError",
    "Enter a valid BITS email (f20200000@pilani.bits-pilani.ac.in)."
  );
  valid = false;
}


const phonePattern = /^[6-9]\d{9}$/;
if (!phonePattern.test(phone)) {
  showError("phoneError", "Enter a valid 10-digit phone number.");
  valid = false;
}


const bitsIdPattern = /^\d{4}[A-Z]\dPS\d{4}P$/;
if (!bitsIdPattern.test(bitsId)) {
  showError(
    "bitsIdError",
    "Enter a valid BITS ID (example: 2020A7PS0000P)."
  );
  valid = false;
}


if (hostel === "") {
  showError("hostelError", "Please select a hostel.");
  valid = false;
}

if (selectedMerch.length === 0) {
  showError("merchError", "Please select at least one merch item.");
  valid = false;
}

if (size === "") {
  showError("sizeError", "Please select a size.");
  valid = false;
}


if (!terms) {
  showError("termsError", "You must agree to the terms and conditions.");
  valid = false;
}


if (valid) {
  
  const registrationKey = "registration_" + bitsId;

  
  if (localStorage.getItem(registrationKey)) {
    alert("You have already submitted the form.");
    return;
  }

  
  const formData = {
    name: name,
    email: email,
    phone: phone,
    bitsId: bitsId,
    hostel: hostel,
    size: size,
    termsAgreed: terms,
    merch: selectedMerch,
  };

  
  localStorage.setItem(registrationKey, JSON.stringify(formData));
  alert("Registration successful!");

  
  form.reset();
}
});


function showError(elementId, message) {
document.getElementById(elementId).textContent = message;
}


function clearErrors() {
const errorElements = document.querySelectorAll(".error");
errorElements.forEach((el) => (el.textContent = ""));
}
});