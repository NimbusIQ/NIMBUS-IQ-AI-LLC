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
  XCircle,
  Camera, 
  MapPin, 
  FileText, 
  Ruler, 
  AlertTriangle, 
  Truck, 
  CheckCircle, 
  Mic,
  ArrowLeft,
  Loader,
  Search,
  Volume2,
  ExternalLink,
  FileBarChart,
  Users,
  Globe,
  Database,
  CloudLightning,
  TrendingUp,
  Building,
  Scale,
  Lock,
  Brain,
  MessageSquare,
  Share2,
  Target,
  Megaphone,
  Smartphone,
  Mail,
  Phone,
  Play,
  Pause,
  Monitor
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

// --- Types ---
interface LogEntry {
  type: 'input' | 'output' | 'system' | 'router';
  content: string;
  timestamp: string;
}

type ViewState = 'home' | 'roof-ai' | 'about' | 'compliance-demo' | 'marketing-agent';

// --- Utils ---
const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

// --- RAG Knowledge Base ---
const ROOFING_KNOWLEDGE_BASE: Record<string, any> = {
  "ice_water_shield_denver": {
      "text": "City and County of Denver Amendment to IRC R905.1.2: Ice barrier is required from the lowest edges of all roof surfaces to a point at least 24 inches inside the exterior wall line of the building.",
      "source": "Denver Building Code 2022",
      "required_item": {
        "cat": "RFG", 
        "sel": "IWS", 
        "desc": "Ice & Water Shield", 
        "qty": 300.0, 
        "unit": "SF", 
        "note": "MANDATORY UPGRADE: Added per City and County of Denver Code - IBC 2018 Sec 1507.2."
      }
  },
  "drip_edge_florida": {
      "text": "Florida Building Code 1507.2.9.3: A drip edge shall be provided at eaves and gables of shingle roofs.",
      "source": "FBC 7th Edition",
      "required_item": {
        "cat": "RFG", 
        "sel": "DRIP", 
        "desc": "Drip Edge", 
        "qty": 120.0, 
        "unit": "LF",
        "note": "MANDATORY UPGRADE: Added per FBC 7th Edition Sec 1507.2.9.3"
      }
  }
};

const RAW_DRONE_DATA = {
    "zip_code": "80205", 
    "measurements": {"total_sq_ft": 3000, "pitch": "10/12"},
    "damage": {"replace_required": true},
    "line_items": [
        {"desc": "3-Tab Shingles", "qty": 30, "unit": "SQ", "cat": "RFG", "sel": "300"},
        {"desc": "Ridge Cap", "qty": 80, "unit": "LF", "cat": "RFG", "sel": "RIDGC"}
    ]
};

// --- Components ---

/**
 * 3D CLOUD STACK VISUALIZER - INTERACTIVE
 */
