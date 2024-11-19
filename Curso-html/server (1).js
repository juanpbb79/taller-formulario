import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

// Middleware para parsear el cuerpo de las peticiones
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Registro de Estudiantes</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; }
        form { display: flex; flex-direction: column; }
        label, input, select { margin-bottom: 10px; }
        input[type="submit"] { cursor: pointer; }
      </style>
    </head>
    <body>
      <h1>Registro de Estudiantes</h1>
      <form action="/registro" method="POST">
        <label for="nombre">Nombre completo:</label>
        <input type="text" id="nombre" name="nombre" required>
        
        <label for="edad">Edad:</label>
        <input type="number" id="edad" name="edad" required min="1">
        
        <label for="email">Correo electrónico:</label>
        <input type="email" id="email" name="email" required>
        
        <label for="curso">Curso:</label>
        <select id="curso" name="curso" required>
          <option value="">Seleccione un curso</option>
          <option value="Node.js">Node.js</option>
          <option value="HTML y CSS">HTML y CSS</option>
        </select>
        
        <input type="submit" value="Registrar">
      </form>
    </body>
    </html>
  `);
});

// Procesar los datos del formulario
app.post('/registro', (req, res) => {
  const { nombre, edad, email, curso } = req.body;
  
  // Validación básica del servidor
  if (!nombre || !edad || !email || !curso) {
    return res.status(400).send('Todos los campos son obligatorios');
  }

  // Página de confirmación
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Confirmación de Registro</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; }
      </style>
    </head>
    <body>
      <h1>Confirmación de Registro</h1>
      <p>Gracias por registrarte. Aquí están tus datos:</p>
      <ul>
        <li><strong>Nombre:</strong> ${nombre}</li>
        <li><strong>Edad:</strong> ${edad}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Curso:</strong> ${curso}</li>
      </ul>
      <a href="/">Volver al formulario</a>
    </body>
    </html>
  `);
});

// Iniciar el servidor