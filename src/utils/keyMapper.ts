import { getLayoutById } from "../data/keyboardLayouts";

export class KeyMapper {
  public qwertyToArabic: Map<string, string>;
  public qwertyShiftToArabic: Map<string, string>;

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
        this.qwertyToArabic.set(key.qwerty, key.arabic);
        
        // Map shifted keys - use qwertyShift as the key
        if (key.arabicShift && key.qwertyShift) {
          this.qwertyShiftToArabic.set(key.qwertyShift, key.arabicShift);
        }
      }
    }
  }

  public mapKey(key: string, isShift: boolean): string | null {
    const lowercaseKey = key.toLowerCase();

    if (isShift) {
      
      // First try to find a direct shift mapping
      const shiftMapping = this.qwertyShiftToArabic.get(key);
      if (shiftMapping) return shiftMapping;

      // Then try to find a mapping for the original character
      const originalMapping = this.qwertyShiftToArabic.get(key);
      if (originalMapping) return originalMapping;
    }

    // If not shifted or no shift mapping found, use regular mapping
    return this.qwertyToArabic.get(lowercaseKey) || null;
  }
} 