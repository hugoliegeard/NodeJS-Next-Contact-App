// 1. Installer Webpack -------------------------|
// npm install webpack webpack-cli --save-dev
// npm install --save-dev css-loader
// npm install --save-dev style-loader
// 2. Créer le fichier webpack.config.js
// 3. Mettre à jour le package.json
// 4. npm run build

const path = require('path');

module.exports = {
    entry: './assets/js/app.js',
    output: {
        path: path.resolve(__dirname, 'public/dist'),
        filename: 'bundle.js'
    },
    watch: true, // https://webpack.js.org/configuration/watch/
    watchOptions: {
        ignored: /node_modules/
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
};
