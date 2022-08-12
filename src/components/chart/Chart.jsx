import "./chart.css"
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Label,
  Area
} from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="customTooltip">
        <p className="date">{`Date: ${payload[0].payload.date}`}</p>
        <p className="averageSla">{`Average SLA: ${payload[0].payload.averageSla.toFixed(2)}`}</p>
        <p className="averagePickingSpeed">{`Average Picking Speed: ${payload[0].payload.averagePickingSpeed.toFixed(2)}`}</p>
        <p className="numberOfOrders">{`Number of Orders: ${payload[0].payload.orderBelowSla + payload[0].payload.orderAboveSla}`}</p>
        <p className="numberOfOrdersBelowSla">{`Number of Orders Below SLA: ${payload[0].payload.orderBelowSla}`}</p>
        <p className="numberOfOrdersAboveSla">{`Number of Orders Above SLA: ${payload[0].payload.orderAboveSla}`}</p>
        <p className="percentageBelowSla">{`Percentage Below SLA: ${payload[0].payload.percentageBelowSla.toFixed(2)}`}</p>
      </div>
    );
  }

  return null;
}

export default function Chart ({title, data, grid}) {
  return (
    <div className="chart">
      <h3 className="chartTitle">{title}</h3>
      <ResponsiveContainer width="100%" aspect={4/1}>
        <ComposedChart data={data}>
          {grid && <CartesianGrid stroke="#dfdfdf" strokeDasharray="5 5"/>}
          <Tooltip content={<CustomTooltip />}/>
          <XAxis dataKey={"date"} stroke="#5550BD"/>
          <YAxis domain={[0, 300]} yAxisId="left-axis" allowDataOverflow={true}>
            <Label value="Average Time" angle={-90} position="outside" fontSize={14}/>
          </YAxis>
          <YAxis domain={[0, Math.max(...data.map(datum => datum.orderAboveSla + datum.orderBelowSla + 10))]} yAxisId="right-axis" orientation="right" allowDataOverflow={true}>
            <Label value="Number of Orders Completed" angle={90} position="outside" fontSize={14}/>
          </YAxis>
          <YAxis domain={[0, 100]} yAxisId="right-axis-percentage" orientation="right" allowDataOverflow={true}>
            <Label value="Percentage" angle={90} position="outside" fontSize={14}/>
          </YAxis>
          <Area yAxisId="right-axis-percentage" type="monotone" dataKey={"percentageBelowSla"} stackId="percentage" fill="#BEE5B0" stroke="white"/>
          <Area yAxisId="right-axis-percentage" type="monotone" dataKey={"percentageAboveSla"} stackId="percentage" fill="#FF6961" stroke="white"/>
          <Bar yAxisId="right-axis" dataKey={"orderBelowSla"} stackId="a" fill="#FFEE93"/>
          <Bar yAxisId="right-axis" dataKey={"orderAboveSla"} stackId="a" fill="#1D1C1A"/>
          <Line yAxisId="left-axis" type="monotone" dataKey={"averageSla"} stroke="#00FF00" strokeWidth="3"/>
          <Line yAxisId="left-axis" type="monotone" dataKey={"averagePickingSpeed"} stroke="#0000FF" strokeWidth="3"/>
          <Legend />
          <ReferenceLine yAxisId="left-axis" y={120} label="Max SLA" stroke="red" strokeDasharray="5 5" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
