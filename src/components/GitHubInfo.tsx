import React from "react";

const GitHubInfo: React.FC = () => {
  return (
    <div className="github-info">
      <h3>Feedback & Contributions</h3>
      <p>
        This is an open-source project. You can find the source code on{" "}
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
        Found a bug or have a suggestion? Please{" "}
        <a
          href="https://github.com/sjoemelsoftware/arabic-typing-tutor/issues"
          target="_blank"
          rel="noopener noreferrer"
        >
          open an issue
        </a>{" "}
        on GitHub.
      </p>
    </div>
  );
};

export default GitHubInfo;
