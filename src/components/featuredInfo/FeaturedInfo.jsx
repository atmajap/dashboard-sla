import "./featuredInfo.css";
import {ArrowDownward, ArrowUpward} from "@material-ui/icons";

export default function FeaturedInfo({averageTime, numberofOrders, title}) {
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">{title}</span>
        <div className="featuredSLAContainer">
          <span className="featuredSLA">{averageTime.toFixed(2)}</span>
          <span className="featuredSLARate">
            {(averageTime - 120).toFixed(2)} {(averageTime - 120).toFixed(2) > 0 ? <ArrowUpward className="featuredIcon negative"/> : <ArrowDownward className="featuredIcon positive"/>}
          </span>
        </div>
        <div className="featurednumberofOrders">{`Number of Orders: ${numberofOrders}`}</div>
        <span className="featuredSub">Compared to 2 minutes SLA</span>
      </div>
    </div>
  )
}
