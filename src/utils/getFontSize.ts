export const getFontSizeValue = (fontSize:string) => {
    switch (fontSize) {
      case 'text-sm':
        return 14;
      case 'text-base':
        return 16;
      case 'text-lg':
        return 18;
      case 'text-xl':
        return 20;
      case 'text-2xl':
        return 24;
      case 'text-4xl':
        return 36;
      case 'text-5xl':
        return 48;
      case 'text-6xl':
        return 60;
      default:
        return 16;
    }
  };