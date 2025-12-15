import React, { useState, useRef, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { GoogleGenAI } from "@google/genai";
import { 
  Brain, 
  Cloud, 
  Cpu, 
  ArrowRight, 
  MessageSquare, 
  Send, 
  Database, 
  ShieldCheck, 
  Menu, 
  X,
  Sparkles,
  Bot,
  Trash2
} from "lucide-react";

// --- Configuration ---
const SYSTEM_INSTRUCTION = `Role & Identity:
You are the Chief Technology Officer (CTO) and Principal Architect of NIMBUS IQ AI, LLC. You are the "Master Orchestrator" of the Enterprise AI Operating System.
Your coding style is production-ready, modular, and security-first (Sec/Ops).

The Mission:
You manage a centralized "AI OS" that routes tasks to specific verticals:
1. Roofing & Restoration: You can parse .ESX (Xactimate) files, analyze storm data, and handle insurance supplements.
2. HealthTech (MedGemma): You operate the TCM face-scanning diet agent using MedLM.
3. The "Builder" Engine: You have a recursive development environment where users can request new startups (e.g., "Build a VR Football Coach app").
4. Hardware Integrations: You control Smart home, HVAC AR lenses, and 911 emergency response logic.

Behavior:
- Act as the "Central Router". 
- If the user asks about roofing, assume the persona of the "Nimbus Roofing Specialist".
- If the user asks about health/diet, assume the persona of "MedGemma Interface".
- If the user wants to build software, assume the persona of the "Builder Engine".
- For general queries, remain the CTO/Architect.
- Keep responses concise (under 100 words) unless asked for details.`;

// --- AI Service ---
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 glass border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-tr from-nimbus-500 to-blue-600 p-2 rounded-lg">
              <Cloud className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">Nimbus IQ <span className="text-nimbus-400">AI</span></span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#services" className="hover:text-nimbus-400 transition-colors px-3 py-2 rounded-md text-sm font-medium">Solutions</a>
              <a href="#demo" className="hover:text-nimbus-400 transition-colors px-3 py-2 rounded-md text-sm font-medium">AI Demo</a>
              <a href="#about" className="hover:text-nimbus-400 transition-colors px-3 py-2 rounded-md text-sm font-medium">About</a>
              <a href="#contact" className="bg-nimbus-500 hover:bg-nimbus-400 text-slate-900 px-4 py-2 rounded-full text-sm font-bold transition-all transform hover:scale-105">
                Contact Us
              </a>
            </div>
          </div>
          
          <div className="-mr-2 flex md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-300 hover:text-white p-2">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden glass border-b border-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#services" className="text-slate-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Solutions</a>
            <a href="#demo" className="text-slate-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">AI Demo</a>
            <a href="#contact" className="text-nimbus-400 block px-3 py-2 rounded-md text-base font-medium">Contact Us</a>
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 overflow-hidden bg-nimbus-900">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 mb-8 backdrop-blur-sm animate-fade-in-up">
          <Sparkles className="h-4 w-4 text-nimbus-400" />
          <span className="text-sm text-slate-300">Next Generation Intelligence</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-8 leading-tight">
          Elevate Business Logic to the <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-nimbus-400 to-blue-600">
            Intelligent Cloud
          </span>
        </h1>
        
        <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-400 mb-10 leading-relaxed">
          Nimbus IQ AI fuses scalable cloud infrastructure with cutting-edge generative models to transform how your enterprise thinks, learns, and grows.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href="#demo" className="flex items-center justify-center gap-2 bg-gradient-to-r from-nimbus-500 to-blue-600 hover:from-nimbus-400 hover:to-blue-500 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg shadow-nimbus-500/20 hover:shadow-nimbus-500/40 transform hover:-translate-y-0.5">
            <Bot className="h-5 w-5" />
            Talk to Nimbus
          </a>
          <a href="#services" className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all border border-slate-700 hover:border-slate-600">
            Explore Solutions
          </a>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 w-full -translate-x-1/2 h-full z-0 pointer-events-none opacity-30">
        <div className="absolute top-20 left-20 w-72 h-72 bg-nimbus-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-slow" style={{animationDelay: '1s'}}></div>
      </div>
    </div>
  );
};

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ServiceCard = ({ icon, title, description }: ServiceCardProps) => (
  <div className="p-8 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-nimbus-500/50 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-nimbus-500/10 group h-full">
    <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner shadow-black/50">
      <div className="text-nimbus-400">
        {icon}
      </div>
    </div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-slate-400 leading-relaxed">{description}</p>
    <div className="mt-6 flex items-center text-nimbus-400 text-sm font-medium cursor-pointer group-hover:gap-2 transition-all">
      Learn more <ArrowRight className="h-4 w-4 ml-1" />
    </div>
  </div>
);

const Services = () => {
  return (
    <div id="services" className="py-24 bg-slate-950 relative border-t border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Core Competencies</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            We build the infrastructure of tomorrow. From raw data to actionable intelligence, our suite of services covers the entire AI lifecycle.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ServiceCard 
            icon={<Brain className="h-6 w-6" />}
            title="Generative AI Integration"
            description="Deploy custom LLMs tailored to your enterprise data. We handle fine-tuning, RAG pipelines, and secure model deployment."
          />
          <ServiceCard 
            icon={<Database className="h-6 w-6" />}
            title="Predictive Analytics"
            description="Turn historical data into future insights. Our algorithms identify trends, forecast demand, and optimize operational efficiency."
          />
          <ServiceCard 
            icon={<Cpu className="h-6 w-6" />}
            title="Cloud Architecture"
            description="Scalable, secure, and resilient cloud foundations designed for high-compute AI workloads. AWS, GCP, and Azure experts."
          />
        </div>
      </div>
    </div>
  );
};

