  // Simulando una "base de datos" de mesas por fecha
  const disponibilidadPorFecha = {};

  // Función para redondear hacia arriba
  function redondear(valor) {
    return Math.ceil(valor);
  }

  // Función para verificar disponibilidad en una fecha específica
  function verificarDisponibilidad(fecha, mesasSolicitadas) {
    if (!disponibilidadPorFecha[fecha]) {
      disponibilidadPorFecha[fecha] = 5; // Se asignan 5 mesas por nueva fecha
    }

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mesasSolicitadas <= disponibilidadPorFecha[fecha]) {
          disponibilidadPorFecha[fecha] -= mesasSolicitadas; // Reservamos las mesas
          resolve(`✅ Reserva aceptada: ${mesasSolicitadas} mesa(s) reservadas para el ${fecha}.`);
        } else {
          reject(`❌ No hay suficientes mesas disponibles para el ${fecha}. Solo quedan ${disponibilidadPorFecha[fecha]}.`);
        }
      }, 1500);
    });
  }

  // Simula el envío de un correo
  function enviarConfirmacionReserva(nombreCliente) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const exito = Math.random() > 0.2;
        if (exito) {
          resolve(`📧 Correo de confirmación enviado a ${nombreCliente}.`);
        } else {
          reject("❌ Error al enviar el correo de confirmación.");
        }
      }, 1000);
    });
  }
function limpiarFormulario() {
  document.getElementById("reservaInfo").reset();
}
  // Función principal de reserva
  async function hacerReserva(nombreCliente, numPersonas, fecha) {
    const mesasSolicitadas = redondear(numPersonas / 4);
    console.log(`👤 ${nombreCliente} solicitó reservar para ${numPersonas} persona(s) (${mesasSolicitadas} mesa(s)) en la fecha ${fecha}.`);

    try {
      const disponibilidad = await verificarDisponibilidad(fecha, mesasSolicitadas);
      console.log(disponibilidad);

      console.log("📨 Enviando correo de confirmación...");
      const confirmacion = await enviarConfirmacionReserva(nombreCliente);
      console.log(confirmacion);

      alert("✅ Reserva completada exitosamente.");
      limpiarFormulario();
    } catch (error) {
      console.error("❗ Error:", error);
      alert(error);
      limpiarFormulario();
    }
  }

  // Conectar con el formulario HTML
  document.getElementById("reservaInfo").addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const personas = parseInt(document.getElementById("personas").value);
    const fecha = document.getElementById("fecha").value;

    hacerReserva(nombre, personas, fecha);
  });
 