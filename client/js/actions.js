function fetchUserContactList() {
  return new Promise((resolve, reject) => {
    ai.get('/contacts', {
      headers: {
        token: localStorage.getItem('token'),
      },
    })
      .then(resolve)
      .catch(reject)
  })
}

function updateUserContactList(payload) {
  state.contactList = payload.contactList
}
