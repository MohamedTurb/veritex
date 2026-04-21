import { motion } from 'framer-motion';
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';

const pieColors = ['#10b981', '#f43f5e'];
const barColors = ['#f97316', '#0f172a'];

export default function Charts({ pieData, barData }) {
  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="card p-5 md:p-6"
      >
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Passed vs Failed</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Test execution split from the latest run.</p>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={110}
                innerRadius={62}
                paddingAngle={4}
              >
                {pieData.map((entry, index) => (
                  <Cell key={entry.name} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: '1px solid rgba(148, 163, 184, 0.2)',
                  background: 'rgba(15, 23, 42, 0.92)',
                  color: '#fff',
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.05 }}
        className="card p-5 md:p-6"
      >
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Test Counts by Feature</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">How many checks are running across each product area.</p>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ top: 12, right: 20, bottom: 4, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.15} />
              <XAxis dataKey="feature" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} allowDecimals={false} />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: '1px solid rgba(148, 163, 184, 0.2)',
                  background: 'rgba(15, 23, 42, 0.92)',
                  color: '#fff',
                }}
              />
              <Legend />
              <Bar dataKey="passed" fill={barColors[0]} radius={[10, 10, 0, 0]} />
              <Bar dataKey="failed" fill={barColors[1]} radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
