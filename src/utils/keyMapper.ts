import { getLayoutById } from "../data/keyboardLayouts";

export class KeyMapper {
  private qwertyToArabic: Map<string, string>;
  private qwertyShiftToArabic: Map<string, string>;

  constructor(layoutId: string) {
    this.qwertyToArabic = new Map();
    this.qwertyShiftToArabic = new Map();
    this.initializeMapping(layoutId);
  }

  public initializeMapping(layoutId: string) {
    const layout = getLayoutById(layoutId);
    
    for (const row of layout.rows) {
      for (const key of row) {
        // Map regular keys
        this.qwertyToArabic.set(key.qwerty.toLowerCase(), key.arabic);
        
        // Map shifted keys - use qwertyShift as the key
        if (key.arabicShift && key.qwertyShift) {
          this.qwertyShiftToArabic.set(key.qwertyShift.toLowerCase(), key.arabicShift);
        }
        // Also map shifted number keys and special characters
        if (key.arabicShift && key.qwerty.match(/[0-9`\-=[\];',./\\]/)) {
          this.qwertyShiftToArabic.set(key.qwerty, key.arabicShift);
        }
      }
    }
  }

  public mapKey(key: string, isShift: boolean): string | null {
    const lowercaseKey = key.toLowerCase();

    if (isShift) {
      // First try to find a direct shift mapping
      const shiftMapping = this.qwertyShiftToArabic.get(lowercaseKey);
      if (shiftMapping) return shiftMapping;

      // Then try to find a mapping for the original character
      const originalMapping = this.qwertyShiftToArabic.get(key);
      if (originalMapping) return originalMapping;
    }

    // If not shifted or no shift mapping found, use regular mapping
    return this.qwertyToArabic.get(lowercaseKey) || null;
  }
} 