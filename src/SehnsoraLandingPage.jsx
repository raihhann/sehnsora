import React, { useState, useEffect, useRef } from 'react';

export default function SehnsoraDemo() {
  // Simulation States: 'onboarding' | 'at-plants' | 'driving-to-apples' | 'on-apples-hold' | 'at-biscuits' | 'ended'
  const [currentStep, setCurrentStep] = useState('onboarding');
  const [showShield, setShowShield] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [hapticText, setHapticText] = useState('');
  const [showHaptic, setShowHaptic] = useState(false);
  const [logs, setLogs] = useState([{ time: new Date().toLocaleTimeString(), text: 'System Status: Standing by. Tap screen overlay layer to spin up audio logs...' }]);
  const [uiStatus, setUiStatus] = useState('Awaiting workspace initialization click...');
  
  // Waitlist form states
  const [inlineEmail, setInlineEmail] = useState('');
  const [modalEmail, setModalEmail] = useState('');
  const [inlineSuccess, setInlineSuccess] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);

  const videoRef = useRef(null);
  const timeTrackerRef = useRef(null);
  const currentStepRef = useRef(currentStep);

  // Keep ref in sync so asynchronous speech events read the absolute newest state mapping values
  useEffect(() => {
    currentStepRef.current = currentStep;
  }, [currentStep]);

  // Browser Speech APIs Initialization
  const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
  const SpeechRecognition = typeof window !== 'undefined' ? (window.SpeechRecognition || window.webkitSpeechRecognition) : null;
  let recognition = null;

  if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';
  }

  // Pre-load browser voices instantly upon mount
  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  const pushLog = (text) => {
    setLogs((prev) => [...prev, { time: new Date().toLocaleTimeString(), text }]);
  };

  // Helper to isolate natural sounding premium narration voice profiles
  const getNaturalVoice = () => {
    if (!synth) return null;
    const voices = synth.getVoices();
    
    // Prioritize high-quality natural voice configurations (Google, Apple Premium, Microsoft Natural)
    const premiumVoice = voices.find(voice => 
      voice.lang.startsWith('en') && 
      (voice.name.includes('Natural') || voice.name.includes('Google') || voice.name.includes('Premium'))
    );
    
    // Safe fallback parameters to standardized native English profiles
    return premiumVoice || voices.find(voice => voice.lang === 'en-US') || voices[0];
  };

  const speak = (text, callback) => {
    if (!synth) return;
    synth.cancel(); // Terminate existing voice blocks instantly
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    const naturalVoice = getNaturalVoice();
    if (naturalVoice) {
      utterance.voice = naturalVoice;
    }
    
    // Tweak speech performance settings slightly for crisp audio clarity
    utterance.rate = 0.95; 
    utterance.pitch = 1.0; 

    utterance.onend = () => { if (callback) callback(); };
    synth.speak(utterance);
    pushLog(`<span class="text-[#FF5722]">Headset Audio:</span> "${text}"`);
  };

  const triggerMicrophone = () => {
    if (!recognition) return;
    setUiStatus('Microphone Channel Active — Listening...');
    try {
      recognition.start();
    } catch (e) {
      // Gracefully bypass if tracking is already open
    }
  };

  // Set up Speech-to-Text Recognition State Machine Linkages
  if (recognition) {
    recognition.onresult = (event) => {
      const voicePhrase = event.results[0][0].transcript.toLowerCase().trim();
      pushLog(`<span class="text-emerald-400 font-medium">Vocal Token Captured:</span> "${voicePhrase}"`);

      const step = currentStepRef.current;

      // STATE 1: Onboarding Greeting Step Choice
      if (step === 'onboarding') {
        if (voicePhrase.includes('yes') || voicePhrase.includes('sure') || voicePhrase.includes('demo') || voicePhrase.includes('yeah')) {
          setCurrentStep('at-plants');
          executeSegmentRun(7);
        } else {
          speak("Understood. Keeping system on standby hold. Say run demo to begin.", () => {
            setUiStatus('Standby Hold');
            triggerMicrophone();
          });
        }
      }
      // STATE 2: Checked stop at Plants (7s Mark)
      else if (step === 'at-plants') {
        if (voicePhrase.includes('apple') || voicePhrase.includes('buy apples')) {
          setCurrentStep('driving-to-apples');
          executeSegmentRun(12);
        } else {
          // Infinite mistake loop handler: clear path, re-speak, and pop open mic again
          speak("I see plants on your left. Whenever you are ready for fruits, please say: I wanna buy apples.", () => {
            triggerMicrophone();
          });
        }
      }
      // STATE 3: Checked stop at Hold Interval point (15s Mark after 7s wait hold)
      else if (step === 'on-apples-hold') {
        if (voicePhrase.includes('biscuit') || voicePhrase.includes('cookie') || voicePhrase.includes('biscuits')) {
          setCurrentStep('at-biscuits');
          executeSegmentRun(25);
        } else {
          // Infinite mistake loop handler: clear path, re-speak, and pop open mic again
          speak("I am ready to scan your next target item. Please say: biscuits, to proceed down the aisle.", () => {
            triggerMicrophone();
          });
        }
      }
      // STATE 4: Final Feedback Request
      else if (step === 'at-biscuits') {
        speak("Your response has been securely processed. Our priority waitlist conversion overlay is active over your view console screen now.");
      }
    };

    // Auto-re-prime input windows if mic times out before user responds
    recognition.onerror = () => {
      if (['at-plants', 'on-apples-hold', 'at-biscuits'].includes(currentStepRef.current)) {
        setTimeout(triggerMicrophone, 1200);
      }
    };
  }

  // Initial Gesture Permission Clear
  const handleShieldClick = () => {
    setShowShield(false);
    pushLog("System audio channels initialized.");
    const welcomeGreeting = "Welcome to Sehnsora. We combine an audio-free directional haptic band with context-aware smart glasses to simplify spatial navigation. Would you like to try our store voice demo prototype right now?";
    
    speak(welcomeGreeting, () => {
      triggerMicrophone();
    });
  };

  // Main Core Video State Engine Tracker (No raw technical log generation outputs)
  const executeSegmentRun = (targetTime) => {
    const video = videoRef.current;
    if (!video) return;

    video.play();
    setUiStatus('Analyzing video frame configurations...');

    clearInterval(timeTrackerRef.current);
    timeTrackerRef.current = setInterval(() => {
      if (video.currentTime >= targetTime) {
        clearInterval(timeTrackerRef.current);
        video.pause();

        if (targetTime === 7) {
          const plantPrompt = "Now you are at the entrance of the shop. I see plants on the left and a way leading forward. What would you like to shop first?";
          speak(plantPrompt, () => {
            triggerMicrophone();
          });
        } 
        else if (targetTime === 12) {
          const applePrompt = "Apples are here. Your haptic band will guide you.";
          speak(applePrompt, () => {
            triggerHapticVibration("Produce Proximity Lock-On");
            
            // Advance timeline exactly 3 additional seconds forward
            setTimeout(() => {
              video.play();
              
              setTimeout(() => {
                video.pause();
                setUiStatus('On 7-second complete silent item retrieval hold step...');
                
                // complete an absolute 7-second complete silent wait hold frame array
                setTimeout(() => {
                  setCurrentStep('on-apples-hold');
                  const holdQuestion = "What next?";
                  speak(holdQuestion, () => {
                    triggerMicrophone();
                  });
                }, 7000);

              }, 3000);
            }, 1000);
          });
        } 
        else if (targetTime === 25) {
          const biscuitPrompt = "Biscuits are here.";
          speak(biscuitPrompt, () => {
            triggerHapticVibration("Snack Row Alignment Active");
            
            setTimeout(() => {
              const endSurvey = "How did you enjoy our assistive store navigation demo framework experience?";
              speak(endSurvey, () => {
                setShowModal(true);
                triggerMicrophone();
              });
            }, 2500);
          });
        }
      }
    }, 50);
  };

  const triggerHapticVibration = (infoString) => {
    setHapticText(`📳 HAPTIC BROADCAST: [${infoString}] ACTIVE 📳`);
    setShowHaptic(true);
    setTimeout(() => setShowHaptic(false), 4000);
  };

  const handleInlineSubmit = (e) => {
    e.preventDefault();
    setInlineSuccess(true);
    setInlineEmail('');
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    setModalSuccess(true);
    setModalEmail('');
  };

  useEffect(() => {
    return () => clearInterval(timeTrackerRef.current);
  }, []);

  return (
    <div className="bg-[#F4F1EA] text-[#1E1A16] antialiased min-h-screen flex flex-col justify-between select-none">
      
      {/* Click To Initialize Screen Shield Overlay Component */}
      {showShield && (
        <button onClick={handleShieldClick} className="fixed inset-0 bg-[#12100E]/98 z-[100] flex flex-col items-center justify-center p-6 text-center text-white cursor-pointer transition-opacity duration-500">
          <div className="space-y-6 max-w-2xl">
            <h1 className="text-5xl font-light serif-title text-[#F4F1EA]">Welcome to <span className="text-[#FF5722] font-normal">Sehnsora</span></h1>
            <p class="text-gray-400 text-sm font-light tracking-wide max-w-lg mx-auto">Tap anywhere on this screen to clear your browser's audio permissions and initialize the hands-free voice experience loop.</p>
            <div className="inline-block border border-gray-800 bg-[#1A1715] px-8 py-3.5 rounded-full text-xs uppercase tracking-widest text-[#FF5722] font-semibold animate-pulse">
              Click Screen to Initialize
            </div>
          </div>
        </button>
      )}

      {/* Completion Waitlist Conversion Popup Modal Component */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#12100E] border border-gray-800 text-white rounded-[32px] p-8 md:p-10 max-w-md w-full text-center space-y-6 relative shadow-2xl">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white text-xs font-mono p-2">✕ CLOSE</button>
            <span className="text-[10px] font-mono tracking-widest text-[#FF5722] font-bold block uppercase">Simulation Complete</span>
            <h3 className="serif-title text-3xl font-light">Join the Priority Circle.</h3>
            <p class="text-gray-400 text-xs font-light leading-relaxed">Thank you for finishing our voice prototype shopping demo run! Reserve your spot below to follow our engineering updates and get alpha kit testing trials.</p>
            <form onSubmit={handleModalSubmit} className="space-y-3">
              <input type="email" value={modalEmail} onChange={(e) => setModalEmail(e.target.value)} placeholder="you@company.com" className="w-full bg-[#1A1715] text-white border border-gray-800 rounded-xl px-4 py-3 text-xs focus:outline-none text-center" required />
              <button type="submit" className="w-full bg-[#FF5722] hover:bg-orange-600 text-white font-semibold text-xs py-3.5 rounded-xl uppercase tracking-wider transition-all">Join Waiting List →</button>
            </form>
            {modalSuccess && <p className="text-emerald-400 text-xs font-semibold">✓ Registered successfully inside our incubator early access logs.</p>}
          </div>
        </div>
      )}

      {/* Brand Luxury Navigation Header navbar */}
      <header className="w-full border-b border-gray-300/60 bg-[#F4F1EA]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-8 h-20 flex justify-between items-center">
          <div class="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-[#1E1A16] flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#FF5722]"></div>
            </div>
            <span className="text-xl font-bold tracking-tight text-[#1E1A16]">Sehnsora</span>
          </div>
          <nav className="hidden md:flex items-center gap-10 text-sm font-medium text-gray-600">
            <a href="#demo-console" className="hover:text-black transition-colors">Demo</a>
            <a href="#why-it-matters" className="hover:text-black transition-colors">Why Sehnsora</a>
            <a href="#waitlist" className="hover:text-black transition-colors">Waitlist</a>
          </nav>
          <a href="#waitlist" className="bg-black hover:bg-gray-800 text-white px-6 py-2.5 rounded-full font-medium text-xs tracking-wide uppercase transition-all">
            Request a Demo
          </a>
        </div>
      </header>

      {/* Presentation Marketing Hero Titles layout */}
      <section className="max-w-7xl mx-auto px-8 pt-12 pb-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 border border-gray-300 bg-white px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-wider text-gray-500 uppercase shadow-2xs">
          ● ASSISTIVE TECH · PILOT COHORT OPEN
        </div>
        <h2 className="text-5xl md:text-7xl font-light serif-title tracking-tight text-black max-w-4xl mx-auto leading-[1.08]">
          True Spatial Autonomy. <br/><span class="italic font-normal text-gray-500">Zero Auditory Noise.</span>
        </h2>
        <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
          Sehnsora combines a silent haptic feedback band with context-aware AI smart glasses, giving the visually impaired the confidence to navigate chaotic public, retail, and corporate spaces safely.
        </p>

        <div className="max-w-3xl mx-auto pt-6 grid grid-cols-3 gap-4 text-left border-t border-gray-300/50 mt-4">
          <div>
            <div className="text-2xl font-bold text-black font-mono">100%</div>
            <div className="text-[10px] uppercase font-mono tracking-wider text-gray-400">Ears Open</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-black font-mono">0</div>
            <div className="text-[10px] uppercase font-mono tracking-wider text-gray-400">Beacons Required</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-black font-mono">2</div>
            <div className="text-[10px] uppercase font-mono tracking-wider text-gray-400">Devices, One System</div>
          </div>
        </div>
      </section>

      {/* Running Marquee Badges Stripe */}
      <div className="w-full bg-[#12100E] text-white py-3 font-mono text-[11px] uppercase tracking-widest overflow-hidden whitespace-nowrap border-y border-gray-800">
        <div className="inline-block space-x-12 animate-pulse">
          <span>Ear-Free Safety</span> <span className="text-[#FF5722]">●</span>
          <span>Silent Haptic Feedback</span> <span class="text-[#FF5722]">●</span>
          <span>Conversational AI Mapping</span> <span className="text-[#FF5722]">●</span>
          <span>Infrastructure-Independent Navigation</span>
        </div>
      </div>

      {/* Sandbox Terminal Rendering Component Matrix block */}
      <section id="demo-console" className="max-w-7xl w-full mx-auto px-8 py-10 scroll-mt-24">
        <span className="text-[11px] uppercase font-mono font-bold tracking-widest text-orange-600 block mb-2">01 / LIVE DEMO INTERFACE</span>
        <h3 className="serif-title text-4xl font-light text-black mb-6">See It In Action. <span className="italic text-gray-400 font-normal">Real-world use cases.</span></h3>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 bg-white border border-gray-200 shadow-xs rounded-2xl p-5 flex flex-col justify-between">
            <div className="aspect-video w-full rounded-xl overflow-hidden bg-black relative border border-gray-100 shadow-sm">
              <video ref={videoRef} className="w-full h-full object-cover">
                <source src="/static/video.mp4" type="video/mp4" />
              </video>
              <div className="absolute bottom-4 left-4 right-4 bg-black/85 border border-white/10 backdrop-blur-xs p-3 rounded-lg text-center font-mono text-[10px] text-orange-400 tracking-wide uppercase">
                Device State: {uiStatus}
              </div>
            </div>

            {showHaptic && (
              <div className="mt-4 p-4 bg-orange-50 border border-orange-200 text-orange-800 rounded-xl text-center font-mono text-xs uppercase tracking-wider animate-pulse">
                {hapticText}
              </div>
            )}
          </div>

          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white border border-gray-200 shadow-xs rounded-2xl p-6 flex flex-col justify-between h-full">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-gray-400">Telemetry</span>
                  <div className="inline-flex items-center gap-1.5 bg-red-50 text-red-700 px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase">
                    <span class="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping"></span> Live Device Log
                  </div>
                </div>
                <h3 className="serif-title text-2xl font-light text-black">Real-Time Device Log</h3>
                
                <div className="bg-[#1A1715] rounded-xl p-4 h-56 overflow-y-auto font-mono text-[11px] text-[#A89F95] space-y-2 border border-gray-900 shadow-inner">
                  {logs.map((log, idx) => (
                    <div key={idx}>
                      <span className="text-gray-600">[{log.time}]</span> <span dangerouslySetInnerHTML={{ __html: log.text }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-[#ECE9E0] border border-gray-300/70 rounded-2xl p-5 space-y-2">
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-gray-500 block">Voice Navigation Targets</span>
              <div className="space-y-1 text-xs text-gray-600 font-medium">
                <div>• At 7 seconds prompt: Reply with <strong className="text-orange-600">"I wanna buy apples"</strong></div>
                <div>• At 15 seconds prompt: Reply with <strong className="text-orange-600">"Biscuits"</strong></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Structural Features Info columns rows */}
      <section id="why-it-matters" className="max-w-7xl w-full mx-auto px-8 py-12 scroll-mt-24">
        <span className="text-[11px] uppercase font-mono font-bold tracking-widest text-orange-600 block mb-2">02 / WHY IT MATTERS</span>
        <h3 className="serif-title text-4xl font-light text-black mb-10">Two devices. <br/><span className="italic text-gray-500 font-normal">One quiet, confident system.</span></h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-8 space-y-4 shadow-2xs">
            <span className="serif-title text-3xl font-light text-gray-300 block">01</span>
            <h4 className="text-lg font-bold text-black">Ear-Free Safety</h4>
            <p className="text-xs text-gray-600 font-light leading-relaxed">Unlike voice-only apps that block traffic sounds, our haptic band guides users silently through touch — leaving ears 100% open to environmental hazards.</p>
            <div className="text-[10px] font-mono font-bold tracking-wider text-gray-400 pt-4 uppercase border-t border-gray-100">Haptic Band</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-8 space-y-4 shadow-2xs">
            <span className="serif-title text-3xl font-light text-gray-300 block">02</span>
            <h4 className="text-lg font-bold text-black">Instant Context</h4>
            <p className="text-xs text-gray-600 font-light leading-relaxed">Smart glasses act as an on-demand visual translator, reading labels, product titles, aisle markers, and structural names instantly via edge-tuned models.</p>
            <div className="text-[10px] font-mono font-bold tracking-wider text-gray-400 pt-4 uppercase border-t border-gray-100">AI Glasses</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-8 space-y-4 shadow-2xs">
            <span class="serif-title text-3xl font-light text-gray-300 block">03</span>
            <h4 class="text-lg font-bold text-black">Infrastructure Independent</h4>
            <p class="text-xs text-gray-600 font-light leading-relaxed">Requires zero indoor market beacons or expensive facility modifications. It maps coordinates right out of the box, anywhere, seamlessly.</p>
            <div class="text-[10px] font-mono font-bold tracking-wider text-gray-400 pt-4 uppercase border-t border-gray-100">Ecosystem</div>
          </div>
        </div>
      </section>

      {/* Inline Bottom Waitlist Input layout row */}
      <section id="waitlist" className="max-w-7xl w-full mx-auto px-8 py-12 scroll-mt-24">
        <div className="bg-[#12100E] rounded-[32px] p-10 md:p-16 text-white grid grid-cols-1 lg:grid-cols-12 gap-12 items-center shadow-xl relative overflow-hidden">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-[11px] font-mono tracking-widest text-[#FF5722] font-bold block uppercase">03 / Waitlist</span>
            <h3 className="serif-title text-4xl md:text-5xl font-light text-[#F4F1EA] tracking-tight leading-tight">
              Bring Sehnsora to <span className="text-[#FF5722] italic font-normal">your space.</span>
            </h3>
            <p className="text-gray-400 font-light text-xs md:text-sm max-w-xl leading-relaxed">
              Whether you are a retail innovation manager, a corporate HR head looking to make your workplace accessible, or an early adopter wanting true independence — join our priority waitlist today.
            </p>
          </div>

          <div className="lg:col-span-5 bg-[#1A1715] border border-gray-800 rounded-2xl p-6 space-y-4">
            <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase block font-bold">Priority Access</span>
            <h4 className="serif-title text-xl text-white font-light">Reserve your spot.</h4>
            <form onSubmit={handleInlineSubmit} className="flex flex-col sm:flex-row gap-2">
              <input type="email" value={inlineEmail} onChange={(e) => setInlineEmail(e.target.value)} placeholder="you@company.com" className="bg-[#12100E] text-white placeholder-gray-600 border border-gray-800 rounded-xl px-4 py-3 text-xs focus:outline-none flex-grow" required />
              <button type="submit" className="bg-[#FF5722] hover:bg-orange-600 text-white font-semibold text-xs px-6 py-3 rounded-xl uppercase tracking-wider transition-all">Submit</button>
            </form>
            {inlineSuccess && <p className="text-emerald-400 text-xs font-semibold">✓ Email saved to pilot queue database.</p>}
          </div>
        </div>
      </section>

      {/* Bottom Footer block container details */}
      <footer className="w-full bg-white border-t border-gray-200 py-10 px-8 text-xs text-gray-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2 max-w-sm">
            <span className="font-bold text-black text-sm block">Sehnsora</span>
            <p className="font-light text-gray-400">Silent haptic navigation and conversational AI smart glasses for the visually impaired.</p>
          </div>
          <div className="flex flex-col items-start md:items-end gap-2 text-left md:text-right">
            <p>© 2026 Sehnsora Framework. All rights reserved.</p>
            <p className="text-[10px] text-gray-400/70">Cyber Valley AI Incubator Build. Prototyping team: Shweta, Raihan, Yograj, and Abhishek.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}