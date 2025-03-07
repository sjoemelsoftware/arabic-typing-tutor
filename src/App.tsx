import { useState, useEffect, useRef } from "react";
import "./App.css";
import VirtualKeyboard from "./components/VirtualKeyboard";
import { getTranslation } from "./utils/translate";
import GitHubInfo from "./components/GitHubInfo";
import StatisticsKeyboard from "./components/StatisticsKeyboard";
import { LetterStatistics } from "./types/statistics";
import { keyboardLayouts } from "./data/keyboardLayouts";
import { KeyMapper } from "./utils/keyMapper";
import { toast } from "react-toastify";
interface Settings {
  showKeyboardHighlight: boolean;
  showKeyboard: boolean;
  checkHarakat: boolean;
  strictMode: boolean;
  language: Language;
  keyboardLayout: string;
  useQwertyMapping: boolean;
}

type Language = "en" | "ar";

type Tab = "practice" | "settings" | "text" | "statistics";

function App() {
  // Load settings from localStorage or use defaults
  const [settings, setSettings] = useState<Settings>(() => {
    const savedSettings = localStorage.getItem("settings");
    return savedSettings
      ? JSON.parse(savedSettings)
      : {
          showKeyboardHighlight: true,
          showKeyboard: true,
          checkHarakat: false,
          strictMode: false,
          language: "en",
          keyboardLayout: "osx-arabic",
          useQwertyMapping: false,
        };
  });

  // Load saved text and progress
  const [text, setText] = useState(() => {
    const savedText = localStorage.getItem("text");
    return (
      savedText ||
      `مرحباً بك في برنامج تعلم الكتابة باللغة العربية!
سنتعلم معاً كيفية الكتابة بسرعة وإتقان.
في البداية، حاول أن تكتب ببطء وبدقة.
مع الممارسة، ستصبح أسرع وأكثر ثقة.
لا تقلق من الأخطاء، فهي جزء من عملية التعلم.
يمكنك رؤية موقع كل حرف على لوحة المفاتيح.
عندما تكون جاهزاً، يمكنك إضافة نصوصك الخاصة.
هيا نبدأ!`
    );
  });

  const [userInput, setUserInput] = useState(() => {
    const savedProgress = localStorage.getItem("progress");
    return savedProgress || "";
  });

  // Add state for tracking mistakes
  const [stats, setStats] = useState(() => {
    const savedStats = localStorage.getItem("stats");
    return savedStats
      ? JSON.parse(savedStats)
      : {
          correctChars: 0,
          closeMatches: 0,
          mistakes: 0,
        };
  });

  // Add new state for letter statistics
  const [letterStats, setLetterStats] = useState<LetterStatistics>(() => {
    const savedStats = localStorage.getItem("letterStats");
    return savedStats ? JSON.parse(savedStats) : {};
  });

  // Save settings whenever they change
  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);

  // Save text when it changes
  useEffect(() => {
    localStorage.setItem("text", text);
  }, [text]);

  // Save progress when it changes
  useEffect(() => {
    localStorage.setItem("progress", userInput);
  }, [userInput]);

  // Save stats to localStorage
  useEffect(() => {
    localStorage.setItem("stats", JSON.stringify(stats));
  }, [stats]);

  // Add save effect for letter statistics
  useEffect(() => {
    localStorage.setItem("letterStats", JSON.stringify(letterStats));
  }, [letterStats]);

  // Scroll to current line
  useEffect(() => {
    const currentLine = document.querySelector(".current-line");
    if (currentLine) {
      currentLine.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [userInput]);

  const [activeTab, setActiveTab] = useState<Tab>("practice");

  // Translation helper function
  const t = (key: string) => getTranslation(key, settings.language);

  // Reset all progress
  const resetProgress = () => {
    setUserInput("");
    setStats({
      correctChars: 0,
      closeMatches: 0,
      mistakes: 0,
    });
  };

  // Function to handle text input from user
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    resetProgress(); // Reset progress when text changes
  };

  // Add state for key mapper
  const [keyMapper] = useState(() => new KeyMapper(settings.keyboardLayout));

  const shouldUseQwertyMapping = (newChar: string) => {
    // Show notification and enable QWERTY mapping when Latin character is typed
    if (/[A-Za-z]/.test(newChar) && !settings.useQwertyMapping) {
      toast.info(t("settings.qwertyMappingEnabledNote"));
      setSettings((prev) => ({
        ...prev,
        useQwertyMapping: true,
      }));

      return true;
    }

    // Show notification and disable QWERTY mapping when Arabic character is typed
    if (
      /[\u0600-\u06FF]/.test(newChar) && // Arabic Unicode range
      settings.useQwertyMapping
    ) {
      toast.info(t("settings.qwertyMappingDisabledNote"));
      setSettings((prev) => ({
        ...prev,
        useQwertyMapping: false,
      }));

      return false;
    }

    return settings.useQwertyMapping;
  };

  // Update handleInput
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInput = e.target.value;
    const oldLength = userInput.length;
    const newLength = newInput.length;

    if (newLength > oldLength) {
      // Get the new character
      const newChar = newInput[newLength - 1];
      const targetChar = text[oldLength];

      let effectiveChar = newChar;
      let mappedChar = null;

      // Check if we should toggle QWERTY mapping
      const useQwertyMapping = shouldUseQwertyMapping(newChar);

      if (useQwertyMapping) {
        // map QWERTY input to Arabic if it's a Latin character or special character
        const qwertyShiftKeys = Array.from(
          keyMapper.qwertyShiftToArabic.keys()
        );
        const isShiftPressed = qwertyShiftKeys.includes(newChar);

        mappedChar = useQwertyMapping
          ? keyMapper.mapKey(newChar, isShiftPressed)
          : newChar;

        // Use the mapped character or original character
        effectiveChar = mappedChar || newChar;
      }

      // Update both general stats and letter stats
      if (effectiveChar === targetChar) {
        setStats((prev: { correctChars: number }) => ({
          ...prev,
          correctChars: prev.correctChars + 1,
        }));
      } else if (isCloseMatch(effectiveChar, targetChar)) {
        setStats((prev: { closeMatches: number }) => ({
          ...prev,
          closeMatches: prev.closeMatches + 1,
        }));
      } else {
        setStats((prev: { mistakes: number }) => ({
          ...prev,
          mistakes: prev.mistakes + 1,
        }));
      }

      // Update letter statistics
      setLetterStats((prev) => {
        const stats = prev[targetChar] || { attempts: 0, successes: 0 };
        return {
          ...prev,
          [targetChar]: {
            attempts: stats.attempts + 1,
            successes: stats.successes + (effectiveChar === targetChar ? 1 : 0),
          },
        };
      });

      // Update input with mapped character if available
      if (mappedChar && useQwertyMapping) {
        e.preventDefault();
        setUserInput(userInput + mappedChar);
        return;
      }
    }

    // Handle character deletion
    if (newLength < oldLength) {
      const removedChars = userInput.slice(newLength, oldLength);

      removedChars.split("").forEach((char, index) => {
        const targetChar = text[newLength + index];
        if (char === targetChar) {
          setStats((prev: { correctChars: number }) => ({
            ...prev,
            correctChars: Math.max(0, prev.correctChars - 1),
          }));
        } else if (isCloseMatch(char, targetChar)) {
          setStats((prev: { closeMatches: number }) => ({
            ...prev,
            closeMatches: Math.max(0, prev.closeMatches - 1),
          }));
        } else {
          setStats((prev: { mistakes: number }) => ({
            ...prev,
            mistakes: Math.max(0, prev.mistakes - 1),
          }));
        }
      });
    }

    // Handle strict mode
    if (settings.strictMode) {
      const nextChar = text[userInput.length];
      if (
        newInput.length > userInput.length &&
        newInput[newInput.length - 1] !== nextChar
      ) {
        const input = e.target;
        input.classList.add("flash-warning");
        setTimeout(() => input.classList.remove("flash-warning"), 500);
        return;
      }
    }

    setUserInput(newInput);
  };

  const isCloseMatch = (typed: string, target: string) => {
    if (!settings.checkHarakat && !settings.strictMode) {
      // Basic forms of letters that should match
      const equivalents: { [key: string]: string[] } = {
        ا: ["أ", "إ", "آ", "ٱ"], // alef variations
        و: ["ؤ"], // waw variations
        ي: ["ئ", "ى"], // yaa variations
        // Add all vowel pairs without harakat
        "َ": ["ا"], // fatha -> alef
        "ُ": ["و"], // damma -> waw
        "ِ": ["ي"], // kasra -> yaa
      };

      // Check if the characters are equivalent
      for (const [base, variants] of Object.entries(equivalents)) {
        if (
          (typed === base && variants.includes(target)) ||
          (variants.includes(typed) && target === base) ||
          (variants.includes(typed) && variants.includes(target))
        ) {
          return true;
        }
      }

      // Remove harakat from both characters and compare
      const removeHarakat = (text: string) => {
        return text.replace(/[\u064B-\u065F]/g, "");
      };

      if (removeHarakat(typed) === removeHarakat(target)) {
        return true;
      }
    }
    return false;
  };

  const getWordParts = () => {
    // Split text into lines, trim each line when processing for display/typing
    const processedLines = text.split("\n").map((line) => line.trim());
    let currentPos = 0;
    let currentLineIndex = 0;
    let posInLine = 0;

    // Find current line and position using processed lines
    for (let i = 0; i < processedLines.length; i++) {
      if (currentPos + processedLines[i].length >= userInput.length) {
        currentLineIndex = i;
        posInLine = userInput.length - currentPos;
        break;
      }
      currentPos += processedLines[i].length + 1; // +1 for newline
    }

    const currentLine = processedLines[currentLineIndex];

    // Function to validate characters for a line
    const validateLine = (line: string, startPos: number) => {
      return line.split("").map((targetChar, index) => {
        const typedChar = userInput[startPos + index];
        const exactMatch = typedChar === targetChar;
        const closeMatch = !exactMatch && isCloseMatch(typedChar, targetChar);
        const isSpace = targetChar === " ";

        return {
          char: targetChar,
          isCorrect: exactMatch,
          isCloseMatch: closeMatch,
          isSpace,
        };
      });
    };

    // Create typedArray for current line
    const typedArray = currentLine
      .slice(0, posInLine)
      .split("")
      .map((targetChar, index) => {
        const typedChar = userInput[currentPos + index];
        const exactMatch = typedChar === targetChar;
        const closeMatch = !exactMatch && isCloseMatch(typedChar, targetChar);
        const isSpace = targetChar === " ";

        return {
          char: targetChar,
          isCorrect: exactMatch,
          isCloseMatch: closeMatch,
          isSpace,
        };
      });

    // Get the current character to type and remaining text
    const current = currentLine[posInLine] || "";
    const remaining = currentLine.slice(posInLine + 1);

    // Create validated arrays for previous lines
    const previousLines = processedLines
      .slice(0, currentLineIndex)
      .map((line, lineIndex) => {
        let startPos = 0;
        for (let i = 0; i < lineIndex; i++) {
          startPos += processedLines[i].length + 1;
        }
        return validateLine(line, startPos);
      });

    return {
      lines: processedLines,
      currentLineIndex,
      typedArray,
      current,
      remaining,
      previousLines,
    };
  };

  const toggleSetting = (setting: keyof Settings) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const {
    typedArray,
    current,
    remaining,
    lines,
    currentLineIndex,
    previousLines,
  } = getWordParts();

  // Add ref for input field
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input when typing starts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (
        activeTab === "practice" &&
        inputRef.current &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.altKey
      ) {
        inputRef.current.focus();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [activeTab]);

  // Function to handle double click on word display
  const handleWordDisplayDoubleClick = () => {
    setActiveTab("text");
  };

  // Function to check screen size and hide keyboard
  const [shouldShowKeyboard, setShouldShowKeyboard] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => {
      // Only show keyboard on desktop and if enabled in settings
      const isMobile = window.innerWidth < 768;
      setShouldShowKeyboard(!isMobile && settings.showKeyboard);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [settings.showKeyboard]);

  const handleResetAllStats = () => {
    if (window.confirm(t("resetStatsConfirm"))) {
      // Reset both general stats and letter stats
      setStats({
        correctChars: 0,
        closeMatches: 0,
        mistakes: 0,
      });
      setLetterStats({});
      setUserInput("");
    }
  };

  // Update when keyboard layout changes
  useEffect(() => {
    keyMapper.initializeMapping(settings.keyboardLayout);
  }, [settings.keyboardLayout]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "practice":
        return (
          <>
            <div
              className="word-display"
              onDoubleClick={handleWordDisplayDoubleClick}
            >
              {lines.map((line, lineIndex) => (
                <h2
                  key={lineIndex}
                  className={
                    lineIndex === currentLineIndex ? "current-line" : ""
                  }
                >
                  {lineIndex === currentLineIndex ? (
                    <>
                      {typedArray.map((char, index) => (
                        <span
                          key={index}
                          className={`
                            ${char.isSpace ? "space-char" : ""}
                            ${
                              char.isCorrect
                                ? "typed-correct"
                                : char.isCloseMatch
                                ? "typed-close"
                                : "typed-wrong"
                            }
                          `}
                        >
                          {char.isSpace && !char.isCorrect ? "␣" : char.char}
                        </span>
                      ))}
                      <span className="current">{current}</span>
                      <span className="remaining">{remaining}</span>
                    </>
                  ) : lineIndex < currentLineIndex ? (
                    <>
                      {previousLines[lineIndex].map((char, index) => (
                        <span
                          key={index}
                          className={`
                            ${char.isSpace ? "space-char" : ""}
                            ${
                              char.isCorrect
                                ? "typed-correct"
                                : char.isCloseMatch
                                ? "typed-close"
                                : "typed-wrong"
                            }
                          `}
                        >
                          {char.isSpace && !char.isCorrect ? "␣" : char.char}
                        </span>
                      ))}
                    </>
                  ) : (
                    <span className="waiting-line">{line}</span>
                  )}
                </h2>
              ))}
            </div>

            <div className="typing-area">
              <input
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={handleInput}
                dir="rtl"
                placeholder={t("typingPlaceholder")}
              />
            </div>

            {settings.showKeyboard && shouldShowKeyboard && (
              <div dir="ltr">
                <VirtualKeyboard
                  nextLetter={current}
                  showHighlight={settings.showKeyboardHighlight}
                  keyboardLayout={settings.keyboardLayout}
                />
              </div>
            )}
          </>
        );

      case "settings":
        return (
          <div className="settings-panel">
            <h2>{t("settingsTab")}</h2>
            <div className="settings-grid">
              <label
                className={window.innerWidth < 768 ? "disabled-setting" : ""}
              >
                <input
                  type="checkbox"
                  checked={settings.showKeyboard}
                  onChange={() => toggleSetting("showKeyboard")}
                  disabled={window.innerWidth < 768}
                />
                <span>{t("settings.showKeyboard")}</span>
                {window.innerWidth < 768 && (
                  <small className="setting-note">
                    {t("settings.keyboardMobileNote")}
                  </small>
                )}
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={settings.showKeyboardHighlight}
                  onChange={() => toggleSetting("showKeyboardHighlight")}
                />
                <span>{t("settings.showHighlight")}</span>
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={settings.checkHarakat}
                  onChange={() => toggleSetting("checkHarakat")}
                />
                <span>{t("settings.checkHarakat")}</span>
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={settings.strictMode}
                  onChange={() => toggleSetting("strictMode")}
                />
                <span>{t("settings.strictMode")}</span>
              </label>
              <label className="language-select">
                <span>{t("settings.language")}</span>
                <select
                  value={settings.language}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      language: e.target.value as Language,
                    }))
                  }
                >
                  <option value="ar">العربية</option>
                  <option value="en">English</option>
                </select>
              </label>
              <label className="keyboard-layout-select">
                <span>{t("settings.keyboardLayout")}</span>
                <select
                  value={settings.keyboardLayout}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      keyboardLayout: e.target.value,
                    }))
                  }
                >
                  {keyboardLayouts.map((layout) => (
                    <option key={layout.id} value={layout.id}>
                      {settings.language === "ar" ? layout.nameAr : layout.name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={settings.useQwertyMapping}
                  onChange={() => toggleSetting("useQwertyMapping")}
                />
                <span>{t("settings.useQwertyMapping")}</span>
              </label>
            </div>
            <GitHubInfo language={settings.language} />
          </div>
        );

      case "text":
        return (
          <div className="text-input-panel">
            <h2>{t("textTab")}</h2>
            <div className="text-input">
              <textarea
                value={text}
                onChange={handleTextChange}
                dir="rtl"
                placeholder={t("textPlaceholder")}
              />
            </div>
          </div>
        );

      case "statistics":
        return (
          <StatisticsKeyboard
            statistics={letterStats}
            language={settings.language}
            onReset={handleResetAllStats}
          />
        );
    }
  };

  return (
    <div className="container" dir={settings.language === "ar" ? "rtl" : "ltr"}>
      <div className="top-bar">
        <h1>{t("title")}</h1>
        <div className="stats-container">
          <div className="stats">
            <span className="stat correct" title={t("stats.correctHint")}>
              ✓ {stats.correctChars}
            </span>
            <span className="stat close" title={t("stats.closeHint")}>
              ~ {stats.closeMatches}
            </span>
            <span className="stat wrong" title={t("stats.wrongHint")}>
              ✗ {stats.mistakes}
            </span>
          </div>
          <button
            className="reset-button"
            onClick={handleResetAllStats}
            title={t("resetStats")}
          >
            ↺
          </button>
        </div>
        <div className="tabs">
          <button
            className={`tab ${activeTab === "practice" ? "active" : ""}`}
            onClick={() => setActiveTab("practice")}
          >
            {t("practiceTab")}
          </button>
          <button
            className={`tab ${activeTab === "settings" ? "active" : ""}`}
            onClick={() => setActiveTab("settings")}
          >
            {t("settingsTab")}
          </button>
          <button
            className={`tab ${activeTab === "text" ? "active" : ""}`}
            onClick={() => setActiveTab("text")}
          >
            {t("textTab")}
          </button>
          <button
            className={`tab ${activeTab === "statistics" ? "active" : ""}`}
            onClick={() => setActiveTab("statistics")}
          >
            {t("statisticsTab")}
          </button>
        </div>
      </div>

      <div className="main-content">{renderTabContent()}</div>
    </div>
  );
}

export default App;
