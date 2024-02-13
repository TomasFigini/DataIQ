document.addEventListener('DOMContentLoaded', async function () {
  // Obtener referencias a los elementos del DOM
  const searchInput = document.getElementById('searchInput')
  const userContainer = document.getElementById('userContainer')

  // Función para hacer una solicitud al servidor y mostrar los usuarios
  async function fetchAndDisplayUsers() {
    try {
      // Realizar solicitud al servidor
      const response = await fetch('/users')
      // Obtener la respuesta como texto (HTML)
      const userListHTML = await response.text()
      // Mostrar los usuarios en el contenedor
      userContainer.innerHTML = userListHTML
    } catch (error) {
      // Manejar errores
      console.error('Error fetching users:', error)
      userContainer.innerHTML = '<p>Error fetching users</p>'
    }
  }

  // Función para filtrar usuarios y actualizar la lista en la página
  async function filterUsers(searchTerm) {
    try {
      // Realizar solicitud al servidor con el término de búsqueda
      const response = await fetch(`/users?search=${searchTerm}`)
      // Obtener la respuesta como texto (HTML)
      const userListHTML = await response.text()
      // Mostrar los usuarios filtrados en el contenedor
      userContainer.innerHTML = userListHTML
    } catch (error) {
      // Manejar errores
      console.error('Error fetching filtered users:', error)
      userContainer.innerHTML = '<p>Error fetching filtered users</p>'
    }
  }

  // Evento de entrada en la barra de búsqueda para filtrar usuarios en tiempo real
  searchInput.addEventListener('input', function () {
    // Obtener el término de búsqueda
    const searchTerm = this.value.trim()
    // Si el término de búsqueda está vacío, mostrar todos los usuarios
    if (searchTerm === '') {
      fetchAndDisplayUsers()
    } else {
      // Si hay un término de búsqueda, filtrar usuarios
      filterUsers(searchTerm)
    }
  })

  // Mostrar todos los usuarios al cargar la página
  fetchAndDisplayUsers()
})
