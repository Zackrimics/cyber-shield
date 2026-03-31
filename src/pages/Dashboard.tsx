import React from 'react';
import { motion } from 'motion/react';
import { Shield, ArrowRight, Activity, Server, Lock } from 'lucide-react';
import { TOOLS } from '../config/tools';
import * as Icons from 'lucide-react';

interface DashboardProps {
  openTool: (id: string) => void;
}

export default function Dashboard({ openTool }: DashboardProps) {
  const renderIcon = (iconName: string, className?: string) => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent ? <IconComponent className={className} /> : <Shield className={className} />;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12 w-full">
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.15)]">
            <Shield className="text-emerald-500 w-7 h-7 glow-text" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">AI Cyber Shield</h1>
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] font-bold text-emerald-500/50">Unified Security Operations Center</p>
          </div>
        </div>
        <p className="text-slate-400 max-w-2xl text-sm leading-relaxed font-mono">
          Access multiple AI-powered security modules from a single dashboard. Analyze threats, detect vulnerabilities, and simulate attacks to understand risks.
        </p>
      </div>

      {/* Quick Stats / Status */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {[
          { label: 'SYSTEM STATUS', value: 'ONLINE', icon: Activity, color: 'text-emerald-500' },
          { label: 'ACTIVE MODULES', value: TOOLS.length.toString(), icon: Server, color: 'text-blue-400' },
          { label: 'THREAT INTEL', value: 'SYNCED', icon: Lock, color: 'text-purple-400' },
          { label: 'AI ENGINE', value: 'GEMINI 3', icon: Shield, color: 'text-amber-400' }
        ].map((stat, i) => (
          <div key={i} className="bg-slate-950/50 border border-white/5 p-4 rounded-2xl flex items-center gap-4">
            <div className={`p-2 rounded-lg bg-white/5 ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">{stat.label}</p>
              <p className={`text-sm font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tools Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-emerald-500/10 pb-4">
          <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-emerald-500/70">Available Modules</h2>
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{TOOLS.length} Tools Loaded</span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOOLS.map((tool, i) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <button
                onClick={() => openTool(tool.id)}
                className="group block w-full text-left h-full bg-slate-950 border border-white/5 hover:border-emerald-500/30 rounded-3xl p-6 transition-all hover:shadow-[0_0_30px_rgba(16,185,129,0.05)] hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-slate-900 border border-white/5 rounded-2xl flex items-center justify-center group-hover:bg-emerald-500/10 group-hover:border-emerald-500/20 transition-colors">
                    {renderIcon(tool.icon, "w-6 h-6 text-slate-400 group-hover:text-emerald-400 transition-colors")}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-4 h-4 text-emerald-500" />
                  </div>
                </div>
                <h3 className="text-base font-bold text-slate-200 mb-2 group-hover:text-emerald-400 transition-colors">{tool.title}</h3>
                <p className="text-[11px] text-slate-500 font-mono leading-relaxed line-clamp-3">
                  {tool.description}
                </p>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
