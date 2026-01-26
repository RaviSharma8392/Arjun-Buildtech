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
  amenities: initialData?.amenities || [],
  type: propertyType,
  images: initialData?.images || [],
  errors: {},
  uploading: false,
  imageError: "",
});

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
    initialData?.type || "house",
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
    propertyType === "house" ? "House Details" : "Plot Details",
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

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      const messages = Object.values(formData.errors).filter(Boolean);
      setFormErrors(messages);
      setErrorVisible(true);
      return;
    }

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
      "amenities",
      "type",
      "images",
    ];

    const dataToSubmit = userFields.reduce((acc, key) => {
      if (formData[key] !== undefined) acc[key] = formData[key];
      return acc;
    }, {});

    try {
      onSubmit(dataToSubmit);
      setNotification({
        message: initialData
          ? "Property updated successfully!"
          : "Property saved successfully!",
        type: "success",
        visible: true,
      });
      setErrorVisible(false); // hide form errors on success
    } catch (error) {
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
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700 capitalize">
                    {type === "house" ? "House/Villa" : "Plot/Land"}
                  </span>
                </label>
              ))}
            </div>
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
            />
            <InputField
              label="Price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              error={formData.errors.price}
            />
          </FormSection>
        );
      case 2:
        return propertyType === "house" ? (
          <FormSection title="House Details">
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
            <InputField
              label="Transaction Type"
              name="transactionType"
              value={formData.transactionType}
              onChange={handleChange}
            />
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
              label="Transaction Type"
              name="transactionType"
              value={formData.transactionType}
              onChange={handleChange}
            />
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
    <div className="md:p-6 bg-white rounded-lg shadow-lg relative">
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
          className="space-y-6 p-4 bg-white rounded-lg shadow-lg">
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
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
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
                className={`flex-1 ${currentStep > 0 ? "ml-2" : ""} bg-blue-600 text-white font-semibold py-1 px-1 rounded-lg hover:bg-blue-700 transition`}>
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={formData.uploading}
                className="flex-1 ml-2 bg-green-600 text-white font-semibold py-1 px-1 rounded-lg hover:bg-green-700 transition">
                {initialData ? "Update Property" : "Save Property Listing"}
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
              className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
              disabled={formData.uploading}>
              {initialData ? "Update Property" : "Save Property Listing"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default DynamicPropertyForm;
