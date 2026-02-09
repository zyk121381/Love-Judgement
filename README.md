<div align="right">
  <a title="English" href="README_EN.md"><img src="https://img.shields.io/badge/-English-545759?style=for-the-badge" alt="English"></a>
  <a title="简体中文" href="README.md"><img src="https://img.shields.io/badge/-%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87-A31F34?style=for-the-badge" alt="简体中文"></a>
</div>

<div align="center">

# 🐱 猫猫法官

**一只智慧、公正、傲娇但心地善良的猫咪法官，帮助情侣解决争吵，增进感情。**

![React](https://img.shields.io/badge/React-19.2.0-61DAFB) ![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6) ![License](https://img.shields.io/badge/license-Apache-green) ![Version](https://img.shields.io/github/v/release/zyk121381/Love-Judgement)

</div>


------


## ✨ 功能特性

- 🎙️ **语音输入支持** - 支持语音转录，快速记录双方陈述（仅Gemini版本支持）
- ⚖️ **智能判决分析** - AI 客观分析争吵原因，分配责任比例
- 🐾 **猫猫口吻输出** - 生动有趣的猫咪语气，让调解更有趣
- 💡 **和解建议** - 提供具体的建设性建议，帮助双方沟通
- 🎨 **精美界面** - 紫色系温馨设计，用户体验友好

## 🚀 快速开始

### 环境要求

- Node.js 16+
- npm 或 yarn

### 安装步骤

1. 克隆仓库并安装依赖

```bash
npm install
```

2. 配置环境变量

复制 `.env.example` 文件为 `.env.local`：

```bash
cp .env.example .env.local
```

在 `.env.local` 中配置你的 OpenAI API Key/Gemini API Key：

```env
# OpenAI API版本
OPENAI_API_KEY=sk-your-api-key-here
OPENAI_BASE_URL=https://api.openai.com/v1
OPENAI_MODEL=gpt-4o

# Gemini版本
GEMINI_API_KEY=PLACEHOLDER_API_KEY
```

> 💡 OpenAI API版本支持兼容 OpenAI 的第三方服务，如 DeepSeek、通义千问、Moonshot 等

3. 启动开发服务器

```bash
npm run dev
```

4. 打开浏览器访问 `http://localhost:3000`

### 生产构建

```bash
npm run build
npm run preview
```

## 📖 使用方法

1. **填写基本信息** - 输入双方姓名和争吵背景
2. **陈述各自观点** - 双方分别描述自己的委屈（支持文字或语音输入）
3. **召唤猫猫法官** - 点击按钮，等待 AI 审判
4. **查看判决结果** - 查看责任分配、案件分析和和解建议

## 🔧 环境变量说明

| 变量名              | 说明            | 必需 | 默认值                    |
| ------------------- | --------------- | ---- | ------------------------- |
| `OPENAI_API_KEY` / `GEMINI_API_KEY` | OpenAI/Gemini API 密钥 | 二选一   | -                         |
| `OPENAI_BASE_URL` | API 基础 URL    | ❌   | https://api.openai.com/v1 |
| `OPENAI_MODEL`    | 使用的模型      | ❌   | gpt-4o                    |


## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

Apache License

---

<div align="center">
愿爱无争吵 🐾❤️
</div>
