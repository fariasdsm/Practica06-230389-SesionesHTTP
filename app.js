import express from 'express';
import session from 'express-session';
import { v4 as uuidv4 } from 'uuid';
import os from 'os';
import macaddress from 'macaddress';

const app = express();
app.use(express.json());

// Configuración del middleware de sesiones
app.use(session({
    secret: 'AFL#TIGRILLO-SESIONESHTTP',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 2 * 60 * 1000 }, // Expira en 2 minutos de inactividad
}));

// Obtener información del servidor
const serverIP = Object.values(os.networkInterfaces())
    .flat()
    .find((iface) => iface.family === 'IPv4' && !iface.internal)?.address || 'IP no disponible';
let serverMAC = 'MAC no disponible';
macaddress.all((err, all) => {
    if (!err) {
        serverMAC = Object.values(all)[0]?.mac || 'MAC no disponible';
    }
});

app.post('/login', (req, res) => {
    const { nombre, email } = req.body;

    if (!nombre || !email) {
        return res.status(400).send('Faltan parámetros: nombre y email son requeridos.');
    }

    const sessionID = uuidv4();
    req.session.sessionData = {
        sessionID,
        nombre,
        email,
        fechaCreacion: new Date(),
        ultimoAcceso: new Date(),
        ipCliente: req.ip,
        macCliente: 'MAC no disponible', // Solo es posible obtenerla desde el cliente
        ipServidor: serverIP,
        macServidor: serverMAC
    };

    res.json({ mensaje: 'Sesión iniciada', sessionID });
});

// Mantengo las rutas para logout, update, status, etc.
// (Igual que antes, pero ahora incluyen las propiedades `ipServidor` y `macServidor`).

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
