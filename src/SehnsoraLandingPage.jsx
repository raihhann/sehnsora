import React, { useState } from 'react';
import { Shield, Eye, ShoppingBag, Radio, Navigation, Sliders, Smartphone, Layers, ArrowRight, Activity } from 'lucide-react';

export default function SehnsoraLandingPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F3F9] text-[#2C2543] font-sans antialiased">
      
      {/* Development Banner */}
      <div className="bg-[#E6E0FA] text-[#5A469D] text-center py-2 px-4 text-xs md:text-sm font-semibold tracking-wide border-b border-[#DCD3F5] flex items-center justify-center gap-2">
        <Activity className="w-4 h-4 animate-pulse text-[#7B61FF]" />
        Currently in active development via the Cyber Valley AI Incubator. Sign up for early prototype access!
      </div>

      {/* Navigation */}
      <header className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1E254C] to-[#5A469D] flex items-center justify-center shadow-md">
            <Radio className="w-5 h-5 text-white animate-pulse" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-[#1E254C]">Sehnsora</span>
        </div>
        <a 
          href="#waitlist" 
          className="bg-[#1E254C] hover:bg-[#2c3770] text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-all shadow-sm"
        >
          Join Waitlist
        </a>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-24 md:pt-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-[#E6E0FA] text-[#5A469D] px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#7B61FF] animate-ping"></span>
            The Future of Assistive Tech
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#1E254C] leading-tight tracking-tight">
            One seamless aid for movement and shopping
          </h1>
          <p className="text-lg text-[#534F63] max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
            Navigation is hard. Shopping is harder. Sehnsora bridges the gap for blind and visually impaired users by blending dual-stage haptic navigation and vision-AI assistance into a single unified flow.
          </p>
          
          {/* Quick Waitlist Box */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0 pt-4">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white border border-[#DCD3F5] px-4 py-3.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#7B61FF] flex-grow shadow-sm text-[#2C2543]"
              required
            />
            <button 
              type="submit" 
              className="bg-[#5A469D] hover:bg-[#4A3982] text-white px-6 py-3.5 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-md group"
            >
              Get Updates 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
          {submitted && (
            <p className="text-sm text-green-600 font-medium pt-2">✓ Thanks! We will keep you updated on our launch journey.</p>
          )}
        </div>

        {/* Hero Visual Block */}
        <div className="lg:col-span-5 flex justify-center relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-96 md:h-96 bg-gradient-to-tr from-[#E6E0FA] to-[#DCD3F5] rounded-full blur-3xl -z-10 opacity-70"></div>
          <div className="bg-white border border-[#E6E0FA] p-8 rounded-3xl shadow-xl w-full max-w-sm space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#1E254C] text-white text-[10px] uppercase font-bold tracking-widest px-4 py-1.5 rounded-bl-xl">
              Concept Blueprint
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-[#F5F3F9] rounded-2xl border border-[#E6E0FA] flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#5A469D] text-white flex items-center justify-center shadow-inner">
                  <Sliders className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#1E254C]">Haptic Navigation Band</h4>
                  <p className="text-xs text-[#6F6A8A]">Low-distraction, audio-free orientation</p>
                </div>
              </div>
              <div className="p-4 bg-[#F5F3F9] rounded-2xl border border-[#E6E0FA] flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#1E254C] text-white flex items-center justify-center shadow-inner">
                  <Eye className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#1E254C]">Camera Smart Glasses</h4>
                  <p className="text-xs text-[#6F6A8A]">Live scene description & item location</p>
                </div>
              </div>
            </div>
            <div className="pt-2 border-t border-[#F5F3F9] flex justify-between items-center text-xs text-[#6F6A8A]">
              <span>Hardware Ecosystem</span>
              <span className="font-semibold text-[#5A469D]">Dual-Phase Assist</span>
            </div>
          </div>
        </div>
      </section>

      {/* The Core Challenge Section */}
      <section className="bg-[#1E254C] text-white py-20 px-6">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Bridging Fragmented Solutions</h2>
            <p className="text-[#A59FC2] text-sm md:text-base">
              Today’s tools help beautifully with outdoor travel or highly specific standalone tasks, but they rarely synergize seamlessly together.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#262E5C] border border-[#323B70] p-6 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#3A4585] flex items-center justify-center text-[#E6E0FA] font-bold">01</div>
              <h3 className="text-lg font-semibold text-[#E6E0FA]">Traditional Cane Tool</h3>
              <p className="text-[#A59FC2] text-sm leading-relaxed">
                Simple and deeply reliable ground-level physical detection. Widely trusted, but limited when navigating structured dynamic indoor zones or identifying raw physical products on marketplace shelves.
              </p>
            </div>
            <div className="bg-[#262E5C] border border-[#323B70] p-6 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#3A4585] flex items-center justify-center text-[#E6E0FA] font-bold">02</div>
              <h3 className="text-lg font-semibold text-[#E6E0FA]">Fragmented Apps & Audio</h3>
              <p className="text-[#A59FC2] text-sm leading-relaxed">
                Newer setups introduce generic audio triggers or mobile software variations, but constant conflicting hardware configurations create split, disconnected workflows for target users.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dual Stage System */}
      <section className="max-w-7xl mx-auto px-6 py-24 space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#1E254C]">The Two-Stage Architecture</h2>
          <p className="text-[#534F63] text-sm md:text-base">
            Sehnsora splits environmental challenges into layout-focused hardware tracking layers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Stage 1 */}
          <div className="bg-white border border-[#E6E0FA] p-8 rounded-3xl shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-block bg-[#F5F3F9] text-[#5A469D] font-bold px-3 py-1 rounded-md text-xs tracking-wider">
                STAGE 1 — NAVIGATION
              </div>
              <h3 className="text-2xl font-bold text-[#1E254C]">Outdoor Assistance</h3>
              <p className="text-sm text-[#534F63] leading-relaxed">
                Utilizes a wearable tactical haptic band to provide continuous, clear directional orientation guidelines, obstacle radar scanning parameters, and immediate physical alerts.
              </p>
              <ul className="space-y-2 text-sm text-[#534F63] pt-2">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#5A469D]" /> Low-distraction, completely audio-free tracking
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#5A469D]" /> Absolute spatial safety in unfamiliar outdoor environments
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#5A469D]" /> Integrated path configurations via continuous GPS localization
                </li>
              </ul>
            </div>
            <div className="pt-4 border-t border-[#F5F3F9] flex items-center justify-between text-xs font-semibold text-[#5A469D]">
              <span>Hardware: Haptic Band</span>
              <span>Focus: Physical Navigation</span>
            </div>
          </div>

          {/* Stage 2 */}
          <div className="bg-white border border-[#E6E0FA] p-8 rounded-3xl shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-block bg-[#1E254C] text-white font-bold px-3 py-1 rounded-md text-xs tracking-wider">
                STAGE 2 — SHOPPING
              </div>
              <h3 className="text-2xl font-bold text-[#1E254C]">Indoor Shopping Solution</h3>
              <p className="text-sm text-[#534F63] leading-relaxed">
                Activates smart glasses equipped with an embedded camera system that streams feed updates straight to our local Edge-AI model for description playback.
              </p>
              <ul className="space-y-2 text-sm text-[#534F63] pt-2">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#1E254C]" /> Real-time camera-enabled product identification
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#1E254C]" /> Intuitive context guidance for complex commercial retail settings
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#1E254C]" /> AI scene caption outputs sent via direct Bluetooth audio
                </li>
              </ul>
            </div>
            <div className="pt-4 border-t border-[#F5F3F9] flex items-center justify-between text-xs font-semibold text-[#1E254C]">
              <span>Hardware: Smart Glasses</span>
              <span>Focus: Retail Expansion</span>
            </div>
          </div>
        </div>
      </section>

      {/* Engineering Challenges */}
      <section className="bg-[#E6E0FA] py-16 px-6 border-y border-[#DCD3F5]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 space-y-2">
              <h3 className="text-2xl font-bold text-[#1E254C]">Under the Hood</h3>
              <p className="text-xs text-[#5A469D] font-bold tracking-wider uppercase">Active Engineering Challenges</p>
              <p className="text-[#534F63] text-sm">
                We believe in architectural transparency. Here are the core technical problems our incubator team is optimizing right now:
              </p>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-xl border border-[#DCD3F5] space-y-2">
                <Smartphone className="w-5 h-5 text-[#5A469D]" />
                <h4 className="font-bold text-xs text-[#1E254C]">Latency Control</h4>
                <p className="text-[11px] text-[#6F6A8A]">Streaming frame details from embedded glass cameras to mobile devices with minimal latency lag.</p>
              </div>
              <div className="bg-white p-5 rounded-xl border border-[#DCD3F5] space-y-2">
                <Layers className="w-5 h-5 text-[#5A469D]" />
                <h4 className="font-bold text-xs text-[#1E254C]">On-Device Inference</h4>
                <p className="text-[11px] text-[#6F6A8A]">Compressing dynamic multi-modal vision-captioning nodes to execute fluidly on user mobile hardware.</p>
              </div>
              <div className="bg-white p-5 rounded-xl border border-[#DCD3F5] space-y-2">
                <Radio className="w-5 h-5 text-[#5A469D]" />
                <h4 className="font-bold text-xs text-[#1E254C]">Radar Awareness</h4>
                <p className="text-[11px] text-[#6F6A8A]">Designing accurate object tracking matrices directly onto our wearable haptic strap module.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Roadmap Overview */}
      <section className="max-w-5xl mx-auto px-6 py-24 space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1E254C]">Growth Pathways</h2>
          <p className="text-sm text-[#534F63]">How we plan to scale from our incubator MVP out into the market.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-6 bg-white border border-[#E6E0FA] rounded-2xl shadow-sm space-y-2">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#5A469D]">Hardware Sales</h4>
            <p className="text-xs text-[#534F63]">Direct consumer access via standalone purchases of the haptic tracking wristband.</p>
          </div>
          <div className="p-6 bg-white border border-[#E6E0FA] rounded-2xl shadow-sm space-y-2">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#5A469D]">App Subscriptions</h4>
            <p className="text-xs text-[#534F63]">Unlocking vision models, advanced mapping nodes, and semantic grocery items.</p>
          </div>
          <div className="p-6 bg-white border border-[#E6E0FA] rounded-2xl shadow-sm space-y-2">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#5A469D]">B2B Partnerships</h4>
            <p className="text-xs text-[#534F63]">Coordinated rollouts alongside modern retail sectors, rehabilitation entities, and accessibility frameworks.</p>
          </div>
        </div>
      </section>

      {/* Footer Waitlist Area */}
      <section id="waitlist" className="max-w-4xl mx-auto px-6 pb-24 text-center space-y-8">
        <div className="bg-gradient-to-br from-[#1E254C] to-[#303B7A] rounded-3xl p-8 md:p-12 text-white space-y-6 shadow-xl relative overflow-hidden">
          <div className="space-y-3">
            <h3 className="text-2xl md:text-4xl font-bold">Follow our development arc</h3>
            <p className="text-[#A59FC2] text-xs md:text-sm max-w-lg mx-auto">
              Join our mailing list to receive progress reports, engineering lab notes, and prototype demonstration logs.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2">
            <input 
              type="email" 
              placeholder="Your email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#262E5C] text-white placeholder-[#78719C] border border-[#3A4585] px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#7B61FF] flex-grow"
              required
            />
            <button type="submit" className="bg-white hover:bg-[#F5F3F9] text-[#1E254C] px-6 py-3 rounded-xl font-bold text-sm transition-all">
              Join Waitlist
            </button>
          </form>
        </div>

        {/* Small footer text */}
        <div className="text-xs text-[#8A85A3] space-y-1">
          <p>© 2026 Sehnsora Inc. All rights reserved.</p>
          <p>Designed with pride at the Cyber Valley AI Incubator. Built by Shweta, Raihan, Yograj, and Abhishek.</p>
        </div>
      </section>

    </div>
  );
}