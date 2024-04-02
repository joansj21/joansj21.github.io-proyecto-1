

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
const listCita=initCita()

//localStorage.removeItem("citasList");

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
            mensajeElemento.textContent = "Cita registrada";
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
        

        if (listCita && listCita.length > 0) {
            cita = listCita.find(citas => citas.date === date && citas.hour === hour && citas.doctor === doctor);
        }

        //alert(cita)

        return cita
 

};

const saveCita=(doctor,date,hour,user)=>{

    
    let cita = {
        doctor: doctor,
        date:date,
        hour:hour,
        user:user,
        state:"pendiente"

  
    };
    listCita.push(cita)



   
    localStorage.setItem('citasList', JSON.stringify(listCita));


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


