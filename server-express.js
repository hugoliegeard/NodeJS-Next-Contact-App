/**
 * Importe le Framework Express
 */
const express = require('express');

/**
 * Initialisation de notre Application Express
 * @type {*|Express}
 */
const app = express();
const port = 3000;

/**
 * Configuration du Templating avec Handlebar
 */
const hbs = require('express-handlebars');
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/',
}));

app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

/**
 * Récupérer les données POST
 * https://github.com/expressjs/body-parser
 */
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // Parser le body au format JSON
app.use(bodyParser.urlencoded({extended: false}));

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
app.use('/', appRouter);

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
