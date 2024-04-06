

const usersList=initUser();
//const key = CryptoJS.enc.Hex.parse('000102030405060708090a0b0c0d0e0f');
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
console.log(userList);

    return userList

}


document.addEventListener("DOMContentLoaded",()=>{

    const formulario = document.getElementById("formulario")

    formulario.addEventListener("submit",(event) =>{
        event.preventDefault();
        

        let {id,name,lastName,phone,mail,password,repeatPassword}= obtenerDatosFormulario();
        
    
        

       


        console.log('ID:', id);
        console.log(validateId(id));

        console.log('Nombre:', name);
        console.log(validateName(name));

        console.log('Apellido:', lastName);
        console.log(validateLastName(lastName));

        console.log('Teléfono:', phone);
        console.log(validatePhone(phone));

        console.log('Correo electrónico:', mail);
        console.log(validateMail(mail));

        console.log('Contraseña:', password);
        console.log(validatePassword(password,repeatPassword));

        console.log('Repetir contraseña:', repeatPassword);


       

       
        
        
        const esValido = validateId(id)&&validateLastName(lastName)&&validateMail(mail)&&validateName(name)&&validatePassword(password,repeatPassword)&&validatePhone(phone)&&validateIdRepeat(id);
        
    
        
        esValido ? manejarExito(): manejarError();



        if (esValido) {
            saveUser(id,name,lastName,phone,mail,password);
        
        }

        



        
    });




});

/*-----------------------guardar en json------------------------------ */
//objeto

function saveUser(id,name,lastName,phone,mail,password){

    // Encriptar la contraseña
    const encryptedPassword = encripPassword(password);

    // Crear un objeto con las propiedades id, name, lastName, phone, mail y password
    let user = {
        idUser: id,
        name: name,
        lastName: lastName,
        phone: phone,
        mail: mail,
        password: encryptedPassword  // Guardar la contraseña encriptada
    };

    usersList.push(user);
    localStorage.setItem('userList', JSON.stringify(usersList));


    


    //console.log("userList",usersList)

}



/*-----------------------encriptar------------------------------ */

function encripPassword(pass){

    let encrypted = CryptoJS.AES.encrypt(pass, key);

    return encrypted.toString();
}
/*----------------------------------------------------- */

const obtenerDatosFormulario=()=>{

    const id = document.getElementById("idPerson").value.trim();
    const name = document.getElementById("name").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const mail = document.getElementById("mail").value.trim();
    const password = document.getElementById("contrasenna").value.trim();
    const repeatPassword = document.getElementById("contrasennaRepeat").value.trim();
  

    
    return{id,name,lastName,phone,mail,password,repeatPassword}


};

const validateId = (idPerson) => /^\d{2}-\d{4}-\d{4}$/.test(idPerson);

const validateName = (name) => /^[a-zA-Z]{1,20}$/.test(name);

//const validateLastName = (lastName) => /^[a-zA-Z]{1,30}$/.test(lastName);
const validateLastName = (lastName) => /^[a-zA-Z\s]{1,30}$/.test(lastName);

const validatePhone = (phone) => /^\d{4}-\d{4}$/.test(phone);

const validateMail=(mail)=> /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);

const validatePassword = (password, confirmPassword) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{1,11}$/.test(password) && password === confirmPassword;

function validateIdRepeat(idPerson) {
    // Verificar si el array de usuarios está vacío
    if (usersList.length === 0) {
        // Si el array está vacío, devolver false indicando que el ID no está repetido
        return true;
    }

    // Iterar sobre la lista de usuarios
    for (let i = 0; i < usersList.length; i++) {
        // Verificar si el ID del usuario actual coincide con el ID proporcionado
        if (usersList[i].idUser === idPerson) {
            // Si encuentra un usuario con el mismo ID, mostrar un mensaje de alerta y devolver true
            alert("Ya existe el usuario");
            return false;
        }
    }
    // Si no se encuentra ningún usuario con el mismo ID, devolver false
    return true;
}

  




/*------------------------------*/

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








