const {createGzip, createDeflate} = require('zlib');

module.exports = (rs, req, res) => {
    const acceptEncoding = req.headers['accept-encoding'];  // 获取请求头中可接收的压缩类型
    if(!acceptEncoding || !acceptEncoding.match(/\b(gzip|deflate)\b/)){
        return rs;
    } else if(acceptEncoding.match(/\bgzip\b/)){    // 如果可接受gzip，则使用gzip压缩
        res.setHeader('Content-Encoding', 'gzip');
        return rs.pipe(createGzip());
    } else if(acceptEncoding.match(/\bdeflate\b/)){     // 如果可接受deflate，则使用deflate压缩
        res.setHeader('Content-Encoding', 'deflate');
        return rs.pipe(createDeflate());
    }
}