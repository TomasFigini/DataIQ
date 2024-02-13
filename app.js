const express = require('express')
const app = express()
const fetch = require('cross-fetch')
const port = 3000

app.use(express.static('public'))

app.get('/users', async (req, res) => {
  try {
    const users = await fetchUsers()
    const searchTerm = req.query.search || ''
    const filteredUsers = filterUsers(users, searchTerm)
    const userListHTML = generateUserListHTML(filteredUsers)
    res.send(userListHTML)
  } catch (error) {
    console.error('Error fetching users:', error)
    res.status(500).send('Error fetching users')
  }
})

async function fetchUsers() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  return await response.json()
}

function filterUsers(users, searchTerm) {
  if (!searchTerm.trim()) return users

  searchTerm = searchTerm.toLowerCase()

  return users.filter((user) => {
    const searchFields = [user.name, user.email, user.address.city]
    return searchFields.some((field) =>
      field.toLowerCase().includes(searchTerm)
    )
  })
}

function generateUserListHTML(users) {
  return `
        <div class="user-list">
            ${users
              .map(
                (user) => `
                <div class="user">
                    <h2>${user.name} (${user.username})</h2>
                    <p>Email: ${user.email}</p>
                    <p>Ciudad: ${user.address.city}</p>
                    <p>Teléfono: ${user.phone}</p>
                    <p>Empresa: ${user.company.name}</p>
                </div>
            `
              )
              .join('')}
        </div>
    `
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
