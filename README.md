# PM OS - 项目经理自我认知平台

一个面向IT项目经理的个人工作管理与自我成长平台。

## 功能特性

- 📊 **数据概览** - 首页展示关键数据统计
- 📁 **项目管理** - 项目全生命周期管理
- 👥 **客户管理** - 客户信息与对接经验沉淀
- ✅ **任务管理** - 个人待办事项管理
- 📝 **工作日志** - 每日工作记录与思考
- ⚠️ **问题风险** - 问题与风险管理台账
- 💡 **经验沉淀** - 可复用的工作方法论
- 📋 **项目复盘** - 阶段复盘与项目总结
- 🚀 **自我成长** - 个人优势短板与成长轨迹

## 技术栈

- **前端**: Vue 3 + 原生 JavaScript
- **后端**: Spring Boot 3 + JPA
- **数据库**: MySQL 8.0
- **认证**: JWT

## 快速启动

### 1. 数据库准备

```bash
# 登录 MySQL
mysql -u root -p

# 执行数据库初始化脚本
source database/init.sql
```

### 2. 启动后端服务

```bash
cd server

# 使用 Maven 构建
mvn clean package

# 运行
java -jar target/pm-os-server-1.0.0.jar
```

或使用 IDE 直接运行 `PmOsApplication.java`

后端服务将在 http://localhost:8080 启动

### 3. 启动前端

直接用浏览器打开 `web/index.html` 文件即可运行

或使用任意静态服务器：

```bash
# 使用 npx
npx serve web

# 或使用 Python
python -m http.server 3000 --directory web
```

访问 http://localhost:3000

## 默认账号

- 用户名: `admin`
- 密码: `admin123`

## 项目结构

```
pm-os/
├── database/
│   └── init.sql          # 数据库建表语句
├── server/
│   ├── pom.xml           # Maven 配置
│   └── src/
│       └── main/
│           ├── java/com/pmos/
│           │   ├── controller/  # API 控制器
│           │   ├── dto/        # 数据传输对象
│           │   ├── entity/     # 实体类
│           │   ├── repository/ # 数据访问层
│           │   ├── service/    # 业务逻辑层
│           │   └── utils/      # 工具类
│           └── resources/
│               └── application.yml
└── web/
    └── index.html        # 前端应用
```

## UI 设计

- 🎨 年轻化、时尚、现代、清爽
- 💳 卡片式布局，充足留白
- ✨ 柔和渐变，流畅动画
- 📱 响应式设计，适配桌面端

## License

MIT
