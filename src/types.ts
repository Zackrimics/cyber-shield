export type RiskLevel = 'High' | 'Medium' | 'Low';

export interface Indicator {
  type: string;
  description: string;
  severity: RiskLevel;
}

export interface Finding {
  title: string;
  description: string;
  url?: string;
}

export interface AnalysisResult {
  riskLevel: RiskLevel;
  confidenceScore: number;
  summary: string;
  explanation: string;
  indicators: Indicator[];
  actionableSteps: string[];
  findings?: Finding[];
}

export type ToolId = 
  | 'phishing'
  | 'email-breach'
  | 'username-osint'
  | 'port-scanner'
  | 'sql-injection'
  | 'xss-scanner'
  | 'malware-hash'
  | 'brute-force'
  | 'hash-identifier'
  | 'mitm-detection';

export interface ToolDefinition {
  id: ToolId;
  title: string;
  description: string;
  icon: string;
  inputPlaceholder: string;
  inputLabel: string;
  systemInstruction: string;
}
