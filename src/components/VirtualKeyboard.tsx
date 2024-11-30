import { FC, useState, useEffect } from "react";
import "./VirtualKeyboard.css";

interface KeyMapping {
  arabic: string;
  shiftArabic?: string;
  qwerty: string;
  shiftQwerty?: string;
}

interface VirtualKeyboardProps {
  nextLetter: string;
  showHighlight: boolean;
}

const VirtualKeyboard: FC<VirtualKeyboardProps> = ({
  nextLetter,
  showHighlight,
}) => {
  const [isShiftPressed, setIsShiftPressed] = useState(false);

  const keyboardLayout: KeyMapping[][] = [
    [
      { arabic: "ـ", qwerty: "`", shiftQwerty: "~" },
      { arabic: "١", shiftArabic: "!", qwerty: "1", shiftQwerty: "!" },
      { arabic: "٢", shiftArabic: "@", qwerty: "2", shiftQwerty: "@" },
      { arabic: "٣", shiftArabic: "#", qwerty: "3", shiftQwerty: "#" },
      { arabic: "٤", shiftArabic: "$", qwerty: "4", shiftQwerty: "$" },
      { arabic: "٥", shiftArabic: "%", qwerty: "5", shiftQwerty: "%" },
      { arabic: "٦", shiftArabic: "^", qwerty: "6", shiftQwerty: "^" },
      { arabic: "٧", shiftArabic: "&", qwerty: "7", shiftQwerty: "&" },
      { arabic: "٨", shiftArabic: "*", qwerty: "8", shiftQwerty: "*" },
      { arabic: "٩", shiftArabic: ")", qwerty: "9", shiftQwerty: "(" },
      { arabic: "٠", shiftArabic: "(", qwerty: "0", shiftQwerty: ")" },
      { arabic: "-", shiftArabic: "_", qwerty: "-", shiftQwerty: "_" },
      { arabic: "=", shiftArabic: "+", qwerty: "=", shiftQwerty: "+" },
    ],
    [
      { arabic: "ض", shiftArabic: "َ", qwerty: "q", shiftQwerty: "Q" },
      { arabic: "ص", shiftArabic: "ً", qwerty: "w", shiftQwerty: "W" },
      { arabic: "ث", shiftArabic: "ُ", qwerty: "e", shiftQwerty: "E" },
      { arabic: "ق", shiftArabic: "ٍ", qwerty: "r", shiftQwerty: "R" },
      { arabic: "ف", shiftArabic: "ُ", qwerty: "t", shiftQwerty: "T" },
      { arabic: "غ", shiftArabic: "ٌ", qwerty: "y", shiftQwerty: "Y" },
      { arabic: "ع", shiftArabic: "ْ", qwerty: "u", shiftQwerty: "U" },
      { arabic: "ه", shiftArabic: "ّ", qwerty: "i", shiftQwerty: "I" },
      { arabic: "خ", shiftArabic: "]", qwerty: "o", shiftQwerty: "O" },
      { arabic: "ح", shiftArabic: "[", qwerty: "p", shiftQwerty: "P" },
      { arabic: "ج", shiftArabic: "}", qwerty: "[", shiftQwerty: "{" },
      { arabic: "ة", shiftArabic: "{", qwerty: "]", shiftQwerty: "}" },
      { arabic: "\\", shiftArabic: "|", qwerty: "\\", shiftQwerty: "|" },
    ],
    [
      { arabic: "ش", shiftArabic: "»", qwerty: "a", shiftQwerty: "A" },
      { arabic: "س", shiftArabic: "«", qwerty: "s", shiftQwerty: "S" },
      { arabic: "ي", shiftArabic: "ى", qwerty: "d", shiftQwerty: "D" },
      { arabic: "ب", qwerty: "f", shiftQwerty: "F" },
      { arabic: "ل", qwerty: "g", shiftQwerty: "G" },
      { arabic: "ا", shiftArabic: "آ", qwerty: "h", shiftQwerty: "H" },
      { arabic: "ت", qwerty: "j", shiftQwerty: "J" },
      { arabic: "ن", shiftArabic: "٫", qwerty: "k", shiftQwerty: "K" },
      { arabic: "م", shiftArabic: "٬", qwerty: "l", shiftQwerty: "L" },
      { arabic: "ك", shiftArabic: ":", qwerty: ";", shiftQwerty: ":" },
      { arabic: "؛", shiftArabic: '"', qwerty: "'", shiftQwerty: '"' },
    ],
    [
      { arabic: "ظ", shiftArabic: "'", qwerty: "z", shiftQwerty: "Z" },
      { arabic: "ط", qwerty: "x", shiftQwerty: "X" },
      { arabic: "ذ", shiftArabic: "ئ", qwerty: "c", shiftQwerty: "C" },
      { arabic: "د", shiftArabic: "ء", qwerty: "v", shiftQwerty: "V" },
      { arabic: "ز", shiftArabic: "أ", qwerty: "b", shiftQwerty: "B" },
      { arabic: "ر", shiftArabic: "إ", qwerty: "n", shiftQwerty: "N" },
      { arabic: "و", shiftArabic: "ؤ", qwerty: "m", shiftQwerty: "M" },
      { arabic: "،", shiftArabic: ">", qwerty: ",", shiftQwerty: "<" },
      { arabic: ".", shiftArabic: "<", qwerty: ".", shiftQwerty: ">" },
      { arabic: "/", shiftArabic: "؟", qwerty: "/", shiftQwerty: "?" },
    ],
  ];

  const spaceBarRow = [
    { type: "shift-key" }, // Left Shift
    { type: "space-bar" }, // Space Bar
    { type: "shift-key" }, // Right Shift
  ];

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Shift") {
      setIsShiftPressed(true);
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key === "Shift") {
      setIsShiftPressed(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const isHighlighted = (key: KeyMapping) => {
    if (!showHighlight) return false;
    return key.arabic === nextLetter || key.shiftArabic === nextLetter;
  };

  const needsShift = (letter: string) => {
    for (const row of keyboardLayout) {
      for (const key of row) {
        if (key.shiftArabic === letter) return true;
      }
    }
    return false;
  };

  const shouldHighlightShift = showHighlight && needsShift(nextLetter);

  return (
    <div className="virtual-keyboard">
      {keyboardLayout.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((key, keyIndex) => (
            <div
              key={keyIndex}
              className={`key ${isHighlighted(key) ? "highlight" : ""}`}
            >
              <span className="qwerty-char">
                {isShiftPressed ? key.shiftQwerty ?? "" : key.qwerty}
              </span>
              <span className="arabic-char">
                {isShiftPressed ? key.shiftArabic ?? "" : key.arabic}
              </span>
            </div>
          ))}
        </div>
      ))}
      <div className="keyboard-row">
        {spaceBarRow.map((key, index) => (
          <div
            key={index}
            className={`key ${key.type} ${
              key.type === "shift-key" && shouldHighlightShift
                ? "highlight"
                : ""
            }`}
          >
            {key.type === "shift-key" ? (
              <span className="key-label">Shift</span>
            ) : (
              <span className="key-label">Space</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VirtualKeyboard;
