import express from 'express';
import session from 'sesion';
import moment from 'moment-timezone';

const app = express();

app.use(session({
    secret: 'p3-AFL#UTXJ-SesionesPersistentes',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000,
            secure: false,
         }
    }));

// Ruta para inicializar la sesion
app.get('/iniciar-sesion', (req, res) => {
    if (!req.session.inicio) {
        req.session.inicio = new Date();
        req.session.ultimoAcceso = new Date();
        res.send('Sesión iniciada');
    } else {
        res.send('Sesión ya iniciada');
    }
});

// Ruta para actualizar la fecha de última consulta
app.get('/actualizar', (req, res) => {
    if (req.session.inicio) {
        req.session.ultimoAcceso = new Date();
        res.send('Fecha de última consulta actualizada');
    } else {
        res.send('No hay una sesión activa.');
    }
});



// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
