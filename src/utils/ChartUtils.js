import moment from "moment";

export function processRawToChart(data) {
  let allTime = []

  data.map((datum) => {
    if (datum.completedAt) {
      const date = moment(datum.orderedAt).format('YYYY-MM-DD')
      allTime[date] = allTime[date] ? allTime[date] : {}
      if (moment(datum.completedAt) - moment(datum.orderedAt) <= 600000) {
        allTime[date]['slaDuration'] = allTime[date]['slaDuration'] ? allTime[date]['slaDuration'] +  moment(datum.completedAt) - moment(datum.orderedAt) : moment(datum.completedAt) - moment(datum.orderedAt)
        allTime[date]['slaCount'] = allTime[date]['slaCount'] ? allTime[date]['slaCount'] + 1 : 1
        if (datum.orderCreatedAt && datum.pickItemCompletedAt && datum.packStartedAt) {
          allTime[date]['pickingSpeed'] = allTime[date]['pickingSpeed'] ? allTime[date]['pickingSpeed'] + moment(datum.pickItemCompletedAt) - moment(datum.orderCreatedAt) + moment(datum.completedAt) - moment(datum.packStartedAt) : moment(datum.pickItemCompletedAt) - moment(datum.orderCreatedAt) + moment(datum.completedAt) - moment(datum.packStartedAt)
          allTime[date]['pickingSpeedCount'] = allTime[date]['pickingSpeedCount'] ? allTime[date]['pickingSpeedCount'] + 1 : 1
        }
        if (moment(datum.completedAt) - moment(datum.orderedAt) > 120000) {
          allTime[date]['orderAboveSla'] = allTime[date]['orderAboveSla'] ? allTime[date]['orderAboveSla'] + 1 : 1
        }
        else {
          allTime[date]['orderBelowSla'] = allTime[date]['orderBelowSla'] ? allTime[date]['orderBelowSla'] + 1 : 1
        }
      }
    }
  })
  const timeAverage = Object.keys(allTime).map((date) => ({
    date: date,
    averageSla: allTime[date]['slaDuration'] / allTime[date]['slaCount'] / 1000,
    averagePickingSpeed: allTime[date]['pickingSpeed'] / allTime[date]['pickingSpeedCount'] / 1000,
    orderAboveSla: allTime[date]['orderAboveSla'] ? allTime[date]['orderAboveSla'] : 0,
    orderBelowSla: allTime[date]['orderBelowSla'] ? allTime[date]['orderBelowSla'] : 0,
  }));

  const timeAverageWithPercentage = timeAverage.map((datum) => ({
    date: datum.date,
    averageSla: datum.averageSla,
    averagePickingSpeed: datum.averagePickingSpeed,
    orderBelowSla: datum.orderBelowSla,
    orderAboveSla: datum.orderAboveSla,
    percentageBelowSla: datum.orderBelowSla / (datum.orderBelowSla + datum.orderAboveSla) * 100,
    percentageAboveSla: datum.orderAboveSla / (datum.orderBelowSla + datum.orderAboveSla) * 100
  }))

  const sortedTimeAverage = timeAverageWithPercentage.sort(function(a, b) {
    return new Date(a.date) - new Date(b.date);
  });

  return sortedTimeAverage
}

export function processRawToFeaturedInfo(data) {
  let allTime = {}

  data.map((datum) => {
    if (datum.completedAt) {
      if (moment(datum.completedAt) - moment(datum.orderedAt) <= 600000) {
        allTime = {
          duration: allTime.duration ? allTime.duration +  moment(datum.completedAt) - moment(datum.orderedAt) : moment(datum.completedAt) - moment(datum.orderedAt),
          slaCount: allTime.slaCount ? allTime.slaCount + 1 : 1
        }
      }
    }
  })

  return {
    averageTime: allTime.duration / allTime.slaCount / 1000,
    orderCount: allTime.slaCount
  }
}

export function processRawToTimeHist(data) {
  let allTime = {}
  data.map((datum) => (
    allTime[moment(datum.orderedAt).startOf('hour').format('HH:mm:ss')] = allTime[moment(datum.orderedAt).startOf('hour').format('HH:mm:ss')] ? allTime[moment(datum.orderedAt).startOf('hour').format('HH:mm:ss')] + 1 : 1
  ))
  return allTime
}

export function calculateFreezerAboveSla(orderData, itemData) {
  const freezerSkus = ['FRFS', 'FRPL', 'FRMT', 'NRFZ']
  let freezerOrders = []
  let allTime = []

  orderData.map((orderDatum) => {
    if (orderDatum.completedAt) {
      if (moment(orderDatum.completedAt) - moment(orderDatum.orderdAt) <= 600000)  {
        const idFilter = datum => datum.orderId === orderDatum.id;
        const itemList = itemData.filter(idFilter)
        let skipIfFound = false
        itemList.forEach((element) => {
          if ((freezerSkus.includes(element.productSku.slice(0,4))) && !skipIfFound) {
            skipIfFound = true
            freezerOrders.push(orderDatum)
          }
        })
      }
    }
  })
  
  freezerOrders.map(freezerOrder => {
    const date = moment(freezerOrder.orderedAt).format('YYYY-MM-DD')
    allTime[date] = allTime[date] ? allTime[date] : {}
    allTime[date]['freezerOrders'] = allTime[date]['freezerOrders'] ? allTime[date]['freezerOrders'] + 1 : 1
    if (moment(freezerOrder.completedAt) - moment(freezerOrder.orderedAt) > 120000) {
      allTime[date]['freezerOrdersAboveSla'] = allTime[date]['freezerOrdersAboveSla'] ? allTime[date]['freezerOrdersAboveSla'] + 1 : 1
    }
  })
  return allTime
}

export function calculateNumberOfLineItems(itemData) {
  let allOrders = {}

  itemData.map((itemDatum) => {
    allOrders[itemDatum.orderId] = allOrders[itemDatum.orderId] ? allOrders[itemDatum.orderId] + 1 : 1
  })

  let orderDistribution = {}
  Object.keys(allOrders).map((order) => (
    orderDistribution[allOrders[order]] = orderDistribution[allOrders[order]] ? orderDistribution[allOrders[order]] + 1 : 1

  ))

  return orderDistribution
}

export function calculateFreshNonFresh(itemData, orderData) {
  let fresh = 0
  let nonFresh = 0
  let itemList = {}
  itemData.map((itemDatum) => {
    if (orderData.find(order => order.id === itemDatum.orderId)) {
      itemList[itemDatum.productName] = itemList[itemDatum.productName] ? itemList[itemDatum.productName] + parseInt(itemDatum.quantity) : parseInt(itemDatum.quantity)
      if (itemDatum.productSku.slice(0,2) === 'FR') {
        fresh += parseInt(itemDatum.quantity)
      }
      else {
        nonFresh += parseInt(itemDatum.quantity)
      }
    }
  }
  )
  return {
    itemList: Object.entries(itemList).sort((a, b) => b[1] - a[1]),
    fresh: fresh,
    nonFresh: nonFresh
  }
}
