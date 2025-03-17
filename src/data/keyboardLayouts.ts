export interface KeyboardKey {
  arabic: string;
  qwerty: string;
  shift?: string;  // Arabic character when shift is pressed
  arabicShift?: string;  // Arabic character when shift is pressed
  qwertyShift?: string;  // QWERTY character when shift is pressed
}

export interface KeyboardLayout {
  id: string;
  name: string;
  nameAr: string;
  rows: KeyboardKey[][];
}

export const OSXArabicLayout: KeyboardLayout = {
  id: "osx-arabic",
  name: "OS X Arabic",
  nameAr: "نظام ماك العربي",
  rows: [
    [
      { arabic: "ـ", qwerty: "`", qwertyShift: "~" },
      { arabic: "١", arabicShift: "!", qwerty: "1", qwertyShift: "!" },
      { arabic: "٢", arabicShift: "@", qwerty: "2", qwertyShift: "@" },
      { arabic: "٣", arabicShift: "#", qwerty: "3", qwertyShift: "#" },
      { arabic: "٤", arabicShift: "$", qwerty: "4", qwertyShift: "$" },
      { arabic: "٥", arabicShift: "%", qwerty: "5", qwertyShift: "%" },
      { arabic: "٦", arabicShift: "^", qwerty: "6", qwertyShift: "^" },
      { arabic: "٧", arabicShift: "&", qwerty: "7", qwertyShift: "&" },
      { arabic: "٨", arabicShift: "*", qwerty: "8", qwertyShift: "*" },
      { arabic: "٩", arabicShift: ")", qwerty: "9", qwertyShift: "(" },
      { arabic: "٠", arabicShift: "(", qwerty: "0", qwertyShift: ")" },
      { arabic: "-", arabicShift: "_", qwerty: "-", qwertyShift: "_" },
      { arabic: "=", arabicShift: "+", qwerty: "=", qwertyShift: "+" },
    ],
    [
      { arabic: "ض", arabicShift: "َ", qwerty: "q", qwertyShift: "Q" },
      { arabic: "ص", arabicShift: "ً", qwerty: "w", qwertyShift: "W" },
      { arabic: "ث", arabicShift: "ُ", qwerty: "e", qwertyShift: "E" },
      { arabic: "ق", arabicShift: "ٍ", qwerty: "r", qwertyShift: "R" },
      { arabic: "ف", arabicShift: "ُ", qwerty: "t", qwertyShift: "T" },
      { arabic: "غ", arabicShift: "ٌ", qwerty: "y", qwertyShift: "Y" },
      { arabic: "ع", arabicShift: "ْ", qwerty: "u", qwertyShift: "U" },
      { arabic: "ه", arabicShift: "ّ", qwerty: "i", qwertyShift: "I" },
      { arabic: "خ", arabicShift: "]", qwerty: "o", qwertyShift: "O" },
      { arabic: "ح", arabicShift: "[", qwerty: "p", qwertyShift: "P" },
      { arabic: "ج", arabicShift: "}", qwerty: "[", qwertyShift: "{" },
      { arabic: "ة", arabicShift: "{", qwerty: "]", qwertyShift: "}" },
      { arabic: "\\", arabicShift: "|", qwerty: "\\", qwertyShift: "|" },
    ],
    [
      { arabic: "ش", arabicShift: "»", qwerty: "a", qwertyShift: "A" },
      { arabic: "س", arabicShift: "«", qwerty: "s", qwertyShift: "S" },
      { arabic: "ي", arabicShift: "ى", qwerty: "d", qwertyShift: "D" },
      { arabic: "ب", qwerty: "f", qwertyShift: "F" },
      { arabic: "ل", qwerty: "g", qwertyShift: "G" },
      { arabic: "ا", arabicShift: "آ", qwerty: "h", qwertyShift: "H" },
      { arabic: "ت", qwerty: "j", qwertyShift: "J" },
      { arabic: "ن", arabicShift: "٫", qwerty: "k", qwertyShift: "K" },
      { arabic: "م", arabicShift: "٬", qwerty: "l", qwertyShift: "L" },
      { arabic: "ك", arabicShift: ":", qwerty: ";", qwertyShift: ":" },
      { arabic: "؛", arabicShift: '"', qwerty: "'", qwertyShift: '"' },
    ],
    [
      { arabic: "ظ", arabicShift: "'", qwerty: "z", qwertyShift: "Z" },
      { arabic: "ط", qwerty: "x", qwertyShift: "X" },
      { arabic: "ذ", arabicShift: "ئ", qwerty: "c", qwertyShift: "C" },
      { arabic: "د", arabicShift: "ء", qwerty: "v", qwertyShift: "V" },
      { arabic: "ز", arabicShift: "أ", qwerty: "b", qwertyShift: "B" },
      { arabic: "ر", arabicShift: "إ", qwerty: "n", qwertyShift: "N" },
      { arabic: "و", arabicShift: "ؤ", qwerty: "m", qwertyShift: "M" },
      { arabic: "،", arabicShift: ">", qwerty: ",", qwertyShift: "<" },
      { arabic: ".", arabicShift: "<", qwerty: ".", qwertyShift: ">" },
      { arabic: "/", arabicShift: "؟", qwerty: "/", qwertyShift: "?" },
    ],
  ]
};

