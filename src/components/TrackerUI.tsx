import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  TooltipProps,
} from "recharts";
import { motion } from "framer-motion";

interface ProgressItem {
  type: string;
  count: number;
}

interface TrackerUIProps {
  progress: ProgressItem[];
  title: string;
}

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
];

interface CustomTooltipProps extends TooltipProps<number, string> {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    payload: ProgressItem;
  }>;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/80 backdrop-blur-sm p-3 rounded-lg border border-white/10">
        <p className="text-white font-medium">{payload[0].name}</p>
        <p className="text-gray-300">{payload[0].value} tasks</p>
      </div>
    );
  }
  return null;
};

const TrackerUI = ({ progress, title }: TrackerUIProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-[400px] p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
    >
      <style jsx global>{`
        .recharts-pie-sector:focus,
        .recharts-legend-item:focus,
        .recharts-tooltip-cursor:focus {
          outline: none !important;
        }
        .recharts-legend-item {
          cursor: default !important;
          pointer-events: none !important;
        }
        .recharts-pie-sector {
          cursor: default !important;
        }
        .recharts-layer {
          pointer-events: none !important;
        }
        .recharts-surface {
          pointer-events: none !important;
        }
        .recharts-wrapper {
          pointer-events: none !important;
        }
        .recharts-default-tooltip {
          pointer-events: none !important;
        }
        .recharts-tooltip-cursor {
          pointer-events: none !important;
        }
        .recharts-tooltip-wrapper {
          pointer-events: auto !important;
        }
        .recharts-tooltip-wrapper * {
          pointer-events: auto !important;
        }
        .recharts-pie {
          pointer-events: none !important;
        }
        .recharts-pie-sector {
          pointer-events: none !important;
        }
        .recharts-pie-sector:hover {
          opacity: 1 !important;
        }
      `}</style>
      <h3 className="text-lg font-medium text-gray-300 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart margin={{ top: 10, right: 10, bottom: 40, left: 10 }}>
          <Pie
            data={progress}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={90}
            innerRadius={40}
            fill="#8884d8"
            dataKey="count"
            nameKey="type"
            label={false}
            paddingAngle={2}
            isAnimationActive={false}
          >
            {progress?.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{
              paddingTop: "20px",
            }}
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            formatter={(value) => {
              const data = progress.find((item) => item.type === value);
              const percentage = data
                ? (
                    (data.count /
                      progress.reduce((sum, item) => sum + item.count, 0)) *
                    100
                  ).toFixed(0)
                : "0";
              return (
                <span className="text-gray-300 text-sm">
                  {value} ({percentage}%)
                </span>
              );
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default TrackerUI;
