export const getCurrentTheme = (): "light" | "dark" => {
  const currentHour = new Date().getHours();
  return currentHour >= 6 && currentHour < 18 ? "light" : "dark";
};
