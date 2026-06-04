import React, { useState, useEffect } from 'react';
import { Shield, ShoppingBag, Radio, Navigation, Sliders, Smartphone, Layers, ArrowRight, Activity, Monitor, Zap, CheckCircle, Cpu, Wifi, Bluetooth } from 'lucide-react';

// ==========================================
// SEHNSORA BRAND VECTOR LOGO
// ==========================================
const SehnsoraLogo = ({ size = 24 }) => {
  const brandPurple = "#e2ddec";
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M70.0 32.0 H34.0 V48.0 H66.0 V65.0 H30.0" stroke={brandPurple} strokeWidth="11" strokeLinecap="square" strokeLinejoin="miter"/>
      <rect x="71.0" y="15.0" width="11.0" height="11.0" fill={brandPurple}/>
    </svg>
  );
}

export default function SehnsoraLandingPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('ambient');
  const [mockTime, setMockTime] = useState('12:00:00');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setMockTime(`${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}:${now.getSeconds().toString().padStart(2,'0')}`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8FD] text-[#2C2543] font-sans antialiased selection:bg-[#E6E0FA] selection:text-[#4A308B]">
      
      {/* Dynamic System Status Ticker */}
      <div className="bg-gradient-to-r from-[#4A308B] to-[#1E254C] text-white text-center py-2.5 px-4 text-xs md:text-sm font-medium tracking-wide shadow-sm flex items-center justify-center gap-2">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
        </span>
        <span><strong>Prototype Status:</strong> Dual-device hardware interaction loop verified locally on device.</span>
      </div>

      {/* Luxury Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#FAF8FD]/80 border-b border-[#E6E0FA]/50 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer">
            {/* <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shadow-md border border-[#E6E0FA] group-hover:scale-105 transition-transform"> */}
              {/* <SehnsoraLogo size={36} /> */}
            {/* </div> */}
            <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-[#1E254C] to-[#5A469D] bg-clip-text text-transparent">Sehnsora</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#534F63]">
            <a href="#ecosystem" className="hover:text-[#4A308B] transition-colors">Product Ecosystem</a>
            <a href="#blueprint" className="hover:text-[#4A308B] transition-colors">System Architecture</a>
            <a href="#sandbox" className="hover:text-[#4A308B] transition-colors">Internal Sandbox</a>
          </nav>
          <a href="#waitlist" className="bg-[#1E254C] hover:bg-[#2c3770] text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md">
            Request Tester Access
          </a>
        </div>
      </header>

      {/* Cinematic Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 pt-16 pb-32 text-center space-y-8 overflow-hidden">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-[#E6E0FA] to-[#EADBFC] rounded-full blur-[140px] -z-10 opacity-60"></div>
        
        <div className="inline-flex items-center gap-2 bg-white border border-[#E6E0FA] px-4 py-2 rounded-full shadow-sm text-xs font-bold text-[#5A469D] tracking-wide uppercase">
          <Cpu className="w-3.5 h-3.5 text-[#7B61FF]" />
          Cyber Valley AI Incubator Build
        </div>

        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-[#1E254C] max-w-5xl mx-auto leading-[1.1]">
          Intelligent vision and haptic guidance, unified.
        </h1>
        
        <p className="text-lg md:text-xl text-[#534F63] max-w-3xl mx-auto font-normal leading-relaxed">
          Sehnsora is a multi-device assistive framework. By combining an audio-free directional haptic band with context-aware vision glasses, we turn complex navigation challenges into a single, comprehensive sensory flow.
        </p>

        <div className="pt-4 max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 bg-white border border-[#DCD3F5] p-2 rounded-2xl shadow-lg focus-within:ring-2 focus-within:ring-[#7B61FF] transition-all">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-3 bg-transparent text-sm focus:outline-none flex-grow text-[#2C2543] placeholder-[#8A85A3]"
              required
            />
            <button type="submit" className="bg-[#4A308B] hover:bg-[#39246D] text-white px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-md group">
              Join Testing Loop
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
          {submitted && (
            <p className="text-sm text-emerald-600 font-semibold pt-3 flex items-center justify-center gap-1">
              <CheckCircle className="w-4 h-4" /> System registered. We will email you test updates.
            </p>
          )}
        </div>
      </section>

      {/* PRODUCT ECOSYSTEM SECTION */}
      <section id="ecosystem" className="max-w-7xl mx-auto px-6 py-12 space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#1E254C]">The Connected Ecosystem</h2>
          <p className="text-[#534F63] text-sm md:text-base">
            Sehnsora divides physical tasks across two distinct, complementary hardware devices operating together in real time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* COMPONENT 1: HAPTIC WRISTBAND */}
          <div className="bg-white border border-[#E6E0FA] rounded-[32px] p-8 md:p-10 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-1.5 bg-[#FAF8FD] text-[#4A308B] border border-[#E6E0FA] font-bold px-3 py-1.5 rounded-xl text-xs tracking-wider uppercase">
                <Sliders className="w-3.5 h-3.5" /> Component 01 // Orientation
              </div>
              <h3 className="text-3xl font-extrabold text-[#1E254C]">The Haptic Wristband</h3>
              <p className="text-[#534F63] text-sm md:text-base leading-relaxed">
                Designed for low-distraction environmental orientation. Instead of cluttering spatial awareness with constant vocal interruptions, the band uses structured vibrational grids to seamlessly pass direct path boundaries and navigation warnings.
              </p>
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 text-sm text-[#534F63]">
                  <div className="mt-1 w-1.5 h-1.5 rounded-full bg-[#4A308B]" />
                  <span>Audio-free, ambient tactile alert parameters</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-[#534F63]">
                  <div className="mt-1 w-1.5 h-1.5 rounded-full bg-[#4A308B]" />
                  <span>Coordinate verification via continuous tracking nodes</span>
                </div>
              </div>
            </div>
            <div className="pt-8 mt-8 border-t border-[#FAF8FD] flex items-center justify-between text-xs font-bold text-[#4A308B] tracking-widest uppercase">
              <span>Primary Loop: 30s Safety Scan</span>
              <span>Target: Path Orientation</span>
            </div>
          </div>

          {/* COMPONENT 2: CAMERA SMART GLASSES */}
          <div className="bg-white border border-[#E6E0FA] rounded-[32px] p-8 md:p-10 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-1.5 bg-[#1E254C] text-white font-bold px-3 py-1.5 rounded-xl text-xs tracking-wider uppercase">
                <SehnsoraLogo size={14} /> Component 02 // Semantic Vision
              </div>
              <h3 className="text-3xl font-extrabold text-[#1E254C]">Camera Smart Glasses</h3>
              <p className="text-[#534F63] text-sm md:text-base leading-relaxed">
                Optimized for micro-environments like retail markets. The integrated glass camera loops sharp visual frames to our multi-modal processing script, dynamically logging shelves, aisle tags, and immediate obstacle vectors.
              </p>
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 text-sm text-[#534F63]">
                  <div className="mt-1 w-1.5 h-1.5 rounded-full bg-[#1E254C]" />
                  <span>High-speed semantic object tracing and short-term log memory indexing</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-[#534F63]">
                  <div className="mt-1 w-1.5 h-1.5 rounded-full bg-[#1E254C]" />
                  <span>Conversational push-to-talk voice querying utilizing timeline memory stacks</span>
                </div>
              </div>
            </div>
            <div className="pt-8 mt-8 border-t border-[#FAF8FD] flex items-center justify-between text-xs font-bold text-[#1E254C] tracking-widest uppercase">
              <span>Primary Loop: 5s Shelf Logging</span>
              <span>Target: Micro Discovery</span>
            </div>
          </div>
        </div>
      </section>

      {/* SYSTEM BLUEPRINT SECTION */}
      <section id="blueprint" className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-[#EAE4F6] text-[#4A308B] px-3 py-1 rounded-xl text-xs font-bold uppercase tracking-wider">
            Network Topology
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-[#1E254C]">Hardware Data Flow Matrix</h2>
          <p className="text-[#534F63] text-sm">
            How data hops across our hardware interfaces using localized protocols to secure instantaneous processing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white border border-[#E6E0FA] p-6 rounded-2xl space-y-4 shadow-sm relative">
            <span className="absolute top-4 right-4 text-[10px] uppercase font-mono font-bold text-gray-400">Sensor Hub</span>
            <div className="w-10 h-10 rounded-xl bg-[#4A308B] text-white flex items-center justify-center font-bold text-sm">GL</div>
            <div>
              <h4 className="font-extrabold text-base text-[#1E254C]">Smart Glasses</h4>
              <p className="text-xs text-[#534F63] mt-1 leading-relaxed">
                Equipped with a physical <strong>Camera</strong> and a dedicated <strong>ToF (Time-of-Flight) Sensor</strong> for split-second object detection metrics.
              </p>
            </div>
            <div className="pt-3 border-t border-gray-100 flex flex-col gap-1.5 text-[11px] text-[#534F63]">
              <span className="flex items-center gap-1 text-orange-600 font-semibold"><Bluetooth className="w-3.5 h-3.5" /> BLE → Haptic Band</span>
              <span className="flex items-center gap-1 text-blue-600 font-semibold"><Wifi className="w-3.5 h-3.5" /> Wi-Fi → Smart Phone</span>
            </div>
          </div>

          <div className="bg-white border border-[#E6E0FA] p-6 rounded-2xl space-y-4 shadow-sm relative">
            <span className="absolute top-4 right-4 text-[10px] uppercase font-mono font-bold text-gray-400">Tactile Node</span>
            <div className="w-10 h-10 rounded-xl bg-[#FAF8FD] border border-[#E6E0FA] text-[#4A308B] flex items-center justify-center font-bold text-sm">BD</div>
            <div>
              <h4 className="font-extrabold text-base text-[#1E254C]">The Haptic Band</h4>
              <p className="text-xs text-[#534F63] mt-1 leading-relaxed">
                Receives micro-obstacle raw vector values directly from the glasses over low-energy channels, translating parameters into physical **Haptic Vibrations**.
              </p>
            </div>
            <div className="pt-3 border-t border-gray-100 text-[11px] font-mono text-gray-400">
              Protocol Link: BLE (Audio-free Link)
            </div>
          </div>

          <div className="bg-white border border-[#E6E0FA] p-6 rounded-2xl space-y-4 shadow-sm relative">
            <span className="absolute top-4 right-4 text-[10px] uppercase font-mono font-bold text-gray-400">Compute Core</span>
            <div className="w-10 h-10 rounded-xl bg-[#1E254C] text-white flex items-center justify-center font-bold text-sm">PH</div>
            <div>
              <h4 className="font-extrabold text-base text-[#1E254C]">Smart Phone Engine</h4>
              <p className="text-xs text-[#534F63] mt-1 leading-relaxed">
                The centralized processing hub. Hosts our <strong>STT (Speech-to-Text)</strong> ingestion layer, compiles our multi-modal <strong>Local VLM</strong>, and runs <strong>TTS (Text-to-Speech)</strong> strings.
              </p>
            </div>
            <div className="pt-3 border-t border-gray-100 text-[11px] text-blue-600 font-semibold flex items-center gap-1">
              <Bluetooth className="w-3.5 h-3.5" /> Bluetooth Link → Headphones
            </div>
          </div>

          <div className="bg-white border border-[#E6E0FA] p-6 rounded-2xl space-y-4 shadow-sm relative">
            <span className="absolute top-4 right-4 text-[10px] uppercase font-mono font-bold text-gray-400">Output Node</span>
            <div className="w-10 h-10 rounded-xl bg-gray-100 text-gray-700 flex items-center justify-center font-bold text-sm">HP</div>
            <div>
              <h4 className="font-extrabold text-base text-[#1E254C]">Bluetooth Headphones</h4>
              <p className="text-xs text-[#534F63] mt-1 leading-relaxed">
                The conversational interface window. Allows the blind individual to issue voice <strong>Queries</strong>, receiving fluid spatial navigation <strong>Audio Feedback</strong>.
              </p>
            </div>
            <div className="pt-3 border-t border-gray-100 text-[11px] font-mono text-gray-400">
              Protocol Link: Dual-Channel Bluetooth
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Sandbox Simulator Section */}
      <section id="sandbox" className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-[#1E254C] rounded-[40px] text-white p-8 md:p-14 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center shadow-xl relative overflow-hidden">
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#4A308B] rounded-full blur-[120px] opacity-40"></div>
          
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#262E5C] border border-[#323B70] px-3 py-1.5 rounded-xl text-xs font-bold text-[#E6E0FA] uppercase tracking-widest">
              <Activity className="w-3.5 h-3.5 text-purple-400" /> Prototype Logic Stream
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
              Simulate our localized device logic layers.
            </h2>
            <p className="text-[#A59FC2] text-sm md:text-base leading-relaxed">
              Our system alternates processing frequencies dynamically based on user focus. Toggle the software categories below to review how the wristband and glasses divide tasks to conserve token payload bounds.
            </p>
            
            {/* FIX 1: Added explicit z-index positioning and cursor declarations to avoid terminal overlapping blocks */}
            <div className="p-2 bg-[#161B3B] rounded-2xl border border-[#262E5C] flex gap-2 relative z-30 shadow-md">
              <button 
                type="button"
                onClick={() => setActiveTab('ambient')}
                className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer select-none ${activeTab === 'ambient' ? 'bg-[#4A308B] text-white shadow-md' : 'text-[#8A85A3] hover:text-white'}`}
              >
                Ambient Mode (Wristband Focus)
              </button>
              <button 
                type="button"
                onClick={() => setActiveTab('shopping')}
                className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer select-none ${activeTab === 'shopping' ? 'bg-[#5A469D] text-white shadow-md' : 'text-[#8A85A3] hover:text-white'}`}
              >
                Shopping Mode (Glasses Focus)
              </button>
            </div>
          </div>

          {/* Interactive Hardware Visual Terminal Frame - FIX 2: isolated layout positioning tree */}
          <div className="lg:col-span-7 bg-[#161B3B] border border-[#262E5C] rounded-3xl p-6 font-mono text-xs text-[#A59FC2] shadow-inner relative z-10 min-h-[300px] flex flex-col justify-between overflow-hidden">
            <div className="flex justify-between items-center pb-3 border-b border-[#262E5C] text-[10px] text-[#6F6A8A] uppercase font-bold tracking-widest">
              <span>Device Logs // Prototype Sandbox Instance</span>
              <span className="text-purple-400 animate-pulse">● Active Loop</span>
            </div>

            <div className="flex-grow pt-4">
              {activeTab === 'ambient' ? (
                <div className="space-y-4 opacity-100 transition-opacity duration-200">
                  <div className="p-3 bg-[#1E254C] rounded-xl border border-blue-900/30">
                    <span className="text-blue-400 font-bold">[INFO]:</span> Wristband tracking prioritize. Memory pruned at 3 items to preserve context boundaries.
                  </div>
                  <div className="space-y-2">
                    <div className="text-[#6F6A8A] text-[10px] tracking-wider">TIMELINE SLOTS (MAX CAPACITY: 1.5 MINUTES):</div>
                    <div className="p-2.5 bg-black/30 rounded-lg flex justify-between items-center"><span className="text-purple-400">[{mockTime}]</span><span className="text-right">STORE: Kaufland Front Detected. Audio trigger generated.</span></div>
                    <div className="p-2.5 bg-black/20 rounded-lg flex justify-between items-center opacity-70"><span>[11:59:30]</span><span className="text-right">Sidewalk path clear. Ascending standard gradient slope.</span></div>
                    <div className="p-2.5 bg-black/10 rounded-lg flex justify-between items-center opacity-40"><span>[11:59:00]</span><span className="text-right">HAZARD: Elevated pavement curb 1 meter directly forward.</span></div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 opacity-100 transition-opacity duration-200">
                  <div className="p-3 bg-[#1E254C] rounded-xl border border-purple-900/30">
                    <span className="text-purple-400 font-bold">[INFO]:</span> Smart Glasses multi-modal stream active. Log buffer window expanded to 30 slots.
                  </div>
                  <div className="space-y-2">
                    <div className="text-[#6F6A8A] text-[10px] tracking-wider">TIMELINE MEMORY BUFFER (MAX LOG WINDOW: 30 ENTRIES):</div>
                    <div className="p-2 bg-black/30 rounded-lg flex justify-between items-center"><span className="text-yellow-400">[{mockTime}]</span><span className="text-right">Aisle 3. Canned pasta boxes cataloged on right shelves.</span></div>
                    <div className="p-2 bg-black/20 rounded-lg flex justify-between items-center opacity-80"><span>[12:00:15]</span><span className="text-right">Aisle 3 indicators: Tomato puree, Pasta sauces visible.</span></div>
                    <div className="p-2 bg-black/20 rounded-lg flex justify-between items-center opacity-60"><span>[12:00:10]</span><span className="text-right">Aisle 2 exit complete. Baking ingredients section.</span></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Technical Benchmarks Section */}
      <section id="engineering" className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-3xl font-black text-[#1E254C]">Technical Benchmarks</h2>
          <p className="text-sm text-[#534F63]">Optimizing hardware variables to ensure smooth multi-device communication.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#E6E0FA] space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-[#FAF8FD] border border-[#E6E0FA] flex items-center justify-center text-[#4A308B]">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="font-extrabold text-base text-[#1E254C]">Latency Diagnostics</h4>
            <p className="text-xs text-[#534F63] leading-relaxed">
              We process multi-modal tokens over dedicated async streams, syncing device metrics to mobile targets to maintain a smooth execution loop.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E6E0FA] space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-[#FAF8FD] border border-[#E6E0FA] flex items-center justify-center text-[#4A308B]">
              <Monitor className="w-5 h-5" />
            </div>
            <h4 className="font-extrabold text-base text-[#1E254C]">Context Window Pruning</h4>
            <p className="text-xs text-[#534F63] leading-relaxed">
              To prevent token bloat, the pipeline drops repetitive frames dynamically—limiting context logs to a brief safety timeline or a 15-item marketplace item array.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E6E0FA] space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-[#FAF8FD] border border-[#E6E0FA] flex items-center justify-center text-[#4A308B]">
              <Layers className="w-5 h-5" />
            </div>
            <h4 className="font-extrabold text-base text-[#1E254C]">Inter-Device Links</h4>
            <p className="text-xs text-[#534F63] leading-relaxed">
              Wired up with an independent audio service thread that translates active vision data into verbal feedback fields without altering the tactile hardware stream.
            </p>
          </div>
        </div>
      </section>

      {/* Footer Waitlist Area */}
      <section id="waitlist" className="max-w-4xl mx-auto px-6 py-24 text-center space-y-8">
        <div className="bg-gradient-to-br from-[#1E254C] to-[#3A4585] rounded-[40px] p-10 md:p-16 text-white space-y-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#4A308B] rounded-full blur-[100px] opacity-50"></div>
          <div className="space-y-3 relative z-10">
            <h3 className="text-3xl md:text-5xl font-black tracking-tight">Follow our engineering progress.</h3>
            <p className="text-[#A59FC2] text-xs md:text-sm max-w-lg mx-auto leading-relaxed">
              Join our mailing list to receive development milestone reports, alpha hardware trial findings, and internal prototype progress updates.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-4 relative z-10">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#161B3B] text-white placeholder-[#6F6A8A] border border-[#262E5C] px-5 py-3.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#7B61FF] flex-grow transition-all"
              required
            />
            <button type="submit" className="bg-white hover:bg-[#FAF8FD] text-[#1E254C] px-6 py-3.5 rounded-xl font-bold text-sm transition-all shadow-md">
              Subscribe to Updates
            </button>
          </form>
        </div>

        <div className="text-xs text-[#8A85A3] space-y-2 pt-4 border-t border-[#E6E0FA]/50">
          <p>© 2026 Sehnsora. All rights reserved.</p>
          <p className="max-w-2xl mx-auto opacity-80">Developed via the Cyber Valley AI Incubator. Prototyping team: Shweta, Raihan, Yograj, and Abhishek.</p>
        </div>
      </section>

    </div>
  );
}