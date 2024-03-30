// header.js

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

    console.log("usuario " ,userCurren)

    return userCurren
    }





function generateHeaderIndex() {
    // Contenido del encabezado en forma de cadena HTML
    let usuarioAutenticado = userCurrenly();
    var headerHTML = `
        <header>
            <nav>
                <ul>

                    <li><a href="#">Servicios </a></li>
    `;

    // Agregar opciones disponibles para todos los usuarios
    headerHTML += `
            <li><a href="html/aboutUS.html">Sobre nosotros</a></li>
            <li><a href="html/contact.html">Información de Contacto</a></li>
            <li><a href="html/faq.html">Preguntas frecuentes</a></li>
            <li><a href="html/doctors.html">Búsqueda de médicos</a></li>
            <li><a href="data/Politicas.pdf" download="Politica de privacidad.pdf">Política de privacidad y términos de uso</a></li>`;

    // Agregar opción de "Registro / Inicio de sesión" si el usuario no está autenticado
    if (!usuarioAutenticado) {
        headerHTML += `<li><a href="html/seccion.html">Registro / Inicio de sesión</a></li>`;
    } else {
        // Agregar opciones disponibles solo para usuarios autenticados
        headerHTML += `
            <li><a href="html/scheduleAppointments.html">Agenda de citas</a></li>
            <li><a href="#" class="logoutIndex">Salir de sesión</a></li>`;
    }

    // Continuar con el cierre del contenido del encabezado
    headerHTML += `
                </ul>
            </nav>
        </header>
    `;

    // Obtener el contenedor y establecer el HTML del encabezado
    var headerContainer = document.getElementById('headerContainer');
    headerContainer.innerHTML = headerHTML;
}

function generateHeader() {
    // Contenido del encabezado en forma de cadena HTML
    let usuarioAutenticado = userCurrenly();
    var headerHTML = `
        <header>
            <nav>
                <ul>
                    <li><a href="../index.html">inicio</a></li>
                    <li><a href="#">Servicios </a></li>
    `;

    // Agregar opciones disponibles para todos los usuarios
    headerHTML += `
            <li><a href="../html/aboutUS.html">Sobre nosotros</a></li>
            <li><a href="../html/contact.html">Información de Contacto</a></li>
            <li><a href="../html/faq.html">Preguntas frecuentes</a></li>
            <li><a href="../html/doctors.html">Búsqueda de médicos</a></li>
            <li><a href="../data/Politicas.pdf" download="Politica de privacidad.pdf">Política de privacidad y términos de uso</a></li>`;

    // Agregar opción de "Registro / Inicio de sesión" si el usuario no está autenticado
    if (!usuarioAutenticado) {
        headerHTML += `<li><a href="../html/seccion.html">Registro / Inicio de sesión</a></li>`;
    } else {
        // Agregar opciones disponibles solo para usuarios autenticados
        headerHTML += `
            <li><a href="../html/scheduleAppointments.html">Agenda de citas</a></li>
            <li><a href="#" class="logout">Salir de sesión</a></li>`;
    }

    // Continuar con el cierre del contenido del encabezado
    headerHTML += `
                </ul>
            </nav>
        </header>
    `;

    // Obtener el contenedor y establecer el HTML del encabezado
    var headerContainer = document.getElementById('headerContainer');
    headerContainer.innerHTML = headerHTML;
}


/*para cerrar la sesion*/

document.addEventListener("DOMContentLoaded",()=>{

    const out = document.querySelector('.logout')

    if(out){

    
        out.addEventListener('click', function(event) {
            event.preventDefault();
            logout();
        });
    }

    



});



function logout() {

    localStorage.removeItem('userCurren');
    window.location.href = '../html/seccion.html'; 
    //window.location.reload()
}



/*---------------------------------- */

document.addEventListener("DOMContentLoaded",()=>{

    const out = document.querySelector('.logoutIndex')

    if(out){

    
        out.addEventListener('click', function(event) {
            event.preventDefault();
            logoutIndex();
        });
    }

    



});



function logoutIndex() {

    localStorage.removeItem('userCurren');
    window.location.href = 'html/seccion.html'; 
    //window.location.reload()
}


