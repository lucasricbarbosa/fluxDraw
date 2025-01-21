import { useState } from "react";

export const useTextStyle = (data: any) => {
  const [isItalic, setIsItalic] = useState(data.isItalic);
  const [isUnderline, setIsUnderline] = useState(data.isUnderline);
  const [isStrikethrough, setIsStrikethrough] = useState(data.isStrikethrough);
  const [fontWeight, setFontWeight] = useState(data?.fontWeight || "normal");
  const [fontSize, setFontSize] = useState(data?.fontSize || "base");

  const toggleStyle = (style: "italic" | "underline" | "strikethrough") => {
    const styleToggles = {
      italic: [isItalic, setIsItalic],
      underline: [isUnderline, setIsUnderline],
      strikethrough: [isStrikethrough, setIsStrikethrough],
    };
    const [current, setter] = styleToggles[style];
    const newValue = !current;
    setter(newValue);
    if (data) data[style] = newValue;
  };

  const handleFontWeightChange = (value: string) => {
    setFontWeight(value);
    if (data) data.fontWeight = value;
  };

  const handleFontSizeChange = (value: string) => {
    setFontSize(value);
    if (data) data.fontSize = value;
  };

  return {
    isItalic,
    isUnderline,
    isStrikethrough,
    fontWeight,
    fontSize,
    toggleStyle,
    handleFontWeightChange,
    handleFontSizeChange,
  };
};
