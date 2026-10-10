import { useLanguage } from "../../context/useLanguage";

export default function LanguageSwitcher({ mobile = false }) {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div
      className={`inline-flex items-center rounded border border-gray-200 bg-white p-0.5 ${
        mobile ? "w-full" : "shrink-0"
      }`}
      role="group"
      aria-label={t("nav.translate", "Choose language")}>
      {[
        { code: "en", label: "English" },
        { code: "hi", label: "हिन्दी" },
      ].map(({ code, label }) => (
        <button
          key={code}
          type="button"
          aria-pressed={language === code}
          onClick={() => setLanguage(code)}
          className={`min-h-8 flex-1 px-2.5 py-1 text-xs font-semibold rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-1 ${
            language === code
              ? "bg-red-600 text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`}>
          {label}
        </button>
      ))}
    </div>
  );
}
