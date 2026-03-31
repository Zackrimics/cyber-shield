import React from 'react';
import { Shield, LayoutDashboard, Menu, X, XCircle } from 'lucide-react';
import { TOOLS } from '../config/tools';
import { cn } from '../lib/utils';
import * as Icons from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  openTabs: string[];
  activeTab: string;
  setActiveTab: (id: string) => void;
  closeTab: (id: string, e: React.MouseEvent) => void;
  openTool: (id: string) => void;
}

export default function Layout({ children, openTabs, activeTab, setActiveTab, closeTab, openTool }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const renderIcon = (iconName: string, className?: string) => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent ? <IconComponent className={className} /> : <Shield className={className} />;
  };

  const navLinks = [
    { id: 'dashboard', name: 'Dashboard', icon: 'LayoutDashboard' },
    ...TOOLS.map(tool => ({
      id: tool.id,
      name: tool.title,
      icon: tool.icon
    }))
  ];

  const getTabInfo = (id: string) => {
    if (id === 'dashboard') return { name: 'Dashboard', icon: 'LayoutDashboard' };
    const tool = TOOLS.find(t => t.id === id);
    return tool ? { name: tool.title, icon: tool.icon } : { name: 'Unknown', icon: 'Shield' };
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 font-mono selection:bg-emerald-500/30 digital-grid flex">
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-950/80 border-r border-emerald-500/10 backdrop-blur-md h-screen sticky top-0">
        <div className="p-6 border-b border-emerald-500/10 flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.1)]">
            <Shield className="text-emerald-500 w-5 h-5 glow-text" />
          </div>
          <div>
            <h1 className="font-bold text-sm tracking-tighter text-emerald-500 glow-text">CYBER_SHIELD</h1>
            <p className="text-[8px] uppercase tracking-[0.3em] font-bold text-emerald-500/50 leading-none">v3.0.0 Secure</p>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => openTool(link.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all text-left",
                  isActive 
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.05)]" 
                    : "text-slate-500 hover:bg-slate-900 hover:text-slate-300 border border-transparent"
                )}
              >
                {renderIcon(link.icon, "w-4 h-4")}
                <span className="truncate">{link.name}</span>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-slate-950/90 border-b border-emerald-500/10 backdrop-blur-md z-50 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center justify-center">
            <Shield className="text-emerald-500 w-5 h-5" />
          </div>
          <h1 className="font-bold text-sm tracking-tighter text-emerald-500">CYBER_SHIELD</h1>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-emerald-500/70 hover:text-emerald-400"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-slate-950/95 backdrop-blur-xl z-40 overflow-y-auto">
          <div className="p-4 space-y-2">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    openTool(link.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left",
                    isActive 
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                      : "text-slate-400 hover:bg-slate-900 border border-transparent"
                  )}
                >
                  {renderIcon(link.icon, "w-5 h-5")}
                  {link.name}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 min-w-0 flex flex-col pt-16 md:pt-0 h-screen overflow-hidden">
        {/* Tabs Bar */}
        <div className="flex items-center overflow-x-auto custom-scrollbar bg-slate-950/50 border-b border-emerald-500/10 shrink-0">
          {openTabs.map(tabId => {
            const tabInfo = getTabInfo(tabId);
            const isActive = activeTab === tabId;
            return (
              <div
                key={tabId}
                onClick={() => setActiveTab(tabId)}
                className={cn(
                  "group flex items-center gap-2 px-4 py-3 border-r border-emerald-500/10 min-w-[140px] max-w-[200px] cursor-pointer transition-colors",
                  isActive ? "bg-emerald-500/10" : "hover:bg-slate-900"
                )}
              >
                {renderIcon(tabInfo.icon, cn("w-4 h-4 shrink-0", isActive ? "text-emerald-400" : "text-slate-500"))}
                <span className={cn("text-xs font-medium truncate flex-1", isActive ? "text-emerald-400" : "text-slate-400 group-hover:text-slate-300")}>
                  {tabInfo.name}
                </span>
                {tabId !== 'dashboard' && (
                  <button
                    onClick={(e) => closeTab(tabId, e)}
                    className="p-1 rounded-md opacity-0 group-hover:opacity-100 hover:bg-red-500/20 hover:text-red-400 text-slate-500 transition-all shrink-0"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </main>

      {/* Background Accents */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/5 rounded-full blur-[120px] opacity-20" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/5 rounded-full blur-[120px] opacity-20" />
      </div>
    </div>
  );
}
