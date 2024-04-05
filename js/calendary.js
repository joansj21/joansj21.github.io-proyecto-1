const daysContainer = document.querySelector(".days"),
  nextBtn = document.querySelector(".next-btn"),
  prevBtn = document.querySelector(".prev-btn"),
  month = document.querySelector(".month"),
  todayBtn = document.querySelector(".today-btn");

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

  const user = obtenerUser();

  const initCita =()=>{
    // Recuperar la cadena JSON del localStorage
    let citasListJSON = localStorage.getItem('citasList');
    let citasList=[];
    let citasListUSer=[]


    // Verificar si hay datos en el localStorage
    if (citasListJSON) {
        // Convertir la cadena JSON de userList a un array de JavaScript
        citasList = JSON.parse(citasListJSON);

        citasListUSer = citasList.filter(cita => cita.user[0].idUser === user[0].idUser);

        console.log("citas",citasListUSer)     

    } 

    return citasListUSer

}


const citasListUSer = initCita();

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// get current date
const date = new Date();

// get current month
let currentMonth = date.getMonth();

// get current year
let currentYear = date.getFullYear();

// function to render days
/*
function renderCalendar() {
  // get prev month current month and next month days
  date.setDate(1);
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const lastDayIndex = lastDay.getDay();
  const lastDayDate = lastDay.getDate();
  const prevLastDay = new Date(currentYear, currentMonth, 0);
  const prevLastDayDate = prevLastDay.getDate();
  const nextDays = 7 - lastDayIndex - 1;

  // update current year and month in header
  month.innerHTML = `${months[currentMonth]} ${currentYear}`;

  // update days html
  let days = "";

  // prev days html
  for (let x = firstDay.getDay(); x > 0; x--) {
    days += `<div class="day prev">${prevLastDayDate - x + 1}</div>`;
  }

  // current month days
  for (let i = 1; i <= lastDayDate; i++) {
    // check if its today then add today class
    if (
      i === new Date().getDate() &&
      currentMonth === new Date().getMonth() &&
      currentYear === new Date().getFullYear()
    ) {
      // if date month year matches add today
      days += `<div class="day today">${i}</div>`;
    } else {
      //else dont add today
      days += `<div class="day ">${i}</div>`;
    }
  }

  // next MOnth days
  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next">${j}</div>`;
  }

  // run this function with every calendar render
  hideTodayBtn();
  daysContainer.innerHTML = days;

  // Seleccionar todos los elementos con la clase "day"
  const allDays = document.querySelectorAll(".day");

  // Agregar un event listener a cada día del calendario
  allDays.forEach(day => {
    day.addEventListener("click", () => {
      // Obtener el número del día seleccionado
      const selectedDay = parseInt(day.textContent);

      // Obtener el mes y el año actuales
      const selectedMonth = currentMonth + 1; // Sumar 1 porque los meses en JavaScript van de 0 a 11
      const selectedYear = currentYear;

      // Aquí puedes abrir un formulario o una ventana emergente para que el usuario ingrese los detalles de la cita
      // Por ejemplo:
      //alert(`¡Has seleccionado la fecha ${selectedDay}/${selectedMonth}/${selectedYear} para pedir una cita!`);

      //window.open('../html/scheduleCalendaryPopUP.html', 'popupWindow', 'width=400,height=300');
    });
  });
}*/


