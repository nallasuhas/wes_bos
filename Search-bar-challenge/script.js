
const cardTemplate = document.querySelector('[data-user-template]')
const cardContainer = document.querySelector('[data-user-cards-container]')
const searchInput = document.querySelector("[data-search]")

// all the card's data goes into this as an array of objects; use this data for search query
let users = [];

 /*fetch data from a fake api */
 //create a users array at the time of fetching, either from api or localstorage...
fetch("https://jsonplaceholder.typicode.com/users")
  .then(res => res.json())
  .then(data => {
    users = data.map(user => {
    // get the html inside template element
      const card =  cardTemplate.content.cloneNode(true).children[0]
      const header = card.querySelector("[data-header]")
      const body = card.querySelector("[data-body]")
      header.textContent = user.name
      body.textContent = user.email
      cardContainer.append(card)
      return { name: user.name, email: user.email, element: card }
    })
  })

searchInput.addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase()
    users.forEach(user => {
        const shouldDisplay =
        user.name.toLowerCase().includes(value) ||
        user.email.toLowerCase().includes(value)
        /*Nice use case of toggle functionality depending on the condition */
        user.element.classList.toggle("hide", !shouldDisplay)
    }
    )
})