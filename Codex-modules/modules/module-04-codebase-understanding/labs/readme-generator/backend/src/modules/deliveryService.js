module.exports = {
  name: 'deliveryService',
  responsibility: 'Calculates shipping windows and delivery badges for each item.',
  apiSurface: ['estimateDelivery(zipCode)', 'getExpressBadge(product)']
};
