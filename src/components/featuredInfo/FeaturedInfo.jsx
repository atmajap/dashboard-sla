import "./featuredInfo.css";
import {ArrowDownward, ArrowUpward} from "@material-ui/icons";

export default function FeaturedInfo() {
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Weekly Fulfillment Time Average</span>
        <div className="featuredSLAContainer">
          <span className="featuredSLA">2:13</span>
          <span className="featuredSLARate">
            +0:13 <ArrowUpward className="featuredIcon negative"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last week</span>
      </div>

      <div className="featuredItem">
        <span className="featuredTitle">Weekly Fulfillment Time Average DSKG</span>
        <div className="featuredSLAContainer">
          <span className="featuredSLA">1:13</span>
          <span className="featuredSLARate">
            -0:47 <ArrowDownward className="featuredIcon positive"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last week</span>
      </div>

      <div className="featuredItem">
        <span className="featuredTitle">Weekly Fulfillment Time Average DSSU</span>
        <div className="featuredSLAContainer">
          <span className="featuredSLA">2:13</span>
          <span className="featuredSLARate">
            +0:13 <ArrowUpward className="featuredIcon negative"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last week</span>
      </div>
    </div>
  )
}
