import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ToolPage from './pages/ToolPage';
import { TOOLS } from './config/tools';

export default function App() {
  const [openTabs, setOpenTabs] = useState<string[]>(['dashboard']);
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  const openTool = (toolId: string) => {
    if (!openTabs.includes(toolId)) {
      setOpenTabs([...openTabs, toolId]);
    }
    setActiveTab(toolId);
  };

  const closeTab = (tabId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newTabs = openTabs.filter(id => id !== tabId);
    if (newTabs.length === 0) {
      newTabs.push('dashboard');
    }
    setOpenTabs(newTabs);
    if (activeTab === tabId) {
      setActiveTab(newTabs[newTabs.length - 1]);
    }
  };

  return (
    <Layout 
      openTabs={openTabs} 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      closeTab={closeTab}
      openTool={openTool}
    >
      <div className={activeTab === 'dashboard' ? 'block h-full' : 'hidden'}>
        <Dashboard openTool={openTool} />
      </div>
      {TOOLS.map(tool => {
        if (!openTabs.includes(tool.id)) return null;
        return (
          <div key={tool.id} className={activeTab === tool.id ? 'block h-full' : 'hidden'}>
            <ToolPage toolId={tool.id} />
          </div>
        );
      })}
    </Layout>
  );
}
