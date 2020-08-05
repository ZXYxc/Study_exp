module.exports = {
    devServer: {
        host: 'localhost',
        port: 8080,
        open: true,
        proxy: {//配置跨域
            'http://localhost:8080': {
                target: 'http://106.14.44.67:8080',//这里后http_prefix台的地址模拟的;应该填写你们真实的后台接口
                ws: true,
                secure: false,
                changOrigin: true,//允许跨域
            }
        }
    },


};