export const StandardArabicLayout: KeyboardLayout = {
  id: "standard-arabic",
  name: "Standard Arabic",
  nameAr: "النظام العربي القياسي",
  rows: [
    [
      { arabic: "ذ", qwerty: "`", arabicShift: "ّ", qwertyShift: "~" },
      { arabic: "١", qwerty: "1", arabicShift: "!", qwertyShift: "!" },
      { arabic: "٢", qwerty: "2", arabicShift: "@", qwertyShift: "@" },
      { arabic: "٣", qwerty: "3", arabicShift: "#", qwertyShift: "#" },
      { arabic: "٤", qwerty: "4", arabicShift: "$", qwertyShift: "$" },
      { arabic: "٥", qwerty: "5", arabicShift: "%", qwertyShift: "%" },
      { arabic: "٦", qwerty: "6", arabicShift: "^", qwertyShift: "^" },
      { arabic: "٧", qwerty: "7", arabicShift: "&", qwertyShift: "&" },
      { arabic: "٨", qwerty: "8", arabicShift: "*", qwertyShift: "*" },
      { arabic: "٩", qwerty: "9", arabicShift: "(", qwertyShift: "(" },
      { arabic: "٠", qwerty: "0", arabicShift: ")", qwertyShift: ")" },
      { arabic: "-", qwerty: "-", arabicShift: "_", qwertyShift: "_" },
      { arabic: "=", qwerty: "=", arabicShift: "+", qwertyShift: "+" },
    ],
    [
      { arabic: "ض", qwerty: "q", arabicShift: "َ", qwertyShift: "Q" },
      { arabic: "ص", qwerty: "w", arabicShift: "ً", qwertyShift: "W" },
      { arabic: "ث", qwerty: "e", arabicShift: "ُ", qwertyShift: "E" },
      { arabic: "ق", qwerty: "r", arabicShift: "ٌ", qwertyShift: "R" },
      { arabic: "ف", qwerty: "t", arabicShift: "ﻹ", qwertyShift: "T" },
      { arabic: "غ", qwerty: "y", arabicShift: "إ", qwertyShift: "Y" },
      { arabic: "ع", qwerty: "u", arabicShift: "'", qwertyShift: "U" },
      { arabic: "ه", qwerty: "i", arabicShift: "÷", qwertyShift: "I" },
      { arabic: "خ", qwerty: "o", arabicShift: "×", qwertyShift: "O" },
      { arabic: "ح", qwerty: "p", arabicShift: "؛", qwertyShift: "P" },
      { arabic: "ج", qwerty: "[", arabicShift: "<", qwertyShift: "{" },
      { arabic: "د", qwerty: "]", arabicShift: ">", qwertyShift: "}" },
      { arabic: "\\", qwerty: "\\", arabicShift: "|", qwertyShift: "|" },
    ],
    [
      { arabic: "ش", qwerty: "a", arabicShift: "ِ", qwertyShift: "A" },
      { arabic: "س", qwerty: "s", arabicShift: "ٍ", qwertyShift: "S" },
      { arabic: "ي", qwerty: "d", arabicShift: "]", qwertyShift: "D" },
      { arabic: "ب", qwerty: "f", arabicShift: "[", qwertyShift: "F" },
      { arabic: "ل", qwerty: "g", arabicShift: "ﻷ", qwertyShift: "G" },
      { arabic: "ا", qwerty: "h", arabicShift: "أ", qwertyShift: "H" },
      { arabic: "ت", qwerty: "j", arabicShift: "ـ", qwertyShift: "J" },
      { arabic: "ن", qwerty: "k", arabicShift: "،", qwertyShift: "K" },
      { arabic: "م", qwerty: "l", arabicShift: "/", qwertyShift: "L" },
      { arabic: "ك", qwerty: ";", arabicShift: ":", qwertyShift: ":" },
      { arabic: "ط", qwerty: "'", arabicShift: "\"", qwertyShift: "\"" },
    ],
    [
      { arabic: "ئ", qwerty: "z", arabicShift: "~", qwertyShift: "Z" },
      { arabic: "ء", qwerty: "x", arabicShift: "ْ", qwertyShift: "X" },
      { arabic: "ؤ", qwerty: "c", arabicShift: "}", qwertyShift: "C" },
      { arabic: "ر", qwerty: "v", arabicShift: "{", qwertyShift: "V" },
      { arabic: "ﻻ", qwerty: "b", arabicShift: "ﻵ", qwertyShift: "B" },
      { arabic: "ى", qwerty: "n", arabicShift: "آ", qwertyShift: "N" },
      { arabic: "ة", qwerty: "m", arabicShift: "'", qwertyShift: "M" },
      { arabic: "و", qwerty: ",", arabicShift: ",", qwertyShift: "<" },
      { arabic: "ز", qwerty: ".", arabicShift: ".", qwertyShift: ">" },
      { arabic: "ظ", qwerty: "/", arabicShift: "؟", qwertyShift: "?" },
    ],
  ],
};

