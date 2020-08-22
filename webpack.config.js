var path = require('path');

module.exports = {
    entry: './resources/app.js',
    output: {
        filename: 'app.bundle.js',
        path: path.resolve(__dirname, 'assets/js')
    }
};