function noContactComponent() {
  return `
  <div style="border-bottom: 1px solid black; margin: 1rem auto auto 0.25rem;" class="text-center">
    <p class="lead">No Contact</p>
  </div>
  `
}

function contactLoadingComponent() {
  return `
  <div class="text-center">
    <img src="./pictures/loading.gif" />
    <p class="lead text-muted">Fetch your contacts</p>
  </div>
  `
}

function contactListComponent(contactList) {
  let template = `
  <div
    style="height: 72vh; margin-bottom: 2rem;"
    class="mt-1 overflow-auto"
  >
    <div class="list-group">
  `

  contactList.forEach(data => {
    template += contactCardComponent(data)
  })

  template += `
    </div>
  </div>
  `

  return template
}

function contactCardComponent(data) {
  return `
  <div
    class="list-group-item mt-1 p-0 d-flex justify-content-between align-items-center rounded-0"
    style="border: 0.01rem solid rgb(0, 0, 0, 0.1);"
  >
    <div>
      <p class="lead ml-2 mt-2 mb-0">${data.name}</p>
      <small class="text-muted ml-2">${data.phoneNumber}</small>
    </div>
    <div>
      <button
        class="btn btn-danger rounded-0"
        onclick="deleteContact('${data.id}')"
      >
        <span class="fas fa-trash"></span>
      </button>
      <button 
        class="btn btn-info rounded-0 mr-2"
        data-toggle="modal"
        data-target="#formEditContact"
        onclick="openEditModal('${data.id}')"
      >
        <span class="fas fa-pen-square"></span>
      </button>
    </div>
  </div>
  `
}