/*--------------------------------------------------- */
function renderCalendar() {
  // obtener el primer día del mes, el último día del mes y el número total de días en el mes
  date.setDate(1);
  const primerDia = new Date(currentYear, currentMonth, 1);
  const ultimoDia = new Date(currentYear, currentMonth + 1, 0);
  const ultimoDiaIndice = ultimoDia.getDay();
  const ultimoDiaFecha = ultimoDia.getDate();
  const ultimoDiaMesAnterior = new Date(currentYear, currentMonth, 0);
  const ultimoDiaFechaMesAnterior = ultimoDiaMesAnterior.getDate();
  const diasSiguientes = 7 - ultimoDiaIndice - 1;

  // actualizar el año y mes actual en el encabezado
  month.innerHTML = `${months[currentMonth]} ${currentYear}`;

  // actualizar el HTML de los días
  let dias = "";

  // HTML de los días del mes anterior
  for (let x = primerDia.getDay(); x > 0; x--) {
    dias += `<div class="day prev">${ultimoDiaFechaMesAnterior - x + 1}</div>`;
  }

  // días del mes actual
  for (let i = 1; i <= ultimoDiaFecha; i++) {
    let claseDia = "day";

    // Verificar si hay citas para este día
    const citasParaElDia = citasListUSer.filter(cita => {

      //console.log(cita.date)
      const fechaCita = new Date(cita.date);

     // console.log("compracion de dias cita",fechaCita.getDate()+1," ==  dia de la semana",i )
     // return fechaCita.getDate()+1 === i;
     return fechaCita.getDate()+1 === i && fechaCita.getMonth() === currentMonth && fechaCita.getFullYear() === currentYear;
    });

    console.log(`Citas para el día ${i}:`, citasParaElDia);

    if (citasParaElDia.length > 0) {
      // Si hay citas, verificar su estado
      const citasPendientes = citasParaElDia.filter(cita => cita.state === "pendiente");

      

      if (citasPendientes.length > 0) {
        // Si hay citas pendientes, establecer el color amarillo
        
        claseDia += " pending-appointment";
      } else {
        // Si no hay citas pendientes, establecer el color verde
        claseDia += " booked-appointment";
      }
    }


    dias += `<div class="${claseDia}">${i}</div>`;
  }

  // días del siguiente mes
  for (let j = 1; j <= diasSiguientes; j++) {
    dias += `<div class="day next">${j}</div>`;
  }

  // ocultar el botón de hoy si ya estamos en el mes actual
  hideTodayBtn();
  daysContainer.innerHTML = dias;

  console.log("Contenido HTML generado:", dias);

  // Seleccionar todos los elementos con la clase "day"
  const todosLosDias = document.querySelectorAll(".day");

  // Agregar un event listener a cada día del calendario
  todosLosDias.forEach(dia => {
    dia.addEventListener("click", () => {
      // Obtener el número del día seleccionado
      const diaSeleccionado = parseInt(dia.textContent);

      // Obtener el mes y el año actuales
      const mesSeleccionado = currentMonth + 1; // Sumar 1 porque los meses en JavaScript van de 0 a 11
      const añoSeleccionado = currentYear;

      console.log(`Día seleccionado: ${diaSeleccionado}, Mes: ${mesSeleccionado}, Año: ${añoSeleccionado}`);

      // Aquí puedes abrir un formulario o una ventana emergente para que el usuario ingrese los detalles de la cita
      // Por ejemplo:
      //alert(`¡Has seleccionado la fecha ${diaSeleccionado}/${mesSeleccionado}/${añoSeleccionado} para pedir una cita!`);

      //window.open('../html/scheduleCalendaryPopUP.html', 'popupWindow', 'width=400,height=300');
    });
  });
}


/*----------------------------------------------------- */

renderCalendar();

nextBtn.addEventListener("click", () => {
  // increase current month by one
  currentMonth++;
  if (currentMonth > 11) {
    // if month gets greater that 11 make it 0 and increase year by one
    currentMonth = 0;
    currentYear++;
  }
  // rerender calendar
  renderCalendar();
});

// prev monyh btn
prevBtn.addEventListener("click", () => {
  // increase by one
  currentMonth--;
  // check if let than 0 then make it 11 and deacrease year
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar();
});

// go to today
todayBtn.addEventListener("click", () => {
  // set month and year to current
  currentMonth = date.getMonth();
  currentYear = date.getFullYear();
  // rerender calendar
  renderCalendar();
});

// lets hide today btn if its already current month and vice versa
function hideTodayBtn() {
  if (
    currentMonth === new Date().getMonth() &&
    currentYear === new Date().getFullYear()
  ) {
    todayBtn.style.display = "none";
  } else {
    todayBtn.style.display = "flex";
  }
}
