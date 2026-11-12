"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatCompact, formatNumber } from "@/lib/utils";
import type { DayPoint } from "@/data/analytics";

const AXIS = { fill: "#71717a", fontSize: 11 };
const ACCENT = "#a78bfa";

function TooltipBox({ title, rows }: { title: string; rows: Array<[string, string]> }) {
  return (
    <div className="glass-strong rounded-xl px-3 py-2 text-xs shadow-xl shadow-black/50">
      <p className="mb-1 text-zinc-400">{title}</p>
      {rows.map(([k, v]) => (
        <p key={k} className="flex items-center justify-between gap-4 text-zinc-300">
          {k} <span className="font-medium text-white">{v}</span>
        </p>
      ))}
    </div>
  );
}

export function ViewsChart({ data, period }: { data: DayPoint[]; period: number }) {
  return (
    <ResponsiveContainer width="100%" height="100%" initialDimension={{ width: 640, height: 260 }}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
        <defs>
          <linearGradient id="views-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={ACCENT} stopOpacity={0.35} />
            <stop offset="100%" stopColor={ACCENT} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke="rgb(255 255 255 / 0.06)" />
        <XAxis
          dataKey="day"
          tick={AXIS}
          axisLine={false}
          tickLine={false}
          interval={period === 7 ? 0 : 4}
          tickMargin={8}
        />
        <YAxis tick={AXIS} axisLine={false} tickLine={false} tickFormatter={(v: number) => formatCompact(v)} width={56} />
        <Tooltip
          cursor={{ stroke: "rgb(255 255 255 / 0.25)", strokeWidth: 1 }}
          content={({ active, payload }) => {
            if (!active || !payload?.length) return null;
            const p = payload[0].payload as DayPoint;
            return (
              <TooltipBox
                title={period === 7 ? p.day : `День ${p.day}`}
                rows={[
                  ["Просмотры", formatNumber(p.views)],
                  ["Вовлечённость", `${formatNumber(p.engagement, 1)}%`],
                ]}
              />
            );
          }}
        />
        <Area
          type="monotone"
          dataKey="views"
          stroke={ACCENT}
          strokeWidth={2}
          fill="url(#views-fill)"
          activeDot={{ r: 5, stroke: "#0a0910", strokeWidth: 2, fill: ACCENT }}
          animationDuration={1200}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function RetentionChart({ data }: { data: Array<{ sec: string; value: number }> }) {
  return (
    <ResponsiveContainer width="100%" height="100%" initialDimension={{ width: 320, height: 180 }}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="ret-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f0abfc" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#f0abfc" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke="rgb(255 255 255 / 0.06)" />
        <XAxis dataKey="sec" tick={AXIS} axisLine={false} tickLine={false} tickMargin={8} />
        <YAxis tick={AXIS} axisLine={false} tickLine={false} domain={[0, 100]} tickFormatter={(v: number) => `${v}%`} width={40} />
        <Tooltip
          cursor={{ stroke: "rgb(255 255 255 / 0.25)", strokeWidth: 1 }}
          content={({ active, payload }) => {
            if (!active || !payload?.length) return null;
            const p = payload[0].payload as { sec: string; value: number };
            return <TooltipBox title={`Секунда ${p.sec}`} rows={[["Досмотрели", `${p.value}%`]]} />;
          }}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#f0abfc"
          strokeWidth={2}
          fill="url(#ret-fill)"
          activeDot={{ r: 5, stroke: "#0a0910", strokeWidth: 2, fill: "#f0abfc" }}
          animationDuration={1400}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
