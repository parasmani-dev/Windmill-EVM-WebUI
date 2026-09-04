'use client';

import React, { useState, useEffect } from 'react';
import { STEPS } from '@/utils/constants';
import { useScrollRevealChildren } from '@/hooks/useScrollReveal';
import OrderCurveSimulator from '@/components/ui/OrderCurveSimulator';
import { useContract } from '@/hooks/useContract';
import type { ActiveOrderCurve } from '@/types/orderCurve';

export default function HowItWorksSection() {
  const containerRef = useScrollRevealChildren<HTMLDivElement>({ threshold: 0.1 });
  const { readContract, isReady } = useContract();
  const [activeOrders, setActiveOrders] = useState<ActiveOrderCurve[]>([]);

  useEffect(() => {
    if (!isReady) return;
    const fetchOrders = async () => {
      try {
        const { data: total } = await readContract('totalOrders');
        const count = total ? Number(total) : 0;
        if (count === 0) return;

        const promises = [];
        for (let i = 1; i <= Math.min(count, 10); i++) {
          promises.push(readContract('getOrder', [i]));
        }
        const results = await Promise.all(promises);
        const fetched: ActiveOrderCurve[] = [];

        results.forEach((res, idx) => {
          if (!res.data) return;
          const o = res.data as Record<string, unknown> | unknown[];
          const id = Number((o as Record<string, unknown>).id ?? (o as unknown[])[0] ?? idx + 1);
          const active = Boolean((o as Record<string, unknown>).active ?? (o as unknown[])[3]);
          const isBuy = Boolean((o as Record<string, unknown>).isBuy ?? (o as unknown[])[2]);

          if (active) {
            fetched.push({
              id,
              type: isBuy ? 'Buy' : 'Sell',
              startPrice: 3000,
              slope: isBuy ? -0.2 : 0.2,
              minPrice: 0,
              maxPrice: 0,
            });
          }
        });
        setActiveOrders(fetched);
      } catch {}
    };
    fetchOrders();
  }, [isReady, readContract]);

  return (
    <section
      id="how-it-works"
      ref={containerRef}
      className="bg-white section-padding border-t border-black/5"
    >
      <div className="mx-auto max-w-4xl px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 flex flex-col items-center">
          <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">Matching Lifecycle</h2>
          <p className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight leading-tight">
            How The Protocol Operates
          </p>
        </div>

        {/* Steps Timeline Grid with 3D Flip Reveals */}
        <div className="relative border-l border-black/5 pl-6 md:pl-10 ml-4 md:ml-8 max-w-2xl mx-auto flex flex-col gap-12">
          {/* Vertical timeline line gradient decorator */}
          <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-black via-black/10 to-transparent -translate-x-[0.5px]" />

          {STEPS.map((step, idx) => (
            <div
              key={step.number}
              data-reveal
              style={{ transitionDelay: `${idx * 150}ms` }}
              className="reveal-3d-flip relative group flex flex-col gap-2"
            >
              {/* Bullet Node */}
              <div className="absolute -left-[29px] md:-left-[47px] top-1 flex h-4 w-4 md:h-6 md:w-6 items-center justify-center rounded-full bg-white border border-black/15 transition-all duration-300 group-hover:border-black group-hover:scale-110">
                <div className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-neutral-200 group-hover:bg-black transition-colors" />
              </div>

              {/* Step Info */}
              <span className="text-xs font-mono font-bold text-neutral-400 tracking-wider">
                STEP 0{step.number}
              </span>
              <h3 className="text-lg font-bold text-black group-hover:translate-x-1 transition-transform duration-300">
                {step.title}
              </h3>
              <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed max-w-lg">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Dynamic Protocol Curve Visualizer */}
        <div className="mt-16 max-w-2xl mx-auto border border-neutral-100 bg-white rounded-3xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-black uppercase tracking-wider mb-2">Protocol Dynamic Curve Matching</h3>
          <p className="text-xs text-neutral-500 mb-4">
            Demonstrating linear price decay convergence between active contract buy orders and sell orders.
          </p>
          <OrderCurveSimulator
            orderType="Buy"
            startPrice={3000}
            slope={-0.3}
            minPrice={0}
            maxPrice={0}
            timeRangeMinutes={15}
            counterOrders={activeOrders}
          />
        </div>
      </div>
    </section>
  );
}

