const http = require('http');
const fs = require('fs');
const conf = require('./config/defaultConfig');
const chalk = require('chalk');
const path = require('path');
const route = require('./helper/route');


const server = http.createServer((req,res) => {
    const {url} = req;  //获取相对路径
    const filePath = path.join(conf.root, url); // 将本地目录文件路径与相对路径进行拼接
    route(req, res, filePath);
});

server.listen(conf.port, conf.hostname, () => {
    const addr = `http://${conf.hostname}:${conf.port}`;
    console.info(`Server started at ${chalk.green(addr)}`);
});

//判断该路径下是文件还是文件夹
// fs.stat(filePath, (err, stats) => {
//     // 如果报错，404
//     if(err){
//         res.statusCode = 404;
//         res.setHeader('Content-Type', 'text/plain');
//         res.end(`${filePath} is not a dir or file`);
//         return;
//     }
//     // 如果是文件，则使用流读取并显示文件内容
//     if(stats.isFile()){
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'text/plain');
//         fs.createReadStream(filePath).pipe(res);
//     // 如果是文件目录，则直接显示目录中的文件夹
//     }else if(stats.isDirectory()){
//         fs.readdir(filePath, (err, files) => {
//             res.statusCode = 200;
//             res.setHeader('Content-Type', 'text/plain');
//             res.end(files.join(','));
//         })
//     }
// })