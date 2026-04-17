// 修复后的语音功能测试脚本
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8888;
const HTML_FILE = path.join(__dirname, 'web', 'index.html');

// 创建简单的HTTP服务器
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        fs.readFile(HTML_FILE, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error loading HTML file');
                return;
            }
            
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(data);
        });
    } else if (req.url === '/vue3.min.js') {
        // 提供Vue.js
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
        res.end('// Vue 3 placeholder - 实际项目中需要真实的Vue.js文件');
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`✅ 测试服务器已启动`);
    console.log(`📁 服务文件: ${HTML_FILE}`);
    console.log(`🌐 访问地址: http://localhost:${PORT}`);
    console.log(`\n测试步骤:`);
    console.log(`1. 打开浏览器访问 http://localhost:${PORT}`);
    console.log(`2. 使用默认账号登录: admin / admin123`);
    console.log(`3. 点击左侧菜单的"语音输入"`);
    console.log(`4. 点击麦克风按钮测试语音功能`);
    console.log(`5. 也可以使用文本输入框测试文本分析功能`);
    console.log(`\n如果语音功能有问题，请检查:`);
    console.log(`- 浏览器是否支持Web Speech API`);
    console.log(`- 是否允许麦克风权限`);
    console.log(`- 查看浏览器控制台输出`);
});

// 检查HTML文件是否存在
if (!fs.existsSync(HTML_FILE)) {
    console.error(`❌ 错误: HTML文件不存在: ${HTML_FILE}`);
    process.exit(1);
}

console.log(`🔍 检查HTML文件...`);
const htmlContent = fs.readFileSync(HTML_FILE, 'utf8');

// 检查关键修复
const checks = [
    { name: 'initVoiceRecognition函数', pattern: /initVoiceRecognition.*?finalTranscript.*?recognition/gms, required: true },
    { name: 'toggleVoice函数简化', pattern: /const toggleVoice.*?console\.log.*?切换语音识别状态/gms, required: true },
    { name: '语音按钮事件绑定', pattern: /@click="toggleVoice"/g, required: true },
    { name: 'Vue.js引用', pattern: /vue3\.min\.js/g, required: true },
];

console.log(`\n🔧 修复检查结果:`);
checks.forEach(check => {
    const matches = htmlContent.match(check.pattern);
    if (matches) {
        console.log(`✅ ${check.name}: 存在 (${matches.length}处)`);
    } else if (check.required) {
        console.log(`❌ ${check.name}: 缺失`);
    } else {
        console.log(`⚠️ ${check.name}: 未找到`);
    }
});

// 检查语音相关变量
const variableChecks = [
    { name: 'recognition变量声明', pattern: /let recognition\s*=\s*null/ },
    { name: 'finalTranscript变量声明', pattern: /let finalTranscript\s*=\s*''/ },
    { name: 'voiceRecording状态', pattern: /const voiceRecording\s*=\s*ref\(false\)/ },
    { name: 'voiceStatus状态', pattern: /const voiceStatus\s*=\s*ref\('正在聆听，请说话...'\)/ },
];

console.log(`\n🔍 变量声明检查:`);
variableChecks.forEach(check => {
    if (htmlContent.match(check.pattern)) {
        console.log(`✅ ${check.name}`);
    } else {
        console.log(`⚠️ ${check.name}: 未找到`);
    }
});