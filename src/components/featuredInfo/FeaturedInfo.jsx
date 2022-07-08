import "./featuredInfo.css";
import {ArrowDownward, ArrowUpward} from "@material-ui/icons";

export default function FeaturedInfo({averageTime, numberOfOrders, lastWeekAverageTime, lastWeekNumberOfOrders, title}) {
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">{title}</span>
        <div className="featuredSLAContainer">
          <span className="featuredSLA">{averageTime.toFixed(2)}</span>
          <span className="featuredSLARate">
            {(averageTime - lastWeekAverageTime).toFixed(2)} {(averageTime - lastWeekAverageTime).toFixed(2) > 0 ? <ArrowUpward className="featuredIcon negative"/> : <ArrowDownward className="featuredIcon positive"/>}
          </span>
        </div>
        <div className="featuredNumberOfOrdersContainer">
          <span className="featuresNumberOfOrders">{`This Week Number of Orders: ${numberOfOrders}`}</span>
          <span className="featuredNumberOfOrdersRate">{(numberOfOrders - lastWeekNumberOfOrders)} {numberOfOrders - lastWeekNumberOfOrders > 0 ? <ArrowUpward className="featuredIcon positive"/> : <ArrowDownward className="featuredIcon negative"/>}</span>
        </div>
        <span className="featuredSub">Compared to last week average time</span>
      </div>
    </div>
  )
}