export const Arabic102Layout: KeyboardLayout = {
  id: "arabic-102",
  name: "Arabic 102 (ISO105)",
  nameAr: "العربية 102 (ISO105)",
  rows: [
    [
      { arabic: ">", qwerty: "`", arabicShift: "<", qwertyShift: "~" },
      { arabic: "١", qwerty: "1", arabicShift: "!", qwertyShift: "!" },
      { arabic: "٢", qwerty: "2", arabicShift: "@", qwertyShift: "@" },
      { arabic: "٣", qwerty: "3", arabicShift: "#", qwertyShift: "#" },
      { arabic: "٤", qwerty: "4", arabicShift: "$", qwertyShift: "$" },
      { arabic: "٥", qwerty: "5", arabicShift: "%", qwertyShift: "%" },
      { arabic: "٦", qwerty: "6", arabicShift: "^", qwertyShift: "^" },
      { arabic: "٧", qwerty: "7", arabicShift: "&", qwertyShift: "&" },
      { arabic: "٨", qwerty: "8", arabicShift: "*", qwertyShift: "*" },
      { arabic: "٩", qwerty: "9", arabicShift: "(", qwertyShift: "(" },
      { arabic: "٠", qwerty: "0", arabicShift: ")", qwertyShift: ")" },
      { arabic: "-", qwerty: "-", arabicShift: "_", qwertyShift: "_" },
      { arabic: "=", qwerty: "=", arabicShift: "+", qwertyShift: "+" },
    ],
    [
      { arabic: "ض", qwerty: "q", arabicShift: "َ", qwertyShift: "Q" },
      { arabic: "ص", qwerty: "w", arabicShift: "ً", qwertyShift: "W" },
      { arabic: "ث", qwerty: "e", arabicShift: "ُ", qwertyShift: "E" },
      { arabic: "ق", qwerty: "r", arabicShift: "ٌ", qwertyShift: "R" },
      { arabic: "ف", qwerty: "t", arabicShift: "ﻹ", qwertyShift: "T" },
      { arabic: "غ", qwerty: "y", arabicShift: "إ", qwertyShift: "Y" },
      { arabic: "ع", qwerty: "u", arabicShift: "'", qwertyShift: "U" },
      { arabic: "ه", qwerty: "i", arabicShift: "÷", qwertyShift: "I" },
      { arabic: "خ", qwerty: "o", arabicShift: "×", qwertyShift: "O" },
      { arabic: "ح", qwerty: "p", arabicShift: "؛", qwertyShift: "P" },
      { arabic: "ج", qwerty: "[", arabicShift: "{", qwertyShift: "{" },
      { arabic: "د", qwerty: "]", arabicShift: "}", qwertyShift: "}" },
    ],
    [
      { arabic: "ش", qwerty: "a", arabicShift: "ِ", qwertyShift: "A" },
      { arabic: "س", qwerty: "s", arabicShift: "ٍ", qwertyShift: "S" },
      { arabic: "ي", qwerty: "d", arabicShift: "]", qwertyShift: "D" },
      { arabic: "ب", qwerty: "f", arabicShift: "[", qwertyShift: "F" },
      { arabic: "ل", qwerty: "g", arabicShift: "ﻷ", qwertyShift: "G" },
      { arabic: "ا", qwerty: "h", arabicShift: "أ", qwertyShift: "H" },
      { arabic: "ت", qwerty: "j", arabicShift: "ـ", qwertyShift: "J" },
      { arabic: "ن", qwerty: "k", arabicShift: "،", qwertyShift: "K" },
      { arabic: "م", qwerty: "l", arabicShift: "/", qwertyShift: "L" },
      { arabic: "ك", qwerty: ";", arabicShift: ":", qwertyShift: ":" },
      { arabic: "ط", qwerty: "'", arabicShift: "\"", qwertyShift: "\"" },
      { arabic: "ذ", qwerty: "\\", arabicShift: "ٌ", qwertyShift: "|" },
    ],
    [
      { arabic: "ئ", qwerty: "z", arabicShift: "~", qwertyShift: "Z" },
      { arabic: "ء", qwerty: "x", arabicShift: "ْ", qwertyShift: "X" },
      { arabic: "ؤ", qwerty: "c", arabicShift: "}", qwertyShift: "C" },
      { arabic: "ر", qwerty: "v", arabicShift: "{", qwertyShift: "V" },
      { arabic: "ﻻ", qwerty: "b", arabicShift: "ﻵ", qwertyShift: "B" },
      { arabic: "ى", qwerty: "n", arabicShift: "آ", qwertyShift: "N" },
      { arabic: "ة", qwerty: "m", arabicShift: "'", qwertyShift: "M" },
      { arabic: "و", qwerty: ",", arabicShift: ",", qwertyShift: "<" },
      { arabic: "ز", qwerty: ".", arabicShift: ".", qwertyShift: ">" },
      { arabic: "ظ", qwerty: "/", arabicShift: "؟", qwertyShift: "?" },
    ],
  ],
};



