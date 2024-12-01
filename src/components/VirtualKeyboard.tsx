import { FC, useState, useEffect } from "react";
import "./VirtualKeyboard.css";
import { getLayoutById } from "../data/keyboardLayouts";

interface KeyMapping {
  arabic: string;
  qwerty: string;
  arabicShift?: string;
  qwertyShift?: string;
}

interface VirtualKeyboardProps {
  nextLetter: string;
  showHighlight: boolean;
  keyboardLayout: string;
}

const VirtualKeyboard: FC<VirtualKeyboardProps> = ({
  nextLetter,
  showHighlight,
  keyboardLayout,
}) => {
  const [isShiftPressed, setIsShiftPressed] = useState(false);
  const layout = getLayoutById(keyboardLayout);

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
    return key.arabic === nextLetter || key.arabicShift === nextLetter;
  };

  const needsShift = (letter: string) => {
    for (const row of layout.rows) {
      for (const key of row) {
        if (key.arabicShift === letter) return true;
      }
    }
    return false;
  };

  return (
    <div className="virtual-keyboard practice-keyboard">
      {layout.rows.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((key, keyIndex) => (
            <div
              key={keyIndex}
              className={`key ${isHighlighted(key) ? "highlight" : ""}`}
            >
              <span className="qwerty-char">
                {isShiftPressed ? key.qwertyShift ?? "" : key.qwerty}
              </span>
              <span className="arabic-char">
                {isShiftPressed ? key.arabicShift ?? "" : key.arabic}
              </span>
            </div>
          ))}
        </div>
      ))}
      <div className="keyboard-row">
        <div
          className={`key shift-key ${
            showHighlight && needsShift(nextLetter) ? "highlight" : ""
          }`}
        >
          <span className="qwerty-char">Shift</span>
        </div>
        <div className="key space-key">
          <span className="qwerty-char">Space</span>
        </div>
      </div>
    </div>
  );
};

export default VirtualKeyboard;
