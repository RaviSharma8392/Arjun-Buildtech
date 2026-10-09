import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Home, ChevronDown, Tag } from "lucide-react";
import { createSlug } from "../../../utils/slugify";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../services/firebase";
import { normalizePropertyData } from "../../../utils/propertySchema";

const HomeSearchBar = () => {
  const navigate = useNavigate();

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
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-6 lg:px-8">
      <div
        className="
          bg-white
          rounded-xl
          shadow-lg
          border border-gray-200/80
          overflow-hidden

          /* Mobile Grid */
          grid grid-cols-2

          /* Desktop Flex */
          md:flex md:flex-row
        ">
        {/* ================= LOCATION ================= */}
        <div
          className="
            relative
            col-span-2
            flex flex-col justify-center
            p-4
            md:flex-1
            md:py-3.5 md:px-5
            md:border-b-0 md:border-r
            border-b border-gray-100
            hover:bg-gray-50/60
            transition-colors
            group
          ">
          <div className="flex items-center gap-3">
            <div className="text-gray-400 group-hover:text-red-600 transition-colors shrink-0">
              <MapPin className="w-5 h-5" />
            </div>

            <div className="flex-1 min-w-0">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-0.5">
                Location
              </label>

              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="
                  w-full
                  bg-transparent
                  text-gray-800
                  font-medium
                  text-sm sm:text-[15px]
                  outline-none
                  appearance-none
                  cursor-pointer
                  truncate
                  pr-5
                ">
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <ChevronDown
              className="
                w-4 h-4
                text-gray-400
                absolute
                right-4 md:right-5
                top-1/2
                -translate-y-1/2
                pointer-events-none
              "
            />
          </div>
        </div>

        {/* ================= STATUS ================= */}
        <div
          className="
            relative
            flex flex-col justify-center
            p-4
            md:flex-1
            md:py-3.5 md:px-5
            md:border-b-0 md:border-r
            border-r border-b border-gray-100
            hover:bg-gray-50/60
            transition-colors
            group
          ">
          <div className="flex items-center gap-3">
            <div className="text-gray-400 group-hover:text-red-600 transition-colors shrink-0">
              <Tag className="w-5 h-5" />
            </div>

            <div className="flex-1 min-w-0">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-0.5">
                Status
              </label>

              <select
                value={propertyStatus}
                onChange={(e) => setPropertyStatus(e.target.value)}
                className="
                  w-full
                  bg-transparent
                  text-gray-800
                  font-medium
                  text-sm sm:text-[15px]
                  outline-none
                  appearance-none
                  cursor-pointer
                  truncate
                  pr-4
                ">
                {statuses.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            <ChevronDown
              className="
                w-3.5 h-3.5
                text-gray-400
                absolute
                right-3 md:right-5
                top-1/2
                -translate-y-1/2
                pointer-events-none
              "
            />
          </div>
        </div>

        {/* ================= PROPERTY TYPE ================= */}
        <div
          className="
            relative
            flex flex-col justify-center
            p-4
            md:flex-1
            md:py-3.5 md:px-5
            md:border-b-0
            border-b border-gray-100
            hover:bg-gray-50/60
            transition-colors
            group
          ">
          <div className="flex items-center gap-3">
            <div className="text-gray-400 group-hover:text-red-600 transition-colors shrink-0">
              <Home className="w-5 h-5" />
            </div>

            <div className="flex-1 min-w-0">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-0.5">
                Type
              </label>

              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="
                  w-full
                  bg-transparent
                  text-gray-800
                  font-medium
                  text-sm sm:text-[15px]
                  outline-none
                  appearance-none
                  cursor-pointer
                  truncate
                  pr-4
                ">
                {types.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <ChevronDown
              className="
                w-3.5 h-3.5
                text-gray-400
                absolute
                right-3 md:right-5
                top-1/2
                -translate-y-1/2
                pointer-events-none
              "
            />
          </div>
        </div>

        {/* ================= SEARCH BUTTON ================= */}
        <div
          className="
            col-span-2
            p-3
            bg-gray-50/50
            md:bg-transparent
            md:p-2.5
            flex items-center justify-center
            shrink-0
          ">
          <button
            onClick={handleSearch}
            className="
              w-full
              md:w-auto
              bg-red-600
              hover:bg-red-700
              text-white
              rounded-lg
              px-7
              py-3
              md:py-3.5
              font-semibold
              text-sm
              sm:text-base
              flex items-center justify-center gap-2
              transition-all
              shadow-sm
              hover:shadow
              active:scale-[0.98]
            ">
            <Search className="w-4 h-4" />
            <span>Search</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeSearchBar;
