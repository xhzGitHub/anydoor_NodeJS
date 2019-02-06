const fs = require('fs');
const {promisify} = require('util');
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const config = require('../config/defaultConfig');
const path = require('path');
const mime = require('./mime');
const compress = require('./compress');
const Handlebars = require('handlebars');
const htmlpath = path.join(__dirname, '../template/dir.html');
const source = fs.readFileSync(htmlpath, 'utf-8');
const template = Handlebars.compile(source);

module.exports = async function (req, res, filePath) {
    try{
        const stats = await stat(filePath);
        //如果是文件，则使用流读取并显示文件内容
        if(stats.isFile()){
            res.statusCode = 200;
            // 判断文件类型
            const contentType = mime(filePath);
            res.setHeader('Content-Type', contentType);
            // 判断压缩文件的类型
            let rs = fs.createReadStream(filePath);
            if(filePath.match(config.compress)){
                rs = compress(rs, req, res);
            }
            rs.pipe(res);
            // 如果是文件目录，则直接显示目录中的文件夹
        }else if(stats.isDirectory()){
            const files = await readdir(filePath);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            const dir = path.relative(config.root, filePath);
            const data = {
                title: path.basename(filePath),
                dir: `/${dir}`,
                files,
            }
            res.end(template(data));
            // res.end(data.dir);
        }
    }catch (e) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end(`${filePath} is not a dir or file`);
    }
}