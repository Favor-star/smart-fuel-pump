export function generateToken(liters: number): string {
  const randomPart = Math.floor(1000 + Math.random() * 9000);
  const datePart = new Date().toISOString().slice(2, 10).replace(/-/g, "");
  const timePart = new Date().toISOString().slice(11, 13);
  const formattedLiters = liters.toFixed(0).padStart(4, "0");
  return `${randomPart}-${formattedLiters}-${datePart}-${timePart}`;
}
