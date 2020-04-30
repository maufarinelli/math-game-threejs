import fr from "./fr.json";
import pt from "./pt.json";
import en from "./en.json";

export default localStorage.getItem("userLocale") || "fr";

interface ITranslations {
  [key: string]: { [key: string]: string };
}

export const translations: ITranslations = {
  fr,
  pt,
  en,
};
