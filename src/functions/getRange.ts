export function getDateRange(date: string) {
  const year = parseInt(date, 10);
  
  if (year >= 2020) return "Gen Alpha";
  if (year >= 2010) return "Gen Z";
  if (year >= 1995) return "Gen Y";
  if (year >= 1975) return "Gen X";
  if (year >= 1956) return "Baby Boomers";
  // Add more ranges as needed
  return "Silent Generation";
}