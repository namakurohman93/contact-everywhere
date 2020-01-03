function createErrorList(errors) {
  let errorList = `<ul style="list-style-type: none;"`

  errors.forEach(err => {
    errorList += `<li>${err}</li>`
  })
  errorList += `</ul>`

  return errorList
}

function updateContactContent(component) {
  $('#contact-content').empty()
  $('#contact-content').append(component)
}
