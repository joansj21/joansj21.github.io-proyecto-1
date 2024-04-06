
let listDoctor=dataDoctor;


const initCita =()=>{
    // Recuperar la cadena JSON del localStorage
    let citasListJSON = localStorage.getItem('citasList');
    let citasList=[];


    // Verificar si hay datos en el localStorage
    if (citasListJSON) {
        // Convertir la cadena JSON de userList a un array de JavaScript
        citasList = JSON.parse(citasListJSON);

        console.log("citas",citasList)     

    } 

    return citasList

}
const citasList = initCita();

document.addEventListener('DOMContentLoaded', function () {
// Obtener el botón de búsqueda por su ID
const btnBuscar = document.getElementById("btnBuscar");

// Agregar un event listener al botón para el evento "click"
btnBuscar.addEventListener("click", function() {


      


    buscarCitas();
});



});

// Definir la función para buscar citas
function buscarCitas() {

     // Filtrar las citas futuras y pasadas
     const doctorID = document.getElementById("identificacion").value;

     const pendienteList = document.getElementById('futureAppointments');
     const confirmAppointmentsList = document.getElementById('pastAppointments');

     pendienteList.innerHTML = "";
     confirmAppointmentsList.innerHTML = "";
     

    
    
    
  
    const pendienteAppointments = citasList.filter(cita => cita.doctor.id === doctorID && cita.state==="pendiente");
    
    const confirmAppointments = citasList.filter( cita =>   cita.doctor.id === doctorID && cita.state!=="pendiente");




    // Mostrar citas futuras
    pendienteAppointments.forEach(cita => {
        const listItem = document.createElement('li');
        listItem.textContent = `${cita.date}, ${cita.hour}, ${cita.user[0].name} , ${cita.user[0].idUser} , ${cita.user[0].phone}, ${cita.user[0].mail}`;
    
        // Botón de modificar
        const modifyButton = document.createElement('button');
        modifyButton.textContent = 'Confirmar';
        modifyButton.addEventListener('click', () =>acceptApoinments(cita));
        listItem.appendChild(modifyButton);
    
    
        pendienteList.appendChild(listItem);
    });


    // Mostrar citas pasadas
    confirmAppointments.forEach(cita => {
        const listItem = document.createElement('li');
        listItem.textContent = `${cita.date}, ${cita.hour}, ${cita.user[0].name} , ${cita.user[0].idUser} , ${cita.user[0].phone}, ${cita.user[0].mail}`;
        confirmAppointmentsList.appendChild(listItem);
    });

    

}

/*filtro ID */
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



const acceptApoinments =(cita)=>{

    


   cita.state="Comfirmada"
    

   localStorage.setItem('citasList', JSON.stringify(citasList));

   buscarCitas();


}
