import React from "react";
import { Link } from "react-router-dom";
import HomeSearchBar from "../form/HomeSearchBar";
import { useLanguage } from "../../../context/useLanguage";

const HomeHeader = () => {
  const { t } = useLanguage();
  return (
    <section
      className="relative isolate w-full min-h-[580px] md:min-h-[620px] bg-cover bg-center flex items-center overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(13, 23, 19, 0.88) 0%, rgba(13, 23, 19, 0.72) 48%, rgba(13, 23, 19, 0.36) 100%), url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=85&w=2000')",
      }}>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(13,23,19,0.28),transparent_45%)]" />
      <div className="site-container relative z-10 grid items-center gap-10 py-16 text-white lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div className="max-w-2xl">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.16em] text-red-200">
            Arjun Buildtech <span className="mx-2 text-white/50">/</span>{" "}
            Rohtak, Haryana
          </p>
          <h1 className="mb-5 max-w-[14ch] text-4xl sm:text-5xl md:text-6xl font-normal leading-[1.1]">
            {t("home.leadingRealEstate", "Find property in Rohtak")}
          </h1>
          <p className="mb-7 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
            {t(
              "home.heroSubtitle",
              "Explore residential plots, homes and commercial listings, then get local guidance to compare the options that fit your plans.",
            )}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-semibold">
            <Link
              to="/properties"
              className="border-b border-white/60 pb-1 hover:border-white transition-colors">
              Browse all properties <span aria-hidden="true">→</span>
            </Link>
            <Link
              to="/contact"
              className="text-white/80 hover:text-white transition-colors">
              Talk to our team
            </Link>
          </div>
        </div>

        <div className="w-full rounded-xl bg-white p-5 text-gray-900 shadow-2xl sm:p-7">
          <h2 className="mb-2 text-2xl font-normal text-gray-900">
            Start with a location
          </h2>
          <p className="mb-6 text-[15px] text-gray-600">
            Search current listings by area, property status and type.
          </p>
          <HomeSearchBar />
        </div>
      </div>
    </section>
  );
};

export default HomeHeader;
