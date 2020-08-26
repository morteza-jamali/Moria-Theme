const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RunAfterBuildPlugin = require('webpack-run-after-build-plugin');
const autoprefixer = require('autoprefixer');
const path = require('path');
const yaml = require('js-yaml');
const fs = require('fs');
const config = yaml.safeLoad(fs.readFileSync('./_config.yml', 'utf8'));
let pug_path = fs.readdirSync(config.MT_directories_paths.pug);

let _plugins = [
    new CleanWebpackPlugin() ,
    new MiniCssExtractPlugin({
        filename: '../css/app.bundle.css'
    }) ,
    new RunAfterBuildPlugin(function() {
        let file = 'assets/css/app.bundle.css';
        let data = fs.readFileSync(file);
        let fd = fs.openSync(file, 'w+');
        let buffer = new Buffer('---\n---\n');
        
        fs.writeSync(fd, buffer, 0, buffer.length, 0);
        fs.writeSync(fd, data, 0, data.length, buffer.length);
        fs.close(fd);
    })
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
    entry: ['./resources/js/app.js' , './resources/sass/components.sass'] ,
    output: {
        filename: 'app.bundle.js',
        path: path.resolve(__dirname, 'assets/js')
    } ,
    plugins: _plugins ,
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { importLoaders: 1 } } ,
                    'postcss-loader' ,
                    'sass-loader' ,
                    {
                        loader: 'postcss-loader',
                        options: {
                          ident: 'postcss',
                          plugins: [
                            require('tailwindcss'),
                            autoprefixer,
                          ]
                        }
                    }
                ]
            } ,
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    {
                        loader: 'postcss-loader',
                        options: {
                          ident: 'postcss',
                          plugins: [
                            require('tailwindcss'),
                            autoprefixer,
                          ]
                        }
                    }
                ]
            } ,
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