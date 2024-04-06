

const usersList=initUser();
const userCurren=null;
const key="LaKeyMasSegura";
let attempts=0;
const lockoutTime = 30; 
let block=true;



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

   
   /* let user = {
        idUser: id,
        password: password  // Guardar la contraseña encriptada
    };*/

    let user=usersList.filter(user =>  user.idUser==id);

  
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


    return userCurren
    }




    



    document.addEventListener("DOMContentLoaded", () => {

        const formulario = document.getElementById("formularioLogin");
        const mensajeElemento = document.getElementById('message');
        let attempts = 0;
        const lockoutTime = 30; // Tiempo de bloqueo en segundos
        

     
         
        
    
                    formulario.addEventListener("submit", (event) => {
                        
                        event.preventDefault();


                        if(block){
                            
                
                                
                            
                                    let { id, password } = obtenerDatosFormulario();
                            
                                    if (validateUser(id, password)) {
                                        saveUserCurrenly(id, password);
                                        window.location.href = '../index.html';
                                    } else {
                                        attempts++;
                                        if(attempts <= 2){
                                        mensajeElemento.textContent = "Credenciales inválidas. Intentos restantes: " + (3 - attempts);
                                        }
                            
                                        
                                    if (attempts >= 3) {
                                        block=false
                                        const lockedOutTimestamp = Date.now();
                                        const intervalId = setInterval(() => {
                                            const remainingTime = lockoutTime - Math.floor((Date.now() - lockedOutTimestamp) / 1000);
                                            mensajeElemento.textContent = `Demasiados intentos fallidos. La cuenta está bloqueada. Por favor, inténtelo de nuevo en  ${remainingTime} segundos.`;
                                            if (remainingTime <= 0) {
                                                clearInterval(intervalId);
                                                attempts = 0;
                                                mensajeElemento.textContent = "";
                                                block=true
                                            }
                                        }, 1000);

                                        
                                        
                                    }
                                    }
                        }
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





    function enviarCorreo() {

        const id = document.getElementById("idPerson").value.trim();

        const mensajeElemento = document.getElementById('message');
        
       
       
        uservalidate = usersList.filter(user=> user.idUser==id)
  

        
        if(id!==""){
          

            console.log("usuario ",uservalidate)

                if(uservalidate){

                        const serviceID = 'default_service';
                        const templateID = 'template_npj5zdd';

                        const data = {
                            from_name:"Clínica Árbol de Seda",

                            to_email: uservalidate[0].mail,
                            message: '12349854'
                        };

                        console.log(data)
                    
                        emailjs.send(serviceID, templateID, data)
                        .then(() => {
                         //mensajeElemento.textContent = 'Send Email';
                        
                        }, (err) => {
                            
                        alert(JSON.stringify(err));
                        console.log(JSON.stringify(err));
                        });

                        mensajeElemento.textContent = "Correo enviado";

                    
                }else{

                    mensajeElemento.textContent = "El usuario no existe";

                }
                
        }else{
            mensajeElemento.textContent = "Dijite la Cédula";
        }
    }