const CloudStack = () => {
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [rotation, setRotation] = useState({ x: 60, z: 45 });
  const [activeView, setActiveView] = useState<'auto' | 'infra' | 'io' | 'apps' | 'brain'>('auto');

  // Animation Loop
  useEffect(() => {
    let frameId: number;
    const animate = () => {
      if (isAutoRotating) {
        setRotation(prev => ({ ...prev, z: (prev.z + 0.2) % 360 }));
        frameId = requestAnimationFrame(animate);
      }
    };
    if (isAutoRotating) animate();
    return () => cancelAnimationFrame(frameId);
  }, [isAutoRotating]);

  const toggleAuto = () => {
    if (!isAutoRotating) {
      setActiveView('auto');
    }
    setIsAutoRotating(!isAutoRotating);
  };

  const focusView = (view: 'infra' | 'io' | 'apps' | 'brain') => {
    setIsAutoRotating(false);
    setActiveView(view);
    // Set specific camera angles
    switch(view) {
      case 'infra': setRotation({ x: 80, z: 0 }); break;
      case 'io': setRotation({ x: 75, z: 90 }); break;
      case 'apps': setRotation({ x: 65, z: 180 }); break;
      case 'brain': setRotation({ x: 50, z: 270 }); break;
    }
  };

  const getLabel = () => {
    switch(activeView) {
      case 'infra': return "L1: INFRASTRUCTURE — BigQuery Data Warehouse & Cloud Run Scaling";
      case 'io': return "L2: I/O PROTOCOLS — Gmail, Voice, and SMS Ingest Pipelines";
      case 'apps': return "L3: ECOSYSTEM — 40+ Replit Micro-Apps & NotebookLM Knowledge Graph";
      case 'brain': return "L4: INTELLIGENCE — Gemini 2.5 Flash Sovereign Agent";
      default: return "INTERACTIVE STACK — Select a layer to inspect";
    }
  };

  return (
    <div className="relative w-full h-full min-h-[500px] flex flex-col bg-slate-950 rounded-xl border border-slate-800 overflow-hidden group shadow-2xl">
      
      {/* Top Bar: Controls */}
      <div className="flex justify-between items-center p-4 border-b border-slate-800 bg-slate-900/50 backdrop-blur z-20">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold text-slate-300 tracking-wider">STACK VISUALIZER</span>
        </div>
        <button 
          onClick={toggleAuto}
          className="flex items-center gap-2 px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-mono transition border border-slate-700"
        >
          {isAutoRotating ? <Pause className="w-3 h-3 text-cyan-400" /> : <Play className="w-3 h-3 text-green-400" />}
          {isAutoRotating ? "PAUSE" : "AUTO-ROTATE"}
        </button>
      </div>

      {/* Info Banner */}
      <div className="absolute top-16 left-0 right-0 z-10 flex justify-center pointer-events-none px-4">
        <div className={`
          px-4 py-2 rounded-full backdrop-blur-md border shadow-lg transition-all duration-300
          ${activeView === 'auto' ? 'bg-slate-900/50 border-slate-700 text-slate-400' : 
            activeView === 'infra' ? 'bg-yellow-900/50 border-yellow-500 text-yellow-100' :
            activeView === 'io' ? 'bg-red-900/50 border-red-500 text-red-100' :
            activeView === 'apps' ? 'bg-purple-900/50 border-purple-500 text-purple-100' :
            'bg-cyan-900/50 border-cyan-500 text-cyan-100'
          }
        `}>
          <span className="text-xs font-mono font-bold">{getLabel()}</span>
        </div>
      </div>

      {/* 3D Scene */}
      <div className="flex-1 relative flex items-center justify-center perspective-[1200px] overflow-hidden bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 to-slate-950">
        <div 
          className="relative w-64 h-64 transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{ transformStyle: 'preserve-3d', transform: `rotateX(${rotation.x}deg) rotateZ(${rotation.z}deg)` }}
        >
          
          {/* L1: INFRASTRUCTURE */}
          <div 
            className={`absolute inset-0 border-2 bg-slate-900/90 backdrop-blur-md rounded-xl flex items-center justify-center transform translate-z-[-80px] transition-all duration-500
              ${activeView === 'infra' ? 'border-yellow-500 shadow-[0_0_60px_rgba(234,179,8,0.4)] scale-110' : 'border-slate-700 shadow-[0_0_30px_rgba(15,23,42,0.6)]'}
            `}
          >
            <div className="text-center transform rotate-180" style={{ transform: 'rotateX(-90deg)' }}>
              <div className="grid grid-cols-2 gap-4">
                 <div className="flex flex-col items-center">
                    <Database className={`w-8 h-8 ${activeView === 'infra' ? 'text-yellow-400' : 'text-slate-600'}`} />
                    <span className="text-[8px] mt-1 font-mono text-slate-400">BigQuery</span>
                 </div>
                 <div className="flex flex-col items-center">
                    <Server className={`w-8 h-8 ${activeView === 'infra' ? 'text-yellow-400' : 'text-slate-600'}`} />
                    <span className="text-[8px] mt-1 font-mono text-slate-400">Cloud Run</span>
                 </div>
              </div>
              <div className="text-[10px] text-slate-500 mt-4 font-mono border-t border-slate-800 pt-1">L1: INFRASTRUCTURE</div>
            </div>
          </div>

          {/* L2: I/O LAYER */}
          <div 
            className={`absolute inset-0 border-2 bg-slate-900/80 backdrop-blur-md rounded-xl flex items-center justify-center transform translate-z-[-20px] transition-all duration-500
              ${activeView === 'io' ? 'border-red-500 shadow-[0_0_60px_rgba(239,68,68,0.4)] scale-110' : 'border-red-900/30 shadow-[0_0_30px_rgba(220,38,38,0.1)]'}
            `}
          >
            <div className="text-center" style={{ transform: 'rotateX(-90deg)' }}>
               <div className="flex justify-center gap-6 mb-2">
                  <div className="flex flex-col items-center">
                     <Mail className={`w-6 h-6 ${activeView === 'io' ? 'text-red-400' : 'text-slate-600'}`} />
                     <span className="text-[8px] mt-1 font-mono text-slate-400">Gmail</span>
                  </div>
                  <div className="flex flex-col items-center">
                     <Phone className={`w-6 h-6 ${activeView === 'io' ? 'text-green-400' : 'text-slate-600'}`} />
                     <span className="text-[8px] mt-1 font-mono text-slate-400">Voice</span>
                  </div>
               </div>
               <div className="text-[10px] text-slate-500 mt-2 font-mono">L2: I/O LAYER</div>
            </div>
          </div>

          {/* L3: APPS */}
          <div 
            className={`absolute inset-0 border-2 bg-slate-900/80 backdrop-blur-md rounded-xl flex items-center justify-center transform translate-z-[40px] transition-all duration-500
              ${activeView === 'apps' ? 'border-purple-500 shadow-[0_0_60px_rgba(168,85,247,0.4)] scale-110' : 'border-purple-900/30 shadow-[0_0_30px_rgba(147,51,234,0.1)]'}
            `}
          >
             <div className="text-center" style={{ transform: 'rotateX(-90deg)' }}>
               <Code className={`w-8 h-8 mx-auto mb-2 ${activeView === 'apps' ? 'text-purple-400' : 'text-slate-600'}`} />
               <div className="flex gap-2 justify-center">
                  <span className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[8px] text-slate-400">REPLIT</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[8px] text-slate-400">NOTEBOOKLM</span>
               </div>
               <div className="text-[10px] text-slate-500 mt-2 font-mono">L3: ECOSYSTEM</div>
             </div>
          </div>

          {/* L4: BRAIN */}
          <div 
            className={`absolute inset-0 border-2 bg-slate-900/80 backdrop-blur-md rounded-xl flex items-center justify-center transform translate-z-[100px] transition-all duration-500
              ${activeView === 'brain' ? 'border-cyan-400 shadow-[0_0_60px_rgba(34,211,238,0.5)] scale-110' : 'border-cyan-900/30 shadow-[0_0_40px_rgba(6,182,212,0.2)]'}
            `}
          >
             <div className="text-center" style={{ transform: 'rotateX(-90deg)' }}>
               <Brain className={`w-12 h-12 mx-auto relative z-10 ${activeView === 'brain' ? 'text-cyan-400 animate-pulse' : 'text-slate-600'}`} />
               <div className="text-xs text-slate-300 mt-3 font-bold font-mono tracking-widest">GEMINI 2.5</div>
               <div className="text-[8px] text-slate-500 mt-1 font-mono">L4: SOVEREIGN BRAIN</div>
             </div>
          </div>

          {/* Axis */}
          <div className="absolute inset-0 flex items-center justify-center transform rotate-x-90 pointer-events-none" style={{ transformStyle: 'preserve-3d' }}>
             <div className="w-0.5 h-64 bg-gradient-to-t from-yellow-500 via-purple-500 to-cyan-500 opacity-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>

        </div>
      </div>

      {/* Bottom Controls */}
      <div className="bg-slate-900 p-2 grid grid-cols-4 gap-2 border-t border-slate-800 z-20">
        <button 
          onClick={() => focusView('infra')}
          className={`flex flex-col items-center justify-center p-2 rounded transition-all ${activeView === 'infra' ? 'bg-yellow-900/20 border border-yellow-500/50' : 'hover:bg-slate-800 border border-transparent'}`}
        >
          <Database className={`w-4 h-4 mb-1 ${activeView === 'infra' ? 'text-yellow-500' : 'text-slate-500'}`} />
          <span className={`text-[9px] font-bold ${activeView === 'infra' ? 'text-yellow-500' : 'text-slate-600'}`}>INFRA</span>
        </button>

        <button 
          onClick={() => focusView('io')}
          className={`flex flex-col items-center justify-center p-2 rounded transition-all ${activeView === 'io' ? 'bg-red-900/20 border border-red-500/50' : 'hover:bg-slate-800 border border-transparent'}`}
        >
          <Mail className={`w-4 h-4 mb-1 ${activeView === 'io' ? 'text-red-500' : 'text-slate-500'}`} />
          <span className={`text-[9px] font-bold ${activeView === 'io' ? 'text-red-500' : 'text-slate-600'}`}>I/O</span>
        </button>

        <button 
          onClick={() => focusView('apps')}
          className={`flex flex-col items-center justify-center p-2 rounded transition-all ${activeView === 'apps' ? 'bg-purple-900/20 border border-purple-500/50' : 'hover:bg-slate-800 border border-transparent'}`}
        >
          <Code className={`w-4 h-4 mb-1 ${activeView === 'apps' ? 'text-purple-500' : 'text-slate-500'}`} />
          <span className={`text-[9px] font-bold ${activeView === 'apps' ? 'text-purple-500' : 'text-slate-600'}`}>APPS</span>
        </button>

        <button 
          onClick={() => focusView('brain')}
          className={`flex flex-col items-center justify-center p-2 rounded transition-all ${activeView === 'brain' ? 'bg-cyan-900/20 border border-cyan-500/50' : 'hover:bg-slate-800 border border-transparent'}`}
        >
          <Brain className={`w-4 h-4 mb-1 ${activeView === 'brain' ? 'text-cyan-500' : 'text-slate-500'}`} />
          <span className={`text-[9px] font-bold ${activeView === 'brain' ? 'text-cyan-500' : 'text-slate-600'}`}>BRAIN</span>
        </button>
      </div>

    </div>
  );
};

