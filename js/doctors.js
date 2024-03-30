

// Realizar una solicitud HTTP para cargar el archivo JSON
fetch('../data/doctors.json')
  .then(response => {
    // Verificar si la solicitud fue exitosa
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    // Convertir la respuesta en formato JSON
    return response.json();
  })
  .then(data => {
    // Hacer algo con los datos JSON
    console.log(data);
  })
  .catch(error => {
    // Capturar y manejar cualquier error
    console.error('There was a problem with the fetch operation:', error);
  });
