import React, { useState, useReducer, useEffect } from "react";
import FormSection from "./FormSection";
import InputField from "./InputField";
import ArrayInputField from "./ArrayInputField";
import ImageUploader from "./ImageUploader";
import Notification from "../../components/common/notification/Notification";

// Centralized Form Error Notification Component
const FormErrorNotification = ({
  messages = [],
  visible,
  onClose,
  duration = 4000,
}) => {
  useEffect(() => {
    if (visible && messages.length) {
      const timer = setTimeout(() => onClose(), duration);
      return () => clearTimeout(timer);
    }
  }, [visible, messages, duration, onClose]);

  if (!visible || messages.length === 0) return null;

  return (
    <div className="fixed top-0 left-0 w-full bg-red-600 text-white shadow-md p-4 z-50">
      <div className="max-w-3xl mx-auto flex justify-between items-start">
        <ul className="list-disc pl-5">
          {messages.map((msg, i) => (
            <li key={i} className="text-sm">
              {msg}
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="ml-4 font-bold text-lg hover:text-gray-200">
          ✕
        </button>
      </div>
    </div>
  );
};

const normalizeStringList = (value) => {
  if (Array.isArray(value)) return value;
  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
};

const normalizeLocationValue = (value) => {
  if (typeof value === "string") return value;
  if (value && typeof value === "object") {
    return value.address || value.locality || value.city || "";
  }
  return "";
};

const normalizeImageList = (value) => {
  if (Array.isArray(value)) {
    return value
      .map((item) => (typeof item === "string" ? item : item?.url || ""))
      .filter(Boolean);
  }

  if (typeof value === "string") {
    return [value];
  }

  return [];
};

// Initial form state generator
const getInitialFormData = (propertyType = "house", initialData = null) => {
  const normalizedType =
    initialData?.type || initialData?.propertyType || propertyType || "";

  const priceValue =
    initialData?.price ??
    initialData?.priceValue ??
    initialData?.askingPrice ??
    "";
  const areaValue =
    initialData?.area ??
    initialData?.plotArea ??
    initialData?.builtUpArea ??
    initialData?.landArea ??
    initialData?.propertyDetails?.area ??
    "";
  const locationValue = normalizeLocationValue(
    initialData?.location ??
      initialData?.locationObj ??
      initialData?.locationInfo,
  );
  const featureValue =
    initialData?.features ?? initialData?.propertyDetails?.features ?? [];
  const amenityValue =
    initialData?.amenities ?? initialData?.propertyDetails?.amenities ?? [];
  const imageValue = normalizeImageList(
    initialData?.images ?? initialData?.imageUrls ?? initialData?.gallery,
  );

  return {
    id: initialData?.id || Date.now(),
    name: initialData?.name || "",
    shortTitle: initialData?.shortTitle || "",
    reference: initialData?.reference || "",
    location: locationValue || initialData?.address || "",
    city: initialData?.city ?? initialData?.locationObj?.city ?? initialData?.locationInfo?.city ?? "",
    locality: initialData?.locality ?? initialData?.locationObj?.locality ?? initialData?.locationInfo?.locality ?? "",
    state: initialData?.state ?? initialData?.locationObj?.state ?? initialData?.locationInfo?.state ?? "",
    pincode: initialData?.pincode ?? initialData?.locationObj?.pincode ?? initialData?.locationInfo?.pincode ?? "",
    area: areaValue,
    areaUnit: initialData?.areaUnit || "",
    carpetArea: initialData?.carpetArea ?? "",
    price: priceValue,
    priceNegotiable: initialData?.priceNegotiable ?? false,
    priceOnRequest: initialData?.priceOnRequest ?? false,
    bedrooms:
      normalizedType === "house"
        ? (initialData?.bedrooms ??
          initialData?.propertyDetails?.bedrooms ??
          "")
        : undefined,
    bathrooms:
      normalizedType === "house"
        ? (initialData?.bathrooms ??
          initialData?.propertyDetails?.bathrooms ??
          "")
        : undefined,
    facing: initialData?.facing || "",
    furnishing:
      normalizedType === "house"
        ? (initialData?.furnishing ??
          initialData?.propertyDetails?.furnishing ??
          "")
        : undefined,
    transactionType: initialData?.transactionType || "",
    status: initialData?.status || "",
    floor:
      normalizedType === "house"
        ? (initialData?.floor ??
          initialData?.propertyDetails?.floorNumber ??
          "")
        : undefined,
    parking:
      normalizedType === "house"
        ? (initialData?.parking ??
          initialData?.propertyDetails?.parkingCovered ??
          "")
        : undefined,
    parkingOpen: initialData?.propertyDetails?.parkingOpen ?? "",
    balconies:
      normalizedType === "house"
        ? (initialData?.balconies ??
          initialData?.propertyDetails?.balconies ??
          "")
        : undefined,
    additionalRooms:
      normalizedType === "house"
        ? initialData?.additionalRooms || ""
        : undefined,
    propertyAge:
      initialData?.propertyAge ??
      initialData?.propertyDetails?.propertyAge ??
      "",
    constructionStatus:
      initialData?.constructionStatus ||
      initialData?.propertyDetails?.constructionStatus ||
      "",
    lift: normalizedType === "house" ? initialData?.lift || "" : undefined,
    landmarks: initialData?.landmarks || "",
    bookingAmount: initialData?.bookingAmount || "",
    flooring:
      normalizedType === "house" ? initialData?.flooring || "" : undefined,
    ownershipType: initialData?.ownershipType || "",
    totalFloor:
      normalizedType === "house"
        ? (initialData?.totalFloor ??
          initialData?.propertyDetails?.totalFloors ??
          "")
        : undefined,
    builtUpArea:
      normalizedType === "house"
        ? (initialData?.builtUpArea ??
          initialData?.propertyDetails?.builtUpArea ??
          "")
        : undefined,
    landArea:
      normalizedType === "plot"
        ? (initialData?.landArea ??
          initialData?.plotArea ??
          initialData?.area ??
          "")
        : undefined,
    propertyType: initialData?.propertyType || normalizedType,
    description: initialData?.description || "",
    features: normalizeStringList(featureValue),
    amenities: normalizeStringList(amenityValue),
    type: normalizedType,
    images: imageValue,
    societyName: initialData?.societyName || "",
    possessionDate: initialData?.possessionDate || "",
    reraNumber: initialData?.reraNumber || "",
    waterSupply: initialData?.waterSupply || "",
    powerBackup: initialData?.powerBackup || "",
    gasConnection: initialData?.gasConnection || "",
    gatedCommunity: initialData?.gatedCommunity || "",
    approvalAuthority: initialData?.approvalAuthority || "",
    cornerProperty:
      initialData?.cornerProperty ??
      initialData?.propertyDetails?.cornerProperty ??
      "",
    roadWidth: initialData?.roadWidth || "",
    roadWidthUnit:
      initialData?.roadWidthUnit ||
      initialData?.propertyDetails?.roadWidthUnit ||
      "",
    plotDimensions:
      propertyType === "plot" ? initialData?.plotDimensions || "" : undefined,
    boundaryWall:
      propertyType === "plot" ? initialData?.boundaryWall || "" : undefined,
    maintenanceCharges: initialData?.maintenanceCharges || "",
    errors: {},
    uploading: false,
    imageError: "",
  };
};

// Reducer for form state
const formReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.field]: action.value,
        errors: { ...state.errors, [action.field]: "" },
      };
    case "UPDATE_ARRAY_FIELD":
      return {
        ...state,
        [action.field]: action.value,
        errors: { ...state.errors, [action.field]: "" },
      };
    case "SET_IMAGES":
      return {
        ...state,
        images: action.payload,
        errors: { ...state.errors, images: "" },
      };
    case "RESET_FORM":
      return getInitialFormData(action.propertyType, action.initialData);
    case "SET_ERRORS":
      return { ...state, errors: action.errors };
    case "CLEAR_ERRORS":
      return { ...state, errors: {} };
    case "SET_IMAGE_UPLOAD_STATE":
      return {
        ...state,
        uploading: action.uploading,
        imageError: action.error || "",
      };
    default:
      return state;
  }
};

