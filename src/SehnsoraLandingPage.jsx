import React, { useState, useEffect } from 'react';
import { Eye, Shield, Compass, ShoppingBag, ArrowRight, CheckCircle, Sliders, Activity, Sparkles, ChevronRight } from 'lucide-react';

export default function SehnsoraLandingPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [activeLayer, setActiveLayer] = useState('street'); 
  const [activeKnot, setActiveKnot] = useState('node_1');
  const [radialProgress, setRadialProgress] = useState(0);

  const sensoryArchitecture = {
    street: {
      title: "Neighborhood Trajectory",
      subtitle: "Securing paths across urban sidewalk vectors.",
      nodes: {
        node_1: {
          landmarkName: "Sidewalk Corridor Clearway",
          glassesFeedback: "Optic Field: Clear path projection up to 4 meters forward. Structural boundary recognized on left margin.",
          bandFeedback: "Haptic Current: Soft, uniform micro-vibrations across the inner wrist band to verify stable orientation.",
          clinicalAction: "System Intent: Maintain standard forward stride velocity down path center."
        },
        node_2: {
          landmarkName: "Intersection Pedestrian Crosswalk",
          glassesFeedback: "Optic Field: Crosswalk countdown array parsed. 12 seconds remaining for complete platform crossing.",
          bandFeedback: "Haptic Current: Directional micro-taps shifting focus smoothly toward the right wrist quadrant.",
          clinicalAction: "System Intent: Guide orientation slightly rightward to follow structural crosswalk markers."
        },
        node_3: {
          landmarkName: "Curbside Infrastructure Barrier",
          glassesFeedback: "Optic Field: CAUTION. Temporary construction scaffolding protruding 35cm into the horizontal pedestrian path.",
          bandFeedback: "Haptic Current: High-frequency cautionary pulses locking onto the lower-left wrist band edge.",
          clinicalAction: "System Intent: Hazard alert. Direct path adjustment two steps rightward to clear metal framework."
        }
      }
    },
    grocery: {
      title: "Grocery Row Extraction",
      subtitle: "Targeting shelf inventory quietly without verbal clutter.",
      nodes: {
        node_1: {
          landmarkName: "Aisle Entrance / Fresh Endcap",
          glassesFeedback: "Optic Field: Dense shelving matrices categorized. Pricing nodes mapped along the middle rack layer.",
          bandFeedback: "Haptic Current: Gentle, target-seeking micro-currents focusing on the outer left wrist margin.",
          clinicalAction: "System Intent: Extend left arm out roughly 30cm to run fingers across display boundaries."
        },
        node_2: {
          landmarkName: "Focal Shelf Product Allocation",
          glassesFeedback: "Optic Field: Target object isolated: Whole Bean Espresso Box, located 15cm left of the dark roast container.",
          bandFeedback: "Haptic Current: Localized spatial current intensifying as the distance gap to target container shrinks.",
          clinicalAction: "System Intent: Raise hand smoothly to shoulder height and extend fingers straight ahead to contact item."
        },
        node_3: {
          landmarkName: "Aisle Walkway Floor Obstacle",
          glassesFeedback: "Optic Field: CAUTION. Rigid wooden inventory crate misplaced flat onto the central row floor area.",
          bandFeedback: "Haptic Current: Sharp, rhythmic perimeter boundary warning pulses tracing the lower band quadrant.",
          clinicalAction: "System Intent: Floor surface alert. Steer trajectory path 2 paces rightward to bypass floor hazard."
        }
      }
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setRadialProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 40);
    return () => clearInterval(timer);
  }, [activeKnot, activeLayer]);

  const switchLayer = (layerKey) => {
    setActiveLayer(layerKey);
    setActiveKnot('node_1');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  const currentNodes = sensoryArchitecture[activeLayer].nodes;
  const metricsFeed = currentNodes[activeKnot];

  return (
    <div className="min-h-screen bg-[#08080A] text-[#F3F3F5] font-sans antialiased selection:bg-[#E29543] selection:text-[#08080A] overflow-x-hidden relative">
      
      {/* Precision Frame Overlay */}
      <div className="fixed inset-6 border border-white/[0.01] pointer-events-none z-50 rounded-3xl" />

      {/* Global Ticker: Streamlined to eliminate visual crowding seen in image_25e187.png */}
      <div className="w-full bg-[#0D0D11] border-b border-white/[0.02] py-3.5 px-8 lg:px-12 flex justify-between items-center text-[10px] font-medium tracking-[0.25em] text-white/40 uppercase relative z-50">
        <div className="flex items-center gap-3">
          <Activity className="w-4 h-4 text-[#E29543]" />
          <span>PERCEPTION CORE MAPPING LINKED</span>
        </div>
        <div className="flex items-center gap-6 text-[9px]">
          <span>SYSTEM ACTIVE</span>
        </div>
      </div>

      {/* Header */}
      <header className="w-full h-24 border-b border-white/[0.01] flex items-center justify-between px-8 lg:px-12 bg-[#08080A]/90 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-4 cursor-pointer">
          <div className="w-10 h-10 border border-white/[0.05] bg-[#111115] flex items-center justify-center rounded-xl shadow-lg">
            <Eye className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-[0.2em] text-white">SEHNSORA</span>
            <span className="text-[8px] tracking-[0.18em] text-white/30 font-bold uppercase">Sensory Frameworks</span>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-12 text-[11px] font-bold tracking-[0.2em] uppercase text-white/60">
          <a href="#hardware-blueprint" className="hover:text-white transition-colors">The Wearables</a>
          <a href="#multimodal-terminal" className="hover:text-[#E29543] transition-colors">Interactive Path Grid</a>
        </nav>

        <a href="#priority-enrollment" className="bg-white hover:bg-[#E29543] text-black hover:text-white px-6 py-3 text-[10px] font-bold tracking-[0.2em] uppercase transition-colors duration-300">
          Secure Hardware Package
        </a>
      </header>

      {/* Hero Section */}
      <main role="main">
        <section className="max-w-7xl mx-auto px-8 lg:px-12 pt-28 pb-24 text-left space-y-8 relative">
          <div className="inline-flex items-center gap-2.5 border border-white/[0.05] bg-[#0D0D11] px-4 py-1.5 text-[9px] font-black tracking-[0.25em] uppercase text-[#E29543]">
            <Sparkles className="w-3.5 h-3.5" /> SUB-COGNITIVE ORIENTATION
          </div>
          <h1 className="text-5xl md:text-[84px] font-light tracking-tighter text-white leading-[0.92] uppercase max-w-5xl">
            Subconscious space. <br />
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#E29543] via-white to-white">
              Tactile lucidity.
            </span>
          </h1>
          <p className="text-white/60 text-base md:text-xl max-w-3xl font-light leading-relaxed tracking-wide">
            Bypass the exhaustion of continuous vocal description. Sehnsora charts unpredictable urban routes and complex store shelves using synchronized micro-pulses directly over your wrist skin layout—leaving your hearing entirely clear.
          </p>
        </section>

        {/* Interactive Terminal System */}
        <section id="multimodal-terminal" className="max-w-7xl mx-auto px-8 lg:px-12 py-16 grid grid-cols-1 lg:grid-cols-12 gap-16 items-stretch border-t border-b border-white/[0.02]">
          
          {/* Controls Panel */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-10">
            <div className="space-y-4">
              <span className="text-[9px] font-black text-[#E29543] tracking-[0.25em] uppercase block">Simulation Matrix</span>
              <h2 className="text-3xl font-light text-white uppercase tracking-tight">The Environment Loop.</h2>
              <p className="text-xs text-white/40 font-light leading-relaxed">
                Toggle your tracking mode parameters below. Step through each vector checkpoint node to preview response cycles.
              </p>

              <div className="p-1 bg-[#0D0D11] border border-white/[0.03] rounded-lg flex gap-2">
                <button
                  type="button"
                  onClick={() => switchLayer('street')}
                  className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider rounded transition-all cursor-pointer select-none ${activeLayer === 'street' ? 'bg-[#16161A] text-white border border-white/[0.05]' : 'text-white/40 hover:text-white'}`}
                >
                  Neighborhood Walk
                </button>
                <button
                  type="button"
                  onClick={() => switchLayer('grocery')}
                  className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider rounded transition-all cursor-pointer select-none ${activeLayer === 'grocery' ? 'bg-[#16161A] text-white border border-white/[0.05]' : 'text-white/40 hover:text-white'}`}
                >
                  Supermarket Shop
                </button>
              </div>
            </div>

            {/* Nodes Selection Array */}
            <div className="flex flex-col gap-3">
              {Object.keys(currentNodes).map((key, index) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveKnot(key)}
                  className={`w-full text-left p-5 border transition-all duration-500 flex items-center justify-between cursor-pointer select-none ${activeKnot === key ? 'bg-[#0D0D11] border-[#E29543] text-white shadow-xl' : 'bg-transparent border-white/[0.02] text-white/40 hover:text-white'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-[10px] font-bold ${activeKnot === key ? 'bg-[#E29543] text-[#08080A]' : 'bg-[#111115] border border-white/[0.03]'}`}>
                      0{index + 1}
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wide">{currentNodes[key].landmarkName}</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-all duration-300 ${activeKnot === key ? 'translate-x-0 opacity-100 text-[#E29543]' : '-translate-x-2 opacity-0'}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Visualization Terminal Layout */}
          <div className="lg:col-span-7 bg-[#0D0D11] border border-white/[0.03] p-8 flex flex-col justify-between relative rounded-xl">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.003)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.003)_1px,transparent_1px)] bg-[size:24px_24px] opacity-60 pointer-events-none" />

            <div className="flex justify-between items-center pb-4 border-b border-white/[0.02] text-[9px] text-white/40 font-bold tracking-widest uppercase">
              <span>{sensoryArchitecture[activeLayer].title} // Diagnostic Field</span>
              <span className="text-emerald-500 flex items-center gap-1.5 font-sans tracking-normal">
                <span className="w-1 h-1 rounded-full bg-emerald-500" /> STABLE
              </span>
            </div>

            {/* Radar Center Ring Animation */}
            <div className="flex-grow flex items-center justify-center py-14 relative">
              <div className="w-52 h-56 rounded-full border border-dashed border-white/[0.02] absolute flex items-center justify-center animate-spin [animation-duration:35s]">
                <div className="w-1.5 h-1.5 bg-[#E29543] rounded-full absolute -top-[3px]" />
              </div>

              <div className="w-40 h-40 rounded-full border border-white/[0.01] absolute flex items-center justify-center">
                <div 
                  className="rounded-full border border-[#E29543]/20 transition-all duration-100 ease-linear"
                  style={{ width: `${radialProgress}%`, height: `${radialProgress}%`, opacity: (100 - radialProgress) / 100 }}
                />
              </div>

              <div className="w-12 h-12 rounded-xl bg-[#16161A] border border-white/[0.04] flex items-center justify-center shadow-2xl relative z-10">
                <Compass className="w-5 h-5 text-white animate-spin [animation-duration:50s]" />
              </div>
            </div>

            {/* Stream Parameter Logs Output Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-white/[0.03] text-left">
              <div className="p-4 bg-[#141419] border border-white/[0.01] rounded-lg space-y-1">
                <span className="text-[8px] font-black tracking-widest text-white/30 uppercase block">Glasses Capture</span>
                <p className="text-[11px] text-white font-medium leading-relaxed">"{metricsFeed.glassesFeedback}"</p>
              </div>
              <div className="p-4 bg-[#141419] border border-white/[0.01] rounded-lg space-y-1">
                <span className="text-[8px] font-black tracking-widest text-[#E29543] uppercase block">Tactile Impulses</span>
                <p className="text-[11px] text-[#E29543] font-semibold leading-relaxed">{metricsFeed.bandFeedback}</p>
              </div>
              <div className="p-4 bg-[#141419] border border-white/[0.01] rounded-lg space-y-1">
                <span className="text-[8px] font-black tracking-widest text-white/80 uppercase block">Guidance Vector</span>
                <p className="text-[11px] text-white font-bold leading-relaxed">{metricsFeed.clinicalAction}</p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-white/[0.02] flex justify-between items-center text-[8px] text-white/30 font-bold tracking-widest uppercase">
              <span>NODE SCALE // v2.05</span>
              <span>FEED // SYNCED</span>
            </div>
          </div>
        </section>

        {/* Blueprint Specs Descriptions */}
        <section id="hardware-blueprint" className="max-w-7xl mx-auto px-8 lg:px-12 py-24 space-y-16">
          <div className="max-w-3xl text-left space-y-3">
            <span className="text-[10px] font-bold text-[#E29543] tracking-widest uppercase block">Workload Profiles</span>
            <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight">The Dual Hardware Framework.</h2>
            <p className="text-sm text-white/50 font-light leading-relaxed">
              Sehnsora divides spatial dataset processing continuously across two minimal layers operating in baseline balance.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="p-10 bg-[#0D0D11] border border-white/[0.02] rounded-2xl space-y-5 relative overflow-hidden group">
              <span className="text-[10px] font-bold tracking-widest text-[#E29543] uppercase block">The Spatial Orientation Base</span>
              <h3 className="text-2xl font-bold text-white tracking-tight">The Horizon Pressure Band</h3>
              <p className="text-sm text-white/60 font-light leading-relaxed">
                Woven from flexible technical yarn lined with a localized multi-point pressure matrix. By projecting direction-biased rolling vibration currents straight over your inner wrist skin area, it allows you to trace architectural corridor walls, crosswalk pavement lines, and grocery display bounds naturally entirely by feel.
              </p>
            </div>
            <div className="p-10 bg-[#0D0D11] border border-white/[0.02] rounded-2xl space-y-5 relative overflow-hidden group">
              <span className="text-[10px] font-bold tracking-widest text-[#E29543] uppercase block">The Semantic Discovery Layer</span>
              <h3 className="text-2xl font-bold text-white tracking-tight">The Context Smart Lenses</h3>
              <p className="text-sm text-white/60 font-light leading-relaxed">
                An incredibly featherweight architectural eyewear frame housing an ultra-wide panoramic camera layout sensor. The system silently reviews traffic signals, room entrance signs, and dense grocery item shelf typography in the background, updating short-term local memory logs for the moment you ask questions out loud.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Conversion Block */}
        <section id="priority-enrollment" className="max-w-4xl mx-auto px-8 py-32 text-center space-y-8 relative z-20">
          <div className="w-10 h-10 border border-white/[0.05] bg-[#0D0D11] flex items-center justify-center mx-auto text-[#E29543] rounded-xl shadow-xl">
            <Sliders className="w-4 h-4 animate-pulse" />
          </div>
          <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight uppercase">
            Secure Launch Batch Allocation.
          </h2>
          <p className="text-sm text-white/50 max-w-lg mx-auto font-light leading-relaxed tracking-wide">
            Our hardware suites are hand-assembled inside limited validation evaluation drops. Register your parameters to anchor priority queue status.
          </p>
          <div className="pt-4 max-w-md mx-auto">
            <form onSubmit={handleFormSubmit} className="flex flex-col sm:flex-row gap-2.5 bg-[#0D0D11] border border-white/[0.04] p-2 rounded-xl focus-within:border-[#E29543] transition-colors duration-300 shadow-2xl">
              <input 
                type="email" 
                aria-label="Email Address for priority queue assignment allocation"
                placeholder="Primary communication email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-3 bg-transparent text-xs focus:outline-none flex-grow text-white placeholder-white/20"
                required
              />
              <button type="submit" className="bg-white hover:bg-[#E29543] text-black hover:text-white px-7 py-3.5 text-[10px] font-bold tracking-widest uppercase transition-colors whitespace-nowrap">
                Register Priority Status
              </button>
            </form>
            {submitted && (
              <div className="text-[10px] text-[#E29543] font-bold tracking-widest uppercase pt-5 flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" /> Configuration channel verified. Queue ranking logged successfully.
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.01] py-14 bg-[#050507] relative z-30">
        <div className="max-w-7xl mx-auto px-8 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] text-white/20 font-bold tracking-[0.25em] uppercase">
          <p>© 2026 Sehnsora Technologies Inc. Spatial patents protected globally under protective monitoring protocol.</p>
          <div className="flex gap-10">
            <a href="#" className="hover:text-[#E29543] transition-colors">Privacy Paradigm</a>
            <a href="#" className="hover:text-white transition-colors">Spatial Architecture</a>
          </div>
        </div>
      </footer>
    </div>
  );
}