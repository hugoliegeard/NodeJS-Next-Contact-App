/**
 * C'est le même fichier qui va me servir
 * pour importer mon CSS et mon JS
 */

// J'importe ma feuille CSS
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/js/all';
import '../css/style.css';

/*
    Pour utiliser jquery et bootstrap.js :
       > npm i jquery
       > npm i popper.js
 */
const $ = require('jquery');
// import $ from 'jquery'; // Notation ES6
import 'bootstrap';

$(function() {
   console.log('jquery loaded');
});
