'use client';
import { useState, useEffect } from 'react';
import { Download, Sparkles, ShieldCheck, Link as LinkIcon, CheckCircle2, Film, Music, Clipboard, History, Trash2, Copy, Zap, Globe, Layers } from 'lucide-react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [downloadType, setDownloadType] = useState('video');
  const [loading, setLoading] = useState(false);
  const [mediaData, setMediaData] = useState(null);
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('vexornull_nexus_history');
    if (saved) {
      try { setHistory(JSON.parse(saved)); } catch (e) {}
    }
  }, []);

  const saveToHistory = (title, thumb) => {
    const newItem = { id: Date.now(), title, thumb, date: new Date().toLocaleDateString() };
    const updated = [newItem, ...history.slice(0, 4)];
    setHistory(updated);
    localStorage.setItem('vexornull_nexus_history', JSON.stringify(updated));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('vexornull_nexus_history');
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setUrl(text);
    } catch (e) {
      alert('Clipboard access restricted.');
    }
  };

  const handleCopyLink = (link, idx) => {
    navigator.clipboard.writeText(link);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleFetchMedia = async (e) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError('');
    setMediaData(null);

    try {
      const res = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, type: downloadType }),
      });

      const data = await res.json();
      if (data.success) {
        setMediaData(data);
        saveToHistory(data.title, data.thumbnail);
      } else {
        setError(data.message || 'Something went wrong.');
      }
    } catch (err) {
      setError('Network connection error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-gray-100 flex flex-col justify-between relative overflow-x-hidden selection:bg-purple-600 selection:text-white">
      {/* Background Gradients & Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-purple-950/20 via-blue-950/10 to-transparent blur-[120px] pointer-events-none"></div>

      {/* Top Navbar Header */}
      <header className="w-full border-b border-gray-800/80 bg-[#030712]/80 backdrop-blur-xl sticky top-0 z-50 px-4 sm:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-600/30">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-bold tracking-tight text-base sm:text-lg bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-purple-400">
              VexorNull <span className="text-purple-500 font-extrabold">Nexus</span>
            </span>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full bg-gray-900/90 border border-gray-800 text-gray-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Engine v11.0 Active</span>
        </div>
      </header>

      {/* Main Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-12 sm:py-16 relative z-10 max-w-4xl mx-auto w-full">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Universal High-Speed Media Pipeline</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-center tracking-tight mb-4 text-white">
          Download Content <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-blue-500">
            Without Limits.
          </span>
        </h1>
        <p className="text-gray-400 text-center text-sm sm:text-base max-w-lg mb-10 font-normal leading-relaxed">
          Extract high-definition reels, videos, and crystal-clear audio tracks instantly from any platform.
        </p>

        {/* Card Container for Inputs & Tabs */}
        <div className="w-full bg-[#0d1117]/90 backdrop-blur-2xl border border-gray-800/90 rounded-3xl p-5 sm:p-8 shadow-2xl shadow-purple-950/20">
          
          {/* Mode Selector Tabs */}
          <div className="grid grid-cols-2 gap-2 p-1.5 bg-gray-950/60 rounded-2xl mb-6 border border-gray-800/60">
            <button
              type="button"
              onClick={() => setDownloadType('video')}
              className={`flex items-center justify-center gap-2 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                downloadType === 'video'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Film className="w-4 h-4" />
              <span>Video / Reels</span>
            </button>
            <button
              type="button"
              onClick={() => setDownloadType('audio')}
              className={`flex items-center justify-center gap-2 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                downloadType === 'audio'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Music className="w-4 h-4" />
              <span>Audio MP3</span>
            </button>
          </div>

          {/* URL Input Form */}
          <form onSubmit={handleFetchMedia} className="space-y-4">
            <div className="relative flex flex-col sm:flex-row items-center gap-2 bg-gray-950/80 border border-gray-800 rounded-2xl p-2 focus-within:border-purple-500 transition-colors">
              <div className="flex items-center w-full px-3 py-1">
                <LinkIcon className="w-5 h-5 text-gray-500 mr-3 flex-shrink-0" />
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Paste public media link here..."
                  className="w-full bg-transparent text-sm sm:text-base text-gray-100 placeholder-gray-500 outline-none"
                  required
                />
              </div>
              
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handlePaste}
                  className="flex-1 sm:flex-initial px-4 py-3 bg-gray-800/80 hover:bg-gray-800 text-gray-300 rounded-xl text-xs font-medium transition-colors flex items-center justify-center gap-1.5 border border-gray-700/50"
                >
                  <Clipboard className="w-3.5 h-3.5" />
                  <span>Paste</span>
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 sm:flex-initial px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-xl text-xs sm:text-sm transition-all shadow-lg shadow-purple-600/20 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>Fetching...</span>
                    </span>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Extract</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs sm:text-sm">
              {error}
            </div>
          )}

          {/* Results Box */}
          {mediaData && (
            <div className="mt-6 pt-6 border-t border-gray-800/80 animate-fadeIn">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                  Extraction Complete
                </span>
                <span className="text-xs text-emerald-400 flex items-center gap-1 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Ready for Download
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-center bg-gray-950/60 p-4 rounded-2xl border border-gray-800/60">
                {mediaData.thumbnail && (
                  <img src={mediaData.thumbnail} alt="Thumbnail" className="w-full sm:w-32 h-24 object-cover rounded-xl border border-gray-800 shadow-md flex-shrink-0" />
                )}
                <div className="flex-grow w-full overflow-hidden">
                  <h3 className="text-sm sm:text-base font-bold text-gray-100 mb-2 truncate">{mediaData.title}</h3>
                  <div className="space-y-2">
                    {mediaData.downloads.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-gray-900/90 border border-gray-800 gap-2">
                        <div className="truncate mr-2">
                          <p className="text-xs font-semibold text-gray-200 truncate">{item.quality}</p>
                          <span className="text-[10px] text-gray-400 uppercase font-mono">Format: {item.format}</span>
                        </div>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <button
                            onClick={() => handleCopyLink(item.url, idx)}
                            className="px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-medium transition-colors flex items-center gap-1 border border-gray-700"
                          >
                            <Copy className="w-3 h-3" /> {copiedIndex === idx ? 'Copied' : 'Copy'}
                          </button>
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                            className="px-3.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition-colors flex items-center gap-1 shadow-md shadow-purple-600/30"
                          >
                            <Download className="w-3 h-3" /> Save
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* History Section */}
        {history.length > 0 && (
          <div className="w-full mt-8 text-left">
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-xs font-semibold text-gray-400 flex items-center gap-1.5">
                <History className="w-3.5 h-3.5 text-purple-400" /> Recent Extractions
              </span>
              <button onClick={clearHistory} className="text-[11px] text-red-400 hover:text-red-300 flex items-center gap-1 font-medium transition-colors">
                <Trash2 className="w-3 h-3" /> Clear History
              </button>
            </div>
            <div className="space-y-2">
              {history.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 rounded-2xl bg-[#0d1117]/80 border border-gray-800 text-xs">
                  <div className="flex items-center gap-3 truncate">
                    <img src={item.thumb} alt="" className="w-9 h-9 object-cover rounded-xl flex-shrink-0 border border-gray-800" />
                    <span className="text-gray-300 truncate font-medium">{item.title}</span>
                  </div>
                  <span className="text-[10px] text-gray-500 flex-shrink-0 ml-2">{item.date}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="w-full py-6 border-t border-gray-800/80 bg-[#030712] text-xs text-gray-500 px-4 sm:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 z-10">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <ShieldCheck className="w-4 h-4" /> Secure End-to-End Extraction
          </span>
        </div>
        <div>
          <span>Engineered with precision by <strong className="text-purple-400">@vexornull</strong></span>
        </div>
      </footer>
    </div>
  );
}
