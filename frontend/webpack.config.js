const path = require('path');

module.exports = {
    entry: './src/ImageAnnotatorMain.js',
    mode: 'development',
    output: {
        filename: 'global-image-annotator-lib.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'ImageAnnotatorEditorLib',
        libraryTarget: 'umd',
        globalObject: 'this',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                type: 'asset/resource', // Using built-in asset module instead of file-loader
                generator: {
                    filename: 'assets/[name].[hash][ext][query]', // Output path for images
                },
            },
        ],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'), // Serving static files from 'dist'
        },
        compress: true,
        port: 9000,
        open: true, // Open browser automatically
        hot: true,  // Enable hot module replacement
        historyApiFallback: true,
    },
};
