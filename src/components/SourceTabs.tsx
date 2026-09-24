interface SourceTabsProps {
  activeTab: 'file' | 'screenshare' | 'vbrowser' | 'playlist';
  setActiveTab: (tab: 'file' | 'screenshare' | 'vbrowser' | 'playlist') => void;
}

export default function SourceTabs({ activeTab, setActiveTab }: SourceTabsProps) {
  const tabs = [
    { id: 'screenshare' as const, label: 'Screenshare', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )},
    { id: 'vbrowser' as const, label: 'VBrowser', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    )},
    { id: 'file' as const, label: 'File', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    )},
    { id: 'playlist' as const, label: 'Playlist', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h10m-10 4h6" />
      </svg>
    )},
  ];

  return (
    <div className="bg-[#0f3460] border-b border-[#1a4080] px-4 flex items-center gap-1 shrink-0">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-lg transition-all ${
            activeTab === tab.id
              ? 'bg-[#1a1a2e] text-white border-b-2 border-blue-400'
              : 'text-gray-400 hover:text-gray-200 hover:bg-[#1a1a2e]/50'
          }`}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
      
      {/* URL Input */}
      <div className="ml-auto flex items-center gap-2">
        <div className="relative">
          <input
            type="text"
            placeholder="Paste video URL..."
            className="w-64 px-3 py-1.5 bg-[#1a1a2e] border border-[#2a4080] rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 transition-colors"
          />
        </div>
        <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
          Load
        </button>
        <button className="px-3 py-1.5 bg-[#1a1a2e] hover:bg-[#2a2a4e] text-gray-300 text-sm font-medium rounded-lg border border-[#2a4080] transition-colors">
          YouTube
        </button>
      </div>
    </div>
  );
}
