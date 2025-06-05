import z from 'https://cdn.jsdelivr.net/npm/zod@3.25.11/+esm'

//Ejemplo 1 

/* //1. Crear el equema de validación
const nombreSchema = z.string()
const edadSchema = z.number()
const booleanSchema = z.boolean()

//2. Pasar la info
const userEdad = 24

//3. Validación
const mensaje = edadSchema.parse(userEdad)
console.log(mensaje) */

//------------------------------------//

//Esquema basado en objeto 

/* //1. Crear el equema de validación
const userSchema = z.object({
    nombre: z.string().min(1, "El nombre es obligatorio"),
    email: z.string().email(),
    phone: z.number().min(1, "El número debe ser mayor a 0").int().positive("La edad debe ser un número positivo")
})

//2. Pasar la info
const userData = {
    nombre: "Pepe",
    email: "pepe@correo.com",
    phone: "38236132"
}

//3. Validación
const mensaje = userSchema.safeParse(userData)
console.log(mensaje.error) */


// Arrays en Zod

/* //1. Crear el equema de validación
const textoArraySchema = z.array(z.string())

//2. Pasar la info 
textoArraySchema.parse(["1",2,"3"]) */

// Si se quisiera validar un array de objetos como ej. un array de usuarios

//1.
/*const userSchema = z.object({
    nombre: z.string().min(1, "El nombre es obligatorio"),
    email: z.string().email(),
    phone: z.number().min(1, "El número debe ser mayor a 0").int().positive("La edad debe ser un número positivo")
})

const usersSchema = z.array(userSchema)

//2. 
const userData = [
    {
        nombre: "Pepe",
        email: "pepe@correo.com",
        phone: 38236132
    },
    {
        nombre: "Pepe",
        email: "pepe@correo.com",
        phone: 38236132
    }
]

//3. 
const mensaje = usersSchema.safeParse(userData)
console.log(mensaje)*/

    // ✅ Esquema para validar los datos del formulario
     const form = document.getElementById("registerForm");
    const registerSchema = z.object({
       name: z.string()
    .min(1, "El nombre es obligatorio")
    .regex(/[a-zA-ZáéíóúÁÉÍÓÚñÑ]+/, "El nombre debe contener letras"),
    
  email: z.string()
    .email("El correo no es válido"),
  
  password: z.string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .regex(/\d/, "La contraseña debe contener al menos un número")
});

document.getElementById("registerForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    password: document.getElementById("password").value
  };

  try {
    registerSchema.parse(formData);
    document.getElementById("errors").textContent = "";
    alert("¡Registro exitoso!");
    form.reset();
  } catch (error) {
    const errores = error.errors.map(e => e.message).join("\n");
    document.getElementById("errors").textContent = errores;
  }
});
