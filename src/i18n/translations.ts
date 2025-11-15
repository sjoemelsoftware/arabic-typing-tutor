interface Translations {
  [key: string]: {
    [key: string]: string | { [key: string]: string };
  };
}

export const translations: Translations = {
  ar: {
    title: "تعلم الكتابة بالعربية",
    practiceTab: "التدريب",
    settingsTab: "الإعدادات",
    textTab: "النص",
    typingPlaceholder: "اكتب هنا",
    textPlaceholder: "أدخل النص هنا",
    settings: {
      showKeyboard: "إظهار لوحة المفاتيح",
      showHighlight: "تسليط الضوء على المفاتيح",
      checkHarakat: "التحقق من الحركات",
      strictMode: "الوضع الصارم",
      language: "اللغة",
      keyboardLayout: "نوع لوحة المفاتيح",
      keyboardMobileNote:
        "لوحة المفاتيح الافتراضية غير متوفرة على الأجهزة المحمولة",
      useQwertyMapping:
        "قم بتعيين إدخال لوحة مفاتيح QWERTY إلى اللغة العربية، في حال لم يكن تخطيط لوحة المفاتيح باللغة العربية.",
      autoAdvance: "الانتقال التلقائي للسطر التالي",
      qwertyMappingEnabledNote:
        "تم اكتشاف لوحة مفاتيح عربية - تم تعطيل تحويل QWERTY",
      qwertyMappingDisabledNote:
        "تم اكتشاف لوحة مفاتيح عربية - تم تعطيل تحويل QWERTY",
    },
    stats: {
      correct: "صحيح",
      close: "حروف متقاربة",
      wrong: "أخطاء",
      total: "مجموع المحاولات",
      accuracy: "دقة",
      normalKeys: "الأحرف العادية",
      shiftKeys: "الأحرف المتقطعة",
      correctHint: "الأحرف التي تم إدخالها بالطريقة المتوقعة",
      closeHint: "الأحرف التي تشبه أو تكافئ الأحرف المتوقعة",
      wrongHint: "الأحرف التي لا تتطابق مع الإدخال المتوقع",
    },
    resetStats: "إعادة تعيين الإحصائيات",
    resetConfirm: "هل أنت متأكد أنك تريد إعادة تعيين الإحصائيات؟",
    github: {
      title: "التعليقات والمساهمات",
      sourceCode: "هذا مشروع مفتوح المصدر. يمكنك العثور على الكود المصدري على",
      bugReport: "وجدت خطأ أو لديك اقتراح؟ الرجاء",
      openIssue: "فتح تذكرة",
      onGitHub: "على GitHub",
      checkOtherTools: "تحقق من أدوات أخرى على Jidhr.com",
    },
    statisticsTab: "الإحصائيات",
    resetStatsConfirm: "هل أنت متأكد أنك تريد إعادة تعيين إحصائيات الحروف؟",
    noData: "لا توجد بيانات",
    accuracy: "دقة",
    attempts: "محاولة",
  },
  en: {
    title: "Learn Arabic Typing",
    practiceTab: "Practice",
    settingsTab: "Settings",
    textTab: "Text",
    typingPlaceholder: "Type here",
    textPlaceholder: "Enter text here",
    settings: {
      showKeyboard: "Show Keyboard",
      showHighlight: "Highlight Keys",
      checkHarakat: "Check Diacritics (Harakat)",
      strictMode: "Strict Mode",
      language: "Language",
      keyboardLayout: "Keyboard Layout",
      keyboardMobileNote: "Virtual keyboard is not available on mobile devices",
      useQwertyMapping:
        "Map QWERTY keyboard input to Arabic, in case the keyboard layout is not Arabic.",
      autoAdvance: "Auto-advance to next line",
      qwertyMappingEnabledNote:
        "Detected English keyboard input - QWERTY to Arabic mapping enabled",
      qwertyMappingDisabledNote:
        "Detected Arabic keyboard input - QWERTY mapping disabled",
    },
    stats: {
      correct: "Correct",
      close: "Close matches",
      wrong: "Mistakes",
      total: "Total attempts",
      accuracy: "Accuracy",
      normalKeys: "Normal Keys",
      shiftKeys: "Shift Keys",
      correctHint: "Characters typed exactly as expected",
      closeHint: "Characters that are similar or equivalent",
      wrongHint: "Characters that don't match the expected input",
    },
    resetStats: "Reset Statistics",
    resetConfirm: "Are you sure you want to reset the statistics?",
    github: {
      title: "Feedback & Contributions",
      sourceCode:
        "This is an open-source project. You can find the source code on",
      bugReport: "Found a bug or have a suggestion? Please",
      openIssue: "open an issue",
      onGitHub: "on GitHub",
      checkOtherTools: "Check other tools on Jidhr.com",
    },
    statisticsTab: "Statistics",
    resetStatsConfirm: "Are you sure you want to reset the letter statistics?",
    noData: "No data",
    accuracy: "accuracy",
    attempts: "attempts",
  },
};

export type Language = "ar" | "en";
