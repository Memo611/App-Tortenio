const sqlite3 = require('sqlite3').verbose();

// Crear o abrir la base de datos
const db = new sqlite3.Database('C:/AndroidStudio/App-Tortenio/Tortenio.db', (err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err.message);
    return;
  }
  console.log('Conectado a la base de datos');
});

// Ejecuta una consulta SQL para verificar si la tabla 'Clientes' existe
db.get(`SELECT name FROM sqlite_master WHERE type='table' AND name='Clientes'`, (err, row) => {
  if (err) {
    console.error(err.message);
    return;
  }
  if (row) {
    console.log('La tabla "Clientes" existe.');
  } else {
    console.log('La tabla "Clientes" no existe.');
  }
});

// Cierra la conexión a la base de datos cuando no sea necesaria
db.close((err) => {
  if (err) {
    console.error('Error al cerrar la conexión:', err.message);
  } else {
    console.log('Conexión cerrada');
  }
});
