const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;

// Conectar a la base de datos SQLite
const db = new sqlite3.Database('../Tortenio.db', (err) => {
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
app.post('/login', (req, res) => {
    const { emailOrNumControl, password } = req.body;

    // Validar que se proporcionen todos los campos necesarios
    if (!emailOrNumControl || !password) {
        return res.status(400).json({ message: 'Por favor, proporciona el login y la contraseña' });
    }

    // Consulta para verificar si el usuario existe con el correo o número de control y la contraseña
    const sqlLogin = `
        SELECT * FROM Clientes 
        WHERE (Correo = ? OR Num_Control = ?) 
        AND Contrasena = ?`;

    // Ejecutar la consulta
    db.get(sqlLogin, [emailOrNumControl, emailOrNumControl, password], (err, user) => {
        if (err) {
            console.error('Error al verificar las credenciales:', err.message);
            return res.status(500).json({ message: 'Error en el servidor' });
        }

        // Verificar si se encontró un usuario
        if (!user) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        // Inicio de sesión exitoso
        res.status(200).json({
            message: 'Inicio de sesión exitoso',
            user: {
                id: user.id_cliente,
                Nombre: user.Nombre,
                Apellidos: user.Apellidos,
                Correo: user.Correo,
                Num_Control: user.Num_Control,
                Telefono: user.Telefono,
                Habilitado: user.Habilitado,
                Profile_Image: user.Profile_Image,
            },
        });
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});