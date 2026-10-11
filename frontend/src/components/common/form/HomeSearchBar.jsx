import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Home, ChevronDown, Tag } from "lucide-react";
import { createSlug } from "../../../utils/slugify";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../services/firebase";
import { normalizePropertyData } from "../../../utils/propertySchema";
import { useLanguage } from "../../../context/useLanguage";

const HomeSearchBar = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [location, setLocation] = useState("All Locations");
  const [propertyStatus, setPropertyStatus] = useState("Any");
  const [propertyType, setPropertyType] = useState("All Types");

  const [locations, setLocations] = useState([
    "All Locations",
    "Rohtak",
    "Sector-27, Rohtak",
    "Huda Sector-27, Rohtak",
    "Suncity, Rohtak",
  ]);

  const [types, setTypes] = useState([
    "All Types",
    "House",
    "Villa",
    "Plot",
    "Flat",
    "Commercial",
  ]);

  const statuses = ["Any", "For Sale", "Investment"];

  const translateType = (type) => {
    const keys = {
      "All Types": ["property.allTypes", "All Types"],
      House: ["property.house", "House"],
      Villa: ["property.villa", "Villa"],
      Plot: ["property.plot", "Plot"],
      Flat: ["property.flat", "Flat"],
      Commercial: ["property.commercial", "Commercial"],
    };
    const entry = keys[type];
    return entry ? t(entry[0], entry[1]) : type;
  };

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const snapshot = await getDocs(collection(db, "properties"));
        const data = snapshot.docs.map((doc) =>
          normalizePropertyData(doc.data()),
        );

        const dynamicLocations = [
          "All Locations",
          ...new Set(data.map((p) => p.location).filter(Boolean)),
        ];

        const baseTypes = ["House", "Villa", "Plot", "Flat", "Commercial"];

        const dbTypes = data
          .map((p) => p.type)
          .filter(Boolean)
          .map((t) => t.charAt(0).toUpperCase() + t.slice(1));

        const dynamicTypes = [
          "All Types",
          ...new Set([...baseTypes, ...dbTypes]),
        ];

        if (dynamicLocations.length > 1) {
          setLocations(dynamicLocations);
        }

        if (dynamicTypes.length > 1) {
          setTypes(dynamicTypes);
        }
      } catch (error) {
        console.error("Error fetching properties for search bar:", error);
      }
    };

    fetchDropdownData();
  }, []);

  const handleSearch = () => {
    let url = "/properties";

    if (location !== "All Locations") {
      url = `/properties/${createSlug(location)}`;
    }

    navigate(url, {
      state: {
        type: propertyType,
        status: propertyStatus,
        exactLocation: location,
      },
    });
  };

  return (
    <div className="w-full w-full">
      <div className="bg-white rounded-lg border border-gray-300 overflow-hidden flex flex-col md:flex-row transition-all hover:border-gray-400 focus-within:border-red-500 focus-within:ring-1 focus-within:ring-red-500">
        {/* Mobile Input Grid / Desktop Flex Row */}
        <div className="grid grid-cols-2 md:flex md:flex-1">
          {/* ================= LOCATION ================= */}
          <div className="col-span-2 md:flex-1 relative flex flex-col justify-center p-3.5 md:px-5 border-b md:border-b-0 md:border-r border-gray-200 hover:bg-gray-50/80 transition-colors group">
            <div className="flex items-center gap-3">
              <div className="text-gray-400 group-hover:text-red-600 transition-colors shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-0.5">
                  {t("homeSearch.location", "Location")}
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-transparent text-gray-900 font-medium text-[15px] outline-none appearance-none cursor-pointer truncate pr-5">
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc === "All Locations"
                        ? t("common.allLocations", "All Locations")
                        : loc}
                    </option>
                  ))}
                </select>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* ================= STATUS ================= */}
          <div className="col-span-1 md:flex-1 relative flex flex-col justify-center p-3.5 md:px-5 border-r border-b md:border-b-0 border-gray-200 hover:bg-gray-50/80 transition-colors group">
            <div className="flex items-center gap-3">
              <div className="text-gray-400 group-hover:text-red-600 transition-colors shrink-0">
                <Tag className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-0.5">
                  {t("homeSearch.status", "Status")}
                </label>
                <select
                  value={propertyStatus}
                  onChange={(e) => setPropertyStatus(e.target.value)}
                  className="w-full bg-transparent text-gray-900 font-medium text-[15px] outline-none appearance-none cursor-pointer truncate pr-4">
                  {statuses.map((st) => (
                    <option key={st} value={st}>
                      {st === "Any"
                        ? t("homeSearch.any", "Any")
                        : st === "For Sale"
                          ? t("homeSearch.forSale", "For Sale")
                          : t("homeSearch.investment", "Investment")}
                    </option>
                  ))}
                </select>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 md:right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* ================= PROPERTY TYPE ================= */}
          <div className="col-span-1 md:flex-1 relative flex flex-col justify-center p-3.5 md:px-5 border-b md:border-b-0 border-gray-200 hover:bg-gray-50/80 transition-colors group">
            <div className="flex items-center gap-3">
              <div className="text-gray-400 group-hover:text-red-600 transition-colors shrink-0">
                <Home className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-0.5">
                  {t("homeSearch.type", "Type")}
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full bg-transparent text-gray-900 font-medium text-[15px] outline-none appearance-none cursor-pointer truncate pr-4">
                  {types.map((tType) => (
                    <option key={tType} value={tType}>
                      {translateType(tType)}
                    </option>
                  ))}
                </select>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 md:right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* ================= SEARCH BUTTON ================= */}
        <div className="p-3 bg-white md:bg-transparent flex items-center justify-center shrink-0">
          <button
            onClick={handleSearch}
            className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white rounded-md px-8 py-3.5 font-semibold text-[15px] flex items-center justify-center gap-2.5 transition-all shadow-sm active:scale-[0.98]">
            <Search className="w-4 h-4" />
            <span>{t("homeSearch.search", "Search")}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeSearchBar;
