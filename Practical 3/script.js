document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('regForm');
  const elements = {
    fullname: document.getElementById('fullname'),
    email: document.getElementById('email'),
    phone: document.getElementById('phone'),
    dob: document.getElementById('dob'),
    course: document.getElementById('course'),
    password: document.getElementById('password'),
    confirmPassword: document.getElementById('confirmPassword'),
    about: document.getElementById('about'),
    agree: document.getElementById('agree')
  };
  const errors = {
    fullname: document.getElementById('err-fullname'),
    email: document.getElementById('err-email'),
    phone: document.getElementById('err-phone'),
    dob: document.getElementById('err-dob'),
    course: document.getElementById('err-course'),
    password: document.getElementById('err-password'),
    confirmPassword: document.getElementById('err-confirmPassword'),
    agree: document.getElementById('err-agree')
  };
  const pwBar = document.getElementById('pwBar');
  const pwLabel = document.getElementById('pwLabel');
  const bioCount = document.getElementById('bioCount');
  const successMsg = document.getElementById('successMsg');

  (function setDobMax() {
    const today = new Date().toISOString().split('T')[0];
    elements.dob.max = today;
  })();

  function setError(field, message) {
    errors[field].textContent = message || '';
    if (message) elements[field].setAttribute('aria-invalid', 'true');
    else elements[field].removeAttribute('aria-invalid');
  }

  function validateFullname() {
    const v = elements.fullname.value.trim();
    if (!v) return 'Full name is required';
    if (v.length < 3) return 'Enter at least 3 characters';
    return '';
  }

  function validateEmail() {
    const v = elements.email.value.trim();
    if (!v) return 'Email is required';
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(v)) return 'Enter a valid email';
    return '';
  }

  function validatePhone() {
    const v = elements.phone.value.trim();
    if (!v) return '';
    const re = /^\+?[0-9\s\-]{7,20}$/;
    if (!re.test(v)) return 'Enter a valid phone number';
    return '';
  }

  function validateDob() {
    const v = elements.dob.value;
    if (!v) return '';
    const dob = new Date(v);
    if (dob.toString() === 'Invalid Date') return 'Invalid date';
    const today = new Date();
    if (dob > today) return 'Date of birth cannot be in the future';
    return '';
  }

  function validateCourse() {
    if (!elements.course.value) return 'Please select a course';
    return '';
  }

  function passwordScore(pw) {
    let score = 0;
    if (pw.length >= 8) score += 1;
    if (pw.length >= 12) score += 1;
    if (/[a-z]/.test(pw)) score += 1;
    if (/[A-Z]/.test(pw)) score += 1;
    if (/[0-9]/.test(pw)) score += 1;
    if (/[^A-Za-z0-9]/.test(pw)) score += 1;
    return score;
  }

  function pwStrengthLabel(score) {
    if (score <= 1) return {label:'Very weak', pct:15, color:'#ef4444'};
    if (score === 2) return {label:'Weak', pct:33, color:'#f97316'};
    if (score === 3) return {label:'Moderate', pct:50, color:'#f59e0b'};
    if (score === 4) return {label:'Good', pct:75, color:'#10b981'};
    return {label:'Strong', pct:100, color:'#059669'};
  }

  function validatePassword() {
    const pw = elements.password.value;
    if (!pw) return 'Password is required';
    if (pw.length < 8) return 'Password must be at least 8 characters';
    const classes = [/[a-z]/, /[A-Z]/, /[0-9]/, /[^A-Za-z0-9]/].reduce((c, re) => c + (re.test(pw) ? 1 : 0), 0);
    if (classes < 2) return 'Use at least two types: letters, numbers, or symbols';
    return '';
  }

  function validateConfirmPassword() {
    if (!elements.confirmPassword.value) return 'Please confirm your password';
    if (elements.confirmPassword.value !== elements.password.value) return 'Passwords do not match';
    return '';
  }

  elements.fullname.addEventListener('input', () => setError('fullname', validateFullname()));
  elements.email.addEventListener('input', () => setError('email', validateEmail()));
  elements.phone.addEventListener('input', () => setError('phone', validatePhone()));
  elements.dob.addEventListener('change', () => setError('dob', validateDob()));
  elements.course.addEventListener('change', () => setError('course', validateCourse()));
  elements.about.addEventListener('input', () => {
    bioCount.textContent = `${elements.about.value.length} / 300`;
  });

  elements.password.addEventListener('input', () => {
    const score = passwordScore(elements.password.value);
    const meta = pwStrengthLabel(score);
    pwBar.style.width = meta.pct + '%';
    pwBar.style.background = meta.color;
    pwLabel.textContent = elements.password.value ? `${meta.label} (${meta.pct}%)` : '';
    setError('password', validatePassword());
    setError('confirmPassword', elements.confirmPassword.value ? validateConfirmPassword() : '');
  });

  elements.confirmPassword.addEventListener('input', () => setError('confirmPassword', validateConfirmPassword()));

  Object.keys(elements).forEach(key => {
    if (['about','password','confirmPassword'].includes(key)) return;
    elements[key].addEventListener('blur', () => {
      const fn = {
        fullname: validateFullname,
        email: validateEmail,
        phone: validatePhone,
        dob: validateDob,
        course: validateCourse
      }[key];
      if (fn) setError(key, fn());
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    successMsg.textContent = '';
    const validators = {
      fullname: validateFullname,
      email: validateEmail,
      phone: validatePhone,
      dob: validateDob,
      course: validateCourse,
      password: validatePassword,
      confirmPassword: validateConfirmPassword,
      agree: () => elements.agree.checked ? '' : 'You must agree to continue'
    };

    let firstInvalid = null;
    Object.keys(validators).forEach(key => {
      const err = validators[key]();
      setError(key, err);
      if (err && !firstInvalid) firstInvalid = elements[key] || document.getElementById(key);
    });

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    const payload = {
      fullname: elements.fullname.value.trim(),
      email: elements.email.value.trim(),
      phone: elements.phone.value.trim(),
      dob: elements.dob.value,
      course: elements.course.value,
      about: elements.about.value.trim()
    };

    successMsg.textContent = 'Registration successful. Check console for submitted data.';
    console.log('Registration payload (sample):', payload);
  });

  form.addEventListener('reset', () => {
    setTimeout(() => {
      Object.keys(errors).forEach(k => setError(k, ''));
      pwBar.style.width = '0%'; pwLabel.textContent = '';
      bioCount.textContent = `${elements.about.value.length} / 300`;
      successMsg.textContent = '';
    }, 0);
  });
});