interface Message {
  role: 'user' | 'model';
  text: string;
}

const ChatDemo = () => {
  const [input, setInput] = useState("");
  const INITIAL_MESSAGE: Message = { role: 'model', text: "Systems Online. I am the Nimbus IQ Master Architect. Ready to route your request to Roofing, MedGemma, or the Builder Engine." };
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Keep chat instance in ref to maintain history
  const chatRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleClear = () => {
    setMessages([INITIAL_MESSAGE]);
    chatRef.current = null; // Reset chat history in the SDK instance by forcing recreation
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      if (!chatRef.current) {
        chatRef.current = ai.chats.create({
          model: 'gemini-2.5-flash',
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
          }
        });
      }

      const result = await chatRef.current.sendMessage({ message: userMsg });
      const text = result.text;
      
      setMessages(prev => [...prev, { role: 'model', text }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "I apologize, but I am currently experiencing high network latency. Please try again in a moment." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="demo" className="py-24 bg-slate-900 border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-12 items-center">
        
        <div className="md:w-1/2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-nimbus-500/10 text-nimbus-400 text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-nimbus-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-nimbus-500"></span>
            </span>
            OS Kernel Active
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Experience Nimbus Intelligence</h2>
          <p className="text-slate-400 text-lg mb-8">
            Interact with the Master Orchestrator. Route requests to specialized agents for Roofing, HealthTech, or Software Generation.
          </p>
          
          <ul className="space-y-4 text-slate-300">
            <li className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-nimbus-400" />
              <span>Sec/Ops Security Protocols</span>
            </li>
            <li className="flex items-center gap-3">
              <Cloud className="h-5 w-5 text-nimbus-400" />
              <span>Multi-Vertical Agent Routing</span>
            </li>
            <li className="flex items-center gap-3">
              <Brain className="h-5 w-5 text-nimbus-400" />
              <span>Builder Engine (Replit-like)</span>
            </li>
          </ul>
        </div>

        <div className="md:w-1/2 w-full">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[500px] ring-1 ring-slate-800">
            {/* Chat Header */}
            <div className="bg-slate-900 p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-nimbus-500 to-blue-600 flex items-center justify-center shadow-lg shadow-nimbus-500/20">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="font-bold text-sm text-white">Nimbus Architect</div>
                  <div className="text-xs text-nimbus-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-nimbus-400"></span>
                    Online v1.0.0-Alpha
                  </div>
                </div>
              </div>
              <button 
                onClick={handleClear}
                className="text-slate-500 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-slate-800/50"
                title="Clear Conversation"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide bg-slate-950/50">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-gradient-to-r from-blue-600 to-nimbus-500 text-white rounded-br-none' 
                      : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-slate-800 border border-slate-700 rounded-2xl rounded-bl-none px-4 py-3">
                    <div className="flex gap-1.5">
                      <div className="w-1.5 h-1.5 bg-nimbus-400 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-nimbus-400 rounded-full animate-bounce" style={{animationDelay: '0.15s'}}></div>
                      <div className="w-1.5 h-1.5 bg-nimbus-400 rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-slate-900 border-t border-slate-800">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Command the OS (e.g. 'Build a startup', 'Check roof')"
                  className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl pl-4 pr-12 py-3 focus:outline-none focus:border-nimbus-500 transition-all placeholder:text-slate-600 focus:ring-1 focus:ring-nimbus-500"
                />
                <button 
                  onClick={handleSend}
                  disabled={loading || !input.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-nimbus-500 hover:bg-nimbus-400 text-slate-900 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-500"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

const Footer = () => (
  <footer className="bg-slate-950 py-12 border-t border-slate-800 text-slate-400 text-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
      <div className="col-span-1 md:col-span-2">
        <div className="flex items-center gap-2 mb-4">
          <Cloud className="h-6 w-6 text-nimbus-500" />
          <span className="font-bold text-xl text-white">Nimbus IQ <span className="text-nimbus-400">AI</span></span>
        </div>
        <p className="max-w-xs mb-4 text-slate-500">
          Pioneering the intersection of cloud infrastructure and artificial intelligence to build smarter enterprises.
        </p>
        <div className="flex gap-4">
          {/* Social placeholders */}
          <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center hover:bg-slate-700 cursor-pointer transition-colors text-slate-400 hover:text-white">X</div>
          <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center hover:bg-slate-700 cursor-pointer transition-colors text-slate-400 hover:text-white">In</div>
        </div>
      </div>
      
      <div>
        <h4 className="font-bold text-white mb-4">Solutions</h4>
        <ul className="space-y-2">
          <li><a href="#" className="hover:text-nimbus-400 transition-colors">Generative AI</a></li>
          <li><a href="#" className="hover:text-nimbus-400 transition-colors">Cloud Migration</a></li>
          <li><a href="#" className="hover:text-nimbus-400 transition-colors">Data Analytics</a></li>
          <li><a href="#" className="hover:text-nimbus-400 transition-colors">Security & Compliance</a></li>
        </ul>
      </div>

      <div id="contact">
        <h4 className="font-bold text-white mb-4">Contact</h4>
        <ul className="space-y-2">
          <li>hello@nimbusiq.ai</li>
          <li>+1 (555) 123-4567</li>
          <li>100 Cloud Way, Tech City</li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-900 text-center text-slate-600">
      <p>&copy; {new Date().getFullYear()} Nimbus IQ AI, LLC. All rights reserved.</p>
    </div>
  </footer>
);

const NimbusApp = () => {
  return (
    <div className="min-h-screen bg-nimbus-900 text-slate-200 font-sans">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <ChatDemo />
      </main>
      <Footer />
    </div>
  );
};

const root = createRoot(document.getElementById("root")!);
root.render(<NimbusApp />);