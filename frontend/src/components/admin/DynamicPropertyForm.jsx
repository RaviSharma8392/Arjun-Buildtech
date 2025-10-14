import React, { useState, useReducer, useEffect } from "react";
import FormSection from "./FormSection";
import InputField from "./InputField";
import ArrayInputField from "./ArrayInputField";
import ImageUploader from "./ImageUploader";

// Initial form state generator
const getInitialFormData = (propertyType = "house", initialData = null) => ({
  id: initialData?.id || Date.now(),
  name: initialData?.name || "",
  shortTitle: initialData?.shortTitle || "",
  reference: initialData?.reference || "",
  location: initialData?.location || "",
  area: initialData?.area || "",
  price: initialData?.price || "",
  bedrooms: propertyType === "house" ? initialData?.bedrooms || "" : undefined,
  bathrooms:
    propertyType === "house" ? initialData?.bathrooms || "" : undefined,
  facing: initialData?.facing || "",
  furnishing:
    propertyType === "house" ? initialData?.furnishing || "" : undefined,
  transactionType: initialData?.transactionType || "New Property",
  totalFloor:
    propertyType === "house" ? initialData?.totalFloor || 1 : undefined,
  builtUpArea:
    propertyType === "house" ? initialData?.builtUpArea || "" : undefined,
  landArea: propertyType === "plot" ? initialData?.landArea || "" : undefined,
  propertyType: initialData?.propertyType || "",
  description: initialData?.description || "",
  features: initialData?.features || [],
  type: propertyType,
  images: initialData?.images || [],
  errors: {},
  uploading: false,
  imageError: "",
});

// Reducer
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
    initialData?.type || "house"
  );
  const [formData, dispatch] = useReducer(
    formReducer,
    getInitialFormData(propertyType, initialData)
  );

  // Sync initial data
  useEffect(() => {
    dispatch({ type: "RESET_FORM", propertyType, initialData });
  }, [initialData, propertyType]);

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
  };

  const handlePropertyTypeChange = (type) => {
    setPropertyType(type);
    dispatch({ type: "RESET_FORM", propertyType: type, initialData });
  };

  // Validate fields
  const validateForm = () => {
    const errors = {};
    if (!formData.name?.trim()) errors.name = "Property name is required";
    if (!formData.location?.trim()) errors.location = "Location is required";
    if (!formData.price?.trim()) errors.price = "Price is required";
    if (!formData.images || formData.images.length === 0)
      errors.images = "At least one image is required";

    if (propertyType === "house") {
      if (!formData.bedrooms) errors.bedrooms = "Bedrooms required";
      if (!formData.bathrooms) errors.bathrooms = "Bathrooms required";
    } else if (propertyType === "plot") {
      if (!formData.landArea) errors.landArea = "Land area required";
    }

    dispatch({ type: "SET_ERRORS", errors });
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const userFields = [
      "name",
      "shortTitle",
      "reference",
      "location",
      "price",
      "bedrooms",
      "bathrooms",
      "furnishing",
      "totalFloor",
      "builtUpArea",
      "landArea",
      "transactionType",
      "propertyType",
      "description",
      "features",
      "type",
      "images",
    ];

    const dataToSubmit = userFields.reduce((acc, key) => {
      if (formData[key] !== undefined) acc[key] = formData[key];
      return acc;
    }, {});

    onSubmit(dataToSubmit);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          {initialData ? "Edit Property" : "Add New Property"}
        </h2>
        <p className="text-gray-600">
          Fill in the details below to {initialData ? "update" : "list"} your
          property
        </p>
      </div>

      {/* Property Type Selection */}
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
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700 capitalize">
                {type === "house" ? "House/Villa" : "Plot/Land"}
              </span>
            </label>
          ))}
        </div>
      </FormSection>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
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
          />
          <InputField
            label="Price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            error={formData.errors.price}
          />
        </FormSection>

        {/* Property Details */}
        <FormSection title="Property Details">
          {propertyType === "house" && (
            <>
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
              <InputField
                label="Furnishing"
                name="furnishing"
                value={formData.furnishing}
                onChange={handleChange}
              />
              <InputField
                label="Total Floors"
                name="totalFloor"
                type="number"
                value={formData.totalFloor}
                onChange={handleChange}
              />
              <InputField
                label="Built-up Area (sq.ft)"
                name="builtUpArea"
                value={formData.builtUpArea}
                onChange={handleChange}
              />
              <InputField
                label="Facing"
                name="facing"
                value={formData.facing}
                onChange={handleChange}
              />
            </>
          )}
          {propertyType === "plot" && (
            <InputField
              label="Land Area"
              name="landArea"
              value={formData.landArea}
              onChange={handleChange}
              error={formData.errors.landArea}
            />
          )}
          <InputField
            label="Transaction Type"
            name="transactionType"
            value={formData.transactionType}
            onChange={handleChange}
          />
        </FormSection>

        {/* Description */}
        <FormSection title="Description">
          <InputField
            label="Description"
            name="description"
            type="textarea"
            value={formData.description}
            onChange={handleChange}
          />
        </FormSection>

        {/* Features */}
        <FormSection title="Features">
          <ArrayInputField
            label="Features"
            name="features"
            values={formData.features}
            onChange={handleArrayChange}
          />
        </FormSection>

        {/* Images */}
        <FormSection title="Property Images">
          <ImageUploader
            images={formData.images}
            onImagesChange={handleImageChange}
            onUploadStateChange={handleImageUploadState}
            uploading={formData.uploading}
            error={formData.imageError}
          />
        </FormSection>

        <div className="text-center">
          <button
            type="submit"
            className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
            disabled={formData.uploading}>
            {initialData ? "Update Property" : "Save Property Listing"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DynamicPropertyForm;