/**
 * SEO AI STUDIO & MARKETING AGENT
 */
const MarketingAgent = ({ onBack }: { onBack: () => void }) => {
  const [topic, setTopic] = useState("");
  const [status, setStatus] = useState<'idle' | 'analyzing' | 'complete'>('idle');
  const [strategy, setStrategy] = useState<string>("");

  const generateStrategy = async () => {
    if (!topic) return;
    setStatus('analyzing');
    setStrategy("");

    const prompt = `
      Act as the Chief Marketing Officer (CMO) for a high-tech startup.
      
      CONTEXT:
      - We have a "Knowledge Graph" built from Nimbus NotebookLMs.
      - We have an ecosystem of 40+ Replit micro-apps ready to deploy as lead magnets.
      
      TASK:
      Create a "Shock & Awe" Go-To-Market strategy for the following concept: "${topic}".
      
      REQUIREMENTS:
      1. SEO Keywords: High volume, low competition.
      2. Replit Strategy: Suggest 1 specific micro-app we can build on Replit to capture leads for this topic.
      3. Content Plan: 3 headline ideas for viral engagement.
      
      Output Format: HTML (clean semantic tags, no markdown blocks).
    `;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      });
      setStrategy(response.text || "Analysis failed.");
      setStatus('complete');
    } catch (e) {
      console.error(e);
      setStrategy("<p class='text-red-400'>Error connecting to Neural Grid.</p>");
      setStatus('complete');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans p-6 pt-24 overflow-hidden flex flex-col">
       <div className="max-w-7xl mx-auto w-full mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Target className="text-purple-400" /> SEO AI Studio <span className="text-xs bg-purple-900/50 text-purple-400 px-2 py-1 rounded border border-purple-800">MARKETING BRAIN</span>
          </h1>
          <p className="text-slate-400 mt-2">Agentic Marketing • Replit Ecosystem Integration • NotebookLM Powered</p>
        </div>
        <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white transition">
          <XCircle className="w-5 h-5" /> Close Studio
        </button>
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 min-h-0">
        
        {/* Left: Input & Controls */}
        <div className="flex flex-col gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <label className="block text-sm font-bold text-slate-300 mb-2">Target Concept / Product</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. VR Football Coach, AI Roofing CRM..." 
                className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition"
              />
              <button 
                onClick={generateStrategy}
                disabled={status === 'analyzing' || !topic}
                className="bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white px-6 rounded-lg font-bold transition flex items-center gap-2"
              >
                {status === 'analyzing' ? <Loader className="animate-spin" /> : <Zap />}
                Ignite
              </button>
            </div>
            
            {/* Context Indicators */}
            <div className="mt-6 flex flex-wrap gap-2">
              <div className="px-3 py-1 rounded-full bg-blue-900/20 border border-blue-900 text-xs text-blue-400 flex items-center gap-1">
                <Database className="w-3 h-3" /> NotebookLM Connected
              </div>
              <div className="px-3 py-1 rounded-full bg-green-900/20 border border-green-900 text-xs text-green-400 flex items-center gap-1">
                <Code className="w-3 h-3" /> 40+ Replit Apps Indexed
              </div>
              <div className="px-3 py-1 rounded-full bg-cyan-900/20 border border-cyan-900 text-xs text-cyan-400 flex items-center gap-1">
                <Brain className="w-3 h-3" /> Gemini 2.5 Flash
              </div>
            </div>
          </div>

          {/* Visualizer Container */}
          <div className="flex-1 min-h-[400px]">
             <CloudStack />
          </div>
        </div>

        {/* Right: Output */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 overflow-y-auto relative">
           {status === 'idle' && (
             <div className="h-full flex flex-col items-center justify-center text-slate-600 opacity-50">
               <Megaphone className="w-16 h-16 mb-4" />
               <p className="text-lg">Ready to strategize.</p>
               <p className="text-sm">Enter a concept to activate the Marketing Agent.</p>
             </div>
           )}

           {status === 'analyzing' && (
             <div className="h-full flex flex-col items-center justify-center text-purple-400">
               <div className="relative mb-8">
                 <div className="absolute inset-0 bg-purple-500 blur-xl opacity-20 animate-pulse"></div>
                 <Brain className="w-16 h-16 relative z-10 animate-bounce" />
               </div>
               <p className="text-lg font-bold mb-2">Querying NotebookLM...</p>
               <p className="text-sm text-slate-400">Scanning Replit App Ecosystem for synergies...</p>
             </div>
           )}

           {status === 'complete' && (
             <div className="animate-fade-in">
                <div className="prose prose-invert prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: strategy }} />
                
                <div className="mt-8 pt-6 border-t border-slate-800 flex justify-between items-center">
                  <span className="text-xs text-slate-500">Generated by Sovereign Intelligence</span>
                  <button className="text-xs text-purple-400 hover:text-white flex items-center gap-1">
                    <Share2 className="w-3 h-3" /> Export to Docs
                  </button>
                </div>
             </div>
           )}
        </div>

      </div>
    </div>
  );
};

