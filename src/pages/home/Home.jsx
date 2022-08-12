import { useEffect, useState } from "react";
import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import { csv } from 'd3';
import orderCsvData from '../../order.csv';
import lineItemCsvData from '../../lineItem.csv'
import { calculateFreezerAboveSla, processRawToTimeHist, processRawToChart, processRawToFeaturedInfo, calculateNumberOfLineItems, calculateFreshNonFresh } from "../../utils/ChartUtils";
import { processDataToTable } from "../../utils/TableUtils"
import "./home.css";
import moment from "moment";

export default function Home() {

  const [orderData, setOrderData] = useState(null);
  const [lineItemData, setLineItemData] = useState(null);

  useEffect(() => {
    csv(orderCsvData).then(setOrderData);
    csv(lineItemCsvData).then(setLineItemData)
  }, []);
  if ((!orderData) || (!lineItemData)) {
    return <pre>Loading...</pre>
  }
  const dskgFilter = datum => datum.warehouseName === 'DS Kelapa Gading';
  const dsknFilter = datum => datum.warehouseName === 'DS Kuningan';
  const dspiFilter = datum => datum.warehouseName ==='DS Pondok Indah';
  const dspkFilter = datum => datum.warehouseName === 'DS PIK';
  const dssdFilter = datum => datum.warehouseName === 'DS Benhil / Sudirman';
  const dssnFilter = datum => datum.warehouseName === 'DS Senopati';
  const dssuFilter = datum => datum.warehouseName === 'DS Sunter';
  const dssyFilter = datum => datum.warehouseName === 'DS Senayan';
  const weekFilter = datum => moment(datum.orderedAt).format('YYYY-MM-DD') >= moment().subtract(14,'d').format('YYYY-MM-DD') && moment(datum.orderedAt).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')
  const lastWeekFilter = datum => moment(datum.orderedAt).format('YYYY-MM-DD') >= moment().subtract(14,'d').format('YYYY-MM-DD') && moment(datum.orderedAt).format('YYYY-MM-DD') < moment().subtract(7,'d').format('YYYY-MM-DD')
  const cancelledFilter = datum => datum.cancelledAt

  const featuredInfosAllData = processRawToFeaturedInfo(orderData.filter(weekFilter))
  const featuredInfosAllDataLastWeek = processRawToFeaturedInfo(orderData.filter(lastWeekFilter))
  const featuredInfosDskgData = processRawToFeaturedInfo(orderData.filter(dskgFilter).filter(weekFilter))
  const featuredInfosDskgDataLastWeek = processRawToFeaturedInfo(orderData.filter(dskgFilter).filter(lastWeekFilter))
  const featuredInfosDsknData = processRawToFeaturedInfo(orderData.filter(dsknFilter).filter(weekFilter))
  const featuredInfosDsknDataLastWeek = processRawToFeaturedInfo(orderData.filter(dsknFilter).filter(lastWeekFilter))
  const featuredInfosDspiData = processRawToFeaturedInfo(orderData.filter(dspiFilter).filter(weekFilter))
  const featuredInfosDspiDataLastWeek = processRawToFeaturedInfo(orderData.filter(dspiFilter).filter(lastWeekFilter))
  const featuredInfosDspkData = processRawToFeaturedInfo(orderData.filter(dspkFilter).filter(weekFilter))
  const featuredInfosDspkDataLastWeek = processRawToFeaturedInfo(orderData.filter(dspkFilter).filter(lastWeekFilter))
  const featuredInfosDssdData = processRawToFeaturedInfo(orderData.filter(dssdFilter).filter(weekFilter))
  const featuredInfosDssdDataLastWeek = processRawToFeaturedInfo(orderData.filter(dssdFilter).filter(lastWeekFilter))
  const featuredInfosDssnData = processRawToFeaturedInfo(orderData.filter(dssnFilter).filter(weekFilter))
  const featuredInfosDssnDataLastWeek = processRawToFeaturedInfo(orderData.filter(dssnFilter).filter(lastWeekFilter))
  const featuredInfosDssuData = processRawToFeaturedInfo(orderData.filter(dssuFilter).filter(weekFilter))
  const featuredInfosDssuDataLastWeek = processRawToFeaturedInfo(orderData.filter(dssuFilter).filter(lastWeekFilter))
  const featuredInfosDssyData = processRawToFeaturedInfo(orderData.filter(dssyFilter).filter(weekFilter))
  const featuredInfosDssyDataLastWeek = processRawToFeaturedInfo(orderData.filter(dssyFilter).filter(lastWeekFilter))

  // console.log(calculateFreezerAboveSla(orderData, lineItemData))
  // console.log(processRawToTimeHist(orderData))
  // let csvContent = "data:text/csv;charset=utf-8," + calculateFreshNonFresh(lineItemData, orderData).itemList.map(e => e.join(",")).join("\n")
  return (
    <div className='home'>
      <div className="featuredInfos">
        <FeaturedInfo averageTime={featuredInfosAllData.averageTime} numberOfOrders={featuredInfosAllData.orderCount} lastWeekAverageTime={featuredInfosAllDataLastWeek.averageTime} lastWeekNumberOfOrders={featuredInfosAllDataLastWeek.orderCount} title="Weekly Fulfillment Time Average All Dark Stores"/>
        <FeaturedInfo averageTime={featuredInfosDskgData.averageTime} numberOfOrders={featuredInfosDskgData.orderCount} lastWeekAverageTime={featuredInfosDskgDataLastWeek.averageTime} lastWeekNumberOfOrders={featuredInfosDskgDataLastWeek.orderCount} title="Weekly Fulfillment Time Average DS Kelapa Gading"/>
        <FeaturedInfo averageTime={featuredInfosDsknData.averageTime} numberOfOrders={featuredInfosDsknData.orderCount} lastWeekAverageTime={featuredInfosDsknDataLastWeek.averageTime} lastWeekNumberOfOrders={featuredInfosDsknDataLastWeek.orderCount} title="Weekly Fulfillment Time Average DS Kuningan"/>
        {/* <FeaturedInfo averageTime={featuredInfosDspiData.averageTime} numberOfOrders={featuredInfosDspiData.orderCount} lastWeekAverageTime={featuredInfosDspiDataLastWeek.averageTime} lastWeekNumberOfOrders={featuredInfosDspiDataLastWeek.orderCount} title="Weekly Fulfillment Time Average DS Pondok Indah"/> */}
        <FeaturedInfo averageTime={featuredInfosDspkData.averageTime} numberOfOrders={featuredInfosDspkData.orderCount} lastWeekAverageTime={featuredInfosDspkDataLastWeek.averageTime} lastWeekNumberOfOrders={featuredInfosDspkDataLastWeek.orderCount} title="Weekly Fulfillment Time Average DS PIK"/>
        <FeaturedInfo averageTime={featuredInfosDssdData.averageTime} numberOfOrders={featuredInfosDssdData.orderCount} lastWeekAverageTime={featuredInfosDssdDataLastWeek.averageTime} lastWeekNumberOfOrders={featuredInfosDssdDataLastWeek.orderCount} title="Weekly Fulfillment Time Average DS Benhil / Sudirman"/>
        <FeaturedInfo averageTime={featuredInfosDssnData.averageTime} numberOfOrders={featuredInfosDssnData.orderCount} lastWeekAverageTime={featuredInfosDssnDataLastWeek.averageTime} lastWeekNumberOfOrders={featuredInfosDssnDataLastWeek.orderCount} title="Weekly Fulfillment Time Average DS Senopati"/>
        <FeaturedInfo averageTime={featuredInfosDssuData.averageTime} numberOfOrders={featuredInfosDssuData.orderCount} lastWeekAverageTime={featuredInfosDssuDataLastWeek.averageTime} lastWeekNumberOfOrders={featuredInfosDssuDataLastWeek.orderCount} title="Weekly Fulfillment Time Average DS Sunter"/>
        <FeaturedInfo averageTime={featuredInfosDssyData.averageTime} numberOfOrders={featuredInfosDssyData.orderCount} lastWeekAverageTime={featuredInfosDssyDataLastWeek.averageTime} lastWeekNumberOfOrders={featuredInfosDssyDataLastWeek.orderCount} title="Weekly Fulfillment Time Average DS Senayan"/>
      </div>

      <div className="charts">
        <Chart data={processRawToChart(orderData.filter(weekFilter))} title="Daily Average SLA Trend All Dark Stores" grid/>
        {/* {processDataToTable(calculateFreshNonFresh(lineItemData, orderData).itemList)} */}
        <Chart data={processRawToChart(orderData.filter(dskgFilter).filter(weekFilter))} title="Daily Average SLA Trend DS Kelapa Gading" grid/>
        {/* {processDataToTable(calculateFreshNonFresh(lineItemData, orderData.filter(dskgFilter)).itemList)} */}
        <Chart data={processRawToChart(orderData.filter(dsknFilter).filter(weekFilter))} title="Daily Average SLA Trend DS Kuningan" grid/>
        {/* {processDataToTable(calculateFreshNonFresh(lineItemData, orderData.filter(dsknFilter)).itemList)} */}
        <Chart data={processRawToChart(orderData.filter(dspiFilter).filter(weekFilter))} title="Daily Average SLA Trend DS Pondok Indah" grid/>
        {/* {processDataToTable(calculateFreshNonFresh(lineItemData, orderData.filter(dspiFilter)).itemList)} */}
        <Chart data={processRawToChart(orderData.filter(dspkFilter).filter(weekFilter))} title="Daily Average SLA Trend DS PIK" grid/>
        {/* {processDataToTable(calculateFreshNonFresh(lineItemData, orderData.filter(dspkFilter)).itemList)} */}
        <Chart data={processRawToChart(orderData.filter(dssdFilter).filter(weekFilter))} title="Daily Average SLA Trend DS Benhil / Sudirman" grid/>
        {/* {processDataToTable(calculateFreshNonFresh(lineItemData, orderData.filter(dssdFilter)).itemList)} */}
        <Chart data={processRawToChart(orderData.filter(dssnFilter).filter(weekFilter))} title="Daily Average SLA Trend DS Senopati" grid/>
        {/* {processDataToTable(calculateFreshNonFresh(lineItemData, orderData.filter(dssnFilter)).itemList)} */}
        <Chart data={processRawToChart(orderData.filter(dssuFilter).filter(weekFilter))} title="Daily Average SLA Trend DS Sunter" grid/>
        {/* {processDataToTable(calculateFreshNonFresh(lineItemData, orderData.filter(dssuFilter)).itemList)} */}
        <Chart data={processRawToChart(orderData.filter(dssyFilter).filter(weekFilter))} title="Daily Average SLA Trend DS Senayan" grid/>
        {/* {processDataToTable(calculateFreshNonFresh(lineItemData, orderData.filter(dssyFilter)).itemList)} */}
      </div>
    </div>

  )
}
