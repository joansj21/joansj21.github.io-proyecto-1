

let listDoctor=dataDoctor;

document.addEventListener('DOMContentLoaded', function() {
    const listDoctors = document.querySelector('.listDoctors');
    const pagination = document.querySelector('.pagination');

 
    const doctorsPerPage = 5;
    let currentPage = 1;

    function renderDoctors(page) {
        listDoctors.innerHTML = '';
        const start = (page - 1) * doctorsPerPage;
        const end = start + doctorsPerPage;
        const paginatedDoctors = listDoctor.slice(start, end);

        paginatedDoctors.forEach(doctor => {
            const doctorCard = document.createElement('div');
            doctorCard.classList.add('doctorCard');
            doctorCard.innerHTML = `
                
                <h2>${doctor.nombre}</h2>
                <h2>${doctor.id}</h2>
                <p>Especialidad: ${doctor.especialidad}</p>
                <p>Ubicación de consulta: ${doctor.ubicacion_consulta}</p>
                <p>Horarios de consulta: ${doctor.horarios_consulta}</p>
                <p>Contacto: Teléfono: ${doctor.contacto.telefono}, Correo electrónico: ${doctor.contacto.correo_electronico}</p>
                <p>Reseñas:</p>
                <ul>
                    ${doctor.reseñas.map(reseña => `<li>${reseña.usuario} - Calificación: ${reseña.calificacion}, Comentario: ${reseña.comentario}</li>`).join('')}
                </ul>
                <p>Biografía: ${doctor.biografia}</p>
                
            `;
            listDoctors.appendChild(doctorCard);
        });
    }

    function renderPagination() {
        pagination.innerHTML = '';
        const numPages = Math.ceil(listDoctor.length / doctorsPerPage);
        for (let i = 1; i <= numPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            pageButton.addEventListener('click', () => {
                currentPage = i;
                renderDoctors(currentPage);
                updatePaginationActiveButton();
            });
            pagination.appendChild(pageButton);
        }
        updatePaginationActiveButton();
    }

    function updatePaginationActiveButton() {
        const buttons = pagination.querySelectorAll('button');
        buttons.forEach(button => {
            if (parseInt(button.textContent) === currentPage) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }

    // Renderiza los doctores en la página actual y la paginación
    renderDoctors(currentPage);
    renderPagination();
});

/*parte filtros*/ 
document.addEventListener('DOMContentLoaded', function() {
    const btnBuscar = document.getElementById('btnBuscar');
    btnBuscar.addEventListener('click', buscarMedicos);
});

function buscarMedicos() {
    const nameFilter = document.getElementById('nombre').value.trim().toLowerCase();
    const specialityFilter = document.getElementById('especialidad').value.trim().toLowerCase();
    const ubicationFilter = document.getElementById('ubicacion').value.trim().toLowerCase();
    const idFilter = document.getElementById('identificacion').value.trim().toLowerCase();

  


    //.filter lo que hace es filtrar por lo que uno valide  

    const listDoctorFilter = listDoctor.filter(doctor => 
         
        
         doctor.especialidad.toLowerCase()==specialityFilter   ||  doctor.ubicacion_consulta.toLowerCase()==ubicationFilter || doctor.nombre.toLowerCase()==nameFilter || doctor.id==idFilter

    );



    /*--------------------------------------------------------------------------------*/
    const listDoctors = document.querySelector('.listDoctors');
    const pagination = document.querySelector('.pagination');

    //borrar lo que esta en los div

    // Eliminar todos los elementos dentro de listDoctors
while (listDoctors.firstChild) {
    listDoctors.removeChild(listDoctors.firstChild);
}

// Eliminar todos los elementos dentro de pagination
while (pagination.firstChild) {
    pagination.removeChild(pagination.firstChild);
}

// llena de nuevo con la nueva lista de doctores filtradas
 
    const doctorsPerPage = 5;
    let currentPage = 1;

    function renderDoctors(page) {
        listDoctors.innerHTML = '';
        const start = (page - 1) * doctorsPerPage;
        const end = start + doctorsPerPage;
        const paginatedDoctors = listDoctorFilter.slice(start, end);

        paginatedDoctors.forEach(doctor => {
            const doctorCard = document.createElement('div');
            doctorCard.classList.add('doctorCard');
            doctorCard.innerHTML = `
                
                <h2>${doctor.nombre}</h2>
                <h2>${doctor.id}</h2>
                <p>Especialidad: ${doctor.especialidad}</p>
                <p>Ubicación de consulta: ${doctor.ubicacion_consulta}</p>
                <p>Horarios de consulta: ${doctor.horarios_consulta}</p>
                <p>Contacto: Teléfono: ${doctor.contacto.telefono}, Correo electrónico: ${doctor.contacto.correo_electronico}</p>
                <p>Reseñas:</p>
                <ul>
                    ${doctor.reseñas.map(reseña => `<li>${reseña.usuario} - Calificación: ${reseña.calificacion}, Comentario: ${reseña.comentario}</li>`).join('')}
                </ul>
                <p>Biografía: ${doctor.biografia}</p>
                
            `;
            listDoctors.appendChild(doctorCard);
        });
    }

    function renderPagination() {
        pagination.innerHTML = '';
        const numPages = Math.ceil(listDoctorFilter.length / doctorsPerPage);
        for (let i = 1; i <= numPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            pageButton.addEventListener('click', () => {
                currentPage = i;
                renderDoctors(currentPage);
                updatePaginationActiveButton();
            });
            pagination.appendChild(pageButton);
        }
        updatePaginationActiveButton();
    }

    function updatePaginationActiveButton() {
        const buttons = pagination.querySelectorAll('button');
        buttons.forEach(button => {
            if (parseInt(button.textContent) === currentPage) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }

    // Renderiza los doctores en la página actual y la paginación
    renderDoctors(currentPage);
    renderPagination();
    /*----------------------------------------------------------------------------- */

    

 
}



/* para el autocompletar del nombre -------------------------- */
document.addEventListener('DOMContentLoaded', function() {
    const datalist = document.getElementById('nameList');

    const autocompleteName = listDoctor.map(doctor => doctor.nombre.toLowerCase());
    
    // Verificar si el elemento datalist se encontró correctamente
   
        // Agregar opciones al datalist
        autocompleteName.forEach(nombre => {
            const option = document.createElement('option');
            option.value = nombre;
            datalist.appendChild(option);
        });
 
});


/* para el autocompletar del Ubicacion -------------------------- */
document.addEventListener('DOMContentLoaded', function() {
    const datalist = document.getElementById('UbicationList');

    const autocompleteUbication = listDoctor.map(doctor => doctor.ubicacion_consulta.toLowerCase());
    
    // Verificar si el elemento datalist se encontró correctamente
   
        // Agregar opciones al datalist
        autocompleteUbication.forEach(Ubication => {
            const option = document.createElement('option');
            option.value = Ubication;
            datalist.appendChild(option);
        });
 
});


/* para el autocompletar del ID -------------------------- */
document.addEventListener('DOMContentLoaded', function() {
    const datalist = document.getElementById('idList');

    const autocompleteID = listDoctor.map(doctor => doctor.id.toLowerCase());
    
    // Verificar si el elemento datalist se encontró correctamente
   
        // Agregar opciones al datalist
        autocompleteID.forEach(id => {
            const option = document.createElement('option');
            option.value = id;
            datalist.appendChild(option);
        });
 
});



