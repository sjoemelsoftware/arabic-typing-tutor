// Add type declaration at the top
declare global {
  interface Navigator {
    keyboard: Keyboard;
  }
  interface Keyboard {
    getLayoutMap(): Promise<KeyboardLayoutMap>;
  }
  interface KeyboardLayoutMap {
    get(key: string): string | undefined;
  }
}

export const detectKeyboardLayout = async (): Promise<string> => {
  try {
    if ('keyboard' in navigator && 'getLayoutMap' in navigator.keyboard) {
      const layout = await navigator.keyboard.getLayoutMap();
      
      // Check for some Arabic-specific keys to determine layout
      const qKey = layout.get('q');
      if (qKey === 'ض') return 'osx-arabic';
      if (qKey === 'ق') return 'standard-arabic';
    }
  } catch (error) {
    console.log('Keyboard layout detection not supported:', error);
  }
  
  // Fallback: try to detect based on system language
  const language = navigator.language.toLowerCase();
  if (language.includes('ar')) {
    // Default to standard Arabic for Arabic locales
    return 'standard-arabic';
  }
  
  return 'osx-arabic'; // Default fallback
}; 