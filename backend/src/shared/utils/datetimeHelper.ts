const calculateOneWeekAgo = (): Date => {
  const now = new Date();
  return new Date(now.setDate(now.getDate() - 7));
}

const calculateOneDayAgo = (): Date => {
  const now = new Date();
  return new Date(now.setHours(0, 0, 0, 0));
}

export { calculateOneWeekAgo, calculateOneDayAgo };
