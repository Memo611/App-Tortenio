const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;

// Conectar a la base de datos SQLite
const db = new sqlite3.Database('C:/AndroidStudio/App-Tortenio/Tortenio.db', (err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err.message);
    } else {
        console.log('Conectado a la base de datos');
    }
});

// Middleware para manejar JSON en el cuerpo de la solicitud
app.use(bodyParser.json());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  // Carpeta donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-'+(file.originalname)); // Nombre único para cada imagen
    },
});
const upload = multer({ storage: storage });

// Ruta para registrar un nuevo cliente, incluyendo la imagen de perfil
app.post('/register', upload.single('profile_image'), (req, res) => {
    const { Nombre, Apellidos, Num_Control, Correo, Contrasena, Telefono, Habilitado } = req.body;
    const profileImage = req.file ? req.file.filename : null;  // Nombre de la imagen guardada

    // Insertar datos en la tabla Clientes
    const sqlInsertCliente = `INSERT INTO Clientes (Nombre, Apellidos, Num_Control, Correo, Contrasena, Habilitado, Profile_Image) 
                              VALUES (?, ?, ?, ?, ?, ?, ?)`;

    db.run(sqlInsertCliente, [Nombre, Apellidos, Num_Control, Correo, Contrasena, Habilitado, profileImage], function(err) {
        if (err) {
            console.error('Error al registrar el cliente:', err.message);
            return res.status(500).json({ message: 'Error al registrar el cliente' });
        }

        const id_cliente = this.lastID; // ID del cliente recién insertado

        // Insertar datos en la tabla Cliente_Tel
        const sqlInsertTelefono = `INSERT INTO Cliente_Tel (id_cliente, Telefono) 
                                   VALUES (?, ?)`;

        db.run(sqlInsertTelefono, [id_cliente, Telefono], function(err) {
            if (err) {
                console.error('Error al registrar el teléfono:', err.message);
                return res.status(500).json({ message: 'Error al registrar el teléfono' });
            }

            res.status(201).json({ message: 'Usuario registrado exitosamente' });
        });
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});