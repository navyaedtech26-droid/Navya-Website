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

// Bootstrap 4 / AdminLTE theme tokens.
const INK_MUTED = "#6C757D";
const GRID = "rgba(0,0,0,0.06)";
const BRAND = "#007BFF";

// Palette for categorical charts (doughnut/bar slices) — the classic
// Bootstrap 4 semantic colors, in the order AdminLTE's own demo uses them.
const CHART_COLORS = [
  "#007BFF", // primary
  "#17A2B8", // info
  "#6610F2", // indigo
  "#FFC107", // warning
  "#28A745", // success
  "#E83E8C", // pink
  "#FD7E14", // orange
  "#20C997", // teal
];

/** Status palette: green (new) → amber (read) → gray (archived). */
export const STATUS_COLORS = ["#28A745", "#FFC107", "#6C757D"];

/** Blog palette: blue (published) vs amber (draft). */
export const BLOG_COLORS = [BRAND, "#FFC107"];

/** Rating scale from 5★ (green, best) down to 1★ (red, worst). */
export const RATING_COLORS = ["#28A745", "#8CC152", "#FFC107", "#FD7E14", "#DC3545"];

ChartJS.defaults.color = INK_MUTED;
ChartJS.defaults.font.family =
  '"Source Sans Pro", Helvetica, Arial, sans-serif';

const tooltipStyle = {
  backgroundColor: "#FFFFFF",
  borderColor: "#DEE2E6",
  borderWidth: 1,
  titleColor: "#212529",
  bodyColor: INK_MUTED,
  padding: 10,
  cornerRadius: 3,
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
            borderColor: BRAND,
            backgroundColor: (ctx) => {
              const { ctx: c, chartArea } = ctx.chart;
              if (!chartArea) return "rgba(0,123,255,0.15)";
              const g = c.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
              g.addColorStop(0, "rgba(0,123,255,0.25)");
              g.addColorStop(1, "rgba(0,123,255,0)");
              return g;
            },
            fill: true,
            tension: 0.35,
            pointRadius: 0,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: BRAND,
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
            borderColor: "#FFFFFF",
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
