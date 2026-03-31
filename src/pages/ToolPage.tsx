import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, ShieldAlert, ShieldCheck, ShieldQuestion, AlertTriangle, Info, ArrowRight, Loader2, RefreshCcw, ExternalLink, Trash2, ArrowLeft, Search } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { analyzeSecurityTool } from '../services/gemini';
import { AnalysisResult, RiskLevel } from '../types';
import { TOOLS } from '../config/tools';
import { cn } from '../lib/utils';
import * as Icons from 'lucide-react';

interface ToolPageProps {
  toolId: string;
}

export default function ToolPage({ toolId }: ToolPageProps) {
  const tool = TOOLS.find(t => t.id === toolId);
  
  const [input, setInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Reset when tool changes (though with tabs, this component instance might be preserved per tool)
  }, [toolId, tool]);

  if (!tool) return null;

  const renderIcon = (iconName: string, className?: string) => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent ? <IconComponent className={className} /> : <Shield className={className} />;
  };

  const handleAnalyze = async () => {
    if (!input.trim()) return;
    
    setIsAnalyzing(true);
    setError(null);
    try {
      const analysis = await analyzeSecurityTool(tool, input);
      setResult(analysis);
    } catch (err) {
      console.error(err);
      setError('Failed to analyze the input. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setInput('');
    setResult(null);
    setError(null);
  };

  const getRiskColor = (level: RiskLevel) => {
    switch (level) {
      case 'High': return 'text-red-400 bg-red-950/30 border-red-900/50';
      case 'Medium': return 'text-amber-400 bg-amber-950/30 border-amber-900/50';
      case 'Low': return 'text-emerald-400 bg-emerald-950/30 border-emerald-900/50';
      default: return 'text-slate-400 bg-slate-900/30 border-slate-800/50';
    }
  };

  const getRiskIcon = (level: RiskLevel) => {
    switch (level) {
      case 'High': return <ShieldAlert className="w-8 h-8 text-red-500" />;
      case 'Medium': return <ShieldQuestion className="w-8 h-8 text-amber-500" />;
      case 'Low': return <ShieldCheck className="w-8 h-8 text-emerald-500" />;
      default: return <Shield className="w-8 h-8 text-slate-500" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 w-full">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.1)]">
              {renderIcon(tool.icon, "text-emerald-500 w-5 h-5 glow-text")}
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-tighter text-emerald-500 glow-text">{tool.title}</h1>
              <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-emerald-500/50 leading-none">Security Module</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-emerald-500/5 border border-emerald-500/10 rounded-full">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold text-emerald-500/70 uppercase tracking-wider">Module Online</span>
          </div>
          <button 
            onClick={reset}
            className="p-2 hover:bg-emerald-500/10 rounded-lg transition-colors text-emerald-500/40 hover:text-emerald-500"
            title="System Reset"
          >
            <RefreshCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid gap-8">
        {/* Input Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500/50">Input Terminal</h2>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{tool.inputLabel}</span>
          </div>
          
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-emerald-500/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition duration-500" />
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={tool.inputPlaceholder}
              className="relative w-full min-h-[200px] p-6 bg-slate-950 border border-emerald-500/20 rounded-2xl shadow-2xl focus:border-emerald-500/50 transition-all outline-none resize-none text-emerald-400 font-mono text-sm leading-relaxed placeholder:text-emerald-900/50"
            />
            <div className="absolute bottom-4 right-4 flex gap-2">
              {input && (
                <button 
                  onClick={() => setInput('')}
                  className="p-2 bg-slate-900 hover:bg-red-950/30 text-slate-500 hover:text-red-400 border border-slate-800 hover:border-red-900/50 rounded-lg transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !input.trim()}
                className={cn(
                  "px-6 py-2.5 rounded-xl font-black text-[11px] uppercase tracking-[0.2em] flex items-center gap-2 transition-all border",
                  isAnalyzing || !input.trim() 
                    ? "bg-slate-900 text-slate-600 border-slate-800 cursor-not-allowed" 
                    : "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20 hover:border-emerald-500/50 active:scale-95 shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                )}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Execute Scan
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-4 bg-red-950/20 border border-red-900/50 text-red-400 rounded-xl text-[11px] font-bold uppercase tracking-wider flex items-center gap-3"
            >
              <AlertTriangle className="w-5 h-5 flex-shrink-0" />
              System Error: {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Section */}
        <AnimatePresence mode="wait">
          {result && !isAnalyzing && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-6"
            >
              {/* Risk Summary Card */}
              <div className="bg-slate-950 border border-emerald-500/10 rounded-3xl overflow-hidden shadow-2xl shadow-emerald-500/5">
                <div className={cn("p-8 flex flex-col sm:flex-row items-center gap-8 border-b border-emerald-500/10", getRiskColor(result.riskLevel))}>
                  <div className="p-4 bg-slate-900 rounded-2xl border border-white/5 shadow-inner">
                    {getRiskIcon(result.riskLevel)}
                  </div>
                  <div className="text-center sm:text-left flex-1">
                    <div className="flex items-center justify-center sm:justify-start gap-3 mb-2">
                      <span className="text-[9px] font-black uppercase tracking-[0.3em] opacity-50">Threat Level</span>
                      <span className={cn("px-3 py-0.5 rounded-md text-[10px] font-black uppercase tracking-widest border", getRiskColor(result.riskLevel))}>
                        {result.riskLevel}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{result.summary}</h3>
                    <div className="flex items-center justify-center sm:justify-start gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-32 h-1.5 bg-slate-900 rounded-full overflow-hidden border border-white/5">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${result.confidenceScore}%` }}
                            className={cn("h-full shadow-[0_0_10px_rgba(16,185,129,0.5)]", result.riskLevel === 'High' ? 'bg-red-500' : result.riskLevel === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500')}
                          />
                        </div>
                        <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">{result.confidenceScore}% Confidence</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-8 grid md:grid-cols-2 gap-12">
                  {/* Explanation */}
                  <div className="space-y-8">
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500/50 mb-4 flex items-center gap-2">
                        <Info className="w-3 h-3" /> Kernel Analysis
                      </h4>
                      <div className="prose prose-invert prose-sm max-w-none text-slate-400 font-mono leading-relaxed text-xs">
                        <ReactMarkdown>{result.explanation}</ReactMarkdown>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500/50 mb-4 flex items-center gap-2">
                        <ShieldCheck className="w-3 h-3" /> Countermeasures
                      </h4>
                      <ul className="space-y-3">
                        {result.actionableSteps.map((step, i) => (
                          <li key={i} className="flex items-start gap-3 text-[11px] text-slate-300 bg-emerald-500/5 p-4 rounded-xl border border-emerald-500/10">
                            <span className="text-emerald-500 font-bold opacity-50">{String(i + 1).padStart(2, '0')}</span>
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Indicators */}
                  <div className="space-y-6">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500/50 mb-4 flex items-center gap-2">
                      <AlertTriangle className="w-3 h-3" /> Anomaly Detection
                    </h4>
                    <div className="space-y-3">
                      {result.indicators.map((indicator, i) => (
                        <div key={i} className="group p-4 bg-slate-900/50 border border-white/5 rounded-2xl hover:border-emerald-500/20 transition-all">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">{indicator.type}</span>
                            <span className={cn(
                              "text-[8px] font-black uppercase px-2 py-0.5 rounded border",
                              indicator.severity === 'High' ? 'bg-red-950/30 text-red-500 border-red-900/50' : 
                              indicator.severity === 'Medium' ? 'bg-amber-950/30 text-amber-500 border-amber-900/50' : 
                              'bg-emerald-950/30 text-emerald-500 border-emerald-900/50'
                            )}>
                              {indicator.severity}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-500 leading-relaxed font-mono">{indicator.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Findings Section (OSINT / Breaches) */}
                {result.findings && result.findings.length > 0 && (
                  <div className="p-8 border-t border-emerald-500/10 bg-slate-900/30">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500/50 mb-6 flex items-center gap-2">
                      <Search className="w-3 h-3" /> Discovered Intelligence
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {result.findings.map((finding, i) => (
                        <div key={i} className="p-4 bg-slate-950 border border-white/5 rounded-2xl hover:border-emerald-500/30 transition-all group">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <h5 className="text-sm font-bold text-slate-200 group-hover:text-emerald-400 transition-colors">{finding.title}</h5>
                            {finding.url && (
                              <a 
                                href={finding.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="p-1.5 bg-slate-900 hover:bg-emerald-500/20 text-slate-500 hover:text-emerald-400 rounded-lg transition-colors shrink-0"
                                title="Open Link"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-400 font-mono leading-relaxed">
                            {finding.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State / Welcome */}
        {!result && !isAnalyzing && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-12 text-center space-y-8"
          >
            <div className="relative inline-flex items-center justify-center w-24 h-24">
              <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-2xl animate-pulse" />
              <div className="relative w-20 h-20 rounded-2xl bg-slate-950 border border-emerald-500/20 flex items-center justify-center text-emerald-500/30 shadow-2xl">
                {renderIcon(tool.icon, "w-10 h-10")}
              </div>
            </div>
            <div className="max-w-md mx-auto">
              <h3 className="text-lg font-bold text-white mb-2 tracking-tight uppercase">Module Ready</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed font-mono uppercase tracking-wider">
                {tool.description}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
