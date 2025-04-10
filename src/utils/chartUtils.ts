
/**
 * Shared utility functions for charts and data visualizations
 */

/**
 * Generates random data points for demo charts
 * @param min Minimum value
 * @param max Maximum value
 * @param count Number of data points
 * @returns Array of random values
 */
export const generateRandomData = (min: number, max: number, count: number): number[] => {
  return Array.from({ length: count }, () => min + Math.random() * (max - min));
};

/**
 * Formats a number as currency
 * @param value Number to format
 * @returns Formatted currency string
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

/**
 * Formats a percentage value
 * @param value Number to format as percentage
 * @returns Formatted percentage string
 */
export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

/**
 * Generates gradient colors for charts
 * @param ctx Canvas context
 * @param colorStart Start color
 * @param colorEnd End color
 * @returns Canvas gradient
 */
export const createChartGradient = (
  ctx: CanvasRenderingContext2D, 
  colorStart: string, 
  colorEnd: string
) => {
  const gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, colorStart);
  gradient.addColorStop(1, colorEnd);
  return gradient;
};

/**
 * Shared chart config options for consistent styling
 */
export const sharedChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'bottom' as const,
      labels: {
        usePointStyle: true,
        padding: 20,
      },
    },
    tooltip: {
      enabled: true,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      titleColor: '#333',
      bodyColor: '#666',
      borderColor: '#ddd',
      borderWidth: 1,
      padding: 12,
      cornerRadius: 8,
      displayColors: true,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
        drawBorder: false,
      },
    },
    y: {
      grid: {
        drawBorder: false,
      },
      ticks: {
        padding: 10,
      },
    },
  },
};

/**
 * Common months array for x-axis labels
 */
export const monthsLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 * Common days array for x-axis labels
 */
export const daysLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
