export const formatPrice = (price: string | number, decimals: number = 2): string => {
  const num = typeof price === 'string' ? parseFloat(price) : price;
  return num.toFixed(decimals);
};

export const formatSize = (size: string | number, decimals: number = 4): string => {
  const num = typeof size === 'string' ? parseFloat(size) : size;
  return num.toFixed(decimals);
};

export const formatTradeTime = (timestamp: number): string => {
  const date = new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};

export const groupOrderBookData = (
  levels: Array<{ px: string; sz: string; n: number }>,
  grouping: number
): Array<{ price: number; size: number; total: number }> => {
  const grouped: { [key: string]: number } = {};
  
  levels.forEach(level => {
    const price = parseFloat(level.px);
    const size = parseFloat(level.sz);
    const groupedPrice = Math.floor(price / grouping) * grouping;
    
    if (grouped[groupedPrice]) {
      grouped[groupedPrice] += size;
    } else {
      grouped[groupedPrice] = size;
    }
  });
  
  const result = Object.entries(grouped).map(([price, size]) => ({
    price: parseFloat(price),
    size,
    total: 0
  }));
  
  // Sort and calculate cumulative totals
  result.sort((a, b) => b.price - a.price); // Descending for bids
  let cumulativeTotal = 0;
  
  for (let i = 0; i < result.length; i++) {
    cumulativeTotal += result[i].size;
    result[i].total = cumulativeTotal;
  }
  
  return result;
};
