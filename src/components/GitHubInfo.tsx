import React from "react";
import { getTranslation } from "../utils/translate";
import type { Language } from "../i18n/translations";
import "./GitHubInfo.css";

interface Props {
  language: Language;
}

const GitHubInfo: React.FC<Props> = ({ language }) => {
  const t = (key: string) => getTranslation(`github.${key}`, language);

  return (
    <div className="github-info">
      <h3>{t("title")}</h3>
      <p>
        {t("sourceCode")}{" "}
        <a
          href="https://github.com/sjoemelsoftware/arabic-typing-tutor"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        .
      </p>
      <p>
        {t("bugReport")}{" "}
        <a
          href="https://github.com/sjoemelsoftware/arabic-typing-tutor/issues"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("openIssue")}
        </a>{" "}
        {t("onGitHub")}.
      </p>
    </div>
  );
};

export default GitHubInfo;