const DynamicPropertyForm = ({ onSubmit, initialData = null }) => {
  const [propertyType, setPropertyType] = useState(
    initialData?.type || initialData?.propertyType || "",
  );
  const [formData, dispatch] = useReducer(
    formReducer,
    getInitialFormData(propertyType, initialData),
  );
  const [notification, setNotification] = useState({
    message: "",
    type: "success",
    visible: false,
  });

  // Centralized form errors
  const [formErrors, setFormErrors] = useState([]);
  const [errorVisible, setErrorVisible] = useState(false);

  // Mobile stepper state
  const [isMobile, setIsMobile] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    "Property Type",
    "Basic Info",
    propertyType === "house"
      ? "House Details"
      : propertyType === "plot"
        ? "Plot Details"
        : "Property Details",
    "Description",
    "Features & Amenities",
    "Images",
  ];

  // Sync initial data and handle resize
  useEffect(() => {
    dispatch({ type: "RESET_FORM", propertyType, initialData });

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [initialData, propertyType]);

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "UPDATE_FIELD", field: name, value });
  };

  const handleArrayChange = (name, value) => {
    dispatch({ type: "UPDATE_ARRAY_FIELD", field: name, value });
  };

  const handleImageChange = (images) => {
    dispatch({ type: "SET_IMAGES", payload: images });
  };

  const handleImageUploadState = (uploading, error = "") => {
    dispatch({ type: "SET_IMAGE_UPLOAD_STATE", uploading, error });
    if (error)
      setNotification({ message: error, type: "error", visible: true });
  };

  const handlePropertyTypeChange = (type) => {
    setPropertyType(type);
    dispatch({ type: "RESET_FORM", propertyType: type, initialData });
  };

  // Stepper navigation
  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 0, 0));

  // Validation
  const validateForm = () => {
    const errors = {};
    if (!propertyType) errors.propertyType = "Select a property type";
    if (!formData.name?.trim()) errors.name = "Property name is required";
    if (!formData.location?.trim()) errors.location = "Location is required";
    if (!formData.transactionType)
      errors.transactionType = "Select a transaction type";
    if (!formData.status) errors.status = "Select listing availability";
    if (!formData.priceOnRequest && !String(formData.price || "").trim()) {
      errors.price = "Price is required unless price is on request";
    }
    if (
      formData.price &&
      (!Number.isFinite(Number(formData.price)) || Number(formData.price) <= 0)
    ) {
      errors.price = "Enter a valid positive price";
    }
    if (
      formData.area &&
      (!Number.isFinite(Number(formData.area)) || Number(formData.area) <= 0)
    ) {
      errors.area = "Enter a valid positive area";
    }
    if (formData.area && !formData.areaUnit)
      errors.areaUnit = "Select an area unit";
    if (!formData.images || formData.images.length === 0)
      errors.images = "At least one image is required";

    if (propertyType === "house") {
      if (!formData.bedrooms) errors.bedrooms = "Bedrooms required";
      if (!formData.bathrooms) errors.bathrooms = "Bathrooms required";
    } else if (propertyType === "plot") {
      if (!formData.landArea) errors.landArea = "Land area required";
    }

    dispatch({ type: "SET_ERRORS", errors });
    setFormErrors(Object.values(errors));
    setErrorVisible(Object.keys(errors).length > 0);
    return Object.keys(errors).length === 0;
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const userFields = [
      "name",
      "shortTitle",
      "reference",
      "location",
      "city",
      "locality",
      "state",
      "pincode",
      "area",
      "areaUnit",
      "carpetArea",
      "price",
      "priceNegotiable",
      "priceOnRequest",
      "bedrooms",
      "bathrooms",
      "facing",
      "furnishing",
      "transactionType",
      "status",
      "floor",
      "parking",
      "parkingOpen",
      "balconies",
      "additionalRooms",
      "propertyAge",
      "constructionStatus",
      "lift",
      "landmarks",
      "bookingAmount",
      "flooring",
      "ownershipType",
      "totalFloor",
      "builtUpArea",
      "landArea",
      "propertyType",
      "description",
      "features",
      "amenities",
      "societyName",
      "possessionDate",
      "reraNumber",
      "waterSupply",
      "powerBackup",
      "gasConnection",
      "gatedCommunity",
      "approvalAuthority",
      "cornerProperty",
      "roadWidth",
      "roadWidthUnit",
      "plotDimensions",
      "boundaryWall",
      "maintenanceCharges",
      "type",
      "images",
    ];

    const dataToSubmit = userFields.reduce((acc, key) => {
      if (formData[key] !== undefined) acc[key] = formData[key];
      return acc;
    }, {});

    try {
      await onSubmit(dataToSubmit);
      setNotification({
        message: initialData
          ? "Property updated successfully!"
          : "Property saved successfully!",
        type: "success",
        visible: true,
      });
      setErrorVisible(false);
    } catch {
      setNotification({
        message: "Failed to save property. Please try again.",
        type: "error",
        visible: true,
      });
    }
  };

  // Render step content (same as before)
  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <FormSection title="Property Type">
            <div className="flex space-x-4">
              {["house", "plot"].map((type) => (
                <label key={type} className="flex items-center">
                  <input
                    type="radio"
                    name="propertyType"
                    value={type}
                    checked={propertyType === type}
                    onChange={(e) => handlePropertyTypeChange(e.target.value)}
                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700 capitalize">
                    {type === "house" ? "House/Villa" : "Plot/Land"}
                  </span>
                </label>
              ))}
            </div>
            {formData.errors.propertyType && (
              <p className="mt-2 text-sm text-red-600">
                {formData.errors.propertyType}
              </p>
            )}
          </FormSection>
        );
      case 1:
        return (
          <FormSection title="Basic Information">
            <InputField
              label="Property Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={formData.errors.name}
            />
            <InputField
              label="Short Title"
              name="shortTitle"
              value={formData.shortTitle}
              onChange={handleChange}
            />
            <InputField
              label="Reference"
              name="reference"
              value={formData.reference}
              onChange={handleChange}
            />
            <InputField
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              error={formData.errors.location}
              placeholder="Street address or project location"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                label="Locality / Sector"
                name="locality"
                value={formData.locality}
                onChange={handleChange}
              />
              <InputField
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
              <InputField
                label="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
              <InputField
                label="PIN Code"
                name="pincode"
                type="number"
                value={formData.pincode}
                onChange={handleChange}
              />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <InputField
                  label="Area"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                />
              </div>
              <div className="w-1/3">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Area Unit
                </label>
                <select
                  name="areaUnit"
                  value={formData.areaUnit}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 p-3 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200">
                  <option value="">Select unit</option>
                  <option value="sq_ft">Square feet</option>
                  <option value="sq_yd">Square yards (Gaj)</option>
                  <option value="sq_m">Square metres</option>
                  <option value="acre">Acres</option>
                  <option value="kanal">Kanals</option>
                  {formData.areaUnit &&
                    !["sq_ft", "sq_yd", "sq_m", "acre", "kanal"].includes(
                      formData.areaUnit,
                    ) && (
                      <option value={formData.areaUnit}>
                        {formData.areaUnit} (existing value)
                      </option>
                    )}
                </select>
              </div>
            </div>
            <InputField
              label="Price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              error={formData.errors.price}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  name="priceNegotiable"
                  checked={Boolean(formData.priceNegotiable)}
                  onChange={(event) =>
                    dispatch({
                      type: "UPDATE_FIELD",
                      field: "priceNegotiable",
                      value: event.target.checked,
                    })
                  }
                  className="h-4 w-4 accent-red-600"
                />
                Price is negotiable
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  name="priceOnRequest"
                  checked={Boolean(formData.priceOnRequest)}
                  onChange={(event) =>
                    dispatch({
                      type: "UPDATE_FIELD",
                      field: "priceOnRequest",
                      value: event.target.checked,
                    })
                  }
                  className="h-4 w-4 accent-red-600"
                />
                Show price on request
              </label>
            </div>
            <InputField
              label="Carpet Area"
              name="carpetArea"
              value={formData.carpetArea}
              onChange={handleChange}
            />
            <InputField
              label="Booking Amount"
              name="bookingAmount"
              value={formData.bookingAmount}
              onChange={handleChange}
            />
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Listing Availability
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 p-3 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200">
                <option value="">Select availability</option>
                <option value="Available">Available</option>
                <option value="Under Offer">Under Offer</option>
                <option value="Sold">Sold</option>
                <option value="Rented">Rented</option>
                <option value="Off Market">Off Market</option>
                {formData.status && !["Available", "Under Offer", "Sold", "Rented", "Off Market"].includes(formData.status) && (
                  <option value={formData.status}>{formData.status} (existing value)</option>
                )}
              </select>
              {formData.errors.status && <p className="mt-1 text-xs text-red-600">{formData.errors.status}</p>}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Possession / Construction Status
              </label>
              <select
                name="constructionStatus"
                value={formData.constructionStatus}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 p-3 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200">
                <option value="">Select status</option>
                <option value="Ready to Move">Ready to Move</option>
                <option value="Under Construction">Under Construction</option>
                <option value="New Launch">New Launch</option>
                <option value="Proposed">Proposed</option>
                <option value="Not Applicable">Not Applicable</option>
                {formData.constructionStatus && !["Ready to Move", "Under Construction", "New Launch", "Proposed", "Not Applicable"].includes(formData.constructionStatus) && (
                  <option value={formData.constructionStatus}>{formData.constructionStatus} (existing value)</option>
                )}
              </select>
            </div>
            <InputField
              label="Society / Project Name"
              name="societyName"
              value={formData.societyName}
              onChange={handleChange}
              placeholder="e.g. Suncity Township"
            />
            <InputField
              label="Possession Date"
              name="possessionDate"
              type="date"
              value={formData.possessionDate}
              onChange={handleChange}
            />
          </FormSection>
        );
      case 2:
        if (!propertyType) {
          return (
            <FormSection title="Property Details">
              <p className="text-sm text-gray-600">
                Select House/Villa or Plot/Land in the Property Type section to
                see the relevant fields.
              </p>
            </FormSection>
          );
        }
        return propertyType === "house" ? (
          <FormSection title="House Details">
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Bedrooms"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                error={formData.errors.bedrooms}
              />
              <InputField
                label="Bathrooms"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                error={formData.errors.bathrooms}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Balconies"
                name="balconies"
                type="number"
                value={formData.balconies}
                onChange={handleChange}
              />
              <InputField
                label="Parking (e.g. 1 Covered)"
                name="parking"
                value={formData.parking}
                onChange={handleChange}
              />
            </div>
            <InputField
              label="Furnishing"
              name="furnishing"
              value={formData.furnishing}
              onChange={handleChange}
            />
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Floor (e.g. 3(Out of 5))"
                name="floor"
                value={formData.floor}
                onChange={handleChange}
              />
              <InputField
                label="Total Floors"
                name="totalFloor"
                type="number"
                value={formData.totalFloor}
                onChange={handleChange}
              />
            </div>
            <InputField
              label="Built-up Area (sq.ft)"
              name="builtUpArea"
              value={formData.builtUpArea}
              onChange={handleChange}
            />
            <InputField
              label="Carpet Area"
              name="carpetArea"
              value={formData.carpetArea}
              onChange={handleChange}
            />
            <InputField
              label="Property Age"
              name="propertyAge"
              value={formData.propertyAge}
              onChange={handleChange}
              placeholder="e.g. 5 years"
            />
            <InputField
              label="Open Parking Spaces"
              name="parkingOpen"
              type="number"
              value={formData.parkingOpen}
              onChange={handleChange}
            />
            <InputField
              label="Facing (e.g. North-East)"
              name="facing"
              value={formData.facing}
              onChange={handleChange}
            />
            <InputField
              label="Additional Rooms (e.g. 1 Store Room)"
              name="additionalRooms"
              value={formData.additionalRooms}
              onChange={handleChange}
            />
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Lift"
                name="lift"
                type="number"
                value={formData.lift}
                onChange={handleChange}
              />
              <InputField
                label="Flooring (e.g. Marble)"
                name="flooring"
                value={formData.flooring}
                onChange={handleChange}
              />
            </div>
            <label className="block text-sm font-medium text-gray-700">
              Ownership Type
              <select
                name="ownershipType"
                value={formData.ownershipType}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-gray-300 p-3 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200">
                <option value="">Select ownership type</option>
                <option value="Freehold">Freehold</option>
                <option value="Leasehold">Leasehold</option>
                <option value="Power of Attorney">Power of Attorney</option>
                <option value="Co-operative Society">
                  Co-operative Society
                </option>
                <option value="Other">Other</option>
                {formData.ownershipType &&
                  ![
                    "Freehold",
                    "Leasehold",
                    "Power of Attorney",
                    "Co-operative Society",
                    "Other",
                  ].includes(formData.ownershipType) && (
                    <option value={formData.ownershipType}>
                      {formData.ownershipType} (existing value)
                    </option>
                  )}
              </select>
            </label>
            <InputField
              label="Landmarks"
              name="landmarks"
              value={formData.landmarks}
              onChange={handleChange}
            />
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Transaction Type
              </label>
              <select
                name="transactionType"
                value={formData.transactionType}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 p-3 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200">
                <option value="">Select transaction type</option>
                <option value="Sale">Sale</option>
                <option value="Resale">Resale</option>
                <option value="Rent">Rent</option>
                <option value="Lease">Lease</option>
                {formData.transactionType && !["Sale", "Resale", "Rent", "Lease"].includes(formData.transactionType) && (
                  <option value={formData.transactionType}>{formData.transactionType} (existing value)</option>
                )}
                {formData.transactionType &&
                  !["Sale", "Resale", "Rent", "Lease"].includes(
                    formData.transactionType,
                  ) && (
                    <option value={formData.transactionType}>
                      {formData.transactionType} (existing value)
                    </option>
                  )}
              </select>
              {formData.errors.transactionType && (
                <p className="mt-1 text-xs text-red-600">
                  {formData.errors.transactionType}
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Water Supply"
                name="waterSupply"
                value={formData.waterSupply}
                onChange={handleChange}
                placeholder="Municipal / Borewell / Both"
              />
              <InputField
                label="Power Backup"
                name="powerBackup"
                value={formData.powerBackup}
                onChange={handleChange}
                placeholder="Full / Partial / None"
              />
            </div>
            <InputField
              label="Gas Connection"
              name="gasConnection"
              value={formData.gasConnection}
              onChange={handleChange}
              placeholder="Piped Gas / LPG / None"
            />
            <InputField
              label="RERA Number"
              name="reraNumber"
              value={formData.reraNumber}
              onChange={handleChange}
              placeholder="e.g. HRERA-GRG-2024-1234"
            />
            <InputField
              label="Approval Authority"
              name="approvalAuthority"
              value={formData.approvalAuthority}
              onChange={handleChange}
              placeholder="e.g. HSVP, DTCP, MCR"
            />
            <div className="grid grid-cols-2 gap-4">
              <div className="flex gap-2">
                <div className="flex-1">
                  <InputField
                    label="Road Width"
                    name="roadWidth"
                    value={formData.roadWidth}
                    onChange={handleChange}
                    placeholder="e.g. 30"
                  />
                </div>
                <div className="w-20">
                  <InputField
                    label="Unit"
                    name="roadWidthUnit"
                    value={formData.roadWidthUnit}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <InputField
                label="Gated Community"
                name="gatedCommunity"
                value={formData.gatedCommunity}
                onChange={handleChange}
                placeholder="Yes / No"
              />
            </div>
            <label className="block text-sm font-medium text-gray-700">
              Corner Property
              <select
                name="cornerProperty"
                value={formData.cornerProperty}
                onChange={(event) =>
                  dispatch({
                    type: "UPDATE_FIELD",
                    field: "cornerProperty",
                    value:
                      event.target.value === ""
                        ? ""
                        : event.target.value === "true",
                  })
                }
                className="mt-1 w-full rounded-lg border border-gray-300 p-3 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200">
                <option value="">Not confirmed</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </label>
          </FormSection>
        ) : (
          <FormSection title="Plot Details">
            <InputField
              label="Land Area"
              name="landArea"
              value={formData.landArea}
              onChange={handleChange}
              error={formData.errors.landArea}
            />
            <InputField
              label="Property Age"
              name="propertyAge"
              value={formData.propertyAge}
              onChange={handleChange}
              placeholder="e.g. 5 years"
            />
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Possession / Construction Status
              </label>
              <select
                name="constructionStatus"
                value={formData.constructionStatus}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 p-3 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200">
                <option value="">Select status</option>
                <option value="Ready to Move">Ready to Move</option>
                <option value="Under Construction">Under Construction</option>
                <option value="New Launch">New Launch</option>
                <option value="Proposed">Proposed</option>
                <option value="Not Applicable">Not Applicable</option>
              </select>
            </div>
            <InputField
              label="Facing (e.g. North-East)"
              name="facing"
              value={formData.facing}
              onChange={handleChange}
            />
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Ownership Type
              </label>
              <select
                name="ownershipType"
                value={formData.ownershipType}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 p-3 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200">
                <option value="">Select ownership type</option>
                <option value="Freehold">Freehold</option>
                <option value="Leasehold">Leasehold</option>
                <option value="Power of Attorney">Power of Attorney</option>
                <option value="Co-operative Society">
                  Co-operative Society
                </option>
                <option value="Other">Other</option>
                {formData.ownershipType && !["Freehold", "Leasehold", "Power of Attorney", "Co-operative Society", "Other"].includes(formData.ownershipType) && (
                  <option value={formData.ownershipType}>{formData.ownershipType} (existing value)</option>
                )}
              </select>
            </div>
            <InputField
              label="Landmarks"
              name="landmarks"
              value={formData.landmarks}
              onChange={handleChange}
            />
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Transaction Type
              </label>
              <select
                name="transactionType"
                value={formData.transactionType}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 p-3 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200">
                <option value="">Select transaction type</option>
                <option value="Sale">Sale</option>
                <option value="Resale">Resale</option>
                <option value="Rent">Rent</option>
                <option value="Lease">Lease</option>
                {formData.transactionType && !["Sale", "Resale", "Rent", "Lease"].includes(formData.transactionType) && (
                  <option value={formData.transactionType}>{formData.transactionType} (existing value)</option>
                )}
              </select>
            </div>
            <InputField
              label="Plot Dimensions (e.g. 30x50 ft)"
              name="plotDimensions"
              value={formData.plotDimensions}
              onChange={handleChange}
              placeholder="e.g. 30x50 ft"
            />
            <InputField
              label="Boundary Wall"
              name="boundaryWall"
              value={formData.boundaryWall}
              onChange={handleChange}
              placeholder="Yes / No / Partial"
            />
            <InputField
              label="RERA Number"
              name="reraNumber"
              value={formData.reraNumber}
              onChange={handleChange}
              placeholder="e.g. HRERA-GRG-2024-1234"
            />
            <InputField
              label="Approval Authority"
              name="approvalAuthority"
              value={formData.approvalAuthority}
              onChange={handleChange}
              placeholder="e.g. HSVP, DTCP, MCR"
            />
            <InputField
              label="Water Supply"
              name="waterSupply"
              value={formData.waterSupply}
              onChange={handleChange}
              placeholder="Municipal / Borewell / Both"
            />
            <div className="grid grid-cols-2 gap-4">
              <div className="flex gap-2">
                <div className="flex-1">
                  <InputField
                    label="Road Width"
                    name="roadWidth"
                    value={formData.roadWidth}
                    onChange={handleChange}
                    placeholder="e.g. 30"
                  />
                </div>
                <div className="w-20">
                  <InputField
                    label="Unit"
                    name="roadWidthUnit"
                    value={formData.roadWidthUnit}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <InputField
                label="Gated Community"
                name="gatedCommunity"
                value={formData.gatedCommunity}
                onChange={handleChange}
                placeholder="Yes / No"
              />
            </div>
            <label className="block text-sm font-medium text-gray-700">
              Corner Property
              <select
                name="cornerProperty"
                value={formData.cornerProperty}
                onChange={(event) =>
                  dispatch({
                    type: "UPDATE_FIELD",
                    field: "cornerProperty",
                    value:
                      event.target.value === ""
                        ? ""
                        : event.target.value === "true",
                  })
                }
                className="mt-1 w-full rounded-lg border border-gray-300 p-3 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200">
                <option value="">Not confirmed</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </label>
          </FormSection>
        );
      case 3:
        return (
          <FormSection title="Description">
            <InputField
              label="Description"
              name="description"
              type="textarea"
              value={formData.description}
              onChange={handleChange}
            />
          </FormSection>
        );
      case 4:
        return (
          <FormSection title="Features & Amenities">
            <ArrayInputField
              label="Features"
              name="features"
              value={formData.features}
              onChange={handleArrayChange}
              helperText="Separate features with commas"
            />
            <ArrayInputField
              label="Amenities"
              name="amenities"
              value={formData.amenities}
              onChange={handleArrayChange}
              helperText="Separate amenities with commas"
            />
            <InputField
              label="Monthly Maintenance Charges (₹)"
              name="maintenanceCharges"
              value={formData.maintenanceCharges}
              onChange={handleChange}
              placeholder="e.g. 3000"
            />
          </FormSection>
        );
      case 5:
        return (
          <FormSection title="Property Images">
            <ImageUploader
              images={formData.images}
              onImagesChange={handleImageChange}
              onUploadStateChange={handleImageUploadState}
              uploading={formData.uploading}
              error={formData.imageError || formData.errors.images}
            />
          </FormSection>
        );
      default:
        return null;
    }
  };

  return (
    <div className="md:p-8 glass-panel md:rounded-2xl rounded-xl relative">
      {/* Centralized Form Errors */}
      <FormErrorNotification
        messages={formErrors}
        visible={errorVisible}
        onClose={() => setErrorVisible(false)}
      />

      {/* Success/Error Notifications */}
      {notification.visible && (
        <Notification
          message={notification.message}
          type={notification.type}
          duration={3000}
          onClose={() => setNotification({ ...notification, visible: false })}
        />
      )}

      {/* Form */}
      {isMobile ? (
        <form
          onSubmit={handleSubmit}
          className="space-y-6 p-4 glass-panel rounded-xl">
          {/* Stepper Progress */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1 text-sm font-medium text-gray-700">
              <span>
                Step {currentStep + 1} of {steps.length}
              </span>
              <span>{steps[currentStep]}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-red-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${((currentStep + 1) / steps.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Step Content */}
          <div className="p-2 mb-10">{renderStepContent(currentStep)}</div>

          {/* Navigation */}
          <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-2 flex justify-between items-center shadow-lg z-50">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={prevStep}
                className="flex-1 bg-gray-300 text-gray-800 font-semibold py-1 px-1 rounded-lg mr-2 hover:bg-gray-400 transition">
                Back
              </button>
            )}

            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                onClick={nextStep}
                className={`flex-1 ${currentStep > 0 ? "ml-2" : ""} bg-red-600 text-white font-semibold py-1 px-1 rounded-lg hover:bg-red-700 transition`}>
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={formData.uploading}
                className="flex-1 ml-2 bg-red-600 text-white font-semibold py-2 px-1 rounded-lg shadow-sm hover:bg-red-700 hover:shadow hover:-translate-y-0.5 transition-all duration-300">
                {initialData ? "Update Property" : "Save Property"}
              </button>
            )}
          </div>
        </form>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          {renderStepContent(0)}
          {renderStepContent(1)}
          {renderStepContent(2)}
          {renderStepContent(3)}
          {renderStepContent(4)}
          {renderStepContent(5)}
          <div className="text-center">
            <button
              type="submit"
              className="bg-red-600 text-white px-8 py-3.5 rounded-lg text-lg font-semibold hover:bg-red-700 shadow-sm hover:shadow hover:-translate-y-0.5 transition-all duration-300"
              disabled={formData.uploading}>
              {initialData ? "Update Property" : "Save Property"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default DynamicPropertyForm;
