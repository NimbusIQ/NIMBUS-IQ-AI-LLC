import React, { useState, useRef, useEffect } from 'react';
import { createRoot } from "react-dom/client";
import { GoogleGenAI } from "@google/genai";
import { 
  Terminal, 
  Cpu, 
  Layers, 
  Zap, 
  ArrowRight, 
  Activity,
  Shield,
  Server,
  Code,
  XCircle
} from 'lucide-react';

// --- Configuration ---
const SYSTEM_INSTRUCTION = `You are the "Sovereign Intelligence" for Nimbus IQ AI.
You are a Forward Deployed Engineer agent.
Your interface is a command line terminal.
When asked about specific industries (Auto, Roofing, HVAC), explain how Nimbus digitizes their legacy workflows.
Keep responses technical, precise, and under 100 words.
Format output using Markdown where appropriate, but avoid code blocks unless asked.
Tone: Cybernetic, efficient, helpful.`;

// --- AI Service ---
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

interface LogEntry {
  type: 'input' | 'output' | 'system';
  content: string;
  timestamp: string;
}

const NimbusLanding = () => {
  const [input, setInput] = useState("");
  const [logs, setLogs] = useState<LogEntry[]>([
    { type: 'system', content: 'NIMBUS_OS_V3.1 INITIALIZED...', timestamp: new Date().toLocaleTimeString() },
    { type: 'system', content: 'CONNECTING TO GEMINI NODE... SUCCESS', timestamp: new Date().toLocaleTimeString() },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [viewMode, setViewMode] = useState<'dashboard' | 'terminal'>('dashboard');
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [logs, viewMode]);

  const handleCommand = async () => {
    if (!input.trim() || isProcessing) return;

    const cmd = input;
    setInput("");
    setViewMode('terminal'); // Switch to terminal view to show output
    setIsProcessing(true);

    // Add user input to log
    setLogs(prev => [...prev, { 
      type: 'input', 
      content: cmd, 
      timestamp: new Date().toLocaleTimeString() 
    }]);

    try {
      const model = ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: cmd,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        }
      });

      const response = await model;
      const text = response.text;

      setLogs(prev => [...prev, { 
        type: 'output', 
        content: text, 
        timestamp: new Date().toLocaleTimeString() 
      }]);

    } catch (error) {
      setLogs(prev => [...prev, { 
        type: 'system', 
        content: `ERROR: CONNECTION_INTERRUPTED [${error instanceof Error ? error.message : 'Unknown'}]`, 
        timestamp: new Date().toLocaleTimeString() 
      }]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500 selection:text-slate-900 overflow-x-hidden">
      
      {/* --- Top Nav (Glassmorphic) --- */}
      <nav className="fixed top-0 w-full z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
            <Cpu className="text-cyan-400 w-6 h-6" />
            <span className="font-bold text-xl tracking-tighter">NIMBUS <span className="text-cyan-400">IQ</span></span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
            <a href="#intelligence" className="hover:text-cyan-400 transition">Intelligence</a>
            <a href="#forward-deployed" className="hover:text-cyan-400 transition">Forward Deployed</a>
            <a href="#sector-os" className="hover:text-cyan-400 transition">Sector OS</a>
          </div>
          <button 
            onClick={() => setViewMode(viewMode === 'dashboard' ? 'terminal' : 'dashboard')}
            className={`bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 px-4 py-2 rounded-full text-xs font-bold hover:bg-cyan-500 hover:text-white transition flex items-center gap-2 ${viewMode === 'terminal' ? 'bg-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.3)]' : ''}`}
          >
            {viewMode === 'dashboard' ? 'INITIALIZE TERMINAL' : 'VIEW DASHBOARD'}
          </button>
        </div>
      </nav>

      {/* --- Hero Section: The Terminal --- */}
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* Left: The Pitch */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-cyan-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              System Online: Gemini 3 Integration Active
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight">
              Reality, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600"> digitized.</span>
            </h1>
            
            <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
              We are the Forward Deployed Engineers for the AI era. We ingest your legacy reality—paper logs, dusty servers, physical assets—and build a Sovereign Intelligence Layer on top.
            </p>

            <div className="flex gap-4">
              <button 
                onClick={() => {
                  setViewMode('terminal');
                  setInput("Initiate deployment protocol for Auto Dealership legacy data");
                  // Auto trigger after a short delay for effect would be nice, but user click is safer
                }}
                className="bg-cyan-500 text-slate-950 px-6 py-3 rounded-lg font-bold hover:bg-cyan-400 transition flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
              >
                Deploy Engineer <ArrowRight className="w-4 h-4" />
              </button>
              <button className="px-6 py-3 rounded-lg font-bold border border-slate-700 hover:border-cyan-400 hover:text-cyan-400 transition">
                View Architecture
              </button>
            </div>
            
            {/* Real-time stats ticker */}
            <div className="flex gap-6 text-xs font-mono text-slate-500 pt-4 border-t border-slate-900">
              <div className="flex items-center gap-2">
                <Activity className="w-3 h-3" /> LATENCY: 45ms
              </div>
              <div className="flex items-center gap-2">
                <Server className="w-3 h-3" /> NODES: ONLINE
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-3 h-3" /> SOVEREIGNTY: SECURE
              </div>
            </div>
          </div>

          {/* Right: The "Screenshot" Interactive Gallery / Terminal */}
          <div className="relative h-[500px]">
            {/* Background Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur opacity-20 animate-pulse"></div>
            
            <div className="relative bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl h-full flex flex-col backdrop-blur-sm bg-slate-900/95">
              <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-4 shrink-0">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                </div>
                <div className="text-xs text-slate-500 font-mono flex items-center gap-2">
                  {viewMode === 'dashboard' ? 'nimbus_iq_dashboard_v1.0' : 'nimbus_terminal_session'}
                </div>
              </div>

              {/* View 1: Dashboard */}
              {viewMode === 'dashboard' && (
                <div className="flex-1 space-y-3 overflow-y-auto pr-1">
                  {[
                    { name: "RoofAI Pro", desc: "Autonomous storm forensics & CRM", tag: "Active", icon: Layers, color: "text-green-400" },
                    { name: "Chi AI Gemini 3", desc: "R.A.G. Knowledge Base Core", tag: "Thinking", icon: Cpu, color: "text-purple-400" },
                    { name: "Auto-Log Ingest", desc: "Paper-to-SQL Vision Agent", tag: "Standby", icon: Code, color: "text-blue-400" },
                    { name: "Sovereign Command", desc: "Enterprise Dashboard 3D", tag: "Secure", icon: Shield, color: "text-cyan-400" },
                  ].map((app, i) => (
                    <div key={i} className="group flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900/50 transition cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center group-hover:bg-cyan-500/10 transition`}>
                          <app.icon className={`w-5 h-5 text-slate-400 group-hover:text-cyan-400`} />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-200">{app.name}</h3>
                          <p className="text-xs text-slate-500">{app.desc}</p>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded border ${
                        app.tag === 'Active' ? 'border-green-500/30 text-green-400 bg-green-500/10' :
                        app.tag === 'Thinking' ? 'border-purple-500/30 text-purple-400 bg-purple-500/10 animate-pulse' :
                        app.tag === 'Secure' ? 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10' :
                        'border-slate-700 text-slate-500'
                      }`}>
                        {app.tag}
                      </span>
                    </div>
                  ))}
                  
                  <div className="mt-8 p-4 bg-cyan-900/10 border border-cyan-900/30 rounded-lg">
                    <p className="text-xs text-cyan-600 mb-2 font-mono">SYSTEM STATUS</p>
                    <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-500 w-3/4 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              )}

              {/* View 2: Terminal */}
              {viewMode === 'terminal' && (
                <div className="flex-1 flex flex-col font-mono text-sm overflow-hidden">
                  <div className="flex-1 overflow-y-auto space-y-2 pr-2 text-slate-300">
                    {logs.map((log, i) => (
                      <div key={i} className={`flex flex-col ${log.type === 'input' ? 'text-cyan-400' : log.type === 'system' ? 'text-yellow-500/80' : 'text-slate-300'}`}>
                        <div className="flex items-center gap-2 text-[10px] text-slate-600 uppercase">
                          <span>[{log.timestamp}]</span>
                          <span>{log.type === 'input' ? 'USR_CMD' : 'SYS_RES'}</span>
                        </div>
                        <div className="whitespace-pre-wrap pl-4 border-l border-slate-800">
                          {log.type === 'input' && '> '}
                          {log.content}
                        </div>
                      </div>
                    ))}
                    {isProcessing && (
                      <div className="flex items-center gap-2 text-cyan-500 animate-pulse">
                        <Terminal className="w-3 h-3" />
                        PROCESSING_REQUEST...
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>
                </div>
              )}
              
              {/* Interactive Prompt Box */}
              <div className="mt-4 shrink-0">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center gap-3 focus-within:border-cyan-500/50 transition-colors">
                  <Terminal className="w-4 h-4 text-cyan-500" />
                  <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCommand()}
                    placeholder="Ask Nimbus to analyze your legacy data..." 
                    className="bg-transparent border-none outline-none text-sm text-slate-300 w-full placeholder:text-slate-600 font-mono"
                    disabled={isProcessing}
                  />
                  <button 
                    onClick={handleCommand} 
                    disabled={isProcessing}
                    className="text-slate-600 hover:text-cyan-400 cursor-pointer transition disabled:opacity-50"
                  >
                    <Zap className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* --- Footer / Capabilities Strip --- */}
      <div id="sector-os" className="border-t border-slate-900 bg-slate-950 py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-bold text-white mb-4">Industries</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li className="hover:text-cyan-400 cursor-pointer transition-colors">Automotive & Logistics</li>
              <li className="hover:text-cyan-400 cursor-pointer transition-colors">Roofing & HVAC</li>
              <li className="hover:text-cyan-400 cursor-pointer transition-colors">Real Estate Assets</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">The Stack</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li className="hover:text-cyan-400 cursor-pointer transition-colors">Gemini 3 Foundation</li>
              <li className="hover:text-cyan-400 cursor-pointer transition-colors">Vertex AI Agents</li>
              <li className="hover:text-cyan-400 cursor-pointer transition-colors">Document AI (OCR)</li>
            </ul>
          </div>
          <div className="col-span-2">
             <h4 className="font-bold text-white mb-4">System Notice</h4>
             <p className="text-sm text-slate-600">
               Nimbus IQ AI operates as a sovereign layer over your existing infrastructure. 
               All demonstrations on this public node are sandboxed.
               <br/><br/>
               &copy; {new Date().getFullYear()} Nimbus IQ AI, LLC.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById("root")!);
root.render(<NimbusLanding />);
