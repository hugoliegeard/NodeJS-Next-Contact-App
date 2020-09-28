/**
 * Chargement des variables d'environnements
 */
const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

/**
 * Importe le Framework Express
 */
const express = require('express');

/**
 * Initialisation de notre Application Express
 * @type {*|Express}
 */
const app = express();
const port = process.env.PORT || 3000;

/**
 * Configuration du Templating avec Handlebar
 */
const hbs = require('express-handlebars');
const helpers = require('handlebars-helpers')();

/**
 * Custom Helper permettant de rechercher
 * une valeur dans la collection.
 * @param collection
 * @param param
 * @param value
 * @returns {boolean|*}
 */
helpers.ifIn = (collection = [], param, value) => {
    // 1. On parcours notre collection, notre tableau d'objets
    for(let i = 0 ; i < collection.length ; i++) {
        // 2. Pour chaque objet, je vérifie si pour le parametre donnée, la valeur est trouvée.
        if(collection[i][param] === value) {
            // 3. Si la valeur correspond on retour vrai
            return collection[i];
        }
    }
    // 4. Si j'ai parcouru tous le tableau sans trouvé de correspondance, je retourne faux
    return false;
}

app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/',
    helpers: helpers
}));

app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

/**
 * Récupérer les données POST
 * npm install body-parser
 * https://github.com/expressjs/body-parser
 */
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // Parser le body au format JSON
app.use(bodyParser.urlencoded({extended: false}));

/**
 * Configuration de la connexion à MongoDB
 * https://mongoosejs.com/docs/index.html
 * @type {Mongoose}
 */
const mongoose = require('mongoose');
const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, {useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true});

// -- Récupération de la connexion par défaut et Gestion des erreurs
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

/**
 * Configuration des sessions avec Express
 * https://gist.github.com/brianmacarthur/a4e3e0093d368aa8e423
 * https://www.npmjs.com/package/cookie-parser
 * https://www.npmjs.com/package/express-session
 */
const cookieParser = require('cookie-parser');
const session = require('express-session');
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

// Configuration des notifications flash
app.use((req, res, next) => {
    res.locals.sessionFlash = req.session.sessionFlash;
    delete req.session.sessionFlash;
    next();
});

/**
 * Permet de gérer l'affichage de nos assets
 * https://expressjs.com/fr/starter/static-files.html
 */
app.use('/public',
    express.static(__dirname + '/public'));

/**
 * Mise en Place du Routage
 */
const appRouter = require('./src/routes/app-routes');
const apiRouter = require('./src/routes/api-routes');
app.use('/', appRouter);
app.use('/api', apiRouter);

/** Gestion des erreurs 404 **/
app.use(function(req, res, next) {
    // res.status(404).sendFile(__dirname + '/views/html/error.html')
    res.status(404).render('error');
});

/**
 * Démarrage du serveur et écoute
 * des connexions sur le port 3000
 */
app.listen(port, ()=> {
    console.log(`Server is running at http://localhost:${port}/`);
    console.log(`Press CTRL + C to stop\n`);
});
