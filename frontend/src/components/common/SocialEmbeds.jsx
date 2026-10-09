import React from "react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { companyInfo } from "../../data/companyInfo";

const SocialEmbeds = () => {
  return (
    <section className="py-12 bg-[#F9F9F9]">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Standard Portal Heading Design (Matched with ClientReviews) */}
        <div className="mb-8 md:mb-10">
          <h2 className="text-3xl md:text-4xl font-normal text-gray-800 mb-4">
            Connect With Us Online
          </h2>
          <div className="w-16 h-1 bg-red-600 mb-4"></div>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl">
            Stay updated with the latest property listings, real estate trends,
            and exclusive offers by following our official social media
            channels.
          </p>
        </div>

        {/* 3-Column Utilitarian Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Facebook Column */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <FaFacebook className="w-6 h-6 text-[#1877F2]" />
                <div>
                  <h3 className="font-semibold text-gray-900 text-[15px] leading-tight">
                    Facebook
                  </h3>
                  <p className="text-[12px] text-gray-500 mt-0.5">
                    Official Page Updates
                  </p>
                </div>
              </div>
              <a
                href={companyInfo.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="text-[13px] font-medium text-[#1877F2] border border-[#1877F2] px-4 py-1.5 rounded hover:bg-[#1877F2] hover:text-white transition-colors">
                Follow
              </a>
            </div>

            <div className="w-full flex-grow flex justify-center bg-gray-50 border border-gray-200 rounded overflow-hidden h-[400px]">
              <iframe
                src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fphoto.php%3Ffbid%3D1071556962121585&show_text=true&width=500"
                width="100%"
                height="100%"
                style={{ border: "none", overflow: "hidden" }}
                scrolling="no"
                frameBorder="0"
                allowFullScreen={true}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                title="Arjun Buildtech Facebook Post"></iframe>
            </div>
          </div>

          {/* Instagram Column */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <FaInstagram className="w-6 h-6 text-[#E1306C]" />
                <div>
                  <h3 className="font-semibold text-gray-900 text-[15px] leading-tight">
                    Instagram
                  </h3>
                  <p className="text-[12px] text-gray-500 mt-0.5">
                    @arjun.buildtech
                  </p>
                </div>
              </div>
              <a
                href={companyInfo.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="text-[13px] font-medium text-[#E1306C] border border-[#E1306C] px-4 py-1.5 rounded hover:bg-[#E1306C] hover:text-white transition-colors">
                Follow
              </a>
            </div>

            <div className="w-full flex-grow flex justify-center bg-gray-50 border border-gray-200 rounded overflow-hidden h-[400px]">
              <iframe
                src="https://www.instagram.com/p/DeHkLG7BtF3/embed"
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                allowtransparency="true"
                title="Arjun Buildtech Instagram Reel"></iframe>
            </div>
          </div>

          {/* YouTube Column */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <FaYoutube className="w-7 h-7 text-[#FF0000]" />
                <div>
                  <h3 className="font-semibold text-gray-900 text-[15px] leading-tight">
                    YouTube
                  </h3>
                  <p className="text-[12px] text-gray-500 mt-0.5">
                    Property Tours
                  </p>
                </div>
              </div>
              <a
                href={companyInfo.socials.youtube}
                target="_blank"
                rel="noreferrer"
                className="text-[13px] font-medium text-[#FF0000] border border-[#FF0000] px-4 py-1.5 rounded hover:bg-[#FF0000] hover:text-white transition-colors">
                Subscribe
              </a>
            </div>

            <div className="flex flex-col gap-4">
              <div className="w-full aspect-video bg-gray-50 border border-gray-200 rounded overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/6N6ruSFXBtM"
                  title="Arjun Buildtech YouTube Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen></iframe>
              </div>
              <div className="p-4 bg-gray-50 border border-gray-100 rounded text-[13px] text-gray-600 text-center leading-relaxed">
                Watch our latest property tours, market updates, and real estate
                guides on our official YouTube channel. Click subscribe to never
                miss an update.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialEmbeds;
