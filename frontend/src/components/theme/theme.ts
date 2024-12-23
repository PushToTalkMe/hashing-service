"use client";
import { getCurrentTheme } from "@/lib/theme";
import { useEffect } from "react";

const Theme = () => {
  useEffect(() => {
    const theme = getCurrentTheme();
    document.body.classList.add(theme);

    return () => {
      document.body.classList.remove(theme);
    };
  }, []);

  return null;
};

export default Theme;
