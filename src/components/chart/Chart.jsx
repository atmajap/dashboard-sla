import "./chart.css"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';

export default function Chart({title, data, xDataKey, yDataKey, grid}) {
  return (
    <div className="chart">
      <h3 className="chartTitle">{title}</h3>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={data}>
          <XAxis dataKey={xDataKey} stroke="#5550BD"/>
          <YAxis />
          <Line type="monotone" dataKey={yDataKey} />
          <Tooltip />
          <Legend />
          <ReferenceLine y={120} label="Max SLA" stroke="red" strokeDasharray="5 5" />
          {grid && <CartesianGrid stroke="#dfdfdf" strokeDasharray="5 5"/>}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
