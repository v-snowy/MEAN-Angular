const moment = require('moment');
const Order = require('../models/Order');
const errorHandler = require('../utils/errorHandler');

module.exports.overview = async function(req, res) {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ date: 1 });
    // Orders data
    const ordersMap = getOrdersMap(orders);
    const ordersCount = orders.length;
    const daysCount = Object.keys(ordersMap).length;
    const ordersPerDay = +((ordersCount / daysCount).toFixed(0));
    const yesterdayOrders = ordersMap[moment().add(-1, 'd').format('DD.MM.YYYY')] || [];
    const yesterdayOrdersCount = yesterdayOrders.length;
    const ordersPercent = +((((yesterdayOrdersCount / ordersPerDay) - 1) * 100).toFixed(2));
    const compareOrders = +((yesterdayOrdersCount - ordersPerDay).toFixed(2));

    // Gain data
    const totalGain = +calculatePrice(orders);
    const gainPerDay = totalGain / daysCount;
    const yesterdayGain = +calculatePrice(yesterdayOrders);
    const gainPercent = +((((yesterdayGain / gainPerDay) - 1) * 100).toFixed(2));
    const compareGain = +((yesterdayGain - gainPerDay).toFixed(2));

    res.status(200).json({
      gain: {
        percent: Math.abs(gainPercent),
        compare: Math.abs(compareGain),
        yesterday: yesterdayGain,
        isHigher: gainPercent > 0
      },
      orders: {
        percent: Math.abs(ordersPercent),
        compare: Math.abs(compareOrders),
        yesterday: yesterdayOrdersCount,
        isHigher: ordersPercent > 0
      }
    });
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.analytics = async function(req, res) {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ date: 1 });
    const ordersMap = getOrdersMap(orders);

    const average = +((calculatePrice(orders) / Object.keys(ordersMap).length).toFixed(2));
    const chart = Object.keys(ordersMap).map(label => {
      const gain = calculatePrice(ordersMap[label]);
      const order = ordersMap[label].length;

      return { label, gain, order };
    });

    res.status(200).json({ average, chart })
  } catch (e) {
    errorHandler(res, e);
  }
};

function getOrdersMap(orders) {
  const daysOrders = {};
  orders.forEach(order => {
    const date = moment(order.date).format('DD.MM.YYYY');

    if (date === moment().format('DD.MM.YYYY')) {
      return
    }

    if (!daysOrders[date]) {
      daysOrders[date] = [];
    }

    daysOrders[date].push(order);
  });
  return daysOrders;
}

function calculatePrice(orders) {
  return orders.reduce((acc, order) => {
    const orderPrice = order.list.reduce((total, item) => {
      return total += item.cost * item.quantity;
    }, 0)
    return acc += orderPrice;
  }, 0);
}