/**
 * SOVEREIGN KERNEL (Existing Code maintained)
 */
const SovereignKernel = ({ onBack }: { onBack: () => void }) => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [activeAgent, setActiveAgent] = useState<string>("IDLE");
  const [finalJson, setFinalJson] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [ragContext, setRagContext] = useState<any>(null);

  const addLog = (msg: string, type: LogEntry['type'] = 'system') => {
    setLogs(prev => [...prev, {
      type,
      content: msg,
      timestamp: new Date().toLocaleTimeString()
    }]);
  };

  const runKernelSimulation = async () => {
    setIsProcessing(true);
    setLogs([]);
    setFinalJson(null);
    setRagContext(null);
    setActiveAgent("KERNEL_ROUTER");

    // 1. Initial Boot
    addLog("NIMBUS IQ AI // OS KERNEL v1.0.0-Alpha", 'system');
    await new Promise(r => setTimeout(r, 600));
    addLog("Initializing Vertex AI Connection...", 'system');
    addLog("Mounting Vector Database (ChromaDB Stub)...", 'system');
    
    // 2. User Intent Simulation
    const prompt = "Analyze this roof in Denver, CO for code compliance.";
    addLog(`USER_QUERY: "${prompt}"`, 'input');
    await new Promise(r => setTimeout(r, 800));

    // 3. Router Logic (Simulating main.py)
    addLog("🧠 CORE_ROUTER: Analyzing intent...", 'router');
    await new Promise(r => setTimeout(r, 800));
    
    // Logic from main.py: if "roof" in prompt -> ROOFING OPS
    addLog("Routing to VERTICAL: ROOFING OPS", 'router');
    setActiveAgent("ROOFING_AGENT");

    // 4. Roofing Pipeline (Simulating workflow.py)
    await new Promise(r => setTimeout(r, 600));
    addLog("📂 Loading Draft Estimate (.ESX JSON Payload)...", 'system');
    
    // 5. RAG Lookup (Simulating rag_brain.py)
    addLog(`📍 Location Detected: ${RAW_DRONE_DATA.zip_code} (Denver, CO)`, 'system');
    addLog("🔍 RAG_BRAIN: Querying Municipal Database...", 'system');
    await new Promise(r => setTimeout(r, 1000));

    // Simulate finding the Denver rule
    const knowledgeHit = ROOFING_KNOWLEDGE_BASE["ice_water_shield_denver"];
    setRagContext(knowledgeHit);
    addLog(`✅ RAG HIT: ${knowledgeHit.source}`, 'system');
    addLog(`   "${knowledgeHit.text}"`, 'system');

    // 6. Gemini Compliance Enforcement
    addLog("🤖 AGENT: Auditing Line Items against Code...", 'system');
    
    // Perform Logic Check (Simulated)
    const originalItems = [...RAW_DRONE_DATA.line_items];
    const missingItem = knowledgeHit.required_item;
    
    // Check if missing
    const hasItem = originalItems.some(i => i.sel === missingItem.sel);
    
    let resultJson = { ...RAW_DRONE_DATA };
    
    if (!hasItem) {
      addLog(`⚠️ COMPLIANCE FAILURE: Missing ${missingItem.desc}`, 'router');
      await new Promise(r => setTimeout(r, 800));
      addLog(`🛠️ ACTION: Injecting ${missingItem.sel} (${missingItem.qty} ${missingItem.unit})`, 'system');
      resultJson.line_items.push(missingItem);
    }

    setFinalJson(resultJson);
    addLog("🏁 PIPELINE COMPLETE. Supplement Generated.", 'system');
    setIsProcessing(false);
    setActiveAgent("IDLE");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-mono p-4 md:p-8 pt-24">
       {/* OS Header */}
       <div className="max-w-7xl mx-auto mb-6 flex justify-between items-center border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Terminal className="text-cyan-400" /> NIMBUS OS KERNEL
          </h1>
          <div className="flex gap-4 mt-2 text-xs text-slate-500 font-mono">
            <span className="flex items-center gap-1"><div className={`w-2 h-2 rounded-full ${activeAgent !== 'IDLE' ? 'bg-green-500 animate-pulse' : 'bg-slate-700'}`}></div> STATUS: {activeAgent}</span>
            <span className="flex items-center gap-1"><Database className="w-3 h-3" /> RAG: CONNECTED</span>
          </div>
        </div>
        <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white transition text-sm">
          <XCircle className="w-4 h-4" /> SHUTDOWN
        </button>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 h-[700px]">
        
        {/* Left: Input / Visuals */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          
          {/* Input Data Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 flex-1">
             <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <FileText className="w-3 h-3" /> Ingest Payload
                </span>
                <span className="text-[10px] bg-slate-800 px-1 rounded text-slate-500">JSON</span>
             </div>
             <pre className="text-[10px] text-blue-300 overflow-hidden">
               {JSON.stringify(RAW_DRONE_DATA, null, 2)}
             </pre>
          </div>

          {/* RAG Context Card */}
          <div className={`bg-slate-900 border border-slate-800 rounded-lg p-4 flex-1 transition-all duration-500 ${ragContext ? 'border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.1)]' : 'opacity-50'}`}>
             <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <Database className="w-3 h-3" /> RAG Context
                </span>
                {ragContext && <span className="text-[10px] bg-cyan-900/30 text-cyan-400 px-2 py-0.5 rounded border border-cyan-800">MATCH FOUND</span>}
             </div>
             {ragContext ? (
               <div className="text-xs">
                 <div className="font-bold text-white mb-1">{ragContext.source}</div>
                 <div className="text-slate-400 italic mb-2">"{ragContext.text}"</div>
                 <div className="text-green-400 font-mono text-[10px] border-t border-slate-800 pt-2 mt-2">
                   REQUIRED: {ragContext.required_item.desc}
                 </div>
               </div>
             ) : (
               <div className="text-xs text-slate-600 text-center py-8">
                 Waiting for Vector Search...
               </div>
             )}
          </div>

          <button 
            onClick={runKernelSimulation}
            disabled={isProcessing}
            className="bg-cyan-600 hover:bg-cyan-500 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {isProcessing ? <Loader className="animate-spin w-4 h-4" /> : <Zap className="w-4 h-4" />}
            EXECUTE KERNEL
          </button>
        </div>

        {/* Center: Terminal Output */}
        <div className="lg:col-span-2 bg-slate-950 border border-slate-800 rounded-lg overflow-hidden flex flex-col relative font-mono text-sm shadow-2xl">
           <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center gap-2">
             <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
             <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
             <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
             <span className="ml-2 text-xs text-slate-500">user@nimbus-iq:~/src/main.py</span>
           </div>
           
           <div className="flex-1 p-4 overflow-y-auto space-y-2 font-mono scrollbar-hide">
             {logs.length === 0 && (
               <div className="text-slate-600 text-center mt-20">
                 <Terminal className="w-12 h-12 mx-auto mb-4 opacity-20" />
                 <p>System Ready. Waiting for Command.</p>
               </div>
             )}
             {logs.map((log, i) => (
               <div key={i} className={`animate-fade-in flex gap-3 ${
                 log.type === 'input' ? 'text-white font-bold' :
                 log.type === 'router' ? 'text-purple-400' :
                 log.type === 'system' ? 'text-cyan-300' : 'text-slate-400'
               }`}>
                 <span className="text-slate-600 shrink-0">[{log.timestamp}]</span>
                 <span>
                   {log.type === 'input' && <span className="text-green-500 mr-2">➜</span>}
                   {log.content}
                 </span>
               </div>
             ))}
             {/* Final JSON Output */}
             {finalJson && (
                <div className="mt-4 border-t border-dashed border-slate-700 pt-4 animate-fade-in-up">
                  <div className="text-green-400 font-bold mb-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" /> OUTPUT GENERATED: supplement_v1.esx
                  </div>
                  <div className="bg-slate-900/50 p-4 rounded border border-slate-800 text-xs text-slate-300 overflow-x-auto">
                    {JSON.stringify(finalJson, null, 2)}
                  </div>
                </div>
             )}
           </div>
        </div>

      </div>
    </div>
  );
};

