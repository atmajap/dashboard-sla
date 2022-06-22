import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import { slaData } from "../../dummyData";
import "./home.css";

export default function Home() {
  return (
    <div className='home'>
      <FeaturedInfo />
      <Chart data={slaData} title="Daily Average SLA Trend" dataKey="SLA Time" grid/>
    </div>
  )
}
