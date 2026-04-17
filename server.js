const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const HOST = '0.0.0.0'; // 监听所有网络接口

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.ttf': 'font/ttf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain',
  '.md': 'text/markdown'
};

const server = http.createServer((req, res) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  
  // 处理根路径
  let filePath = '';
  if (req.url === '/') {
    filePath = './web/index.html';
  } else if (req.url === '/vue3.min.js') {
    filePath = './web/vue3.min.js';
  } else if (req.url.startsWith('/web/')) {
    filePath = '.' + req.url;
  } else {
    filePath = './web' + req.url;
  }
  
  const extname = path.extname(filePath);
  const contentType = mimeTypes[extname] || 'application/octet-stream';
  
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        // 文件不存在
        fs.readFile('./web/index.html', (error2, content2) => {
          if (error2) {
            res.writeHead(404);
            res.end('File not found');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content2, 'utf-8');
          }
        });
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${error.code}`);
      }
    } else {
      res.writeHead(200, { 
        'Content-Type': contentType,
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, HOST, () => {
  console.log('===========================================');
  console.log('✅ PM-OS 完整系统已启动！');
  console.log('===========================================');
  console.log('📦 程序包位置：c:/Users/haizhi/WorkBuddy/20260331144104/pm-os/');
  console.log('🌐 访问地址：');
  console.log(`   http://localhost:${PORT}`);
  console.log(`   http://127.0.0.1:${PORT}`);
  console.log('');
  console.log('   * 如果你是局域网内访问，请使用本机IP地址替换localhost');
  console.log('   * 网络接口IP：');
  const os = require('os');
  const interfaces = os.networkInterfaces();
  for (let iface in interfaces) {
    for (let addr of interfaces[iface]) {
      if (addr.family === 'IPv4' && !addr.internal) {
        console.log(`     http://${addr.address}:${PORT}`);
      }
    }
  }
  console.log('');
  console.log('🔑 登录信息：');
  console.log('   用户名：admin');
  console.log('   密码：admin123');
  console.log('');
  console.log('📋 系统模块（共15个）：');
  console.log('   📊 仪表盘  📋 项目管理  ✅ 任务管理  👤 人员管理');
  console.log('   🎤 语音输入  🤖 AI助手  📓 工作日记  📅 会议管理');
  console.log('   📁 文件管理  👥 客户管理  ⚠️ 问题/风险管理');
  console.log('   🎯 目标管理  🔧 能力库  📈 数据统计  ⚙️ 系统设置');
  console.log('===========================================');
  console.log('按 Ctrl+C 停止服务器');
});

// 优雅关闭
process.on('SIGINT', () => {
  console.log('\n🛑 正在停止服务器...');
  server.close(() => {
    console.log('✅ 服务器已停止');
    process.exit(0);
  });
});