export const Arabic101Layout: KeyboardLayout = {
  id: "arabic-101",
  name: "Arabic 101 (ISO105)",
  nameAr: "العربية 101 (ISO105)",
  rows: [
    [
      { arabic: "ذ", qwerty: "`", arabicShift: "ّ", qwertyShift: "~" },
      { arabic: "١", qwerty: "1", arabicShift: "!", qwertyShift: "!" },
      { arabic: "٢", qwerty: "2", arabicShift: "@", qwertyShift: "@" },
      { arabic: "٣", qwerty: "3", arabicShift: "#", qwertyShift: "#" },
      { arabic: "٤", qwerty: "4", arabicShift: "$", qwertyShift: "$" },
      { arabic: "٥", qwerty: "5", arabicShift: "%", qwertyShift: "%" },
      { arabic: "٦", qwerty: "6", arabicShift: "^", qwertyShift: "^" },
      { arabic: "٧", qwerty: "7", arabicShift: "&", qwertyShift: "&" },
      { arabic: "٨", qwerty: "8", arabicShift: "*", qwertyShift: "*" },
      { arabic: "٩", qwerty: "9", arabicShift: "(", qwertyShift: "(" },
      { arabic: "٠", qwerty: "0", arabicShift: ")", qwertyShift: ")" },
      { arabic: "-", qwerty: "-", arabicShift: "_", qwertyShift: "_" },
      { arabic: "=", qwerty: "=", arabicShift: "+", qwertyShift: "+" },
    ],
    [
      { arabic: "ض", qwerty: "q", arabicShift: "َ", qwertyShift: "Q" },
      { arabic: "ص", qwerty: "w", arabicShift: "ً", qwertyShift: "W" },
      { arabic: "ث", qwerty: "e", arabicShift: "ُ", qwertyShift: "E" },
      { arabic: "ق", qwerty: "r", arabicShift: "ٌ", qwertyShift: "R" },
      { arabic: "ف", qwerty: "t", arabicShift: "ﻹ", qwertyShift: "T" },
      { arabic: "غ", qwerty: "y", arabicShift: "إ", qwertyShift: "Y" },
      { arabic: "ع", qwerty: "u", arabicShift: "'", qwertyShift: "U" },
      { arabic: "ه", qwerty: "i", arabicShift: "÷", qwertyShift: "I" },
      { arabic: "خ", qwerty: "o", arabicShift: "×", qwertyShift: "O" },
      { arabic: "ح", qwerty: "p", arabicShift: "؛", qwertyShift: "P" },
      { arabic: "ج", qwerty: "[", arabicShift: "{", qwertyShift: "{" },
      { arabic: "د", qwerty: "]", arabicShift: "}", qwertyShift: "}" },
    ],
    [
      { arabic: "ش", qwerty: "a", arabicShift: "ِ", qwertyShift: "A" },
      { arabic: "س", qwerty: "s", arabicShift: "ٍ", qwertyShift: "S" },
      { arabic: "ي", qwerty: "d", arabicShift: "]", qwertyShift: "D" },
      { arabic: "ب", qwerty: "f", arabicShift: "[", qwertyShift: "F" },
      { arabic: "ل", qwerty: "g", arabicShift: "ﻷ", qwertyShift: "G" },
      { arabic: "ا", qwerty: "h", arabicShift: "أ", qwertyShift: "H" },
      { arabic: "ت", qwerty: "j", arabicShift: "ـ", qwertyShift: "J" },
      { arabic: "ن", qwerty: "k", arabicShift: "،", qwertyShift: "K" },
      { arabic: "م", qwerty: "l", arabicShift: "/", qwertyShift: "L" },
      { arabic: "ك", qwerty: ";", arabicShift: ":", qwertyShift: ":" },
      { arabic: "ط", qwerty: "'", arabicShift: "\"", qwertyShift: "\"" },
      { arabic: "\\", qwerty: "#", arabicShift: "|", qwertyShift: "~" },
    ],
    [
      { arabic: "\\", qwerty: "\\", arabicShift: "|", qwertyShift: "|" },
      { arabic: "ئ", qwerty: "z", arabicShift: "~", qwertyShift: "Z" },
      { arabic: "ء", qwerty: "x", arabicShift: "ْ", qwertyShift: "X" },
      { arabic: "ؤ", qwerty: "c", arabicShift: "}", qwertyShift: "C" },
      { arabic: "ر", qwerty: "v", arabicShift: "{", qwertyShift: "V" },
      { arabic: "ﻻ", qwerty: "b", arabicShift: "ﻵ", qwertyShift: "B" },
      { arabic: "ى", qwerty: "n", arabicShift: "آ", qwertyShift: "N" },
      { arabic: "ة", qwerty: "m", arabicShift: "'", qwertyShift: "M" },
      { arabic: "و", qwerty: ",", arabicShift: ",", qwertyShift: "<" },
      { arabic: "ز", qwerty: ".", arabicShift: ".", qwertyShift: ">" },
      { arabic: "ظ", qwerty: "/", arabicShift: "؟", qwertyShift: "?" },
    ],
  ],
};


export const keyboardLayouts: KeyboardLayout[] = [
  OSXArabicLayout,
  StandardArabicLayout,
  Arabic101Layout,
  Arabic102Layout,
];

export const getLayoutById = (id: string): KeyboardLayout => {
  return keyboardLayouts.find(layout => layout.id === id) || OSXArabicLayout;
}; 