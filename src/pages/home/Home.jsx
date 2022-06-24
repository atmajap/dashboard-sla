import { useEffect, useState } from "react";
import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import { csv } from 'd3';
import csvData from '../../results.csv';
import { processRawToChart, processRawToFeaturedInfo } from "../../utils/ChartUtils";
import "./home.css";
import moment from "moment";

export default function Home() {

  const [data, setData] = useState(null);

  useEffect(() => {
    csv(csvData).then(setData);
  }, []);
  if (!data) {
    return <pre>Loading...</pre>
  }
  const dskgFilter = datum => datum.warehouseName === 'DS Kelapa Gading';
  const dsknFilter = datum => datum.warehouseName === 'DS Kuningan';
  const dspkFilter = datum => datum.warehouseName === 'DS PIK';
  const dssdFilter = datum => datum.warehouseName === 'DS Benhil / Sudirman';
  const dssnFilter = datum => datum.warehouseName === 'DS Senopati';
  const dssuFilter = datum => datum.warehouseName === 'DS Sunter';
  const dssyFilter = datum => datum.warehouseName === 'DS Senayan';
  const weekFilter = datum => moment(datum.orderedAt).format('YYYY-MM-DD') >= moment().subtract(7,'d').format('YYYY-MM-DD') && moment(datum.orderedAt).format('YYYY-MM-DD') <= moment().format('YYYY-MM-DD')

  return (
    <div className='home'>
      <div className="featuredInfos">
        <FeaturedInfo averageTime={processRawToFeaturedInfo(data.filter(weekFilter)).averageTime} numberofOrders={processRawToFeaturedInfo(data.filter(weekFilter)).orderCount} title="Weekly Fulfillment Time Average All Dark Stores"/>
        <FeaturedInfo averageTime={processRawToFeaturedInfo(data.filter(dskgFilter).filter(weekFilter)).averageTime} numberofOrders={processRawToFeaturedInfo(data.filter(dskgFilter).filter(weekFilter)).orderCount} title="Weekly Fulfillment Time Average DS Kelapa Gading"/>
        <FeaturedInfo averageTime={processRawToFeaturedInfo(data.filter(dsknFilter).filter(weekFilter)).averageTime} numberofOrders={processRawToFeaturedInfo(data.filter(dsknFilter).filter(weekFilter)).orderCount} title="Weekly Fulfillment Time Average DS Kuningan"/>
        <FeaturedInfo averageTime={processRawToFeaturedInfo(data.filter(dspkFilter).filter(weekFilter)).averageTime} numberofOrders={processRawToFeaturedInfo(data.filter(dspkFilter).filter(weekFilter)).orderCount} title="Weekly Fulfillment Time Average DS PIK"/>
        <FeaturedInfo averageTime={processRawToFeaturedInfo(data.filter(dssdFilter).filter(weekFilter)).averageTime} numberofOrders={processRawToFeaturedInfo(data.filter(dssdFilter).filter(weekFilter)).orderCount} title="Weekly Fulfillment Time Average DS Benhil / Sudirman"/>
        <FeaturedInfo averageTime={processRawToFeaturedInfo(data.filter(dssnFilter).filter(weekFilter)).averageTime} numberofOrders={processRawToFeaturedInfo(data.filter(dssnFilter).filter(weekFilter)).orderCount} title="Weekly Fulfillment Time Average DS Senopati"/>
        <FeaturedInfo averageTime={processRawToFeaturedInfo(data.filter(dssuFilter).filter(weekFilter)).averageTime} numberofOrders={processRawToFeaturedInfo(data.filter(dssuFilter).filter(weekFilter)).orderCount} title="Weekly Fulfillment Time Average DS Sunter"/>
        <FeaturedInfo averageTime={processRawToFeaturedInfo(data.filter(dssyFilter).filter(weekFilter)).averageTime} numberofOrders={processRawToFeaturedInfo(data.filter(dssyFilter).filter(weekFilter)).orderCount} title="Weekly Fulfillment Time Average DS Senayan"/>
      </div>
      <Chart data={processRawToChart(data)} title="Daily Average SLA Trend All Dark Stores" xDataKey="date" yDataKey="averageTime" grid/>
      <Chart data={processRawToChart(data.filter(dskgFilter))} title="Daily Average SLA Trend DS Kelapa Gading" xDataKey="date" yDataKey="averageTime" grid/>
      <Chart data={processRawToChart(data.filter(dsknFilter))} title="Daily Average SLA Trend DS Kuningan" xDataKey="date" yDataKey="averageTime" grid/>
      <Chart data={processRawToChart(data.filter(dspkFilter))} title="Daily Average SLA Trend DS PIK" xDataKey="date" yDataKey="averageTime" grid/>
      <Chart data={processRawToChart(data.filter(dssdFilter))} title="Daily Average SLA Trend DS Benhil / Sudirman" xDataKey="date" yDataKey="averageTime" grid/>
      <Chart data={processRawToChart(data.filter(dssnFilter))} title="Daily Average SLA Trend DS Senopati" xDataKey="date" yDataKey="averageTime" grid/>
      <Chart data={processRawToChart(data.filter(dssuFilter))} title="Daily Average SLA Trend DS Sunter" xDataKey="date" yDataKey="averageTime" grid/>
      <Chart data={processRawToChart(data.filter(dssyFilter))} title="Daily Average SLA Trend DS Senayan" xDataKey="date" yDataKey="averageTime" grid/>
    </div>
  )
}
