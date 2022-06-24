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

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="customTooltip">
        <p classname="date">{`Date: ${payload[0].payload.date}`}</p>
        <p className="averageTime">{`Average Time: ${payload[0].value.toFixed(2)}`}</p>
        <p className="numberOfOrders">{`Number of Orders: ${payload[0].payload.orderCount}`}</p>
      </div>
    );
  }

  return null;
}


export default function Chart({title, data, xDataKey, yDataKey, grid}) {
  return (
    <div className="chart">
      <h3 className="chartTitle">{title}</h3>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={data}>
          <XAxis dataKey={xDataKey} stroke="#5550BD"/>
          <YAxis domain={[0, 300]} allowDataOverflow={true}/>
          <Line type="monotone" dataKey={yDataKey} />
          <Tooltip content={<CustomTooltip />}/>
          <Legend />
          <ReferenceLine y={120} label="Max SLA" stroke="red" strokeDasharray="5 5" />
          {grid && <CartesianGrid stroke="#dfdfdf" strokeDasharray="5 5"/>}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
