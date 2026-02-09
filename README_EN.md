<div align="right">
  <a title="English" href="README_EN.md"><img src="https://img.shields.io/badge/-English-A31F34?style=for-the-badge" alt="English" /></a>
  <a title="简体中文" href="README.md"><img src="https://img.shields.io/badge/-%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87-545759?style=for-the-badge" alt="简体中文"></a>
</div>

<div align="center">

# 🐱 Neko Judge (Cat Judge)

**A wise, fair, slightly tsundere but kind-hearted feline judge helping couples resolve conflicts and strengthen their relationships.**

![React](https://img.shields.io/badge/React-19.2.0-61DAFB) ![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6) ![License](https://img.shields.io/badge/license-Apache-green) ![Version](https://img.shields.io/github/v/release/zyk121381/Love-Judgement)
</div>


------


## ✨ Features

- 🎙️ **Voice Input Support** - Transcribe audio recordings for quick input of both parties' statements (Only Gemini version supports this feature)
- ⚖️ **Intelligent Verdict Analysis** - AI objectively analyzes conflict causes and assigns blame percentages
- 🐾 **Cat-style Output** - Lively and amusing feline tone makes mediation more fun
- 💡 **Reconciliation Advice** - Provides specific constructive suggestions to improve communication
- 🎨 **Beautiful UI** - Cozy purple-themed design with excellent user experience

## 🚀 Quick Start

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. Clone the repository and install dependencies

```bash
npm install
```

2. Configure environment variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Configure your OpenAI API Key/Gemini API Key in `.env.local`:

```env
# OpenAI API version
OPENAI_API_KEY=sk-your-api-key-here
OPENAI_BASE_URL=https://api.openai.com/v1
OPENAI_MODEL=gpt-4o

# Gemini version
GEMINI_API_KEY=PLACEHOLDER_API_KEY
```

> 💡 OpenAI API version supports third-party services compatible with OpenAI API, such as DeepSeek, Qwen, Moonshot, etc.

3. Start the development server

```bash
npm run dev
```

4. Open your browser and visit `http://localhost:3000`

### Production Build

```bash
npm run build
npm run preview
```

## 📖 How to Use

1. **Fill in basic information** - Enter both parties' names and conflict background
2. **State your perspectives** - Each party describes their grievances (supports text or voice input)
3. **Summon the Cat Judge** - Click the button and wait for AI judgment
4. **View the verdict** - Check blame allocation, case analysis, and reconciliation advice

## 🔧 Environment Variables

| Variable            | Description    | Required | Default                   |
| ------------------- | -------------- | -------- | ------------------------- |
| `OPENAI_API_KEY` / `GEMINI_API_KEY` | OpenAI/Gemini API key | Choose one of the two       | -                         |
| `OPENAI_BASE_URL` | API base URL   | ❌       | https://api.openai.com/v1 |
| `OPENAI_MODEL`    | Model to use   | ❌       | gpt-4o                    |


## 🤝 Contributing

Issues and Pull Requests are welcome!

## 📄 License

Apache License

---

<div align="center">
May love have no quarrels 🐾❤️
</div>
