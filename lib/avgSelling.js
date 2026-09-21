export const avgSelling = (products) => {
  if (!products || !Array.isArray(products) || products.length === 0) return 0;

  const totalSoldSum = products.reduce((sum, p) => sum + (p.totalSold || 0), 0);

  return totalSoldSum / products.length;
};
