const express = require('express');
const session = require('express-session');
const path = require('path');
const flash = require('connect-flash');
const loginRoutes = require('./routes/login');
const Menu_adminController = require('./routes/menu_admin'); 
const Menu_Controller = require('./routes/menu'); 
const events = require('events');

const app = express();
events.EventEmitter.defaultMaxListeners = 20;

app.set('port', 5000);

//Motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(session({ //MANOEJO DE SOLICITUDES Y RESPUESTAS EN LAS VISTAS
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));
app.use(flash());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// RUTAS
app.use('/login', loginRoutes);
app.use('/menu_admin', Menu_adminController); 
app.use('/menu', Menu_Controller); 



app.get('/', (req, res) => {
    const messages = req.flash('success');
    res.render('login/index', { name: 'index', layout: 'main', messages });
});

// servidor
app.listen(app.get('port'), () => {
    console.log('SERVIDOR ACTIVO:', app.get('port'));
});