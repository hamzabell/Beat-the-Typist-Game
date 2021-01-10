import { useEffect, useState } from "react";

export default () => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return [theme, toggleTheme];
};
