document.addEventListener("DOMContentLoaded", function () {
  const email = {
    email: "",
    nombre: "",
    telefono: "",
    mensaje: "",
  };
  console.log(email);

  //Seleccionar los elementos de la interfaz
  const inputEmail = document.querySelector("#email");
  const inputNombre = document.querySelector("#nombre");
  const inputTelefono = document.querySelector("#telefono");
  const inputMensaje = document.querySelector("#mensaje");
  const formulario = document.querySelector("#formulario");
  const btnSubmit = document.querySelector('#formulario button[type="submit"]');
  const btnReset = document.querySelector('#formulario button[type="reset"]');
  const spinner = document.querySelector("#spinner");

  //Asignar eventos
  inputEmail.addEventListener("input", validar);
  inputNombre.addEventListener("input", validar);
  inputTelefono.addEventListener("input", validar);
  inputMensaje.addEventListener("input", validar);

  formulario.addEventListener("submit", enviarEmail);

  btnReset.addEventListener("click", function (e) {
    e.preventDefault();

    //reiniciar el objeto
    email.email = "";
    email.nombre = "";
    email.telefono = "";
    email.mensaje = "";

    formulario.reset();
    comprobarEmail();
  });

  function enviarEmail(e) {
    e.preventDefault();

    //enviar email
    email.email = inputEmail.value;
    email.nombre = inputNombre.value;
    email.telefono = inputTelefono.value;
    email.mensaje = inputMensaje.value;

    console.log(email);

    formulario.reset();
    comprobarEmail();

  // Deshabilitar el botón de envío después de enviar el formulario
  btnSubmit.disabled = true;

    // Crear una Alerta
    const alertaExito = document.createElement('P');
    alertaExito.classList.add('bg-primary', 'text-white', 'text-center', 'mt-1', 'py-1', 'upercase');
    alertaExito.textContent = "Mensaje enviado correctamente";

     formulario.appendChild(alertaExito);

     setTimeout(() => {
      alertaExito.remove();
    // Habilitar el botón de envío cuando se elimine la alerta
    btnSubmit.disabled = false;
     }, 3000);

  
  }
  //Funciones
  function validar(e) {
    if (e.target.value.trim() === "") {
      mostrarAlerta(
        `El campo ${e.target.id} es obligatorio`,
        e.target.parentElement
      );
      email[e.target.id] = "";
      comprobarEmail();
      return;
    }
    if (e.target.id === "email" && !validarEmail(e.target.value)) {
      mostrarAlerta("El email no es valido", e.target.parentElement);
      email[e.target.id] = "";
      comprobarEmail();
      return;
    }
    limpiarAlerta(e.target.parentElement);

    // Asignar los valores
    email[e.target.id] = e.target.value.trim().toLowerCase();
    console.log(email);

    //Comprobar el objeto de email
    comprobarEmail();

    function mostrarAlerta(mensaje, referencia) {
      //Comprueba si ya existe si ya existe una alerta
      const alerta = referencia.querySelector(".bg-danger");
      if (alerta) {
        alerta.remove();
        return;
      }

      //Generar alerta en HML
      const error = document.createElement("p");
      error.textContent = mensaje;
      error.classList.add(
        "bg-danger",
        "text-white",
        "text-center",
        "mt-1",
        "py-1"
      );
      /*
      // Generar alerta en HTML
    const error = document.createElement('p')
    error.textContent = mensaje;
    error.style.backgroundColor = '#dc3545'; // Color de fondo rojo
    error.style.color = 'white'; // Color del texto blanco
    error.style.textAlign = 'center'; // Texto centrado
    error.style.marginTop = '1rem'; // Margen superior
    error.style.padding = '1rem'; // Relleno
    */

      //Inyectar el error al formulario
      referencia.appendChild(error);
    }

    function limpiarAlerta(referencia) {
      const alerta = referencia.querySelector(".bg-danger");
      if (alerta) {
        alerta.remove();
      }
    }
  }
  function validarEmail(email) {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const resultado = regex.test(email);
    return resultado;
  }
  function comprobarEmail() {
    if (Object.values(email).includes("")) {
      btnSubmit.classList.add("opacity-50");
      btnSubmit.disabled = true;
      return;
    } else {
      btnSubmit.classList.remove("opacity-50");
      btnSubmit.disabled = false;
    }
  }
});
