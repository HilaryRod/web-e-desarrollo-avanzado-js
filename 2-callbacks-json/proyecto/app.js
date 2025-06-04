let biblioteca = {
    "libros": [
        { "titulo": "Cien años de soledad", "autor": "Gabriel García Márquez", "genero": "Realismo mágico", "disponible": true },
        { "titulo": "1984", "autor": "George Orwell", "genero": "Distopía", "disponible": true }
    ]
};

// Simula la lectura del "archivo"
function leerDatos(callback) {
    setTimeout(() => {
        callback(biblioteca);
    }, 1000);
}

// Mostrar libros en la interfaz
function mostrarLibros() {
    leerDatos((datos) => {
        const lista = document.getElementById('librosConsultados');
        lista.innerHTML = ''; // Limpiar lista anterior
        datos.libros.forEach((libro, index) => {
            const li = document.createElement('li');
            li.textContent = `${index + 1}. ${libro.titulo} - ${libro.autor} (${libro.disponible ? 'Disponible' : 'Prestado'})`;
            lista.appendChild(li);
        });
    });
}

// Agregar libro
function agregarLibro(titulo, autor, genero, disponible) {
    const nuevoLibro = { titulo, autor, genero, disponible };
    setTimeout(() => {
        biblioteca.libros.push(nuevoLibro);
        alert(`Libro "${titulo}" agregado correctamente.`);
    }, 1000);
    mostrarLibros();
}

// Actualizar disponibilidad
function actualizarDisponibilidad(titulo, nuevoEstado) {
    setTimeout(() => {
        const libro = biblioteca.libros.find(l => l.titulo.toLowerCase() === titulo.toLowerCase());
        if (libro) {
            libro.disponible = nuevoEstado;
            alert(`Disponibilidad de "${libro.titulo}" actualizada.`);
        } else {
            alert("Libro no encontrado.");
        }
    }, 1000);
    mostrarLibros();
}

// Eventos DOM
document.getElementById('btnConsultar').addEventListener('click', mostrarLibros);

document.getElementById('formLibro').addEventListener('submit', function (e) {
    e.preventDefault();
    const titulo = document.getElementById('titulo').value;
    const autor = document.getElementById('autor').value;
    const genero = document.getElementById('genero').value;
    const disponible = document.getElementById('disponible').value === "true";
    agregarLibro(titulo, autor, genero, disponible);
    this.reset(); // Limpiar formulario
});

document.getElementById('btnActualizar').addEventListener('click', () => {
    const titulo = document.getElementById('tituloActualizar').value;
    const nuevoEstado = document.getElementById('nuevoEstado').value === "true";
    actualizarDisponibilidad(titulo, nuevoEstado);
});