/**
 * NIMBUS ABOUT / INVESTOR PAGE
 */
const NimbusAbout = ({ onBack, onLaunchDemo }: { onBack: () => void, onLaunchDemo: () => void }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500 selection:text-slate-900 overflow-x-hidden">
      
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={onBack}>
            <Cpu className="text-cyan-400 w-6 h-6" />
            <span className="font-bold text-xl tracking-tighter">NIMBUS <span className="text-cyan-400">IQ</span></span>
          </div>
          <button 
            onClick={onBack}
            className="text-sm font-medium text-slate-400 hover:text-cyan-400 transition flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Platform
          </button>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        
        {/* Hero */}
        <div className="text-center mb-24 animate-fade-in-up">
           {/* Google Badge */}
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white text-slate-900 mb-8 shadow-[0_0_30px_rgba(255,255,255,0.1)] border border-slate-200">
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="h-5" />
            <span className="h-4 w-px bg-slate-300 mx-1"></span>
            <span className="font-bold tracking-tight text-sm text-slate-600">for Startups Cloud Program</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
            Sovereign Intelligence <br/> for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Physical World</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Nimbus IQ AI is the operating system for the $156B legacy infrastructure market. We digitize physical workflows in Roofing, Auto, and Logistics using Sovereign Agents powered by Gemini 3.
          </p>
          <div className="flex justify-center gap-4 flex-col sm:flex-row">
             <button onClick={onLaunchDemo} className="group bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-3 rounded-lg font-bold transition shadow-[0_0_20px_rgba(8,145,178,0.4)] flex items-center justify-center gap-2">
               <Shield className="w-4 h-4" /> Launch Compliance Engine Demo
             </button>
             <button onClick={() => window.location.href='mailto:investors@nimbusiq.ai'} className="border border-slate-700 hover:border-white text-slate-300 hover:text-white px-8 py-3 rounded-lg font-bold transition">
               Request Pitch Deck
             </button>
          </div>
           <div className="mt-8 flex justify-center items-center gap-2 text-xs text-slate-500 font-mono uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Current Stage: Seed / Post-Product
          </div>
        </div>

        {/* The Problem / Metrics */}
        <div className="grid md:grid-cols-3 gap-8 mb-32">
          <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 relative overflow-hidden group hover:border-red-500/30 transition">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition"><AlertTriangle className="w-24 h-24 text-red-500" /></div>
            <h3 className="text-red-400 text-sm font-bold uppercase tracking-wider mb-2">The Leak</h3>
            <div className="text-5xl font-bold text-white mb-2">$3.2B</div>
            <p className="text-slate-400">Annual loss in the roofing insurance sector due to manual estimation errors, missed code items, and fraud.</p>
          </div>
          <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 relative overflow-hidden group hover:border-cyan-500/30 transition">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition"><Zap className="w-24 h-24 text-cyan-500" /></div>
            <h3 className="text-cyan-400 text-sm font-bold uppercase tracking-wider mb-2">The Fix</h3>
            <div className="text-5xl font-bold text-white mb-2">95%</div>
            <p className="text-slate-400">Automation rate achieved in our Auto-Log pilot using Gemini Vision Multi-modal agents to transcribe handwritten manifests.</p>
          </div>
          <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 relative overflow-hidden group hover:border-purple-500/30 transition">
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition"><Globe className="w-24 h-24 text-purple-500" /></div>
            <h3 className="text-purple-400 text-sm font-bold uppercase tracking-wider mb-2">The Prize</h3>
            <div className="text-5xl font-bold text-white mb-2">$156B</div>
            <p className="text-slate-400">Total Addressable Market (TAM) for AI digitization in Construction, Auto, and Logistics.</p>
          </div>
        </div>

        {/* MVP Solution Steps */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">The MVP Architecture</h2>
            <p className="text-slate-400">A closed-loop system for automated claim defense.</p>
          </div>
          
          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-slate-800 via-cyan-900 to-slate-800 -z-10"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Step 1 */}
              <div className="bg-slate-950 border border-slate-800 p-6 rounded-xl relative hover:border-cyan-500/50 transition group">
                <div className="w-12 h-12 bg-slate-900 rounded-full border border-slate-700 flex items-center justify-center mb-4 group-hover:border-cyan-500 transition shadow-[0_0_15px_rgba(0,0,0,0.5)] z-10 mx-auto md:mx-0">
                  <Camera className="w-6 h-6 text-slate-300 group-hover:text-cyan-400" />
                </div>
                <div className="absolute top-0 right-0 p-4 text-6xl font-bold text-slate-800/20 -z-10">01</div>
                <h3 className="text-lg font-bold text-white mb-2">Capture</h3>
                <p className="text-sm text-slate-400">Drone or mobile ingest of physical site conditions (Images/LiDAR).</p>
              </div>

              {/* Step 2 */}
              <div className="bg-slate-950 border border-slate-800 p-6 rounded-xl relative hover:border-cyan-500/50 transition group">
                 <div className="w-12 h-12 bg-slate-900 rounded-full border border-slate-700 flex items-center justify-center mb-4 group-hover:border-cyan-500 transition shadow-[0_0_15px_rgba(0,0,0,0.5)] z-10 mx-auto md:mx-0">
                  <Cpu className="w-6 h-6 text-slate-300 group-hover:text-cyan-400" />
                </div>
                <div className="absolute top-0 right-0 p-4 text-6xl font-bold text-slate-800/20 -z-10">02</div>
                <h3 className="text-lg font-bold text-white mb-2">Analyze</h3>
                <p className="text-sm text-slate-400">Gemini Vision identifies damage, materials, and pitch from raw pixels.</p>
              </div>

              {/* Step 3 */}
              <div className="bg-slate-950 border border-slate-800 p-6 rounded-xl relative hover:border-cyan-500/50 transition group">
                 <div className="w-12 h-12 bg-slate-900 rounded-full border border-slate-700 flex items-center justify-center mb-4 group-hover:border-cyan-500 transition shadow-[0_0_15px_rgba(0,0,0,0.5)] z-10 mx-auto md:mx-0">
                  <Scale className="w-6 h-6 text-slate-300 group-hover:text-cyan-400" />
                </div>
                <div className="absolute top-0 right-0 p-4 text-6xl font-bold text-slate-800/20 -z-10">03</div>
                <h3 className="text-lg font-bold text-white mb-2">Audit</h3>
                <p className="text-sm text-slate-400"><strong>The Compliance Loop.</strong> Gemini 3 queries municipal codes to enforce line-item upgrades.</p>
              </div>

              {/* Step 4 */}
              <div className="bg-slate-950 border border-slate-800 p-6 rounded-xl relative hover:border-cyan-500/50 transition group">
                 <div className="w-12 h-12 bg-slate-900 rounded-full border border-slate-700 flex items-center justify-center mb-4 group-hover:border-cyan-500 transition shadow-[0_0_15px_rgba(0,0,0,0.5)] z-10 mx-auto md:mx-0">
                  <FileText className="w-6 h-6 text-slate-300 group-hover:text-cyan-400" />
                </div>
                <div className="absolute top-0 right-0 p-4 text-6xl font-bold text-slate-800/20 -z-10">04</div>
                <h3 className="text-lg font-bold text-white mb-2">Defend</h3>
                <p className="text-sm text-slate-400">Generates defensible .ESX files with statute citations for instant carrier payout.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Suite */}
        <div className="mb-32">
          <h2 className="text-3xl font-bold text-white mb-12 flex items-center gap-3">
            <Layers className="w-8 h-8 text-cyan-400" /> The Sovereign Stack
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 transition cursor-default">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-green-500/10 text-green-400"><Layers className="w-6 h-6" /></div>
                <div>
                   <h3 className="font-bold text-xl text-white">RoofAI Pro</h3>
                   <span className="text-xs text-green-400 font-mono border border-green-900 bg-green-900/20 px-2 py-0.5 rounded">LIVE DEPLOYMENT</span>
                </div>
              </div>
              <p className="text-slate-400 mb-4">Autonomous storm forensics & CRM. Ingests drone footage, outputs Xactimate .ESX files using Gemini Vision. Defends claims with municipal code citations.</p>
            </div>

            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/50 transition cursor-default">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400"><Cpu className="w-6 h-6" /></div>
                <div>
                   <h3 className="font-bold text-xl text-white">Chi AI Gemini 3</h3>
                   <span className="text-xs text-purple-400 font-mono border border-purple-900 bg-purple-900/20 px-2 py-0.5 rounded">BETA</span>
                </div>
              </div>
              <p className="text-slate-400 mb-4">R.A.G. Knowledge Base Core. The central nervous system that learns municipal codes (IBC/IRC) and compliance laws for every zip code in the US.</p>
            </div>

            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 hover:border-blue-500/50 transition cursor-default">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400"><Code className="w-6 h-6" /></div>
                <div>
                   <h3 className="font-bold text-xl text-white">Auto-Log Ingest</h3>
                   <span className="text-xs text-blue-400 font-mono border border-blue-900 bg-blue-900/20 px-2 py-0.5 rounded">ALPHA</span>
                </div>
              </div>
              <p className="text-slate-400 mb-4">Paper-to-SQL Vision Agent. Instantly digitizes handwritten logs, invoices, and legacy manifests for logistics fleets.</p>
            </div>

            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 transition cursor-default">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400"><Shield className="w-6 h-6" /></div>
                <div>
                   <h3 className="font-bold text-xl text-white">Sovereign Command</h3>
                   <span className="text-xs text-cyan-400 font-mono border border-cyan-900 bg-cyan-900/20 px-2 py-0.5 rounded">ENTERPRISE</span>
                </div>
              </div>
              <p className="text-slate-400 mb-4">Enterprise Dashboard 3D. A God-mode view of all physical assets and AI agents in real-time. Built for owners to monitor fleet health and claim velocity.</p>
            </div>
            
            {/* NEW: SEO MARKETING BRAIN */}
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/50 transition cursor-default">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400"><Brain className="w-6 h-6" /></div>
                <div>
                   <h3 className="font-bold text-xl text-white">SEO Marketing Brain</h3>
                   <span className="text-xs text-purple-400 font-mono border border-purple-900 bg-purple-900/20 px-2 py-0.5 rounded">NEW</span>
                </div>
              </div>
              <p className="text-slate-400 mb-4">Agentic Marketing Studio. Connects to <strong>NotebookLM</strong> and your <strong>40+ Replit Micro-Apps</strong> to generate viral GTM strategies instantly.</p>
            </div>

          </div>
        </div>

        {/* Why Google / Team */}
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
             <h2 className="text-2xl font-bold text-white mb-6">Built on Google Vertex AI</h2>
             <div className="prose prose-invert text-slate-400">
               <p className="mb-4">
                 Nimbus IQ is built natively on <strong>Google Cloud Platform</strong>. We leverage the 2M context window of Gemini 1.5 Pro and the multi-modal reasoning of Gemini 3 to process hours of video footage and thousands of pages of building codes simultaneously.
               </p>
               <ul className="space-y-4 list-none pl-0 mt-6">
                 <li className="flex items-center gap-3"><div className="bg-cyan-900/30 p-2 rounded-full"><CheckCircle className="w-4 h-4 text-cyan-400" /></div> Zero-latency scaling with Cloud Run</li>
                 <li className="flex items-center gap-3"><div className="bg-cyan-900/30 p-2 rounded-full"><CheckCircle className="w-4 h-4 text-cyan-400" /></div> Enterprise-grade security via IAM</li>
                 <li className="flex items-center gap-3"><div className="bg-cyan-900/30 p-2 rounded-full"><CheckCircle className="w-4 h-4 text-cyan-400" /></div> Direct access to Live API for voice agents</li>
               </ul>
             </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Leadership</h2>
            <div className="space-y-6">
              
              {/* Dustin Moore */}
              <div className="flex items-start gap-4 p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/30 transition shadow-lg">
                <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 overflow-hidden border-2 border-slate-700">
                   {/* Placeholder for Headshot */}
                   <Users className="w-8 h-8" /> 
                </div>
                <div>
                  <h4 className="font-bold text-xl text-white">Dustin Moore</h4>
                  <p className="text-sm text-cyan-400 font-bold mb-2">Founder & CEO</p>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Full-stack Developer with unique domain expertise.
                    <br/>• 10 years as Roofing Industry Owner
                    <br/>• 9 years in Finance
                    <br/>• Building "The tools I wish I had."
                  </p>
                  <div className="flex gap-2 mt-3">
                    <span className="text-[10px] uppercase font-bold text-slate-500 bg-slate-950 px-2 py-1 rounded">Visionary</span>
                    <span className="text-[10px] uppercase font-bold text-slate-500 bg-slate-950 px-2 py-1 rounded">Operator</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="flex items-center gap-2">
            <Cpu className="text-cyan-400 w-5 h-5" />
            <span className="font-bold tracking-tighter text-slate-300">NIMBUS <span className="text-cyan-400">IQ</span></span>
          </div>
          <div className="text-slate-500 text-sm">
            © 2024 Nimbus IQ AI, LLC. All Rights Reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}

