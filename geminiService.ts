import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Verdict, CaseData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Transcribes audio blob using Gemini Flash.
 */
export const transcribeAudio = async (audioBlob: Blob): Promise<string> => {
  try {
    const base64Audio = await blobToBase64(audioBlob);
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: audioBlob.type || 'audio/webm',
              data: base64Audio
            }
          },
          {
            text: "请将这段音频中的对话准确转录为中文文本。不要添加任何评论，只返回转录内容。"
          }
        ]
      }
    });

    return response.text || "";
  } catch (error) {
    console.error("Transcription error:", error);
    throw new Error("转录失败，请重试。");
  }
};

/**
 * Generates a Cat Judge avatar.
 */
export const generateJudgeImage = async (): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: "A serious yet cute cat judge sitting at a high court bench, wearing a white judge wig and black robe, holding a wooden gavel. The background is a courtroom. Anime style, high quality, digital art, expressive face."
          }
        ]
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return "";
  } catch (error) {
    console.error("Image generation error:", error);
    return ""; // Fallback to icon if generation fails
  }
};

/**
 * Judges the conflict using Gemini Pro.
 */
export const judgeConflict = async (data: CaseData): Promise<Verdict> => {
  const prompt = `
    你是一位“猫猫法官”（Neko Judge），一位智慧、公正、稍微有点傲娇但心地善良的猫咪法官。
    你正在审理一对情侣（${data.nameA} 和 ${data.nameB}）之间的争吵案件。
    该程序旨在帮助情侣解决不和，增进感情。

    案件背景：
    "${data.context}"

    ${data.nameA} 的陈述（原告）：
    "${data.storyA}"

    ${data.nameB} 的陈述（被告）：
    "${data.storyB}"

    你的任务：
    1. **分析**：客观但带有同理心地分析情况，指出核心的沟通误区。
    2. **判决**：为每个人分配“责任百分比”（0-100%），总和必须为100%。
    3. **格式**：分析和建议必须使用 HTML 格式（如 <p>, <strong>, <ul>, <li> 等），**不要**使用 Markdown。
    4. **建议**：给出具体的、有建设性的“和解建议”，侧重于沟通技巧、理解和共同解决问题。
    5. **语气**：语气要像一只猫，可以使用一些猫咪的口头禅（如“喵”、“愚蠢的人类”等），但核心内容必须是严肃且有帮助的。请用**中文**回答。

    返回 JSON 格式。
  `;

  const schema: Schema = {
    type: Type.OBJECT,
    properties: {
      blameA: { type: Type.INTEGER, description: `${data.nameA} 的责任百分比 (0-100)` },
      blameB: { type: Type.INTEGER, description: `${data.nameB} 的责任百分比 (0-100)` },
      analysis: { type: Type.STRING, description: "法官对案件的分析 (HTML string)" },
      advice: { type: Type.STRING, description: "给情侣的和解建议 (HTML string)" },
    },
    required: ["blameA", "blameB", "analysis", "advice"],
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: schema,
      }
    });

    const jsonText = response.text;
    if (!jsonText) throw new Error("猫猫法官正在打盹，没有回应。");

    const result = JSON.parse(jsonText);
    
    let winner: 'A' | 'B' | 'Tie' = 'Tie';
    if (result.blameA < result.blameB) winner = 'A'; // Less blame means winner in a dispute context usually
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

const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const base64Data = base64String.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};