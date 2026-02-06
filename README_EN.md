[简体中文](README.md) | English

# 🐱 Neko Judge (Cat Judge)

A wise, fair, slightly tsundere but kind-hearted feline judge helping couples resolve conflicts and strengthen their relationships.

## ✨ Features

- 🎙️ **Voice Input Support** - Transcribe audio recordings for quick input of both parties' statements (Code refactoring, under development)
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

Configure your OpenAI API Key in `.env.local`:

```env
OPENAI_API_KEY=sk-your-api-key-here
OPENAI_BASE_URL=https://api.openai.com/v1
OPENAI_MODEL=gpt-4o
```

> 💡 Supports third-party services compatible with OpenAI API, such as DeepSeek, Qwen, Moonshot, etc.

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
| `OPENAI_API_KEY`  | OpenAI API key | ✅       | -                         |
| `OPENAI_BASE_URL` | API base URL   | ❌       | https://api.openai.com/v1 |
| `OPENAI_MODEL`    | Model to use   | ❌       | gpt-4o                    |

## 🤝 Contributing

Issues and Pull Requests are welcome!

## 📄 License

MIT License

---

May love have no quarrels 🐾❤️
