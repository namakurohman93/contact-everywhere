function showLoggedin(e) {
  if (e) e.preventDefault()

  $('#not-login').fadeOut(200, function() {
    $('#loggedin').fadeIn(200)
  })
}

function showNotLogin(e) {
  if (e) e.preventDefault()

  $('#loggedin').fadeOut(200, function() {
    $('#not-login').fadeIn(200)
  })
}

function showJumbotron(e) {
  if (e) e.preventDefault()

  $('#login-form').fadeOut(200, function() {
    $('#register-form').fadeOut(200, function() {
      $('#jumbotron').fadeIn(200)
    })
  })
}

function showLoginForm(e) {
  if (e) e.preventDefault()

  $('#jumbotron').fadeOut(200, function() {
    $('#register-form').fadeOut(200, function() {
      $('#login-form').fadeIn(200)
    })
  })
}

function showRegisterForm(e) {
  if (e) e.preventDefault()

  $('#jumbotron').fadeOut(200, function() {
    $('#login-form').fadeOut(200, function() {
      $('#register-form').fadeIn(200)
    })
  })
}

function showToast(options) {
  Swal.mixin({
    toast: true,
    position: options.position || 'top-end',
    showConfirmButton: false,
    timer: options.timer || 1750,
  }).fire({
    icon: options.icon || 'success',
    title: options.title,
    html: options.html || '',
  })
}

function showSwalLoading(title) {
  Swal.fire({
    title: title || 'Loading...',
    allowOutsideClick: false,
    allowEscapeKey: false,
    onBeforeOpen: () => {
      Swal.showLoading()
    },
  })
}

$('#formAddContact').on('show.bs.modal', function(e) {
  $('.modal .modal-dialog').attr('class', 'modal-dialog slideInUp animated')
})

$('#formAddContact').on('hide.bs.modal', function(e) {
  $('.modal .modal-dialog').attr('class', 'modal-dialog slideOutDown animated')
})

$('#formEditContact').on('show.bs.modal', function(e) {
  $('.modal .modal-dialog').attr('class', 'modal-dialog flipInX animated')
})

$('#formEditContact').on('hide.bs.modal', function(e) {
  $('.modal .modal-dialog').attr('class', 'modal-dialog flipOutX animated')
})
