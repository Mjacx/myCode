const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
    entry:'./src/main.js',
    mode:'development',
    output:{
        path:resolve(__dirname,'dist')
    },
    resolveLoader:{
        modules:['node_modules',resolve(__dirname,'./modules')]
    },
    resolve:{
        extensions:['.js','.vue']
    },
    module:{
        rules:[
            {
                test:/.vue$/i,
                use:'vue-loader'
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:resolve(__dirname,'public/index.html')
        })
    ]
}