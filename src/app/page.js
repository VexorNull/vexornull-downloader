'use client';
import { useState, useEffect } from 'react';
import { Download, Sparkles, ShieldCheck, Link as LinkIcon, CheckCircle2, Film, Music, Clipboard, History, Trash2, Copy } from 'lucide-react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [downloadType, setDownloadType] = useState('video');
  const [loading, setLoading] = useState(false);
  const [mediaData, setMediaData] = useState(null);
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('vexornull_zenith_history');
    if (saved) {
      try { setHistory(JSON.parse(saved)); } catch (e) {}
    }
  }, []);

  const saveToHistory = (title, thumb) => {
    const newItem = { id: Date.now(), title, thumb, date: new Date().toLocaleDateString() };
    const updated = [newItem, ...history.slice(0, 4)];
    setHistory(updated);
    localStorage.setItem('vexornull_zenith_history', JSON.stringify(updated));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('vexornull_zenith_history');
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
    <main className="flex flex-col items-center justify-between flex-grow px-4 py-10 relative overflow-hidden">
      {/* Background Ambient Lighting */}
      <div className="absolute w-[1100px] h-[1100px] bg-purple-600/10 rounded-full blur-[300px] pointer-events-none -top-48 -left-48"></div>
      <div className="absolute w-[1100px] h-[1100px] bg-blue-600/10 rounded-full blur-[300px] pointer-events-none -bottom-48 -right-48"></div>

      <div className="z-10 max-w-3xl w-full mx-auto text-center flex-grow flex flex-col justify-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-xs text-purple-400 mb-6 mx-auto border border-purple-500/20 shadow-2xl">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>VexorNull SaveHub Zenith Edition</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-purple-400">
          Vexor<span className="text-purple-500">Null</span>
        </h1>
        <p className="text-gray-400 text-sm md:text-base mb-8 max-w-xl mx-auto font-medium leading-relaxed">
          The ultimate elite media downloader ecosystem. Extract reels, videos & audio tracks effortlessly.
        </p>

        {/* Mode Selector Tabs */}
        <div className="flex justify-center gap-3 mb-6">
          <button
            onClick={() => setDownloadType('video')}
            className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${downloadType === 'video' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 ring-1 ring-purple-400' : 'glass-card text-gray-400 hover:text-white'}`}
          >
            <Film className="w-3.5 h-3.5" /> Video / Reels Mode
          </button>
          <button
            onClick={() => setDownloadType('audio')}
            className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${downloadType === 'audio' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 ring-1 ring-purple-400' : 'glass-card text-gray-400 hover:text-white'}`}
          >
            <Music className="w-3.5 h-3.5" /> Audio MP3 Mode
          </button>
        </div>

        {/* Input Form */}
        <form onSubmit={handleFetchMedia} className="relative w-full mb-8 glow-purple rounded-2xl">
          <div className="flex flex-col md:flex-row items-center w-full p-2.5 rounded-2xl glass-card transition-all gap-2 border border-purple-500/30">
            <div className="flex items-center w-full px-3 py-2">
              <LinkIcon className="w-5 h-5 text-purple-400 mr-3 flex-shrink-0" />
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste Instagram, YouTube, TikTok or Facebook link..."
                className="w-full outline-none text-gray-100 text-sm bg-transparent placeholder-gray-500"
                required
              />
              <button
                type="button"
                onClick={handlePaste}
                className="px-3 py-1.5 ml-2 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-medium rounded-lg transition-colors flex items-center gap-1 flex-shrink-0 border border-gray-700"
              >
                <Clipboard className="w-3.5 h-3.5" /> Paste
              </button>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white text-sm font-semibold transition-all shadow-lg flex items-center justify-center gap-2 flex-shrink-0 disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Processing...
                </span>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Start Extraction</span>
                </>
              )}
            </button>
          </div>
        </form>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
            {error}
          </div>
        )}

        {/* Results Card */}
        {mediaData && (
          <div className="w-full p-6 rounded-2xl glass-card text-left mb-10 border border-purple-500/30 animate-fadeIn">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-800">
              <span className="text-xs font-semibold px-3.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Zenith Extraction Success
              </span>
              <span className="text-xs text-emerald-400 flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" /> Ready
              </span>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-center">
              {mediaData.thumbnail && (
                <img src={mediaData.thumbnail} alt="Thumbnail" className="w-full md:w-48 h-32 object-cover rounded-xl border border-gray-800 shadow-md" />
              )}
              <div className="flex-grow w-full">
                <h3 className="text-sm md:text-base font-bold text-gray-100 mb-3 truncate max-w-md">{mediaData.title}</h3>
                <div className="space-y-2.5">
                  {mediaData.downloads.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-gray-900/80 border border-gray-800 hover:border-purple-500/40 transition-all gap-2">
                      <div className="truncate mr-2">
                        <p className="text-xs font-semibold text-gray-200 truncate">{item.quality}</p>
                        <span className="text-[10px] text-gray-400 uppercase">Format: {item.format}</span>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => handleCopyLink(item.url, idx)}
                          className="px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-medium transition-all flex items-center gap-1 border border-gray-700"
                        >
                          <Copy className="w-3.5 h-3.5" /> {copiedIndex === idx ? 'Copied!' : 'Copy'}
                        </button>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          download
                          className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition-all flex items-center gap-1.5 shadow-md shadow-purple-600/20"
                        >
                          <Download className="w-3.5 h-3.5" /> Download
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* History Section */}
        {history.length > 0 && (
          <div className="w-full mt-4 text-left">
            <div className="flex items-center justify-between mb-3 px-2">
              <span className="text-xs font-semibold text-gray-400 flex items-center gap-1.5">
                <History className="w-3.5 h-3.5 text-purple-400" /> Recent Zenith History
              </span>
              <button onClick={clearHistory} className="text-[10px] text-red-400 hover:text-red-300 flex items-center gap-1 font-medium transition-colors">
                <Trash2 className="w-3 h-3" /> Clear History
              </button>
            </div>
            <div className="space-y-2">
              {history.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 rounded-xl glass-card border border-gray-800 text-xs">
                  <div className="flex items-center gap-3 truncate">
                    <img src={item.thumb} alt="" className="w-10 h-10 object-cover rounded-lg flex-shrink-0" />
                    <span className="text-gray-300 truncate font-medium">{item.title}</span>
                  </div>
                  <span className="text-[10px] text-gray-500 flex-shrink-0 ml-2">{item.date}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <footer className="w-full py-6 mt-12 border-t border-gray-800/60 text-xs text-gray-500 flex flex-col md:flex-row justify-between items-center px-8 max-w-6xl mx-auto z-10">
        <div className="flex gap-6 mb-3 md:mb-0">
          <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400"/> Zenith Encrypted Protocol</span>
        </div>
        <div>
          <span>Crafted with absolute precision by <strong className="text-purple-400">@vexornull</strong></span>
        </div>
      </footer>
    </main>
  );
}
