import { useState, useEffect, useRef } from "react";
import "./App.css";
import VirtualKeyboard from "./components/VirtualKeyboard";
import { translations, Language } from "./i18n/translations";

interface Settings {
  showKeyboardHighlight: boolean;
  showKeyboard: boolean;
  checkHarakat: boolean;
  strictMode: boolean;
  language: Language;
}

type Tab = "practice" | "settings" | "text";

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

  // Scroll to current line
  useEffect(() => {
    const currentLine = document.querySelector(".current-line");
    if (currentLine) {
      currentLine.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [userInput]);

  const [activeTab, setActiveTab] = useState<Tab>("practice");

  // Translation helper function
  const t = (key: string) => {
    const keys = key.split(".");
    let value = translations[settings.language];
    for (const k of keys) {
      value = value[k];
    }
    return value || key;
  };

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

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInput = e.target.value;
    const oldLength = userInput.length;
    const newLength = newInput.length;

    if (newLength > oldLength) {
      // User typed a new character
      const newChar = newInput[newLength - 1];
      const targetChar = text[oldLength];

      if (newChar === targetChar) {
        setStats((prev) => ({ ...prev, correctChars: prev.correctChars + 1 }));
      } else if (isCloseMatch(newChar, targetChar)) {
        setStats((prev) => ({ ...prev, closeMatches: prev.closeMatches + 1 }));
      } else {
        setStats((prev) => ({ ...prev, mistakes: prev.mistakes + 1 }));
      }
    }

    // Reset stats for the removed characters
    if (newLength < oldLength) {
      const removedChars = userInput.slice(newLength, oldLength);

      removedChars.split("").forEach((char, index) => {
        const targetChar = text[newLength + index];
        if (char === targetChar) {
          setStats((prev) => ({
            ...prev,
            correctChars: Math.max(0, prev.correctChars - 1),
          }));
        } else if (isCloseMatch(char, targetChar)) {
          setStats((prev) => ({
            ...prev,
            closeMatches: Math.max(0, prev.closeMatches - 1),
          }));
        } else {
          setStats((prev) => ({
            ...prev,
            mistakes: Math.max(0, prev.mistakes - 1),
          }));
        }
      });
    }

    if (settings.strictMode) {
      // In strict mode, only accept correct input
      const nextChar = text[userInput.length];
      if (
        newInput.length > userInput.length &&
        newInput[newInput.length - 1] !== nextChar
      ) {
        // Flash warning and don't update input
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
    // Split text into lines and find current line
    const lines = text.split("\n");
    let currentPos = 0;
    let currentLineIndex = 0;
    let posInLine = 0;

    // Find current line and position
    for (let i = 0; i < lines.length; i++) {
      if (currentPos + lines[i].length >= userInput.length) {
        currentLineIndex = i;
        posInLine = userInput.length - currentPos;
        break;
      }
      currentPos += lines[i].length + 1; // +1 for newline
    }

    const currentLine = lines[currentLineIndex];

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
    const previousLines = lines
      .slice(0, currentLineIndex)
      .map((line, lineIndex) => {
        let startPos = 0;
        for (let i = 0; i < lineIndex; i++) {
          startPos += lines[i].length + 1;
        }
        return validateLine(line, startPos);
      });

    return {
      lines,
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
      setShouldShowKeyboard(window.innerWidth >= 768); // Hide on screens smaller than 768px
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleResetStats = () => {
    if (window.confirm(t("resetConfirm"))) {
      resetProgress();
    }
  };

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
              <label>
                <input
                  type="checkbox"
                  checked={settings.showKeyboard}
                  onChange={() => toggleSetting("showKeyboard")}
                />
                <span>{t("settings.showKeyboard")}</span>
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
            </div>
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
    }
  };

  return (
    <div className="container" dir={settings.language === "ar" ? "rtl" : "ltr"}>
      <div className="top-bar">
        <h1>{t("title")}</h1>
        <div className="stats-container">
          <div className="stats">
            <span className="stat correct" title={t("stats.correct")}>
              ✓ {stats.correctChars}
            </span>
            <span className="stat close" title={t("stats.close")}>
              ~ {stats.closeMatches}
            </span>
            <span className="stat wrong" title={t("stats.wrong")}>
              ✗ {stats.mistakes}
            </span>
          </div>
          <button
            className="reset-button"
            onClick={handleResetStats}
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
        </div>
      </div>

      <div className="main-content">{renderTabContent()}</div>
    </div>
  );
}

export default App;
