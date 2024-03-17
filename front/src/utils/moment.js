
export function formatDate(date) {
  let formated_data = new Date(date)
  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  return formated_data.toLocaleDateString("fr-FR", options);
}