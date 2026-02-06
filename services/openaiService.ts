import OpenAI from 'openai';
import { Verdict, CaseData } from "../types";

// 初始化 OpenAI 客户端，支持自定义 baseURL
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.API_KEY,
  baseURL: process.env.OPENAI_BASE_URL, // 如果使用其他兼容 OpenAI 的厂商，设置此项
  dangerouslyAllowBrowser: true // 允许在浏览器环境中使用（注意安全风险）
});

/**
 * Transcribes audio blob using OpenAI Whisper.
 */
export const transcribeAudio = async (audioBlob: Blob): Promise<string> => {
  try {
    const file = new File([audioBlob], 'audio.webm', { type: audioBlob.type || 'audio/webm' });

    const response = await openai.audio.transcriptions.create({
      file: file,
      model: 'whisper-1',
      language: 'zh',
      response_format: 'text'
    });

    return response;
  } catch (error) {
    console.error("Transcription error:", error);
    throw new Error("转录失败，请重试。");
  }
};

/**
 * Judges the conflict using OpenAI GPT.
 */
export const judgeConflict = async (data: CaseData): Promise<Verdict> => {
  const prompt = `
    你是一位"猫猫法官"（Neko Judge），一位智慧、公正、稍微有点傲娇但心地善良的猫咪法官。
    你正在审理一对情侣（${data.nameA} 和 ${data.nameB}）之间的争吵案件。
    该程序旨在帮助情侣解决不和，增进感情。

    案件背景：
    "${data.context}"

    ${data.nameA} 的陈述（原告）：
    "${data.storyA}"

    ${data.nameB} 的陈述（被告）：
    "${data.storyB}"

    你的任务：
    1. **HTML 标签使用规范**：
       - 使用 <p> 标签包裹段落内容
       - 使用 <strong> 标签强调关键词、重要观点或结论
       - 使用 <ul> 和 <li> 标签列出多个要点（如问题清单、建议列表）
       - 每个非列表段落必须首行缩进两字符
       - 使用 <br> 进行段落内换行
       - 严禁使用 Markdown 语法（如 **粗体**、- 列表等）
       - 确保每个标签正确闭合，嵌套层级清晰

    2. **分析部分要求**：
       - 客观但带有同理心地分析情况
       - 指出核心的沟通误区（使用 <strong> 强调）
       - 对两个人的问题分别进行分析，再进行总体的核心问题分析
       - 列出 2-3 个关键问题点（使用 <ul><li>）
       - 要结合两个人的陈述和吵架原因来具体分析
       - 分析开头和结尾加入猫猫法官的生动语气
       - 例如："喵！肃静！本法官正在整理胡须……不对，是整理卷宗！"

    3. **建议部分要求**：
       - 给出具体的、有建设性的"和解建议"
       - 要结合两个人的陈述和吵架原因来给出具体的当下可以完成的和解建议，之后再给出今后的相处建议
       - 每条建议独立成段（<p>）
       - 建议可以分步骤进行，每个步骤独立成段
       - 可以根据两个人给出不同的建议，再给出总体的建议
       - 重要步骤用 <strong> 标注
       - 建议列表使用 <ul><li> 格式
       - 开头用猫猫口吻引导

    4. **语气要求**：
       - 使用猫猫的口头禅（如"喵"、"愚蠢的人类"、"本喵"、"小铲屎官"等）
       - 可以加入猫咪相关的比喻（如"像猫抓沙发一样"、"猫薄荷味的争吵"等）
       - 傲娇但善良的性格特征（表面嫌弃，实则关心）
       - 中文回答，语言生动有趣但不失严肃性

    5. **判决要求**：
       - 为每个人分配"责任百分比"（0-100%），总和必须为100%
       - 公平合理，避免明显偏袒

    请严格按照以下 JSON 格式返回结果：
    {
      "blameA": ${data.nameA}的责任百分比(0-100),
      "blameB": ${data.nameB}的责任百分比(0-100),
      "analysis": "法官对案件的分析(HTML string，必须包含完整的HTML标签)",
      "advice": "给情侣的和解建议(HTML string，必须包含完整的HTML标签)"
    }

    示例分析部分 HTML 结构：
    <p>喵！肃静！本法官正在整理卷宗！在这个充满了猫薄荷味（并没有）的案件中，本喵闻到了两个愚蠢人类身上浓浓的酸臭味——那是爱情变质前的味道。</p>
    <p>在分析这个案件时，本喵发现了几个关键问题：</p>
    <ul>
      <li>问题一：<strong>沟通方式不当</strong>，导致...</li>
      <li>问题二：<strong>情绪管理失控</strong>，双方都...</li>
    </ul>

    示例试议部分 HTML 结构：
    <p>愚蠢的人类们，看在你们其实都深爱着对方的份上，本喵给你们几点建议：</p>
    <ul>
      <li><strong>冷静十分钟</strong>后再对话...</li>
      <li><strong>多用"我觉得"而非"你总是"</strong>...</li>
    </ul>
    <p>记住，爱情不是猫抓老鼠的游戏！</p>
  `;

  try {
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: '你是一位专业的法官，总是返回有效的JSON格式。'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      response_format: { type: "json_object" }
    });

    const jsonText = response.choices[0]?.message?.content;
    if (!jsonText) throw new Error("猫猫法官正在打盹，没有回应。");

    const result = JSON.parse(jsonText);

    let winner: 'A' | 'B' | 'Tie' = 'Tie';
    if (result.blameA < result.blameB) winner = 'A';
    if (result.blameB < result.blameA) winner = 'B';

    return {
      ...result,
      winner
    };

  } catch (error) {
    console.error("Judgment error:", error);
    throw new Error("猫猫法官去抓老鼠了（API错误），请稍后再试。");
  }
};
