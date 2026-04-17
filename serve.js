const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const BASE = path.join(__dirname, 'web');

const MIME_TYPES = {
  '.html': 'text/html;charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  console.log(`[${new Date().toISOString()}] 请求: ${req.url}`);
  
  let filePath = req.url === '/' ? '/index.html' : req.url;
  filePath = path.join(BASE, filePath);
  
  console.log(`文件路径: ${filePath}`);
  console.log(`文件存在: ${fs.existsSync(filePath) ? '是' : '否'}`);

  const ext = path.extname(filePath);
  const contentType = MIME_TYPES[ext] || 'text/plain;charset=utf-8';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html;charset=utf-8' });
        res.end('<h1>404 - 文件未找到</h1>');
      } else {
        res.writeHead(500);
        res.end('服务器错误');
      }
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════╗
║                                           ║
║   🎯 PM OS - 项目经理自我认知平台          ║
║                                           ║
║   前端服务已启动                           ║
║                                           ║
║   访问地址: http://localhost:${PORT}        ║
║                                           ║
║   登录账号: admin / admin123              ║
║                                           ║
╚═══════════════════════════════════════════╝
  `);
});
