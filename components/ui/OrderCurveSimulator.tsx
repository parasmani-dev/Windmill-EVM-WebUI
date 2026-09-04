'use client';

import React, { useMemo } from 'react';

interface CurveSimulatorProps {
  orderType: 'Buy' | 'Sell';
  startPrice: number;
  slope: number;
  minPrice: number;
  maxPrice: number;
  timeRangeMinutes?: number;
  showCounterOrder?: boolean;
}

export default function OrderCurveSimulator({
  orderType,
  startPrice,
  slope,
  minPrice,
  maxPrice,
  timeRangeMinutes = 10,
  showCounterOrder = true,
}: CurveSimulatorProps) {
  const timeSpanSec = timeRangeMinutes * 60;
  const steps = 50;

  // Calculate user order points & prices
  const { points, minObservedPrice, maxObservedPrice, endPrice, counterPoints, matchTimeSec, matchPrice } = useMemo(() => {
    let minP = Infinity;
    let maxP = -Infinity;

    const userPrices: number[] = [];
    const counterPrices: number[] = [];

    // Counter order parameters (simulated market counterparty)
    const counterType = orderType === 'Buy' ? 'Sell' : 'Buy';
    // Offset start price slightly to show eventual intersection
    const counterStartPrice = orderType === 'Buy' ? startPrice * 0.9 : startPrice * 1.1;
    const counterSlope = orderType === 'Buy' ? Math.abs(slope || 0.1) : -Math.abs(slope || 0.1);

    let matchSec: number | null = null;
    let matchP: number | null = null;

    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * timeSpanSec;

      // Primary curve price calculation with bounds clamping
      let p = startPrice + slope * t;
      if (minPrice > 0) p = Math.max(minPrice, p);
      if (maxPrice > 0) p = Math.min(maxPrice, p);
      userPrices.push(p);

      if (p < minP) minP = p;
      if (p > maxP) maxP = p;

      // Counter curve price calculation
      const cp = counterStartPrice + counterSlope * t;
      counterPrices.push(cp);
      if (cp < minP) minP = cp;
      if (cp > maxP) maxP = cp;

      // Detect intersection / match condition:
      // Buy order matches when Buy price (p) >= Sell price (cp)
      // Sell order matches when Sell price (p) <= Buy price (cp)
      if (matchSec === null && i > 0) {
        const isMatched = orderType === 'Buy' ? p >= cp : p <= cp;
        if (isMatched) {
          matchSec = t;
          matchP = (p + cp) / 2;
        }
      }
    }

    const range = maxP - minP || 1;
    const svgWidth = 300;
    const svgHeight = 120;
    const padding = 15;
    const chartW = svgWidth - padding * 2;
    const chartH = svgHeight - padding * 2;

    const uPoints: string[] = [];
    const cPoints: string[] = [];

    for (let i = 0; i <= steps; i++) {
      const x = padding + (i / steps) * chartW;

      // Y coordinate inverted for SVG (top is 0)
      const yU = padding + chartH - ((userPrices[i] - minP) / range) * chartH;
      uPoints.push(`${x.toFixed(1)},${yU.toFixed(1)}`);

      const yC = padding + chartH - ((counterPrices[i] - minP) / range) * chartH;
      cPoints.push(`${x.toFixed(1)},${yC.toFixed(1)}`);
    }

    return {
      points: uPoints.join(' '),
      counterPoints: cPoints.join(' '),
      minObservedPrice: minP,
      maxObservedPrice: maxP,
      endPrice: userPrices[steps],
      counterType,
      matchTimeSec: matchSec,
      matchPrice: matchP,
    };
  }, [orderType, startPrice, slope, minPrice, maxPrice, timeSpanSec]);

  // Tailwind stroke and color utilities according to repository guidelines
  const curveStrokeClass = orderType === 'Buy' ? 'stroke-emerald-500' : 'stroke-amber-500';
  const curveBgDotClass = orderType === 'Buy' ? 'bg-emerald-500' : 'bg-amber-500';
  const curveFillDotClass = orderType === 'Buy' ? 'fill-emerald-500' : 'fill-amber-500';

  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-neutral-100 bg-neutral-50/50 p-4 font-sans text-xs">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
          Illustrative Curve Preview ({timeRangeMinutes}m Projection)
        </span>
        <span className="font-mono text-[10px] text-neutral-500 font-semibold">
          End: ${endPrice > 0 ? endPrice.toFixed(2) : '0.00'}
        </span>
      </div>

      <div className="relative w-full h-32 bg-white rounded-xl border border-neutral-100 p-2 overflow-hidden shadow-inner">
        <svg viewBox="0 0 300 120" className="w-full h-full overflow-visible">
          {/* Grid lines */}
          <line x1="15" y1="15" x2="285" y2="15" stroke="#F3F4F6" strokeDasharray="3 3" />
          <line x1="15" y1="60" x2="285" y2="60" stroke="#F3F4F6" strokeDasharray="3 3" />
          <line x1="15" y1="105" x2="285" y2="105" stroke="#F3F4F6" strokeDasharray="3 3" />

          {/* Bounds reference lines */}
          {minPrice > 0 && (
            <text x="20" y="102" className="text-[8px] font-mono fill-neutral-400">
              Floor: ${minPrice}
            </text>
          )}
          {maxPrice > 0 && (
            <text x="20" y="24" className="text-[8px] font-mono fill-neutral-400">
              Ceiling: ${maxPrice}
            </text>
          )}

          {/* Counterparty Curve (Simulated) */}
          {showCounterOrder && (
            <polyline
              points={counterPoints}
              fill="none"
              className="stroke-neutral-400"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              strokeLinecap="round"
            />
          )}

          {/* User Order Curve */}
          <polyline
            points={points}
            fill="none"
            className={`${curveStrokeClass}`}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Match point indicator */}
          {matchTimeSec !== null && matchPrice !== null && (
            <g className="motion-safe:animate-pulse">
              <circle
                cx={(15 + (matchTimeSec / timeSpanSec) * 270).toFixed(1)}
                cy={(
                  105 -
                  ((matchPrice - minObservedPrice) / (maxObservedPrice - minObservedPrice || 1)) * 90
                ).toFixed(1)}
                r="4"
                className={`${curveFillDotClass}`}
              />
            </g>
          )}
        </svg>
      </div>

      <div className="flex items-center justify-between text-[10px] text-neutral-500 font-medium">
        <div className="flex items-center gap-1.5">
          <span className={`h-2 w-2 rounded-full ${curveBgDotClass}`} />
          <span>Your {orderType} Curve</span>
        </div>
        {showCounterOrder && (
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-neutral-400" />
            <span>Simulated Counter Curve</span>
          </div>
        )}
        {matchTimeSec !== null ? (
          <span className="text-emerald-600 font-bold font-mono">
            ★ Simulated Match ~{Math.round(matchTimeSec)}s
          </span>
        ) : (
          <span className="text-neutral-400">No match in {timeRangeMinutes}m</span>
        )}
      </div>
    </div>
  );
}
