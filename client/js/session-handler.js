function login(e) {
  if (e) e.preventDefault()

  const email = $('#loginEmail').val()
  const password = $('#loginPassword').val()

  const errors = []

  if (!email) errors.push('Email is required')
  if (!password) errors.push('Password is required')
  if (!isValidEmail(email) && email) {
    errors.push('Invalid email format')
  }

  if (errors.length > 0) {
    showToast({ icon: 'error', html: createErrorList(errors) })
    return null
  }

  showSwalLoading('login...')

  ai.post('/login', { email, password })
    .then(({ data }) => {
      Swal.fire({
        icon: 'success',
        title: 'Loggedin',
        timer: 1750,
        showConfirmButton: false,
      })
      localStorage.setItem('token', data.token)
      localStorage.setItem('username', data.username)

      $('#username').text(localStorage.getItem('username'))
      initState()
      showLoggedin()
    })
    .catch(errorHandler)
}

function register(e) {
  if (e) e.preventDefault()

  const email = $('#registerEmail').val()
  const password = $('#registerPassword').val()
  const username = $('#registerUsername').val()

  const errors = []

  if (!email) errors.push('Error is required')
  if (!password) errors.push('Password is required')
  if (!username) errors.push('Username is required')

  if (!isValidEmail(email) && email) errors.push('Invalid email format')
  if (password.length < 6 && password) {
    errors.push('Password length min 6 characters')
  }

  if (errors.length > 0) {
    showToast({ icon: 'error', html: createErrorList(errors) })
    return null
  }

  showSwalLoading('Sign up...')

  ai.post('/register', {
    username,
    email,
    password,
  })
    .then(({ data }) => {
      Swal.fire({
        icon: 'success',
        title: 'Register success',
        timer: 1750,
        showConfirmButton: false,
      })
      localStorage.setItem('token', data.token)
      localStorage.setItem('username', data.username)

      $('#username').text(localStorage.getItem('username'))
      initState()
      showLoggedin()
    })
    .catch(errorHandler)
}

function logout(e) {
  if (e) e.preventDefault()

  localStorage.clear()

  Swal.fire({
    icon: 'success',
    title: 'Logged out',
    timer: 1750,
    showConfirmButton: false,
  })

  $('#username').text('')
  showNotLogin()
}
