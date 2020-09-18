/**
 * Importer le package http.
 * -------------------------------
 * Permet de gérer les opérations HTTP
 * @type {module:http}
 */
const http = require('http');

/**
 * Déclaration de notre hôte et son port
 * @type {string}
 */
const hostname = '127.0.0.1';
const port = 3000;

/**
 * Importer le package url.
 * -------------------------
 * Permet de lire l'URL et ses données.
 * @type {module:url}
 */
const url = require('url');

/**
 * Importer le package filesystem
 * -------------------------------
 * Accès au Système de Fichiers
 * https://devdocs.io/node/fs
 * @type {module:fs}
 */
const fs = require('fs');

/**
 * Création de notre serveur web en javascript
 */
const server = http.createServer((req, res) => {

    let path = url.parse(req.url).pathname;
    console.log(path);

    if (path === '/') {

        fs.readFile( __dirname + '/views/html/index.html', (err, data) => {

            if (err) console.log(err);

            res.statusCode = 200; // https://developer.mozilla.org/fr/docs/Web/HTTP/Status
            res.setHeader('Content-Type', 'text/html; charset="utf-8"');
            res.end(data);

        } );

    } else if ( path === '/contacts' ) {

        fs.readFile( __dirname + '/views/html/contacts.html', (err, data) => {

            if (err) console.log(err);

            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html; charset="utf-8"');
            res.end(data);

        } );

    } else if ( path === '/contact' ) {

        let params = url.parse(req.url, true).query; // Permet de récupérer les paramètres dans l'URL
        let firstname = params.firstname || 'Anonymous';
        let lastname = params.lastname || '';

        fs.readFile( __dirname + '/views/html/contact.html', (err, data) => {

            if (err) console.log(err);

            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html; charset="utf-8"');

            data = data.toString()
                .replace('{{ firstname }}', firstname);

            data = data.toString()
                .replace('{{ lastname }}', lastname);

            res.end(data);

        } );

    } else if ( path === '/public/dist/bundle.js' ) {

        fs.readFile( __dirname + '/public/dist/bundle.js', (err, data) => {
            if (err) console.log(err);
            res.statusCode = 200;
            res.end(data);
        } );

    } else {

        fs.readFile( __dirname + '/views/html/error.html', (err, data) => {

            if (err) console.log(err);

            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html; charset="utf-8"');
            res.end(data);

        } );

    }

});

/**
 * Démarrage du serveur et écoute
 * des connexions sur le port 3000
 */
server.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}/`);
    console.log(`Press CTRL + C to stop\n`);
});
