const obtenerUser=()=>{

    let userCurrenStorege = localStorage.getItem('userCurren');
    let userCurren=null
    
    // Verificar si hay datos en el localStorage
    if (userCurrenStorege) {
        // Convertir la cadena JSON de userList a un array de JavaScript
        userCurren = JSON.parse(userCurrenStorege);
    
      
    } 

        return userCurren
        }

 const initCita =()=>{
            // Recuperar la cadena JSON del localStorage
            let citasListJSON = localStorage.getItem('citasList');
            let citasList=[];
        
        
            // Verificar si hay datos en el localStorage
            if (citasListJSON) {
                // Convertir la cadena JSON de userList a un array de JavaScript
                citasList = JSON.parse(citasListJSON);
        
                //console.log("citas",citasList)     
        
            } 
        
            return citasList
        
  }
  
const user = obtenerUser();
const citasList = initCita();


  const deleteAppoinment =(citaDelete)=>{

    


    newCitasList = citasList.filter(cita =>
        !(cita.doctor.id === citaDelete.doctor.id && cita.date === citaDelete.date && cita.hour === citaDelete.hour && cita.user.idUser === citaDelete.user.idUser )
    );


    localStorage.setItem('citasList', JSON.stringify(newCitasList));

    location.reload();
    

}

const updateAppoinment =(cita)=>{


    localStorage.setItem('updateCita', JSON.stringify(cita));




    window.location.href = '../html/updateAppointments.html';
    

}



/* Historial de citas  */
document.addEventListener('DOMContentLoaded', function () {
    const futureAppointmentsList = document.getElementById('futureAppointments');
    const pastAppointmentsList = document.getElementById('pastAppointments');


    // Filtrar las citas futuras y pasadas
    const currentDate = new Date();
    const futureAppointments = citasList.filter(cita => cita.user.idUser === user.idUser && new Date(cita.date) > currentDate);
    const pastAppointments = citasList.filter(cita => cita.user.idUser === user.idUser && new Date(cita.date) <= currentDate);


    console.log(" futuras",futureAppointments)
    console.log(" pasadas",pastAppointments)

    // Mostrar citas futuras
    futureAppointments.forEach(cita => {
        const listItem = document.createElement('li');
        listItem.textContent = `${cita.date}, ${cita.hour}, ${cita.doctor.nombre} , ${cita.doctor.especialidad}, ${cita.state}`;
    
        // Botón de modificar
        const modifyButton = document.createElement('button');
        modifyButton.textContent = 'Modificar';
        modifyButton.addEventListener('click', () =>updateAppoinment(cita));
        listItem.appendChild(modifyButton);
    
        // Botón de eliminar
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.addEventListener('click', () =>deleteAppoinment(cita));
        listItem.appendChild(deleteButton);
    
        futureAppointmentsList.appendChild(listItem);
    });


    // Mostrar citas pasadas
    pastAppointments.forEach(cita => {
        const listItem = document.createElement('li');
        listItem.textContent = `${cita.date}, ${cita.hour}, , ${cita.doctor.nombre} , ${cita.doctor.especialidad},  ${cita.state}`;
        pastAppointmentsList.appendChild(listItem);
    });
});


