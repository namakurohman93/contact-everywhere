$(document).ready(() => {
  if (isLogin()) {
    $('#username').text(localStorage.getItem('username'))
    initState()
    showLoggedin()
  }

  const debounceFilter = _.debounce(filterContact, 500)

  $('#query').on('input', function() {
    updateContactContent(contactLoadingComponent())
    debounceFilter()
  })
})

function isLogin() {
  if (localStorage.getItem('token')) return true
  return false
}

function isValidEmail(email) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
    email.toLowerCase(),
  )
}

function errorHandler(err) {
  if (err.response) {
    if (Array.isArray(err.response.data.errors)) {
      showToast({
        icon: 'error',
        html: createErrorList(err.response.data.errors),
      })
    } else {
      showToast({ icon: 'error', title: err.response.data.errors })
    }
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Check console log',
      timer: 1750,
    })
    console.log(err)
  }
}

function addNewContact(e) {
  if (e) e.preventDefault()

  const newContactName = $('#newContactName').val()
  const newContactPhoneNumber = $('#newContactPhoneNumber').val()

  const errors = []

  if (!newContactName) errors.push('Contact name is required')
  if (!newContactPhoneNumber) errors.push('Contact number is required')

  if (errors.length > 0) {
    showToast({ icon: 'error', html: createErrorList(errors) })
    return null
  }

  showSwalLoading('Add new contact')

  ai.post(
    '/contacts',
    {
      name: newContactName,
      phoneNumber: newContactPhoneNumber,
    },
    {
      headers: {
        token: localStorage.getItem('token'),
      },
    },
  )
    .then(({ data }) => {
      $('#formAddContact').modal('hide')
      showToast({ icon: 'success', title: 'Added new contact' })
      initState()
    })
    .catch(errorHandler)
}

function initState() {
  updateContactContent(contactLoadingComponent())

  fetchUserContactList()
    .then(({ data }) => {
      state.contactList = data
      if (data.length === 0) {
        updateContactContent(noContactComponent())
      } else {
        data.sort((a, b) => a.name > b.name)
        updateContactContent(contactListComponent(data))
      }
    })
    .catch(errorHandler)
}

function deleteContact(contactId) {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  }).then(result => {
    if (result.value) {
      showSwalLoading('deleting...')

      ai.delete(`/contacts/${contactId}`, {
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then(({ data }) => {
          showToast({ icon: 'success', title: 'Contact deleted' })
          initState()
        })
        .catch(errorHandler)
    }
  })
}

function openEditModal(contactId) {
  const contact = state.contactList.find(contact => contact.id == contactId)
  $('#editContactName').val(contact.name)
  $('#editContactPhoneNumber').val(contact.phoneNumber)
  $('#editContactId').val(contact.id)
}

function editContact(e) {
  if (e) e.preventDefault()

  const editContactName = $('#editContactName').val()
  const editContactPhoneNumber = $('#editContactPhoneNumber').val()
  const contactId = $('#editContactId').val()

  const errors = []

  if (!editContactName) errors.push('Contact name is required')
  if (!editContactPhoneNumber) errors.push('Phone number is required')

  if (errors.length > 0) {
    showToast({ icon: 'error', html: createErrorList(errors) })
    return null
  }

  showSwalLoading('Updating...')

  ai.patch(
    `/contacts/${contactId}`,
    {
      name: editContactName,
      phoneNumber: editContactPhoneNumber,
    },
    {
      headers: {
        token: localStorage.getItem('token'),
      },
    },
  )
    .then(({ data }) => {
      $('#formEditContact').modal('hide')
      showToast({ icon: 'success', title: 'Contact edited' })
      initState()
    })
    .catch(errorHandler)
}

function filterContact(e) {
  if (e) e.preventDefault()

  if ($('#query').val().length === 0) {
    updateContactContent(contactListComponent(state.contactList))
    return null
  }

  const filteredData = state.contactList.filter(contact => {
    const newRegex = new RegExp(
      $('#query')
        .val()
        .toLowerCase(),
    )
    return newRegex.test(contact.name.toLowerCase())
  })

  if (filteredData.length > 0) {
    updateContactContent(contactListComponent(filteredData))
  } else {
    updateContactContent(noContactComponent())
  }
}

function debounceFilter(e) {
  if (e) e.preventDefault()

  console.log($('#query').val())
}
