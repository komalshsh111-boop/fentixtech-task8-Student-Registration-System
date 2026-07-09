let students = [];

const form = document.getElementById('registrationForm');
const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const courseInput = document.getElementById('course');
const editIndexInput = document.getElementById('editIndex');
const submitBtn = document.getElementById('submitBtn');
const resetBtn = document.getElementById('resetBtn');
const tableBody = document.getElementById('studentTableBody');
const noRecordsMsg = document.getElementById('noRecordsMsg');

function validateFullName() {
  const value = fullNameInput.value.trim();
  const errorEl = document.getElementById('fullNameError');

  if (value === '') {
    showError(fullNameInput, errorEl, 'Full name is required.');
    return false;
  }
  if (value.length < 3) {
    showError(fullNameInput, errorEl, 'Name must be at least 3 characters.');
    return false;
  }
  if (!/^[a-zA-Z\s]+$/.test(value)) {
    showError(fullNameInput, errorEl, 'Name should contain only letters.');
    return false;
  }
  clearError(fullNameInput);
  return true;
}

function validateEmail() {
  const value = emailInput.value.trim();
  const errorEl = document.getElementById('emailError');
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (value === '') {
    showError(emailInput, errorEl, 'Email is required.');
    return false;
  }
  if (!emailPattern.test(value)) {
    showError(emailInput, errorEl, 'Enter a valid email address.');
    return false;
  }
  clearError(emailInput);
  return true;
}

function validatePhone() {
  const value = phoneInput.value.trim();
  const errorEl = document.getElementById('phoneError');
  const phonePattern = /^[0-9]{10,12}$/;

  if (value === '') {
    showError(phoneInput, errorEl, 'Phone number is required.');
    return false;
  }
  if (!phonePattern.test(value)) {
    showError(phoneInput, errorEl, 'Enter a valid phone number (10-12 digits).');
    return false;
  }
  clearError(phoneInput);
  return true;
}

function validateCourse() {
  const value = courseInput.value.trim();
  const errorEl = document.getElementById('courseError');

  if (value === '') {
    showError(courseInput, errorEl, 'Course name is required.');
    return false;
  }
  if (value.length < 2) {
    showError(courseInput, errorEl, 'Course name looks too short.');
    return false;
  }
  clearError(courseInput);
  return true;
}

function showError(inputEl, errorEl, message) {
  inputEl.classList.add('is-invalid');
  errorEl.textContent = message;
}

function clearError(inputEl) {
  inputEl.classList.remove('is-invalid');
}

function renderTable() {
  tableBody.innerHTML = '';

  if (students.length === 0) {
    noRecordsMsg.style.display = 'block';
    return;
  }

  noRecordsMsg.style.display = 'none';

  students.forEach((student, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${student.fullName}</td>
      <td>${student.email}</td>
      <td>${student.phone}</td>
      <td>${student.course}</td>
      <td>
        <button class="btn btn-sm btn-warning action-btn" onclick="editStudent(${index})">Edit</button>
        <button class="btn btn-sm btn-danger action-btn" onclick="deleteStudent(${index})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function editStudent(index) {
  const student = students[index];

  fullNameInput.value = student.fullName;
  emailInput.value = student.email;
  phoneInput.value = student.phone;
  courseInput.value = student.course;

  editIndexInput.value = index;
  submitBtn.textContent = 'Update Student';

  form.scrollIntoView({ behavior: 'smooth' });
}

function deleteStudent(index) {
  const confirmDelete = confirm('Are you sure you want to delete this record?');
  if (!confirmDelete) return;

  students.splice(index, 1);
  renderTable();
}

function resetForm() {
  form.reset();
  editIndexInput.value = -1;
  submitBtn.textContent = 'Register Student';

  [fullNameInput, emailInput, phoneInput, courseInput].forEach(clearError);
}

resetBtn.addEventListener('click', resetForm);

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const isNameValid = validateFullName();
  const isEmailValid = validateEmail();
  const isPhoneValid = validatePhone();
  const isCourseValid = validateCourse();

  if (!isNameValid || !isEmailValid || !isPhoneValid || !isCourseValid) {
    return;
  }

  const studentData = {
    fullName: fullNameInput.value.trim(),
    email: emailInput.value.trim(),
    phone: phoneInput.value.trim(),
    course: courseInput.value.trim()
  };

  const editIndex = parseInt(editIndexInput.value);

  if (editIndex === -1) {
    students.push(studentData);
  } else {
    students[editIndex] = studentData;
  }

  renderTable();
  resetForm();
});

fullNameInput.addEventListener('input', validateFullName);
emailInput.addEventListener('input', validateEmail);
phoneInput.addEventListener('input', validatePhone);
courseInput.addEventListener('input', validateCourse);

renderTable();