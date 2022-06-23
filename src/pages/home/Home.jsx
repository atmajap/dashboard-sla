import { useEffect, useState } from "react";
import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import { csv } from 'd3';
import csvData from '../../results.csv';
import moment from 'moment';

import "./home.css";

export default function Home() {

  const [data, setData] = useState(null);
  // const [darkStore, setDarkstore] = useState("all")

  useEffect(() => {
    csv(csvData).then(setData);
  }, []);
  if (!data) {
    return <pre>Loading...</pre>
  }

  let allTime = []

  data.map((datum) => (allTime[moment(datum.createdAt).format('YYYY-MM-DD')] = {
    duration: allTime[moment(datum.createdAt).format('YYYY-MM-DD')] ? allTime[moment(datum.createdAt).format('YYYY-MM-DD')]['duration'] +  moment(datum.completedAt) - moment(datum.createdAt) : moment(datum.completedAt) - moment(datum.createdAt),
    count: allTime[moment(datum.createdAt).format('YYYY-MM-DD')] ? allTime[moment(datum.createdAt).format('YYYY-MM-DD')]['count'] + 1 : 1
  }))

  const timeAverage = Object.keys(allTime).map((date) => ({
    date: date,
    averageTime: allTime[date]['duration'] / allTime[date]['count'] / 1000
  }));

  const sortedTimeAverage = timeAverage.sort(function(a, b) {
    return new Date(a.date) - new Date(b.date);
  }); 

// let callback = datum => moment(datum.createdAt).format('YYYY-MM-DD') === '2022-06-15';
  // console.log(data.filter(callback))

  return (
    <div className='home'>
      <FeaturedInfo />
      {/* <select className="dsSelectForm" value={darkStore} onChange={handleOnChange}>
        <option value="all">All DS</option>
        <option value="dskg">DS Kelapa Gading</option>
        <option value="dssu">DS Sunter</option>
      </select> */}
      <Chart data={sortedTimeAverage} title="Daily Average SLA Trend" xDataKey="date" yDataKey="averageTime" grid/>
    </div>
  )
}
