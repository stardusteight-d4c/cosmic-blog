export function getDate() {
  const now = new Date();

  const day = now.getDate().toString().padStart(2, "0");
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const year = now.getFullYear().toString();

  const formattedDate = `${day}${month}${year}`;
  return formattedDate;
}
