import React, { useState, useEffect, useRef } from 'react';

export default function SehnsoraDemo() {
  // Modes: 'choice' | 'blind' | 'normal'
  const [userMode, setUserMode] = useState('choice');
  
  // Simulation States: 'onboarding' | 'at-plants' | 'driving-to-apples' | 'on-apples-hold' | 'at-biscuits' | 'ended'
  const [currentStep, setCurrentStep] = useState('onboarding');
  const [showShield, setShowShield] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [hapticText, setHapticText] = useState('');
  const [showHaptic, setShowHaptic] = useState(false);
  const [logs, setLogs] = useState([{ time: new Date().toLocaleTimeString(), text: 'System standing by. Select a preview interface layout below to begin...' }]);
  const [uiStatus, setUiStatus] = useState('Awaiting initialization parameters...');
  
  // Waitlist form states
  const [inlineEmail, setInlineEmail] = useState('');
  const [modalEmail, setModalEmail] = useState('');
  const [inlineSuccess, setInlineSuccess] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);

  // Track all available browser speech voices locally
  const [systemVoices, setSystemVoices] = useState([]);

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

  // Pre-load and listen for browser voices asynchronously upon mount to catch premium engine packages
  useEffect(() => {
    if (!synth) return;

    const loadVoices = () => {
      const availableVoices = synth.getVoices();
      setSystemVoices(availableVoices);
    };

    loadVoices();
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = loadVoices;
    }
  }, [synth]);

  const pushLog = (text) => {
    setLogs((prev) => [...prev, { time: new Date().toLocaleTimeString(), text }]);
  };

  // Helper to dynamically isolate natural sounding premium narration voice profiles from systemVoices state
  const getNaturalVoice = () => {
    if (systemVoices.length === 0) return null;
    
    const premiumVoice = systemVoices.find(voice => 
      voice.lang.startsWith('en') && 
      (voice.name.includes('Natural') || voice.name.includes('Google') || voice.name.includes('Premium'))
    );
    
    return premiumVoice || systemVoices.find(voice => voice.lang === 'en-US') || systemVoices[0];
  };

  const speak = (text, callback) => {
    if (!synth) return;
    synth.cancel(); // Terminate existing voice blocks instantly
    
    const utterance = new SpeechSynthesisUtterance(text);
    const naturalVoice = getNaturalVoice();
    if (naturalVoice) {
      utterance.voice = naturalVoice;
    }
    
    utterance.rate = 0.92; // Slightly natural cadence for structural navigation balance
    utterance.pitch = 1.05; // Slightly warmer human vocal presentation angle

    utterance.onend = () => { if (callback) callback(); };
    synth.speak(utterance);
    pushLog(`<span class="text-[#FF5722]">Headset Audio:</span> "${text}"`);
  };

  const triggerMicrophone = () => {
    if (!recognition) return;
    setUiStatus('Microphone active — Listening...');
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
      pushLog(`<span class="text-emerald-400 font-medium">Voice Captured:</span> "${voicePhrase}"`);

      const step = currentStepRef.current;
      const isAffirmative = voicePhrase.includes('yes') || voicePhrase.includes('sure') || voicePhrase.includes('yeah') || voicePhrase.includes('go') || voicePhrase.includes('yup') || voicePhrase.includes('proceed') || voicePhrase.includes('begin');

      // STATE 1: Onboarding Greeting Step Choice
      if (step === 'onboarding') {
        if (isAffirmative || voicePhrase.includes('demo') || voicePhrase.includes('experience')) {
          setCurrentStep('at-plants');
          executeSegmentRun(7);
        } else {
          speak("No worries at all. Just say yes whenever you are ready to begin, or simply press the action button.", () => {
            setUiStatus('Standby');
            triggerMicrophone();
          });
        }
      }
      // STATE 2: Checked stop at Plants (7s Mark)
      else if (step === 'at-plants') {
        if (isAffirmative || voicePhrase.includes('apple')) {
          setCurrentStep('driving-to-apples');
          executeSegmentRun(12);
        } else {
          speak("We have apples and biscuits on your list today. Should we start looking for them? Say yes.", () => {
            triggerMicrophone();
          });
        }
      }
      // STATE 3: Checked stop at Apples (12s Mark after play and silent pause intervals)
      else if (step === 'on-apples-hold') {
        if (isAffirmative || voicePhrase.includes('biscuit')) {
          setCurrentStep('at-biscuits');
          executeSegmentRun(25);
        } else {
          speak("Should we carry on further down the line to find your biscuits? Just say yes to proceed.", () => {
            triggerMicrophone();
          });
        }
      }
      // STATE 4: Final Feedback Request
      else if (step === 'at-biscuits') {
        speak("Perfect, looks like we arrived safely! I have opened up your checkout summary details right here on the interface screen console.");
      }
    };

    recognition.onerror = () => {
      if (['at-plants', 'on-apples-hold', 'at-biscuits'].includes(currentStepRef.current)) {
        setTimeout(triggerMicrophone, 1200);
      }
    };
  }

  // Interactive Voice Mode Initializer Flow Track
  const handleBlindModeInit = () => {
    setUserMode('blind');
    setShowShield(false);
    pushLog("Voice Assistive interface track enabled.");
    
    const narrativeIntro = "Hi there! Welcome to Sehnsora. Ready to start our regular store shopping route run together? Just say yes to begin.";
    
    speak(narrativeIntro, () => {
      triggerMicrophone();
    });
  };

  // Standard Normal Mode Initializer Flow Track
  const handleNormalModeInit = () => {
    setUserMode('normal');
    setShowShield(false);
    pushLog("Visual telemetry mapping console initialized.");
  };

  // Master Explicit Action Button triggered by click event handles fresh runs, steps, and resets instantly
  const handleMasterDemoAction = () => {
    if (synth) synth.cancel();
    clearInterval(timeTrackerRef.current);
    
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }

    pushLog("Demo interface track launched manually.");
    setCurrentStep('at-plants');
    executeSegmentRun(7);
  };

  // Main Core Video State Engine Tracker
  const executeSegmentRun = (targetTime) => {
    const video = videoRef.current;
    if (!video) return;

    video.play();
    setUiStatus('Tracking position markers...');

    clearInterval(timeTrackerRef.current);
    timeTrackerRef.current = setInterval(() => {
      if (video.currentTime >= targetTime) {
        clearInterval(timeTrackerRef.current);
        video.pause();

        if (targetTime === 7) {
          const plantPrompt = "Alright, we're right at the entrance of the store. I see some green plants over on our left side, and a clear lane moving ahead. Since your list says you want to get some apples and biscuits today, should we head straight inside? Say yes.";
          speak(plantPrompt, () => {
            triggerMicrophone();
          });
        } 
        else if (targetTime === 12) {
          const applePrompt = "Perfect, here are the apples. Your wristband is giving you a nice, soft haptic guidance pulse now to keep your direction locked in.";
          speak(applePrompt, () => {
            triggerHapticVibration("Produce Lane Alignment");
            
            // 1. Resume playing video instantly for exactly 3 seconds
            setUiStatus('Navigating toward fruit display...');
            video.play();
            
            setTimeout(() => {
              // 2. Pause video for 3 seconds of structural retrieval silence
              video.pause();
              setUiStatus('Holding position for item selection (3s)...');
              
              setTimeout(() => {
                // 3. Prompt context transitions to find biscuits
                setCurrentStep('on-apples-hold');
                const holdQuestion = "Got the apples! Should we carry on down the aisle to find the biscuits? Say yes to proceed.";
                speak(holdQuestion, () => {
                  triggerMicrophone();
                });
              }, 3000); // 3 seconds pause delay

            }, 3000); // 3 seconds play duration
          });
        } 
        else if (targetTime === 25) {
          setCurrentStep('ended');
          const biscuitPrompt = "And here are the biscuits, right on time! Your wristband is letting you know you're completely lined up with the shelf box space.";
          speak(biscuitPrompt, () => {
            triggerHapticVibration("Bakery Section Proximity Lock");
            
            setTimeout(() => {
              const endSurvey = "Awesome, we found everything on our list! How did it feel using our gentle navigation loop today?";
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
      
      {/* Click To Initialize Operating Mode Multi-Choice Interface Panel */}
      {showShield && (
        <div className="fixed inset-0 bg-[#12100E]/98 z-[100] flex flex-col items-center justify-center p-6 text-center text-white transition-opacity duration-500">
          <div className="space-y-6 max-w-2xl bg-[#1A1715] p-10 rounded-[32px] border border-gray-800 shadow-2xl">
            <h1 className="text-4xl font-light serif-title text-[#F4F1EA]">Welcome to <span className="text-[#FF5722] font-normal">Sehnsora</span></h1>
            <p className="text-gray-400 text-sm font-light tracking-wide max-w-md mx-auto">Please select a dashboard view preference profile below to initialize screen navigation settings.</p>
            
            <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-amber-500 bg-amber-500/10 px-4 py-2 border border-amber-500/20 rounded-xl animate-pulse">
              🔈 VOLUME CHECK: Verify your speaker sound is turned up clear and high.
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <button 
                onClick={handleBlindModeInit}
                className="bg-[#FF5722] hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-xl text-sm uppercase tracking-wider transition-all cursor-pointer shadow-lg hover:scale-[1.02]"
              >
                Assistive Voice Mode
              </button>
              <button 
                onClick={handleNormalModeInit}
                className="bg-transparent border border-gray-700 hover:border-white text-gray-300 hover:text-white font-semibold px-8 py-4 rounded-xl text-sm uppercase tracking-wider transition-all cursor-pointer"
              >
                Standard Web View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Completion Waitlist Conversion Popup Modal Component */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#12100E] border border-gray-800 text-white rounded-[32px] p-8 md:p-10 max-w-md w-full text-center space-y-6 relative shadow-2xl">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white text-xs font-mono p-2">✕ CLOSE</button>
            <span className="text-[10px] font-mono tracking-widest text-[#FF5722] font-bold block uppercase">Simulation Complete</span>
            <h3 className="serif-title text-3xl font-light">Join the Priority Circle.</h3>
            <p className="text-gray-400 text-xs font-light leading-relaxed">Thank you for finishing our voice prototype shopping demo run! Reserve your spot below to follow our engineering updates and get alpha kit testing trials.</p>
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
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-[#1E1A16] flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#FF5722]"></div>
            </div>
            <span className="text-xl font-bold tracking-tight text-[#1E1A16]">Sehnsora</span>
          </div>
          <nav className="hidden md:flex items-center gap-10 text-sm font-medium text-gray-600">
            <a href="#demo-console" className="hover:text-black transition-colors">Interactive Demo</a>
            <a href="#why-it-matters" className="hover:text-black transition-colors">Core Pillars</a>
            <a href="#ecosystem-expansion" className="hover:text-black transition-colors">Cognitive Stack</a>
            <a href="#team-section" className="hover:text-black transition-colors">The Team</a>
          </nav>
          <a href="#waitlist" className="bg-black hover:bg-gray-800 text-white px-6 py-2.5 rounded-full font-medium text-xs tracking-wide uppercase transition-all">
            Join Waitlist
          </a>
        </div>
      </header>

      {/* Pitch Deck Framed Hero Section */}
      <section className="max-w-7xl mx-auto px-8 pt-16 pb-12 text-center space-y-6">
        <div className="inline-flex items-center gap-2 border border-orange-200 bg-orange-50/50 px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-wider text-orange-700 uppercase shadow-2xs">
          ● VALIDATED BY REAL US WORLDWIDE USERS
        </div>
        <h2 className="text-5xl md:text-7xl font-light serif-title tracking-tight text-black max-w-4xl mx-auto leading-[1.08]">
          Building access today, <br /><span className="italic font-normal text-gray-500">defines independence.</span>
        </h2>
        <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
          Sehnsora architecture links non-auditory haptic orientation bands directly to embedded, hardware-isolated AI smart glasses. Empowering visually impaired individuals with absolute spatial navigation autonomy without sensory blockage.
        </p>

        {/* Market Matrix Grids from Pitch Deck */}
        <div className="max-w-4xl mx-auto pt-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-left border-t border-gray-300/50 mt-6">
          <div>
            <div className="text-3xl font-light text-black font-mono">300M+</div>
            <div className="text-[10px] uppercase font-mono tracking-wider text-orange-600 font-bold">Global Users</div>
            <div className="text-[11px] text-gray-500 mt-1 font-light leading-tight">Visually impaired individuals worldwide requiring safe indoor/outdoor mapping infrastructure.</div>
          </div>
          <div>
            <div className="text-3xl font-light text-black font-mono">$7.76B</div>
            <div className="text-[10px] uppercase font-mono tracking-wider text-gray-400 font-bold">TAM Market Core</div>
            <div className="text-[11px] text-gray-500 mt-1 font-light leading-tight">Target addressable assistive technology sector for sensory and vision-loss care.</div>
          </div>
          <div>
            <div className="text-3xl font-light text-black font-mono">$30.4B</div>
            <div className="text-[10px] uppercase font-mono tracking-wider text-gray-400 font-bold">Assistive Tech Industry</div>
            <div className="text-[11px] text-gray-500 mt-1 font-light leading-tight">Total valuation of the global adaptive, rehabilitative equipment market space.</div>
          </div>
          <div>
            <div className="text-3xl font-light text-orange-600 font-mono">€159</div>
            <div className="text-[10px] uppercase font-mono tracking-wider text-orange-600 font-bold">Target Hardware Price</div>
            <div className="text-[11px] text-gray-500 mt-1 font-light leading-tight">Disruptive cost entry benchmark compared to baseline complex market structures.</div>
          </div>
        </div>
      </section>

      {/* Running Marquee Badges Stripe */}
      <div className="w-full bg-[#12100E] text-white py-3 font-mono text-[11px] uppercase tracking-widest overflow-hidden whitespace-nowrap border-y border-gray-800">
        <div className="inline-block space-x-12 animate-pulse">
          <span>Local Camera Feed AI</span> <span className="text-[#FF5722]">●</span>
          <span>Zero External Beacons Required</span> <span className="text-[#FF5722]">●</span>
          <span>Edge-Isolated Processing Privacy</span> <span className="text-[#FF5722]">●</span>
          <span>Silent Tactical Wristband Coordination</span>
        </div>
      </div>

      {/* Sandbox Terminal Rendering Component Matrix block (KEEPING DEMO EXACTLY AS REQUESTED) */}
      <section id="demo-console" className="max-w-7xl w-full mx-auto px-8 py-10 scroll-mt-24">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <span className="text-[11px] uppercase font-mono font-bold tracking-widest text-orange-600 block mb-1">01 / LIVE DEMO INTERFACE</span>
            <h3 className="serif-title text-4xl font-light text-black">See It In Action. <span className="italic text-gray-400 font-normal">Real-world simulation lanes.</span></h3>
          </div>
          
          <button 
            onClick={handleMasterDemoAction}
            className="bg-black hover:bg-gray-800 text-white font-semibold text-xs px-6 py-3.5 rounded-xl uppercase tracking-wider transition-all cursor-pointer shadow-sm hover:scale-[1.01]"
          >
            {currentStep === 'onboarding' || currentStep === 'choice' ? 'Start Store Demo Run' : 'Restart Demo Run'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 bg-white border border-gray-200 shadow-sm rounded-2xl p-5 flex flex-col justify-between">
            <div className="aspect-video w-full rounded-xl overflow-hidden bg-black relative border border-gray-100 shadow-inner">
              <video ref={videoRef} className="w-full h-full object-cover" playsInline>
                <source src="/static/video.mp4" type="video/mp4" />
              </video>
              <div className="absolute bottom-4 left-4 right-4 bg-[#151311]/95 border border-white/10 backdrop-blur-md p-3 rounded-xl text-center font-mono text-[10px] text-orange-400 tracking-wider uppercase font-medium shadow-lg">
                Device State: {uiStatus}
              </div>
            </div>

            {showHaptic && (
              <div className="mt-4 p-4 bg-orange-50 border border-orange-200 text-orange-800 rounded-xl text-center font-mono text-xs uppercase tracking-wider animate-pulse font-medium">
                {hapticText}
              </div>
            )}
          </div>

          <div className="lg:col-span-5 flex flex-col">
            <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 flex flex-col justify-between h-full">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-gray-400">System Logs</span>
                  <div className="inline-flex items-center gap-1.5 bg-red-50 text-red-700 px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-wide">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping"></span> Live Telemetry Feed
                  </div>
                </div>
                <h3 className="serif-title text-2xl font-light text-black">Device Interactions</h3>
                
                <div className="bg-[#1A1715] rounded-xl p-4 h-64 overflow-y-auto font-mono text-[11px] text-[#A89F95] space-y-2 border border-gray-900 shadow-inner">
                  {logs.map((log, idx) => (
                    <div key={idx} className="leading-relaxed border-b border-gray-800/40 pb-1 last:border-0">
                      <span className="text-gray-600 font-medium">[{log.time}]</span> <span dangerouslySetInnerHTML={{ __html: log.text }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Strategic Pillars Section From Competitive Slide */}
      <section id="why-it-matters" className="max-w-7xl w-full mx-auto px-8 py-14 border-t border-gray-300/40 scroll-mt-24">
        <span className="text-[11px] uppercase font-mono font-bold tracking-widest text-orange-600 block mb-2">02 / CORE PRODUCT SYSTEM PILLARS</span>
        <h3 className="serif-title text-4xl font-light text-black mb-10">Uncompromising safety. <br /><span className="italic text-gray-500 font-normal">How we validate against existing platforms.</span></h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-8 space-y-4 shadow-2xs">
            <div className="w-10 h-10 bg-orange-50 text-orange-600 font-bold rounded-xl flex items-center justify-center font-mono text-sm">✓</div>
            <h4 className="text-xl font-bold tracking-tight text-black">Absolute Privacy</h4>
            <p className="text-xs text-gray-600 font-light leading-relaxed">
              Equipped with hardware-isolated Local AI on-edge components. Unlike typical frames that stream active spatial data environments onto cloud servers, camera feeds are decoded instantly on the frame with no storage leak.
            </p>
            <div className="text-[10px] font-mono font-bold tracking-wider text-orange-600 bg-orange-50 px-2 py-1 rounded inline-block uppercase">Verified Edge Architecture</div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-2xl p-8 space-y-4 shadow-2xs">
            <div className="w-10 h-10 bg-orange-50 text-orange-600 font-bold rounded-xl flex items-center justify-center font-mono text-sm">✓</div>
            <h4 className="text-xl font-bold tracking-tight text-black">Unfailing Reliability</h4>
            <p className="text-xs text-gray-600 font-light leading-relaxed">
              By isolating primary path orientations into non-auditory haptic feedback pulses across the sensory arm assembly, the layout operates perfectly in dead network signals, subways, basements, and high-noise environments.
            </p>
            <div className="text-[10px] font-mono font-bold tracking-wider text-gray-400 bg-gray-100 px-2 py-1 rounded inline-block uppercase">Infrastructure Free</div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-8 space-y-4 shadow-2xs">
            <div className="w-10 h-10 bg-orange-50 text-orange-600 font-bold rounded-xl flex items-center justify-center font-mono text-sm">✓</div>
            <h4 className="text-xl font-bold tracking-tight text-black">Disruptive Price Target</h4>
            <p className="text-xs text-gray-600 font-light leading-relaxed">
              Standard custom navigation configurations command heavy asset installations or thousands in entry fees. Sehnsora sets an accessible target at a €159 benchmark to ensure broad community accessibility.
            </p>
            <div className="text-[10px] font-mono font-bold tracking-wider text-gray-400 bg-gray-100 px-2 py-1 rounded inline-block uppercase">B2C & NGO Marketplace Ready</div>
          </div>
        </div>
      </section>

      {/* Extensibility Stack Section From Pitch Deck */}
      <section id="ecosystem-expansion" className="max-w-7xl w-full mx-auto px-8 py-14 border-t border-gray-300/40 scroll-mt-24">
        <span className="text-[11px] uppercase font-mono font-bold tracking-widest text-orange-600 block mb-2">03 / COGNITIVE STACK EXTENSION</span>
        <h3 className="serif-title text-4xl font-light text-black mb-4">Beyond Vision Care.</h3>
        <p className="text-sm text-gray-600 font-light max-w-2xl mb-10">
          The embedded camera feed metrics and machine learning modules aren't restricted to directional tracking; our spatial architecture scales to provide functional care frameworks for adjacent global communities.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-b from-[#1A1715] to-[#12100E] border border-gray-900 rounded-2xl p-8 space-y-4 text-white">
            <span className="text-[10px] font-mono font-bold tracking-widest text-orange-500 block uppercase">Ecosystem Target 01</span>
            <h4 className="text-xl font-light serif-title">Alzheimer’s Care</h4>
            <ul className="space-y-2 text-xs text-gray-400 font-light pt-2">
              <li className="flex items-start gap-2"><span>•</span> Active Real-Time Face Detection Engine</li>
              <li className="flex items-start gap-2"><span>•</span> Contextual Cognitive Environmental Awareness</li>
              <li className="flex items-start gap-2"><span>•</span> Familiar Entity Text Prompt Subsystems</li>
            </ul>
          </div>

          <div className="bg-gradient-to-b from-[#1A1715] to-[#12100E] border border-gray-900 rounded-2xl p-8 space-y-4 text-white">
            <span className="text-[10px] font-mono font-bold tracking-widest text-orange-500 block uppercase">Ecosystem Target 02</span>
            <h4 className="text-xl font-light serif-title">Autism Spectrum Support</h4>
            <ul className="space-y-2 text-xs text-gray-400 font-light pt-2">
              <li className="flex items-start gap-2"><span>•</span> Dynamic Auditory and Visual Reminders</li>
              <li className="flex items-start gap-2"><span>•</span> Chaos/Overwhelm Sensory Filtering Systems</li>
              <li className="flex items-start gap-2"><span>•</span> Linear Task Execution Prompts via Glass HUD</li>
            </ul>
          </div>

          <div className="bg-gradient-to-b from-[#1A1715] to-[#12100E] border border-gray-900 rounded-2xl p-8 space-y-4 text-white">
            <span className="text-[10px] font-mono font-bold tracking-widest text-orange-500 block uppercase">Ecosystem Target 03</span>
            <h4 className="text-xl font-light serif-title">Senior Citizen Independence</h4>
            <ul className="space-y-2 text-xs text-gray-400 font-light pt-2">
              <li className="flex items-start gap-2"><span>•</span> Continuous Structural Hazard Detection</li>
              <li className="flex items-start gap-2"><span>•</span> Non-Auditory Fall-Risk Spatial Guidance Guidance</li>
              <li className="flex items-start gap-2"><span>•</span> Autonomous Daily Living Navigation Matrices</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Meet The Team Section directly matching Pitch Deck roles */}
      <section id="team-section" className="max-w-7xl w-full mx-auto px-8 py-14 border-t border-gray-300/40 scroll-mt-24">
        <span className="text-[11px] uppercase font-mono font-bold tracking-widest text-orange-600 block mb-2">04 / CORE ARCHITECTS</span>
        <h3 className="serif-title text-4xl font-light text-black mb-10">Meet the Team. <br /><span className="italic text-gray-500 font-normal">Cyber Valley AI Incubator Build.</span></h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center space-y-2 shadow-2xs">
            <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto border border-gray-200 flex items-center justify-center text-xl font-bold text-gray-400">S</div>
            <h4 className="font-bold text-black text-sm tracking-tight">Shweta</h4>
            <div className="text-[11px] font-mono text-orange-600 uppercase tracking-wider font-semibold">Product Strategist</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center space-y-2 shadow-2xs">
            <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto border border-gray-200 flex items-center justify-center text-xl font-bold text-gray-400">R</div>
            <h4 className="font-bold text-black text-sm tracking-tight">Raihan</h4>
            <div className="text-[11px] font-mono text-orange-600 uppercase tracking-wider font-semibold">Embedded AI Engineer</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center space-y-2 shadow-2xs">
            <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto border border-gray-200 flex items-center justify-center text-xl font-bold text-gray-400">Y</div>
            <h4 className="font-bold text-black text-sm tracking-tight">Yograj</h4>
            <div className="text-[11px] font-mono text-orange-600 uppercase tracking-wider font-semibold">Mechanical Designer</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center space-y-2 shadow-2xs">
            <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto border border-gray-200 flex items-center justify-center text-xl font-bold text-gray-400">A</div>
            <h4 className="font-bold text-black text-sm tracking-tight">Abhishek</h4>
            <div className="text-[11px] font-mono text-orange-600 uppercase tracking-wider font-semibold">Embedded Architect</div>
          </div>
        </div>

        <div className="mt-8 p-4 bg-orange-50/50 border border-orange-200/60 rounded-xl text-center text-xs text-orange-800 font-light max-w-xl mx-auto">
          <strong>Current Pipeline Status:</strong> Haptic band System Design fully validated alongside localized hardware engine loops.
        </div>
      </section>

      {/* Inline Bottom Waitlist Input layout row */}
      <section id="waitlist" className="max-w-7xl w-full mx-auto px-8 py-12 scroll-mt-24">
        <div className="bg-[#12100E] rounded-[32px] p-10 md:p-16 text-white grid grid-cols-1 lg:grid-cols-12 gap-12 items-center shadow-xl relative overflow-hidden">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-[11px] font-mono tracking-widest text-[#FF5722] font-bold block uppercase">05 / DISTRIBUTION CHANNEL</span>
            <h3 className="serif-title text-4xl md:text-5xl font-light text-[#F4F1EA] tracking-tight leading-tight">
              Scale true access to <span className="text-[#FF5722] italic font-normal">your institution.</span>
            </h3>
            <p className="text-gray-400 font-light text-xs md:text-sm max-w-xl leading-relaxed">
              We coordinate integrations directly alongside Rehabilitation Centers, Blind Schools, and specialized NGOs. Join the early pipeline cohort to secure localized pilot trials.
            </p>
          </div>

          <div className="lg:col-span-5 bg-[#1A1715] border border-gray-800 rounded-2xl p-6 space-y-4">
            <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase block font-bold">Incubator Pipeline Access</span>
            <h4 className="serif-title text-xl text-white font-light">Reserve a testing bracket.</h4>
            <form onSubmit={handleInlineSubmit} className="flex flex-col sm:flex-row gap-2">
              <input type="email" value={inlineEmail} onChange={(e) => setInlineEmail(e.target.value)} placeholder="coordinator@institution.org" className="bg-[#12100E] text-white placeholder-gray-600 border border-gray-800 rounded-xl px-4 py-3 text-xs focus:outline-none flex-grow" required />
              <button type="submit" className="bg-[#FF5722] hover:bg-orange-600 text-white font-semibold text-xs px-6 py-3 rounded-xl uppercase tracking-wider transition-all">Register</button>
            </form>
            {inlineSuccess && <p className="text-emerald-400 text-xs font-semibold">✓ Saved to the alpha test testing registry.</p>}
          </div>
        </div>
      </section>

      {/* Bottom Footer block container details */}
      <footer className="w-full bg-white border-t border-gray-200 py-10 px-8 text-xs text-gray-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2 max-w-sm">
            <span className="font-bold text-black text-sm block">Sehnsora</span>
            <p className="font-light text-gray-400">Isolated local AI smart glasses and standalone non-auditory orientation frameworks.</p>
          </div>
          <div className="flex flex-col items-start md:items-end gap-2 text-left md:text-right">
            <p>© 2026 Sehnsora Systems. All rights reserved.</p>
            <p className="text-[10px] text-gray-400/70">"Building access today, defines independence."</p>
          </div>
        </div>
      </footer>
    </div>
  );
}