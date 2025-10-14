import React, { useState } from "react";
import { uploadToCloudinary } from "../../../services/cloudinaryUpload";

const ImageUploader = ({ images = [], onImagesChange }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [localImages, setLocalImages] = useState(images);

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    e.target.value = ""; // Reset input

    if (files.length === 0) return;
    if (files.length + localImages.length > 10) {
      setError("You can upload a maximum of 10 images.");
      return;
    }

    const validFiles = files.filter((file) => {
      if (!file.type.startsWith("image/")) {
        setError("Please upload only image files.");
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB.");
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    setUploading(true);
    setError("");

    try {
      const uploadedUrls = [];

      for (const file of validFiles) {
        const publicId = await uploadToCloudinary(file);
        const imageUrl = `https://res.cloudinary.com/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload/${publicId}`;

        uploadedUrls.push(imageUrl);
      }

      const updatedImages = [...localImages, ...uploadedUrls];
      setLocalImages(updatedImages);
      onImagesChange(updatedImages);
    } catch (err) {
      console.error("Upload error:", err);
      setError(err.message || "Failed to upload images. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = localImages.filter((_, i) => i !== index);
    setLocalImages(updatedImages);
    onImagesChange(updatedImages);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add("border-blue-400", "bg-blue-50");
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove("border-blue-400", "bg-blue-50");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove("border-blue-400", "bg-blue-50");

    const inputEvent = { target: { files: e.dataTransfer.files } };
    handleFileChange(inputEvent);
  };

  return (
    <div className="w-full">
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 ${
          uploading
            ? "border-yellow-400 bg-yellow-50"
            : "border-gray-300 hover:border-gray-400 bg-white"
        } cursor-pointer hover:bg-gray-50`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById("file-input").click()}>
        <input
          id="file-input"
          type="file"
          accept="image/*"
          multiple
          disabled={uploading}
          onChange={handleFileChange}
          className="hidden"
        />
        <p className="text-lg font-semibold text-gray-700">
          {uploading ? "Uploading..." : "Upload Images"}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Drag & drop images here or click to browse
        </p>
        <p className="text-xs text-gray-400 mt-2">
          Supports JPG, PNG, WEBP • Max 5MB per image • Max 10 images
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Image Grid */}
      {localImages.length > 0 && (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {localImages.map((url, index) => (
            <div
              key={index}
              className="relative group bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <img
                src={url}
                alt={`Uploaded ${index + 1}`}
                className="w-full h-32 object-cover"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 opacity-0 group-hover:opacity-100 transition">
                &times;
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
