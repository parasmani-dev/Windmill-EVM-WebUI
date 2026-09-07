'use client';

import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Bell, Compass } from 'lucide-react';
import ThreeIphoneCanvas from '@/components/ui/ThreeIphoneCanvas';

/* ═══════════════════════════════════════════════════════════════
   PREMIUM 3D NFT HERO SECTION (DITTO REFERENCE RECONSTRUCTION)
   - Real 3D iPhone with physical titanium chassis, side depth,
     triple camera plateau with bronze rings, LiDAR sensor,
     True Tone flash, Apple logo & realistic screen curvature
   - Perfectly scaled cards filling the lower stage without empty gaps
   - Stardust Archive (bee) in foreground overlapping the iPhone
   - Bee Champion with gold crown & dashed outline placeholder
   - Panda Explorer with 3D cute robot
   - Circular street-grid map with pins & 5-star badge
   ═══════════════════════════════════════════════════════════════ */




/* ── Left Card: Bee Champion (Golden Yellow) ─────────────────── */
function CardBeeChampion() {
  return (
    <div className="w-[195px] sm:w-[220px] md:w-[235px] rounded-[26px] bg-[#FFF8E6] border border-[#FFE7B0] p-4 shadow-[0_20px_45px_rgba(235,160,20,0.18)] select-none transition-all duration-300 hover:scale-[1.03]">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full bg-[#FFA000] flex items-center justify-center text-[9px] text-white font-black">
            👑
          </div>
          <span className="text-[10px] font-black text-[#261B05]">Bee Champion</span>
        </div>
        <span className="text-[8px] font-bold text-[#8C6300]">#01</span>
      </div>

      {/* Character Canvas */}
      <div className="w-full aspect-[4/3.2] rounded-xl bg-gradient-to-br from-[#FFE894] via-[#FFD65C] to-[#FFAE1A] p-2 flex flex-col items-center justify-center relative shadow-inner overflow-hidden border border-white/40">
        <div className="text-3xl drop-shadow-md">🐝</div>
        <div className="mt-1 px-2.5 py-0.5 rounded-full bg-white/80 text-[7.5px] font-extrabold text-[#5C3F00] shadow-2xs">
          Golden Series
        </div>
      </div>

      <div className="mt-2.5 flex items-center justify-between text-[8px] text-[#6E5014]">
        <span>Top Bid</span>
        <span className="font-black text-[#261B05] font-mono text-[9.5px]">1.85 ETH</span>
      </div>
    </div>
  );
}

/* ── Foreground Left Card: Stardust Archive (Overlapping Phone) ─ */
function CardStardustArchive() {
  return (
    <div className="w-[230px] sm:w-[260px] md:w-[280px] rounded-[32px] bg-[#FFFBF9] border border-[#FFE6DE] p-4.5 shadow-[0_26px_60px_rgba(242,90,69,0.22)] select-none transition-all duration-300 hover:scale-[1.03]">
      {/* Card Header with Status Dots */}
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-[#2B1F1C] flex items-center justify-center text-[9px] text-white font-bold">
            ✦
          </div>
          <div>
            <div className="text-[12px] font-black text-[#140F0E] leading-none">Stardust Archive</div>
            <div className="text-[8.5px] font-bold text-[#8C7E7A] mt-0.5">844 items active</div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          <span className="text-[8px] font-mono font-bold text-[#10B981]">LIVE</span>
        </div>
      </div>

      {/* Dark Navy Art Canvas with Authentic Illustrated 3D Bumblebee Motif */}
      <div className="relative w-full aspect-[4/3.2] rounded-2xl bg-gradient-to-b from-[#2B384E] via-[#1E293B] to-[#111827] overflow-hidden flex items-center justify-center p-3 shadow-inner border border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,210,60,0.35),transparent_70%)]" />

        {/* Top Floating Glass Badges */}
        <div className="absolute top-2 left-2.5 flex items-center gap-1.5 z-20">
          <div className="px-2 py-0.5 rounded-full bg-white/15 backdrop-blur-md text-[7px] font-bold text-white/90 border border-white/20">
            Tier 1
          </div>
          <div className="px-2 py-0.5 rounded-full bg-[#F25A45]/30 backdrop-blur-md text-[7px] font-bold text-[#FFAAA0] border border-[#F25A45]/40">
            CryptoNFT
          </div>
        </div>

        {/* 3D Bumblebee with Translucent Wings & Particles */}
        <div className="relative z-10 flex flex-col items-center select-none">
          {/* Translucent Wings */}
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex items-center gap-1 pointer-events-none">
            <div className="w-4.5 h-9 rounded-full bg-gradient-to-t from-white/20 to-white/70 border border-white/60 rotate-[-28deg] shadow-lg backdrop-blur-xs transform -translate-x-1.5" />
            <div className="w-4.5 h-9 rounded-full bg-gradient-to-t from-white/20 to-white/70 border border-white/60 rotate-[28deg] shadow-lg backdrop-blur-xs transform translate-x-1.5" />
          </div>

          {/* Golden Striped Bee Body */}
          <div className="relative w-16 h-12 rounded-[28px] bg-gradient-to-b from-[#FFD23F] via-[#F8B800] to-[#DF7C00] shadow-[0_12px_24px_rgba(0,0,0,0.35)] flex items-center justify-center border-2 border-[#FFE885] overflow-hidden">
            {/* Bold Stripes */}
            <div className="absolute top-0 bottom-0 left-4 w-2 bg-[#201511]" />
            <div className="absolute top-0 bottom-0 left-9 w-2 bg-[#201511]" />
            
            {/* Cute Face details */}
            <div className="absolute top-3.5 right-2 w-1.5 h-2 rounded-full bg-[#18110D]" />
            <div className="absolute bottom-3.5 right-3 w-1.5 h-1 rounded-full bg-[#FF7555] opacity-80" />
            
            {/* Stinger */}
            <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#1A120E] rotate-45 rounded-2xs" />
          </div>

          {/* Spark Particles */}
          <div className="absolute -top-3 -right-4 w-1.5 h-1.5 rounded-full bg-[#FFD54F] blur-[0.5px] shadow-[0_0_6px_#FFD54F]" />
          <div className="absolute top-8 -left-3 w-1 h-1 rounded-full bg-[#FFB74D] blur-[0.5px]" />
          <div className="absolute -bottom-2 right-6 w-1.5 h-1.5 rounded-full bg-[#FFE082] blur-[0.5px]" />
        </div>

        {/* Bottom Trading Floating Status Pill */}
        <div className="absolute bottom-2 inset-x-3 bg-white/10 backdrop-blur-md rounded-xl py-1 px-2.5 flex items-center justify-between border border-white/15 z-20">
          <span className="text-[8px] font-mono text-white/80">VOL: 42.8 ETH</span>
          <span className="text-[8px] font-mono font-black text-[#34D399]">+14.2%</span>
        </div>
      </div>

      {/* Action Bar */}
      <div className="mt-3 flex items-center justify-between pt-0.5">
        <div className="flex items-center gap-1.5">
          <span className="text-[9px] font-bold uppercase tracking-wider text-[#9E8E8A]">Floor</span>
          <span className="text-[12.5px] font-black text-[#F25A45] font-mono">0.60 ETH</span>
        </div>
        <button className="px-4 py-1.5 rounded-full bg-[#140F0E] text-white text-[9.5px] font-black hover:bg-[#F25A45] transition-colors cursor-pointer shadow-sm">
          Trade Now
        </button>
      </div>
    </div>
  );
}

/* ── Center Right Card: Panda Explorer ───────────────────────── */
function CardPandaExplorer() {
  return (
    <div className="w-[220px] sm:w-[250px] md:w-[265px] rounded-[32px] bg-[#FFFBF9] border border-[#FFE6DE] p-4.5 shadow-[0_24px_55px_rgba(242,90,69,0.18)] select-none transition-all duration-300 hover:scale-[1.03]">
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#FF927F] to-[#F25A45] flex items-center justify-center text-[10px] text-white font-bold">
            🤖
          </div>
          <div>
            <div className="text-[12px] font-black text-[#140F0E] leading-none">Panda Explorer</div>
            <div className="text-[8.5px] font-bold text-[#8C7E7A] mt-0.5">250 Series • Verified</div>
          </div>
        </div>
        <Compass className="w-4 h-4 text-[#F25A45]" />
      </div>

      {/* 3D Robot Mascot on Warm Desert Terrain */}
      <div className="relative w-full aspect-[4/3.2] rounded-2xl bg-gradient-to-b from-[#FAF1ED] via-[#EFE0D8] to-[#DEC6BC] p-3 flex flex-col items-center justify-center relative shadow-inner border border-white/60 overflow-hidden">
        {/* Top Badges */}
        <div className="absolute top-2 left-2.5 flex items-center gap-1 z-20">
          <div className="w-4 h-4 rounded-full bg-white/70 backdrop-blur-xs flex items-center justify-center text-[7px] font-black text-[#6B534C] border border-white">
            ⬡
          </div>
          <div className="w-4 h-4 rounded-full bg-white/70 backdrop-blur-xs flex items-center justify-center text-[7px] font-black text-[#6B534C] border border-white">
            ✓
          </div>
        </div>

        {/* 3D Illustrated Cute White Bot Head with Glowing Oval Eyes */}
        <div className="relative z-10 flex flex-col items-center select-none">
          {/* Antenna */}
          <div className="w-1 h-3.5 bg-[#9E8B83] rounded-full -mb-1" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#F25A45] -mb-1 shadow-[0_0_8px_#F25A45]" />

          {/* White Glossy Head Shell */}
          <div className="w-20 h-16 rounded-[22px] bg-gradient-to-b from-white via-[#F6ECE7] to-[#E2D2CA] shadow-[0_10px_22px_rgba(0,0,0,0.18)] p-1.5 flex items-center justify-center border-2 border-white relative">
            {/* Black Screen Face */}
            <div className="w-full h-full rounded-[16px] bg-[#160E0B] flex items-center justify-center gap-3">
              {/* Glowing Oval Eyes */}
              <div className="w-3.5 h-6 rounded-full bg-[#FFF5F2] shadow-[0_0_10px_#FFFFFF] relative">
                <div className="w-1.5 h-2 rounded-full bg-[#160E0B] absolute top-1 left-1" />
              </div>
              <div className="w-3.5 h-6 rounded-full bg-[#FFF5F2] shadow-[0_0_10px_#FFFFFF] relative">
                <div className="w-1.5 h-2 rounded-full bg-[#160E0B] absolute top-1 left-1" />
              </div>
            </div>

            {/* Ear Cylinders */}
            <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-4 bg-[#C5B3AA] rounded-l-md" />
            <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-1.5 h-4 bg-[#C5B3AA] rounded-r-md" />
          </div>

          {/* Small Body & Joints */}
          <div className="w-10 h-5 rounded-b-xl bg-gradient-to-b from-[#E7D6CD] to-[#D5BEB3] -mt-1 shadow-sm flex items-center justify-center border-t border-white/50">
            <div className="w-2 h-1 rounded-full bg-[#160E0B]" />
          </div>
        </div>

        {/* Bottom Platform Shadow */}
        <div className="w-24 h-3 rounded-full bg-[#BAA399]/40 blur-xs -mt-1" />
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="flex -space-x-1.5">
            <div className="w-5 h-5 rounded-full bg-[#FF7A66] border-2 border-white flex items-center justify-center text-[7.5px] text-white font-bold">1</div>
            <div className="w-5 h-5 rounded-full bg-[#FFA000] border-2 border-white flex items-center justify-center text-[7.5px] text-white font-bold">2</div>
            <div className="w-5 h-5 rounded-full bg-[#3B2925] border-2 border-white flex items-center justify-center text-[7.5px] text-white font-bold">3</div>
          </div>
          <span className="text-[8.5px] font-mono text-[#8C7E7A]">offers</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[9px] font-bold text-[#8C7E7A] uppercase">Floor</span>
          <span className="text-[12px] font-black text-[#F25A45] font-mono">0.45 ETH</span>
        </div>
      </div>
    </div>
  );
}

/* ── Far Right Card: Koala / Secondary Explorer ──────────────── */
function CardKoalaExplorer() {
  return (
    <div className="w-[195px] sm:w-[215px] md:w-[230px] rounded-[28px] bg-[#FFFBF9]/90 border border-[#FFE6DE] p-4 shadow-[0_20px_45px_rgba(242,90,69,0.14)] select-none transition-all duration-300 hover:scale-[1.03]">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full bg-[#8E9CA8] flex items-center justify-center text-[9px] text-white font-bold">
            🐨
          </div>
          <span className="text-[10.5px] font-black text-[#140F0E]">Panda Explorer II</span>
        </div>
        <span className="text-[8px] font-bold text-[#8C7E7A]">Rare</span>
      </div>

      <div className="w-full aspect-[4/3] rounded-2xl bg-gradient-to-b from-[#E7EEF3] to-[#CFDAE2] flex items-center justify-center shadow-inner border border-white/50">
        <div className="text-3xl drop-shadow-md">🤖</div>
      </div>

      <div className="mt-2.5 flex items-center justify-between text-[9px]">
        <span className="text-[#8C7E7A]">Current</span>
        <span className="font-black text-[#140F0E] font-mono text-[10px]">0.82 ETH</span>
      </div>
    </div>
  );
}

/* ── Circular Street-Grid Map with Dual Pins (Lower Right) ───── */
function CircularMapRadar() {
  return (
    <div className="w-22 h-22 sm:w-26 sm:h-26 rounded-full bg-white border-2 border-white shadow-[0_14px_32px_rgba(242,90,69,0.2)] p-1 flex items-center justify-center relative overflow-hidden select-none">
      <div className="w-full h-full rounded-full relative overflow-hidden bg-[#F7F2EC]">
        {/* Street Lines Vector */}
        <svg viewBox="0 0 100 100" className="w-full h-full opacity-85">
          <path d="M-10 40 Q40 50 60 20 T110 30" fill="none" stroke="#C5E3EB" strokeWidth="10" strokeLinecap="round" />
          <path d="M70 15 Q85 45 95 65" fill="none" stroke="#C5E3EB" strokeWidth="8" strokeLinecap="round" />
          <path d="M10 0 L10 100 M30 0 L30 100 M50 0 L50 100 M75 0 L75 100 M90 0 L90 100" stroke="#E3DCD3" strokeWidth="2.5" />
          <path d="M0 20 L100 20 M0 45 L100 45 M0 70 L100 70 M0 85 L100 85" stroke="#E3DCD3" strokeWidth="2.5" />
          <path d="M-10 30 L110 80 M20 -10 L90 110" stroke="#D6CEC4" strokeWidth="3" />
          <path d="M12 55 Q25 50 35 65 L28 85 Z" fill="#DDECD8" />
          <path d="M70 70 Q85 68 85 85 L68 90 Z" fill="#DDECD8" />
        </svg>

        {/* Pin 1 (Dark Panda pin) */}
        <div className="absolute top-4 right-5 flex flex-col items-center">
          <div className="w-4.5 h-4.5 rounded-full bg-[#1A1412] text-white flex items-center justify-center text-[7.5px] font-bold shadow-md">
            🐼
          </div>
          <div className="w-0.5 h-1.5 bg-[#1A1412] -mt-0.5 rounded-full" />
        </div>

        {/* Pin 2 (Coral pin) */}
        <div className="absolute bottom-4 left-6 flex flex-col items-center">
          <div className="w-4.5 h-4.5 rounded-full bg-[#F25A45] text-white flex items-center justify-center text-[7.5px] font-bold shadow-md">
            ✦
          </div>
          <div className="w-0.5 h-1.5 bg-[#F25A45] -mt-0.5 rounded-full" />
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN HERO SECTION COMPONENT (SCREENSHOT RECONSTRUCTION)
   - Background: Rich 2-color peach/coral blend framing the card
   - 3D Main Card: 85% width, floating ceramic card with 3D shadow & rounded corners
   - Notched Navbar: Scooped center notch with Creator/Collector toggle, nav links, bell & avatar
   - Small Components: Bee Champion, Dashed Outline, Stardust Archive, 5★, Panda Explorer, Koala & Radar Map
   ═══════════════════════════════════════════════════════════════ */

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState<'Creator' | 'Collector'>('Creator');
  const heroRef = useRef<HTMLElement | null>(null);

  // Subtle Mouse Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 28, stiffness: 180 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const panelRotateX = useTransform(smoothY, [-0.5, 0.5], [0.8, -0.8]);
  const panelRotateY = useTransform(smoothX, [-0.5, 0.5], [-1.2, 1.2]);

  const cardLeftX = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
  const cardLeftY = useTransform(smoothY, [-0.5, 0.5], [-6, 6]);

  const cardRightX = useTransform(smoothX, [-0.5, 0.5], [8, -8]);
  const cardRightY = useTransform(smoothY, [-0.5, 0.5], [6, -6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center pt-28 sm:pt-32 md:pt-36 pb-8 sm:pb-12 px-3 sm:px-6 overflow-hidden select-none"
      style={{
        background: 'linear-gradient(135deg, #FFA088 0%, #FFB29D 35%, #FED5C7 100%)',
      }}
    >
      {/* Studio Ambient Glows for Background Depth */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[55vh] rounded-full bg-white/35 blur-[110px] pointer-events-none" />
      <div className="absolute bottom-8 right-12 w-[35vw] h-[35vh] rounded-full bg-[#FF7055]/25 blur-[95px] pointer-events-none" />
      <div className="absolute top-12 left-10 w-[30vw] h-[30vh] rounded-full bg-[#FFA088]/30 blur-[85px] pointer-events-none" />

      {/* ── 3D MAIN CARD (EXACT 85% SIZE WITH REAL TRANSPARENT NOTCH) ── */}
      <motion.div
        style={{
          rotateX: panelRotateX,
          rotateY: panelRotateY,
          transformPerspective: 1200,
        }}
        className="relative w-[94%] sm:w-[90%] lg:w-[85%] max-w-[1340px] min-h-[86vh] lg:min-h-[820px] p-4 sm:p-6 md:p-8 flex flex-col justify-between"
      >
        {/* ── REAL TRANSPARENT NOTCHED CARD SHAPE ── */}
        {/* 1. Main Lower Card Body (from top-[42px] down to bottom) */}
        <div className="absolute inset-x-0 top-[42px] bottom-0 rounded-b-[44px] sm:rounded-b-[50px] bg-gradient-to-b from-[#FFFDFB] via-[#FFF9F6] to-[#FFF3ED] border-x border-b border-white/90 shadow-[0_32px_95px_rgba(225,95,65,0.22),0_6px_20px_rgba(0,0,0,0.03)] pointer-events-none" />

        {/* 2. Top-Left Shoulder (Flat top, rounded-tl, ends before notch) */}
        <div className="absolute top-0 left-0 right-[calc(50%+115px)] sm:right-[calc(50%+130px)] md:right-[calc(50%+145px)] h-[43px] rounded-tl-[44px] sm:rounded-tl-[50px] bg-[#FFFDFB] border-t border-l border-white/90 pointer-events-none" />

        {/* 3. Top-Right Shoulder (Flat top, rounded-tr, starts after notch) */}
        <div className="absolute top-0 right-0 left-[calc(50%+115px)] sm:left-[calc(50%+130px)] md:left-[calc(50%+145px)] h-[43px] rounded-tr-[44px] sm:rounded-tr-[50px] bg-[#FFFDFB] border-t border-r border-white/90 pointer-events-none" />

        {/* 4. Left Fillet (Smooth white curve dipping into notch) */}
        <div className="absolute top-0 right-[calc(50%+90px)] sm:right-[calc(50%+102px)] md:right-[calc(50%+115px)] w-[26px] sm:w-[30px] h-[43px] pointer-events-none">
          <svg viewBox="0 0 30 43" fill="none" className="w-full h-full">
            <path d="M 0 0 C 15 0, 18 43, 30 43 L 0 43 Z" fill="#FFFDFB" />
            <path d="M 0 0 C 15 0, 18 43, 30 43" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" fill="none" />
          </svg>
        </div>

        {/* 5. Right Fillet (Smooth white curve rising out of notch) */}
        <div className="absolute top-0 left-[calc(50%+90px)] sm:left-[calc(50%+102px)] md:left-[calc(50%+115px)] w-[26px] sm:w-[30px] h-[43px] pointer-events-none">
          <svg viewBox="0 0 30 43" fill="none" className="w-full h-full">
            <path d="M 30 0 C 15 0, 12 43, 0 43 L 30 43 Z" fill="#FFFDFB" />
            <path d="M 30 0 C 15 0, 12 43, 0 43" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" fill="none" />
          </svg>
        </div>

        {/* 6. Notch Floor Border (Horizontal line across bottom of notch) */}
        <div className="absolute top-[42px] left-[calc(50%-90px)] sm:left-[calc(50%-102px)] md:left-[calc(50%-115px)] right-[calc(50%-90px)] sm:right-[calc(50%-102px)] md:right-[calc(50%-115px)] h-[1px] bg-white/90 pointer-events-none" />

        {/* Soft top gradient sheen */}
        <div className="absolute top-[42px] inset-x-0 h-32 bg-gradient-to-b from-white/70 to-transparent pointer-events-none rounded-b-[30px]" />

        {/* ── NOTCHED NAVBAR (PROPORTIONAL FONTS & TRANSPARENT NOTCH) ── */}
        <header className="relative z-30 w-full pt-0.5 sm:pt-1 flex items-center justify-between">
          {/* Left: Infinity Logo & Nav Links */}
          <div className="flex items-center gap-5 sm:gap-7">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-[#1A110F] flex items-center justify-center text-white shadow-md cursor-pointer hover:scale-105 transition-transform">
              <span className="text-lg sm:text-xl font-black leading-none font-mono">∞</span>
            </div>

            <nav className="hidden sm:flex items-center gap-6 text-[13px] sm:text-[14px] font-bold text-[#453633] tracking-tight">
              <a href="#product" className="hover:text-[#F0553F] transition-colors">Product</a>
              <a href="#contact" className="hover:text-[#F0553F] transition-colors">Contact</a>
            </nav>
          </div>

          {/* Center: Creator / Collector Toggle Seated in 100% Transparent Notch */}
          <div className="absolute top-1 sm:top-1.5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1 pointer-events-auto">
            <button
              onClick={() => setActiveTab('Creator')}
              className={`px-5 sm:px-6 py-1.5 sm:py-2 rounded-full text-[12px] sm:text-[13px] font-black transition-all duration-300 cursor-pointer ${
                activeTab === 'Creator'
                  ? 'bg-gradient-to-r from-[#D9452F] to-[#EE5740] text-white shadow-[0_4px_14px_rgba(217,69,47,0.45)]'
                  : 'text-[#7A4B3F] hover:text-[#1A110F]'
              }`}
            >
              Creator
            </button>
            <button
              onClick={() => setActiveTab('Collector')}
              className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-[12px] sm:text-[13px] font-bold transition-all duration-300 cursor-pointer ${
                activeTab === 'Collector'
                  ? 'bg-gradient-to-r from-[#D9452F] to-[#EE5740] text-white shadow-[0_4px_14px_rgba(217,69,47,0.45)]'
                  : 'text-[#7A4B3F] hover:text-[#1A110F]'
              }`}
            >
              Collector
            </button>
          </div>

          {/* Right: Help, Shop, Notification Bell & Avatar */}
          <div className="flex items-center gap-3.5 sm:gap-5">
            <a href="#help" className="hidden md:inline-block text-[13px] sm:text-[14px] font-bold text-[#453633] hover:text-[#F0553F] transition-colors tracking-tight">
              Help
            </a>
            <a href="#shop" className="hidden md:inline-block text-[13px] sm:text-[14px] font-bold text-[#453633] hover:text-[#F0553F] transition-colors tracking-tight">
              Shop
            </a>

            <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1A110F] flex items-center justify-center text-white shadow-xs hover:scale-105 transition-all cursor-pointer">
              <Bell className="w-4 h-4 fill-white text-white" />
            </button>

            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-[#FF7A66] to-[#FFA07A] p-[2px] cursor-pointer shadow-xs hover:scale-105 transition-transform">
              <div className="w-full h-full rounded-full bg-[#2F211F] flex items-center justify-center text-sm text-white font-bold">
                🧑‍🚀
              </div>
            </div>
          </div>
        </header>

        {/* ── EDITORIAL CENTRAL HEADLINE ── */}
        <div className="relative z-20 text-center pt-5 sm:pt-7 md:pt-9 pb-2">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-[60px] font-black tracking-tight text-[#140F0E] leading-[1.04] max-w-4xl mx-auto uppercase"
          >
            LET&apos;S DISCOVER &<br />
            GATHER{' '}
            <span className="text-[#F0553F] drop-shadow-[0_4px_16px_rgba(240,85,63,0.25)]">
              UNIQUE NFTs
            </span>
          </motion.h1>
        </div>

        {/* ── 3D PHYSICAL SHOWCASE STAGE (SMALL COMPONENTS SURROUNDING IPHONE) ── */}
        <div className="relative w-full h-[410px] sm:h-[450px] md:h-[490px] lg:h-[520px] flex items-end justify-center mt-auto">

          {/* 1. Dashed Placeholder Outline Card (Left background) */}
          <div className="absolute left-6 sm:left-14 md:left-24 lg:left-34 top-2 w-[145px] sm:w-[160px] aspect-[4/5] rounded-[26px] border-2 border-dashed border-[#F0D5CC] opacity-65 pointer-events-none hidden sm:block" />

          {/* 2. Far Left Card: Bee Champion (Tilted yellow card) */}
          <motion.div
            style={{ x: cardLeftX, y: cardLeftY }}
            animate={{ y: [-4, 5, -4], rotate: [-8, -6, -8] }}
            transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
            className="absolute -left-2 sm:left-2 md:left-6 lg:left-12 bottom-24 sm:bottom-28 md:bottom-32 z-20 hidden sm:block pointer-events-auto"
          >
            <CardBeeChampion />
          </motion.div>

          {/* 3. Foreground Left Card: Stardust Archive (Overlapping Phone) */}
          <motion.div
            style={{ x: cardLeftX, y: cardLeftY }}
            animate={{ y: [5, -6, 5], rotate: [4, 6, 4] }}
            transition={{ repeat: Infinity, duration: 5.4, ease: 'easeInOut', delay: 0.4 }}
            className="absolute left-2 sm:left-12 md:left-22 lg:left-36 bottom-8 sm:bottom-10 md:bottom-12 z-35 pointer-events-auto"
          >
            <CardStardustArchive />
          </motion.div>

          {/* 4. Bold '5' Rating Badge with Solid Coral Star (Bottom-Left) */}
          <motion.div
            animate={{ y: [-3, 3, -3] }}
            transition={{ repeat: Infinity, duration: 4.8, ease: 'easeInOut' }}
            className="absolute left-2 sm:left-6 md:left-10 bottom-3 sm:bottom-4 md:bottom-5 z-25 hidden md:flex items-center gap-1.5 select-none bg-white/95 px-4.5 py-2.5 rounded-2xl border border-[#FFE7DF] shadow-md backdrop-blur-xs"
          >
            <span className="text-3xl sm:text-4xl font-black text-[#140F0E] leading-none tracking-tighter">5</span>
            <div className="w-6.5 h-6.5 rounded-full bg-[#F0553F] flex items-center justify-center text-white text-xs shadow-[0_2px_8px_rgba(240,85,63,0.5)]">
              ★
            </div>
          </motion.div>

          {/* ── 5. CENTRAL AUTHENTIC 3D iPHONE PRO (THREE.JS REALTIME MESH) ── */}
          <div className="relative z-25 transform translate-y-1 pointer-events-auto flex flex-col items-center">
            <ThreeIphoneCanvas />
          </div>

          {/* 6. Upper Right Card: Panda Explorer (Tilted beige robot card) */}
          <motion.div
            style={{ x: cardRightX, y: cardRightY }}
            animate={{ y: [-4, 5, -4], rotate: [7, 9, 7] }}
            transition={{ repeat: Infinity, duration: 5.8, ease: 'easeInOut', delay: 0.3 }}
            className="absolute right-2 sm:right-12 md:right-22 lg:right-36 bottom-20 sm:bottom-24 md:bottom-26 z-20 pointer-events-auto"
          >
            <CardPandaExplorer />
          </motion.div>

          {/* 7. Far Right Peripheral Card: Koala Explorer */}
          <motion.div
            style={{ x: cardRightX, y: cardRightY }}
            animate={{ y: [4, -5, 4], rotate: [-6, -4, -6] }}
            transition={{ repeat: Infinity, duration: 6.4, ease: 'easeInOut', delay: 0.7 }}
            className="absolute -right-2 sm:right-2 md:right-6 lg:right-12 bottom-10 sm:bottom-12 md:bottom-14 z-15 hidden lg:block opacity-95 pointer-events-auto"
          >
            <CardKoalaExplorer />
          </motion.div>

          {/* 8. Circular Street-Grid Map with Dual Locator Pins (Lower Right) */}
          <motion.div
            animate={{ y: [-3, 4, -3] }}
            transition={{ repeat: Infinity, duration: 5.2, ease: 'easeInOut', delay: 0.5 }}
            className="absolute right-18 sm:right-28 md:right-42 bottom-3 sm:bottom-4 z-15 hidden sm:block pointer-events-auto"
          >
            <CircularMapRadar />
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}

