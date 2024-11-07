const calculateCorrelation = (moods, weatherData) => {
    const n = moods.length;
    const sumX = moods.reduce((a, b) => a + b, 0);
    const sumY = weatherData.reduce((a, b) => a + b, 0);
    const sumXY = moods.reduce((sum, x, i) => sum + x * weatherData[i], 0);
    const sumX2 = moods.reduce((sum, x) => sum + x * x, 0);
    const sumY2 = weatherData.reduce((sum, y) => sum + y * y, 0);
  
    const numerator = n * sumXY - sumX * sumY;
    const denominator = Math.sqrt(
      (n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY)
    );
  
    return denominator !== 0 ? numerator / denominator : 0;
  };
  