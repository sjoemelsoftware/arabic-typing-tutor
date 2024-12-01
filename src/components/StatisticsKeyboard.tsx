import React, { useState, useEffect } from "react";
import { LetterStatistics } from "../types/statistics";
import { getTranslation } from "../utils/translate";
import type { Language } from "../i18n/translations";
import { getLayoutById } from "../data/keyboardLayouts";
import "./VirtualKeyboard.css";

interface Props {
  statistics: LetterStatistics;
  language: Language;
  onReset: () => void;
}

const StatisticsKeyboard: React.FC<Props> = ({
  statistics,
  language,
  onReset,
}) => {
  const [isShiftPressed, setIsShiftPressed] = useState(false);
  const t = (key: string) => getTranslation(key, language);
  const layout = getLayoutById("osx-arabic");

  useEffect(() => {
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

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const getKeyColor = (letter: string) => {
    const stats = statistics[letter];
    if (!stats || stats.attempts === 0) return "var(--bg-tertiary)";

    const accuracy = stats.successes / stats.attempts;
    const hue = accuracy * 120;
    return `hsl(${hue}, 80%, 40%)`;
  };

  const getKeyTitle = (letter: string) => {
    const stats = statistics[letter];
    if (!stats || stats.attempts === 0) return t("noData");
    const accuracy = ((stats.successes / stats.attempts) * 100).toFixed(1);
    const mistakes = stats.attempts - stats.successes;
    return `${letter}
─────────────
${t("stats.correct")}: ${stats.successes}
${t("stats.wrong")}: ${mistakes}
${t("stats.total")}: ${stats.attempts}
${t("stats.accuracy")}: ${accuracy}%`;
  };

  return (
    <div className="statistics-content">
      <h2>{t("statisticsTab")}</h2>
      <div className="virtual-keyboard">
        {layout.rows.map((row, rowIndex) => (
          <div key={rowIndex} className="keyboard-row">
            {row.map((key, keyIndex) => {
              const letter = isShiftPressed ? key.arabicShift : key.arabic;
              if (!letter) return null;
              const stats = statistics[letter];
              const hasStats = stats && stats.attempts > 0;
              return (
                <div
                  key={keyIndex}
                  className={`key ${hasStats ? "has-stats" : ""}`}
                  style={{ backgroundColor: getKeyColor(letter) }}
                  title={getKeyTitle(letter)}
                >
                  <span className="qwerty-char">
                    {isShiftPressed ? key.qwertyShift : key.qwerty}
                  </span>
                  <span className="arabic-char">{letter}</span>
                </div>
              );
            })}
          </div>
        ))}
        <div className="keyboard-row">
          <div
            className="key shift-key"
            onMouseDown={() => setIsShiftPressed(true)}
            onMouseUp={() => setIsShiftPressed(false)}
            onMouseLeave={() => setIsShiftPressed(false)}
          >
            <span className="key-label">Shift</span>
          </div>
          <div className="key space-key">
            <span className="key-label">Space</span>
          </div>
          <div
            className="key shift-key"
            onMouseDown={() => setIsShiftPressed(true)}
            onMouseUp={() => setIsShiftPressed(false)}
            onMouseLeave={() => setIsShiftPressed(false)}
          >
            <span className="key-label">Shift</span>
          </div>
        </div>
      </div>
      <button className="reset-button" onClick={onReset}>
        {t("resetStats")}
      </button>
    </div>
  );
};

export default StatisticsKeyboard;
