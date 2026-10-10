import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, FileText, PlayCircle } from "lucide-react";
import { blogs } from "../data/blogs";
import { getLocalizedField } from "../utils/localizedField";
import { useLanguage } from "../context/useLanguage";

const MarketInsights = () => {
  const { language, t } = useLanguage();
  // Using dummy slice based on your original code
  const industryArticles = blogs.slice(0, 5);
  const legalArticles = blogs.slice(0, 2);

  // Matching the exact icons shown in the image (Play for top 2, File for rest)
  const getInsightIcon = (index) => {
    if (index < 2) return PlayCircle;
    return FileText;
  };

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="site-container">
        {/* Header Section */}
        <div className="mb-8 md:mb-10">
          <h2 className="text-3xl md:text-4xl font-normal text-gray-800 mb-4">
            {t("market.title", "Your Real Estate Guide")}
          </h2>
          <div className="w-16 h-1 bg-red-600"></div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Column 1: Industry Insights */}
          <div className="rounded-xl border border-red-600 bg-white p-5 md:p-8 flex flex-col h-full shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
              {t("market.industry", "Industry Insights")}
            </h3>

            <div className="flex-grow flex flex-col mt-2">
              {industryArticles.map((article, index) => {
                const Icon = getInsightIcon(index);

                return (
                  <div
                    key={article.id}
                    className="flex items-center gap-3 py-3.5 border-b border-gray-100 last:border-0">
                    <Icon className="h-5 w-5 text-red-600 shrink-0 stroke-[1.5]" />
                    <Link
                      to={`/blog/${article.slug}`}
                      className="text-[15px] md:text-base text-gray-700 hover:text-red-600 transition-colors line-clamp-1">
                      {getLocalizedField(article, "title", language) ||
                        article.title}
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* Footer Link */}
            <div className="pt-4 mt-auto">
              <Link
                to="/blog"
                className="inline-flex items-center gap-1.5 text-sm md:text-base font-medium text-red-600 hover:text-red-700 transition-colors">
                {t("market.seeAll", "See all")}{" "}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Column 2: Legal Updates */}
          <div className="rounded-xl border border-red-600 bg-white p-5 md:p-8 flex flex-col h-full shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">
              {t("market.legal", "Legal Updates")}
            </h3>

            <div className="flex-grow flex flex-col gap-6">
              {legalArticles.map((article, index) => (
                <div
                  key={article.id}
                  className="flex flex-row items-start gap-4 pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                  {/* Thumbnail Image */}
                  <div className="relative shrink-0">
                    <img
                      src={article.image}
                      alt={
                        getLocalizedField(article, "title", language) ||
                        article.title
                      }
                      className="h-20 w-24 md:h-24 md:w-28 rounded-md object-cover border border-gray-200"
                    />
                    {/* Play button overlay for the first item as seen in the image */}
                    {index === 0 && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded-md">
                        <div className="bg-white rounded-full p-1.5 shadow-sm">
                          <PlayCircle className="h-6 w-6 text-red-600 fill-white" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-center min-w-0">
                    <h4 className="text-[15px] md:text-base font-medium text-gray-800 leading-snug mb-3 line-clamp-2">
                      {getLocalizedField(article, "title", language) ||
                        article.title}
                    </h4>

                    <Link
                      to={`/blog/${article.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm md:text-[15px] font-medium text-red-600 hover:text-red-700 transition-colors">
                      {t("market.readArticle", "Read article")}{" "}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Action Area */}
            <div className="pt-6 mt-auto flex flex-row items-center justify-between">
              <Link
                to="/blog"
                className="inline-flex items-center gap-1.5 text-sm md:text-base font-medium text-red-600 hover:text-red-700 transition-colors">
                {t("market.seeAll", "See all")}{" "}
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                to="/services"
                className="inline-flex items-center justify-center rounded-full bg-[#d32f2f] px-6 py-2.5 text-sm md:text-[15px] font-medium text-white transition hover:bg-red-700">
                {t("market.exploreServices", "Explore Services")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketInsights;
