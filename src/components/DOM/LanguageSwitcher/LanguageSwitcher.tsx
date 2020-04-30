import React, { useState } from "react";
import "./language-switcher.css";

const LanguageSwitcher: React.FC = () => {
  const [language, setLanguage] = useState(
    localStorage.getItem("userLocale") || "fr"
  );
  const handleLanguageChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const selectedLanguage = event.currentTarget.dataset.language;

    if (selectedLanguage) {
      localStorage.setItem("userLocale", selectedLanguage);
      setLanguage(selectedLanguage);
      window.location.reload();
    }
  };
  return (
    <div className="language-switcher">
      {language !== "en" && (
        <button data-language="en" onClick={handleLanguageChange}>
          <img src="./usa-flag-small.png" alt="EN" />
        </button>
      )}
      {language !== "fr" && (
        <button data-language="fr" onClick={handleLanguageChange}>
          <img src="./france-flag-small.png" alt="FR" />
        </button>
      )}
      {language !== "pt" && (
        <button data-language="pt" onClick={handleLanguageChange}>
          <img src="./brazil-flag-small.png" alt="PT" />
        </button>
      )}
    </div>
  );
};

export default LanguageSwitcher;
