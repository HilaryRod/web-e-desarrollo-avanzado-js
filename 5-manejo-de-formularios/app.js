const form = document.getElementById('myForm');
//ayuda a que no se pueda seleccionar una fecha pasada al dia actual
document.getElementById("fecha").min = new Date().toISOString().split("T")[0];

form.addEventListener('submit', function (event) {
    event.preventDefault(); // Previene envío automático

    const archivo = document.getElementById('archivo');

    const data = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        telefono: document.getElementById('telefono').value.trim(),
        intereses: Array.from(document.querySelectorAll('input[name="intereses"]:checked')).map(el => el.value),
        genero: document.querySelector('input[name="genero"]:checked'),
        ciudad: document.getElementById('ciudad').value,
        fecha: document.getElementById('fecha').value,
        hora: document.getElementById('hora').value,
        archivo: archivo.files[0]
        
    };

    const errores = [];

    // Validación de nombre
    const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+([ '-][A-Za-zÁÉÍÓÚáéíóúÑñ]+)*$/;
    if (!data.name || !regexNombre.test(data.name)) {
        errores.push("🔴 El nombre es obligatorio y debe tener solo letras.");
    }

    // Validación de correo
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !regexEmail.test(data.email)) {
        errores.push("🔴 El correo electrónico no es válido.");
    }

    // Validación de teléfono
    const regexTel = /^[0-9]{10}$/;
    if (!data.telefono || !regexTel.test(data.telefono)) {
        errores.push("🔴 El teléfono debe contener solo números (10 dígitos).");
    }
if (data.intereses.length === 0 || !data.genero || !data.ciudad || !data.fecha || !data.hora || !data.archivo) {
    errores.push("🔴 Por favor completa todos los campos y sube el archivo de identificación.");
}
    if (data.hora < "08:00" || data.hora > "21:00") {
    errores.push("🔴 La hora debe estar entre las 08:00 y las 21:00.");
}
    if (errores.length > 0) {
        alert("🚫 Por favor corrige los siguientes errores:\n\n" + errores.join("\n"));
        return;
    }

    // Si pasa todo:
    console.log(`✅ Nombre: ${data.name}`);
    console.log(`✅ Email: ${data.email}`);
    console.log(`✅ Teléfono: ${data.telefono}`);
    console.log(`✅ Intereses: ${data.intereses}`);
    console.log(`✅ Género: ${data.genero.value}`);
    console.log(`✅ Ciudad: ${data.ciudad}`);
    console.log(`✅ Fecha: ${data.fecha}`);
    console.log(`✅ Hora: ${data.hora}`);
    console.log(`📎 Archivo: ${archivo.files[0]?.name || 'No adjuntado'}`);

    alert("✅ Formulario enviado correctamente.");
    form.reset();
});
