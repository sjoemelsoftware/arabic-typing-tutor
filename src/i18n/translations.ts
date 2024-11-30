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
    },
    stats: {
      correct: "حروف صحيحة",
      close: "حروف متقاربة",
      wrong: "أخطاء",
    },
    resetStats: "إعادة تعيين الإحصائيات",
    resetConfirm: "هل أنت متأكد أنك تريد إعادة تعيين الإحصائيات؟",
    github: {
      title: "التعليقات والمساهمات",
      sourceCode: "هذا مشروع مفتوح المصدر. يمكنك العثور على الكود المصدري على",
      bugReport: "وجدت خطأ أو لديك اقتراح؟ الرجاء",
      openIssue: "فتح تذكرة",
      onGitHub: "على GitHub"
    }
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
      checkHarakat: "Check Diacritics",
      strictMode: "Strict Mode",
      language: "Language",
    },
    stats: {
      correct: "Correct characters",
      close: "Close matches",
      wrong: "Mistakes",
    },
    resetStats: "Reset Statistics",
    resetConfirm: "Are you sure you want to reset the statistics?",
    github: {
      title: "Feedback & Contributions",
      sourceCode: "This is an open-source project. You can find the source code on",
      bugReport: "Found a bug or have a suggestion? Please",
      openIssue: "open an issue",
      onGitHub: "on GitHub"
    }
  },
};

export type Language = "ar" | "en"; 