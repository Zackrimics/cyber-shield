import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, ToolDefinition } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function analyzeSecurityTool(tool: ToolDefinition, content: string): Promise<AnalysisResult> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze the following input for the tool "${tool.title}":\n\n${content}`,
    config: {
      systemInstruction: `${tool.systemInstruction}\n\nProvide a structured analysis including risk level, confidence score, and detailed explanations. Be objective, professional, and educational. Help users understand WHY the input is risky or safe.`,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          riskLevel: {
            type: Type.STRING,
            enum: ["High", "Medium", "Low"],
            description: "The overall risk level."
          },
          confidenceScore: {
            type: Type.NUMBER,
            description: "Confidence score from 0 to 100."
          },
          summary: {
            type: Type.STRING,
            description: "A brief one-sentence summary of the risk."
          },
          explanation: {
            type: Type.STRING,
            description: "A detailed explanation of the analysis."
          },
          indicators: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                type: { type: Type.STRING, description: "Type of indicator" },
                description: { type: Type.STRING, description: "Description of why this is suspicious or relevant" },
                severity: { type: Type.STRING, enum: ["High", "Medium", "Low"] }
              },
              required: ["type", "description", "severity"]
            }
          },
          actionableSteps: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Steps the user should take."
          },
          findings: {
            type: Type.ARRAY,
            description: "Specific findings like breached sites or social media profiles. Only include if relevant to the tool.",
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING, description: "Name of the site or platform" },
                description: { type: Type.STRING, description: "Details about the finding (e.g., what data was breached)" },
                url: { type: Type.STRING, description: "Link to the profile or breach info (if applicable)" }
              },
              required: ["title", "description"]
            }
          }
        },
        required: ["riskLevel", "confidenceScore", "summary", "explanation", "indicators", "actionableSteps"]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("No response from AI");
  
  return JSON.parse(text) as AnalysisResult;
}
