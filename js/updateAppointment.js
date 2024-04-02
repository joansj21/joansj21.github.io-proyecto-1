const citaBefore = JSON.parse(localStorage.getItem('updateCita'));
let listDoctor=dataDoctor;

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


document.addEventListener("DOMContentLoaded", () => {
    // Función para cargar la cita en el formulario de modificación
    const cargarCitaEnFormulario = () => {
        // Recuperar la cita almacenada en el localStorage
       

        // Verificar si la cita existe
        if (citaBefore) {
            // Actualizar los campos del formulario con los valores de la cita
            document.getElementById('especialidad').value = citaBefore.doctor.especialidad;
            document.getElementById('nombre').value = citaBefore.doctor.nombre;
            document.getElementById('fecha').value = citaBefore.date;
            document.getElementById('hora').value = citaBefore.hour;
        } else {
            // Mostrar un mensaje de error si no se encuentra la cita en el almacenamiento local
            const mensajeElemento = document.getElementById('message');
            mensajeElemento.textContent = 'No se encontró la cita para modificar.';
        }
    };

    // Función para manejar el envío del formulario de modificación
    const manejarEnvioFormulario = (event) => {
        event.preventDefault();
        // Aquí puedes agregar la lógica para manejar el envío del formulario
    };

    // Evento que se ejecuta cuando se envía el formulario de modificación
    document.getElementById('formularioCita').addEventListener('submit', manejarEnvioFormulario);

    // Llamada a la función para cargar la cita en el formulario cuando se carga la página
    cargarCitaEnFormulario();
});


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



function updateListDoctor(){

    const dataList = document.getElementById('nameList');
    //borra todos los datos anteriores
    dataList.innerHTML = ''; 

    specialityFilter=document.getElementById('especialidad').value
   // alert(specialityFilter)

    const listDoctorFilter = dataDoctor.filter(doctor => 
         
        
        doctor.especialidad.toLowerCase()==specialityFilter.toLowerCase()

   );

   console.log(listDoctorFilter)

    const autocompleteName = listDoctorFilter.map(doctor => doctor.nombre.toLowerCase());
    
    
   
        // Agregar opciones al datalist
        autocompleteName.forEach(nombre => {
            const option = document.createElement('option');
            option.value = nombre;
            dataList.appendChild(option);
        });




        
}

//agrega las citas 

document.addEventListener("DOMContentLoaded",()=>{

    const formulario = document.getElementById("formularioCita")

    formulario.addEventListener("submit",(event) =>{
        event.preventDefault();
        

        let {doctor,especiality,date,hour}= obtenerDatosFormulario();
        let user =obtenerUser();

        
    
  
        doctorCita=validateDoctor(doctor,especiality);

        if (doctorCita){
            
            if(!validateAppointment(doctorCita,date,hour,user)){
                saveCita(doctorCita,date,hour,user)
            
            const mensajeElemento = document.getElementById('message');
            mensajeElemento.textContent = "Cita Modificada con exito";
        }
        else{
            
            const mensajeElemento = document.getElementById('message');
            mensajeElemento.textContent = "Ya existe esta cita o esta ocupada";
    
        }

            
        }else{
            
            const mensajeElemento = document.getElementById('message');
            mensajeElemento.textContent = "Datos del doctor estan erroneos";
    
        }
    
       

          
    });


});




const validateAppointment=(doctor,date,hour,user)=>{
    //por si no exite ninguna cita entre
        let cita =false;
        

        if (citasList && citasList.length > 0) {
            cita = citasList.find(citas => citas.date === date && citas.hour === hour && citas.doctor === doctor);
        }

        //alert(cita)

        return cita
 

};

const saveCita=(doctor,date,hour,user)=>{


    updateCita = citasList.find(cita =>
        (cita.doctor.id === citaBefore.doctor.id && cita.date === citaBefore.date && cita.hour === citaBefore.hour && cita.user.idUser === citaBefore.user.idUser )
    );

    console.log("cita a modificar " ,updateCita)
    console.log("fecha " ,date)

    if (updateCita) {
        // Modificar los atributos de la cita
        updateCita.date = date;
        updateCita.hour = hour;
        updateCita.user = user;
        updateCita.state = "pendiente";
        updateCita.doctor = doctor;

        console.log('Cita modificada:', updateCita);
    }


    //localStorage.setItem('citasList', JSON.stringify(newCitasList));



   
    localStorage.setItem('citasList', JSON.stringify(citasList));


}

const validateDoctor=(doctorName,especiality)=>{

    return dataDoctor.find(doctor => doctor.nombre.toLowerCase() === doctorName.toLowerCase() && doctor.especialidad.toLowerCase() === especiality.toLowerCase());

   

};


const obtenerDatosFormulario=()=>{

    const doctor = document.getElementById("nombre").value.trim();
    const especiality = document.getElementById("especialidad").value.trim();
    const date = document.getElementById("fecha").value.trim();
    const hour = document.getElementById("hora").value.trim();

    return{doctor,especiality,date,hour}


};



