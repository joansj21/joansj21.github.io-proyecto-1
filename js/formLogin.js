

const usersList=initUser();
const userCurren=null;
const key="LaKeyMasSegura"



function initUser(){
    // Recuperar la cadena JSON del localStorage
let userListJSON = localStorage.getItem('userList');
let userList=[]

// Verificar si hay datos en el localStorage
if (userListJSON) {
    // Convertir la cadena JSON de userList a un array de JavaScript
    userList = JSON.parse(userListJSON);

  
} 
//console.log(userList);

    return userList

}


/*-----------------------guardar en json------------------------------ */
//objeto

function saveUserCurrenly(id,password){

   
    let user = {
        idUser: id,
        password: password  // Guardar la contraseña encriptada
    };

  
    localStorage.setItem('userCurren', JSON.stringify(user));


    


    console.log("usuario guardado",user)

}



/*-----------------------encriptar------------------------------ */


function userCurrenly(){
    // Recuperar la cadena JSON del localStorage
let userCurrenStorege = localStorage.getItem('userCurren');
let userCurren=null

// Verificar si hay datos en el localStorage
if (userCurrenStorege) {
    // Convertir la cadena JSON de userList a un array de JavaScript
    userCurren = JSON.parse(userCurrenStorege);

  
} 
//console.log("usuario",userCurren);

    return userCurren
    }




    



document.addEventListener("DOMContentLoaded",()=>{

    const formulario = document.getElementById("formularioLogin")

    formulario.addEventListener("submit",(event) =>{
        event.preventDefault();
        

        let {id,password}= obtenerDatosFormulario();
        
    
        

       


        console.log('ID:', id);
        console.log(validateId(id));
       
        console.log('Contraseña:', password);


        //console.log(validateUser(id,password));

        if(validateUser(id,password)){

            saveUserCurrenly(id,password);
            window.location.href = '../index.html'; 

        }


        //saveUserCurrenly(id,password);

        
        //userCurrenly();
        

       


       

       
        
        
       // const esValido = validateId(id)&&validateLastName(lastName)&&validateMail(mail)&&validateName(name)&&validatePassword(password,repeatPassword)&&validatePhone(phone)&&validateIdRepeat(id);
        
    
        
      /*   esValido ? manejarExito(): manejarError();



        if (esValido) {
            saveUser(id,name,lastName,phone,mail,password);
        
        }*/

        



        
    });




});



function decryptPassword(encryptedPassword) {


    // Decifrar la contraseña utilizando AES
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedPassword, key);

    // Convertir los bytes decifrados a texto
    const decryptedPassword = decryptedBytes.toString(CryptoJS.enc.Utf8);

    return decryptedPassword;
}

const validateId = (idPerson) => /^\d{2}-\d{4}-\d{4}$/.test(idPerson);

function validateUser(idPerson, password) {

    
    // Verificar si el array de usuarios está vacío
    if (usersList.length === 0) {
        
        return false;
    }

    // Iterar sobre la lista de usuarios
    for (let i = 0; i < usersList.length; i++) {
       
        // Verificar si el ID del usuario actual coincide con el ID proporcionado
        console.log("//////////////////////////")
        console.log(usersList[i].idUser)
        console.log(decryptPassword(usersList[i].password))
        console.log('password',password)

        if (usersList[i].idUser === idPerson && decryptPassword(usersList[i].password)==password) {
          
            alert("logiado con exito");
            return true;
        }
    }
    // Si no se encuentra ningún usuario con el mismo ID, devolver false
    return false;
}


const obtenerDatosFormulario=()=>{

    const id = document.getElementById("idPerson").value.trim();
    const password = document.getElementById("contrasenna").value.trim();
   
  

    
    return{id,password}


};







const manejarExito=()=>{
    const mensajeElemento = document.getElementById('message');
    mensajeElemento.textContent = "Registro Exitoso";
   
    limpiarCamposTexto();
}


const manejarError=()=>{
    const mensajeElemento = document.getElementById('message');
    mensajeElemento.textContent = "Error en los datos";
    //limpiarCamposTexto();

    
   
}

const limpiarCamposTexto = () =>{


    const campos = document.querySelectorAll("#formulario input[type='email'], #formulario input[type='password'],#formulario input[type='text']");
    campos.forEach((campo) => campo.value = '');
    
    

    }








