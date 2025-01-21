export const getTextColor = (theme:string) => {
    switch (theme) {
      case "dark":
        return "#ffffff"; // Cor do texto no tema escuro
      case "light":
        return "#164e63"; // Cor do texto no tema claro
      case "system":
        return "#164e63"; // Cor padrão para o modo 'system'
      default:
        return "#164e63"; // Cor padrão
    }
  };

  export const getBgColor = (theme:string) => {
    switch (theme) {
      case "dark":
        return "#02091A"; // Cor do texto no tema escuro
      case "light":
        return "#fff"; // Cor do texto no tema claro
      case "system":
        return "#fff"; // Cor padrão para o modo 'system'
      default:
        return "#fff"; // Cor padrão
    }
  };