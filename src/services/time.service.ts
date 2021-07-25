export const getCurrentTimestamp = (): Number => Math.floor(Date.now() / 1000);

export const timestampToDate = timestamp => {
  const dateObj = new Date(timestamp * 1000);
  return `${dateObj.toLocaleTimeString()} - ${dateObj.toLocaleDateString()}`;
}
