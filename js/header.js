// header.js

function generateHeaderIndex() {
    // Contenido del encabezado en forma de cadena HTML
    var headerHTML = `
        <header>
            <nav>
                <ul>
                   
                    <li><a href="html/seccion.html">Registro / Inicio de sesión</a></li>
                    <li><a href="#">Agenda de citas</a></li>
                    <li><a href="#">Búsqueda de médicos</a></li>
                    <li><a href="#">Sobre nosotros</a></li>
                   
                </ul>
            </nav>
            <nav>
                <ul>
                   
                    <li><a href="#">Servicios </a></li>
                    <li><a href="#">Preguntas frecuentes (FAQ)</a></li>
                    <li><a href="#">Política de privacidad y términos de uso </a></li>
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
    var headerHTML = `
        <header>
            <nav>
                <ul>
                    <li><a href="../index.html">inicio</a></li>
                    <li><a href="../html/seccion.html">Registro / Inicio de sesión</a></li>
                    <li><a href="#">Agenda de citas</a></li>
                    <li><a href="#">Búsqueda de médicos</a></li>
                   
                </ul>
            </nav>
            <nav>
                <ul>
                    <li><a href="#">Sobre nosotros</a></li>
                    <li><a href="#">Servicios </a></li>
                    <li><a href="#">Preguntas frecuentes (FAQ)</a></li>
                    <li><a href="#">Política de privacidad y términos de uso </a></li>
                </ul>
            </nav>
        </header>
    `;

    // Obtener el contenedor y establecer el HTML del encabezado
    var headerContainer = document.getElementById('headerContainer');
    headerContainer.innerHTML = headerHTML;
}
