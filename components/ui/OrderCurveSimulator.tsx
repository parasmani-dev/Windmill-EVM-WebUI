'use client';

import React, { useMemo } from 'react';
import type { ActiveOrderCurve } from '@/types/orderCurve';

interface CurveVisualizerProps {
  orderType: 'Buy' | 'Sell';
  startPrice: number;
  slope: number;
  minPrice: number;
  maxPrice: number;
  timeRangeMinutes?: number;
  counterOrders?: ActiveOrderCurve[];
}

export default function OrderCurveSimulator({
  orderType,
  startPrice,
  slope,
  minPrice,
  maxPrice,
  timeRangeMinutes = 10,
  counterOrders = [],
}: CurveVisualizerProps) {
  const timeSpanSec = timeRangeMinutes * 60;
  const steps = 50;

  // Calculate real curve points based purely on user inputs and actual counter orders
  const {
    points,
    minObservedPrice,
    maxObservedPrice,
    endPrice,
    counterCurves,
    matchEvent,
  } = useMemo(() => {
    let minP = Infinity;
    let maxP = -Infinity;

    const userPrices: number[] = [];
    const activeCounterCurvesData: Array<{ id: number; prices: number[]; pointsStr?: string }> = [];

    // Filter real opposite-side active orders matching counter order type
    const oppositeType = orderType === 'Buy' ? 'Sell' : 'Buy';
    const validCounters = counterOrders.filter((c) => c.type === oppositeType && c.startPrice > 0);

    validCounters.forEach((c) => {
      activeCounterCurvesData.push({ id: c.id, prices: [] });
    });

    let earliestMatchSec: number | null = null;
    let earliestMatchPrice: number | null = null;
    let matchedCounterId: number | null = null;

    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * timeSpanSec;

      // Real user order curve calculation: price(t) = startPrice + slope * t (clamped by min/max)
      let p = startPrice + slope * t;
      if (minPrice > 0) p = Math.max(minPrice, p);
      if (maxPrice > 0) p = Math.min(maxPrice, p);
      userPrices.push(p);

      if (p < minP) minP = p;
      if (p > maxP) maxP = p;

      // Real counterparty orders calculation
      validCounters.forEach((cOrder, cIdx) => {
        let cp = cOrder.startPrice + cOrder.slope * t;
        if (cOrder.minPrice > 0) cp = Math.max(cOrder.minPrice, cp);
        if (cOrder.maxPrice > 0) cp = Math.min(cOrder.maxPrice, cp);

        activeCounterCurvesData[cIdx].prices.push(cp);
        if (cp < minP) minP = cp;
        if (cp > maxP) maxP = cp;

        // On-Chain Matching Condition: BuyPrice(t) >= SellPrice(t)
        if (earliestMatchSec === null && i > 0) {
          const isMatched = orderType === 'Buy' ? p >= cp : p <= cp;
          if (isMatched) {
            earliestMatchSec = t;
            earliestMatchPrice = (p + cp) / 2;
            matchedCounterId = cOrder.id;
          }
        }
      });
    }

    if (minP === Infinity || isNaN(minP)) minP = startPrice > 0 ? startPrice * 0.8 : 0;
    if (maxP === -Infinity || isNaN(maxP)) maxP = startPrice > 0 ? startPrice * 1.2 : 100;

    const range = maxP - minP || 1;
    const svgWidth = 300;
    const svgHeight = 120;
    const padding = 15;
    const chartW = svgWidth - padding * 2;
    const chartH = svgHeight - padding * 2;

    const uPoints: string[] = [];
    for (let i = 0; i <= steps; i++) {
      const x = padding + (i / steps) * chartW;
      const yU = padding + chartH - ((userPrices[i] - minP) / range) * chartH;
      uPoints.push(`${x.toFixed(1)},${yU.toFixed(1)}`);
    }

    // Format polyline strings for real counter curves
    const formattedCounterCurves = activeCounterCurvesData.map((cData) => {
      const cPts: string[] = [];
      for (let i = 0; i <= steps; i++) {
        const x = padding + (i / steps) * chartW;
        const yC = padding + chartH - ((cData.prices[i] - minP) / range) * chartH;
        cPts.push(`${x.toFixed(1)},${yC.toFixed(1)}`);
      }
      return { id: cData.id, pointsStr: cPts.join(' ') };
    });

    return {
      points: uPoints.join(' '),
      minObservedPrice: minP,
      maxObservedPrice: maxP,
      endPrice: userPrices[steps],
      counterCurves: formattedCounterCurves,
      matchEvent:
        earliestMatchSec !== null && earliestMatchPrice !== null
          ? { timeSec: earliestMatchSec, price: earliestMatchPrice, orderId: matchedCounterId }
          : null,
    };
  }, [orderType, startPrice, slope, minPrice, maxPrice, timeSpanSec, counterOrders]);

  const curveStrokeClass = orderType === 'Buy' ? 'stroke-emerald-500' : 'stroke-amber-500';
  const curveBgDotClass = orderType === 'Buy' ? 'bg-emerald-500' : 'bg-amber-500';
  const curveFillDotClass = orderType === 'Buy' ? 'fill-emerald-500' : 'fill-amber-500';

  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-neutral-100 bg-neutral-50/50 p-4 font-sans text-xs">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
          Order Price Curve ({timeRangeMinutes}m Projection)
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
              Min Price: ${minPrice}
            </text>
          )}
          {maxPrice > 0 && (
            <text x="20" y="24" className="text-[8px] font-mono fill-neutral-400">
              Max Price: ${maxPrice}
            </text>
          )}

          {/* Real Active Counterparty Curves */}
          {counterCurves.map((c) => (
            <polyline
              key={c.id}
              points={c.pointsStr}
              fill="none"
              className="stroke-neutral-400"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              strokeLinecap="round"
            />
          ))}

          {/* Real User Order Curve */}
          <polyline
            points={points}
            fill="none"
            className={`${curveStrokeClass}`}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Real On-Chain Match Intersection */}
          {matchEvent && (
            <g className="motion-safe:animate-pulse">
              <circle
                cx={(15 + (matchEvent.timeSec / timeSpanSec) * 270).toFixed(1)}
                cy={(
                  105 -
                  ((matchEvent.price - minObservedPrice) / (maxObservedPrice - minObservedPrice || 1)) * 90
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

        {counterCurves.length > 0 && (
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-neutral-400" />
            <span>Active Counter Order ({counterCurves.length})</span>
          </div>
        )}

        {matchEvent ? (
          <span className="text-emerald-600 font-bold font-mono">
            ★ Match w/ Order #{matchEvent.orderId} ~{Math.round(matchEvent.timeSec)}s
          </span>
        ) : (
          <span className="text-neutral-400">
            {counterCurves.length > 0 ? 'No match in window' : 'No active counter orders'}
          </span>
        )}
      </div>
    </div>
  );
}
