const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const yaml = require('js-yaml');
const fs = require('fs');
const config = yaml.safeLoad(fs.readFileSync('./_config.yml', 'utf8'));
let pug_path = fs.readdirSync(config.MT_directories_paths.pug);

let _plugins = [
    new CleanWebpackPlugin()
];

pug_path.forEach(function(p) {
    let dir_path = fs.readdirSync(
        config.MT_directories_paths.pug + '/' + p
    );

    for (let i = 0; i < dir_path.length; i++) {
        if (dir_path[i].indexOf('.pug') > 0 && dir_path[i].charAt(0) !== '_') {
            _plugins.push(
                new HtmlWebpackPlugin({
                    template: './' + config.MT_directories_paths.pug + '/' + p + '/' + dir_path[i] ,
                    filename: '../../' + p + '/' + path.basename(dir_path[i] , '.pug') + '.html',
                    inject: false
                })
            );
        }
    }
});

module.exports = {
    mode: 'development' ,
    entry: './resources/js/app.js',
    output: {
        filename: 'app.bundle.js',
        path: path.resolve(__dirname, 'assets/js')
    } ,
    plugins: _plugins ,
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',
                use: ['source-map-loader'],
            } ,
            {
                test: /\.pug$/,
                use: ['pug-loader','pug-frontmatter-html-loader']
            }
        ]
    }
};