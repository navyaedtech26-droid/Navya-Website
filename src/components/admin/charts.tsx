/**
 * Themed Chart.js wrappers for the admin dashboard.
 *
 * Chart.js is tree-shakeable, so we register only the controllers/elements the
 * dashboard actually uses, once, on module load. The wrappers below apply the
 * site's dark palette and sensible defaults so screens just pass data.
 */
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Filler,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js";
import { Line, Doughnut, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Filler,
  Tooltip,
  Legend
);

// Shared theme tokens (mirror tailwind.config.js).
const INK_MUTED = "#94A3B8";
const GRID = "rgba(255,255,255,0.06)";
const BRAND = "#F5A623";
const BRAND_LIGHT = "#FFB84D";
const CYAN = "#FF7A59";

// Palette for categorical charts (doughnut/bar slices). Hues are spread out so
// adjacent categories are easy to distinguish.
export const CHART_COLORS = [
  BRAND, // blue
  CYAN, // cyan
  "#8B5CF6", // violet
  "#F59E0B", // amber
  "#10B981", // emerald
  "#EC4899", // pink
  "#F97316", // orange
  "#14B8A6", // teal
];

/** Status palette: green (new) → amber (read) → slate (archived). */
export const STATUS_COLORS = ["#10B981", "#F59E0B", "#64748B"];

/** Blog palette: blue (published) vs amber (draft). */
export const BLOG_COLORS = [BRAND, "#F59E0B"];

/** Rating scale from 5★ (green, best) down to 1★ (red, worst). */
export const RATING_COLORS = ["#10B981", "#84CC16", "#F59E0B", "#F97316", "#EF4444"];

ChartJS.defaults.color = INK_MUTED;
ChartJS.defaults.font.family =
  '"Inter", "DM Sans", system-ui, sans-serif';

const tooltipStyle = {
  backgroundColor: "#221634",
  borderColor: "rgba(255,255,255,0.1)",
  borderWidth: 1,
  titleColor: "#FBF7F4",
  bodyColor: INK_MUTED,
  padding: 10,
  cornerRadius: 8,
} as const;

/** Line chart with a soft brand-blue gradient fill — for time series. */
export function TrendChart({
  labels,
  data,
  label,
}: {
  labels: string[];
  data: number[];
  label: string;
}) {
  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: tooltipStyle,
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { maxRotation: 0, autoSkip: true, maxTicksLimit: 8 },
        border: { color: GRID },
      },
      y: {
        beginAtZero: true,
        grid: { color: GRID },
        ticks: { precision: 0 },
        border: { display: false },
      },
    },
  };

  return (
    <Line
      options={options}
      data={{
        labels,
        datasets: [
          {
            label,
            data,
            borderColor: BRAND_LIGHT,
            backgroundColor: (ctx) => {
              const { ctx: c, chartArea } = ctx.chart;
              if (!chartArea) return "rgba(245, 166, 35,0.15)";
              const g = c.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
              g.addColorStop(0, "rgba(245, 166, 35,0.35)");
              g.addColorStop(1, "rgba(245, 166, 35,0)");
              return g;
            },
            fill: true,
            tension: 0.35,
            pointRadius: 0,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: BRAND_LIGHT,
            borderWidth: 2,
          },
        ],
      }}
    />
  );
}

/** Doughnut for small categorical breakdowns. */
export function BreakdownChart({
  labels,
  data,
  colors = CHART_COLORS,
}: {
  labels: string[];
  data: number[];
  colors?: string[];
}) {
  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "62%",
    plugins: {
      legend: {
        position: "bottom",
        labels: { usePointStyle: true, boxWidth: 8, padding: 14 },
      },
      tooltip: tooltipStyle,
    },
  };

  return (
    <Doughnut
      options={options}
      data={{
        labels,
        datasets: [
          {
            data,
            backgroundColor: colors,
            borderColor: "#221634",
            borderWidth: 2,
            hoverOffset: 6,
          },
        ],
      }}
    />
  );
}

/**
 * Horizontal bar — good for ranked lists (e.g. services requested). Each bar
 * gets its own color from the palette so categories are easy to tell apart.
 */
export function RankBarChart({
  labels,
  data,
  colors = CHART_COLORS,
}: {
  labels: string[];
  data: number[];
  colors?: string[];
}) {
  const options: ChartOptions<"bar"> = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: tooltipStyle,
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: { color: GRID },
        ticks: { precision: 0 },
        border: { display: false },
      },
      y: { grid: { display: false }, border: { color: GRID } },
    },
  };

  // Cycle the palette so every bar is a distinct color.
  const barColors = labels.map((_, i) => colors[i % colors.length]);

  return (
    <Bar
      options={options}
      data={{
        labels,
        datasets: [
          {
            data,
            backgroundColor: barColors,
            hoverBackgroundColor: barColors,
            borderRadius: 6,
            barThickness: 18,
          },
        ],
      }}
    />
  );
}