const App = () => {
  const [view, setView] = useState<ViewState>('home');

  if (view === 'about') {
    return <NimbusAbout onBack={() => setView('home')} onLaunchDemo={() => setView('compliance-demo')} />;
  }

  if (view === 'compliance-demo') {
    return <SovereignKernel onBack={() => setView('about')} />;
  }

  if (view === 'marketing-agent') {
    return <MarketingAgent onBack={() => setView('home')} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-mono overflow-hidden flex flex-col selection:bg-cyan-500 selection:text-slate-900">
      
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_rgba(6,182,212,0.1),transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_50%_50%,_rgba(30,58,138,0.1),transparent_50%)]"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col">
        
        {/* Header */}
        <header className="p-6 flex justify-between items-center border-b border-slate-800/50 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <Cpu className="text-cyan-400 w-6 h-6 animate-pulse-slow" />
            <span className="font-bold text-xl tracking-tighter text-white">NIMBUS <span className="text-cyan-400">IQ</span></span>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-4 text-xs font-bold tracking-widest text-slate-500">
               <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div> SYSTEMS ONLINE</span>
               <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></div> GEMINI CONNECTED</span>
            </div>
            <button 
              onClick={() => setView('about')}
              className="px-4 py-2 text-sm font-bold text-slate-300 border border-slate-700 rounded hover:bg-slate-800 hover:text-white transition flex items-center gap-2"
            >
              INVESTOR PORTAL <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center mt-12 md:mt-0">
          <div className="mb-8 relative group cursor-pointer" onClick={() => setView('about')}>
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative bg-slate-900 ring-1 ring-slate-800 rounded-full p-4">
              <Layers className="w-12 h-12 text-cyan-400" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-7xl font-bold tracking-tighter text-white mb-6 max-w-4xl">
            THE OPERATING SYSTEM <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">FOR THE PHYSICAL WORLD</span>
          </h1>
          
          <p className="text-lg text-slate-400 max-w-xl mb-12 leading-relaxed">
            Sovereign agents that digitize legacy infrastructure. 
            Automating the $156B construction, logistics, and insurance markets.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
            <button 
               onClick={() => setView('compliance-demo')}
               className="group relative px-6 py-4 bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-lg transition-all hover:bg-slate-800 flex items-center justify-between"
            >
               <div className="flex items-center gap-4">
                 <Shield className="text-cyan-400 w-6 h-6" />
                 <div className="text-left">
                   <div className="text-white font-bold text-sm">RoofAI Pro</div>
                   <div className="text-slate-500 text-xs">Compliance Engine Demo</div>
                 </div>
               </div>
               <ArrowRight className="text-slate-600 group-hover:text-cyan-400 transition w-4 h-4" />
            </button>

            <button className="group relative px-6 py-4 bg-slate-900 border border-slate-800 hover:border-purple-500/50 rounded-lg transition-all hover:bg-slate-800 flex items-center justify-between cursor-not-allowed opacity-50">
               <div className="flex items-center gap-4">
                 <Truck className="text-purple-400 w-6 h-6" />
                 <div className="text-left">
                   <div className="text-white font-bold text-sm">Auto-Log</div>
                   <div className="text-slate-500 text-xs">Vision Agent (Coming Soon)</div>
                 </div>
               </div>
               <Lock className="text-slate-600 w-4 h-4" />
            </button>

            {/* NEW BUTTON FOR SEO AGENT */}
            <button 
              onClick={() => setView('marketing-agent')}
              className="group relative px-6 py-4 bg-slate-900 border border-slate-800 hover:border-purple-500/50 rounded-lg transition-all hover:bg-slate-800 flex items-center justify-between"
            >
               <div className="flex items-center gap-4">
                 <Target className="text-purple-400 w-6 h-6" />
                 <div className="text-left">
                   <div className="text-white font-bold text-sm">SEO AI Studio</div>
                   <div className="text-slate-500 text-xs">Marketing Agentic Brain</div>
                 </div>
               </div>
               <ArrowRight className="text-slate-600 group-hover:text-purple-400 transition w-4 h-4" />
            </button>

          </div>
        </main>

        {/* Status Bar */}
        <div className="border-t border-slate-800/50 p-4 bg-slate-950/50 backdrop-blur text-xs font-mono text-slate-500 flex justify-between items-center">
           <div className="flex gap-4">
             <span>LATENCY: 14ms</span>
             <span>REGION: US-CENTRAL1</span>
             <span>MODEL: GEMINI-2.5-FLASH</span>
           </div>
           <div>
             V.1.0.4-ALPHA
           </div>
        </div>

      </div>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
