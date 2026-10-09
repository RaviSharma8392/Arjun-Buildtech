const normalizeList = (value) => {
  if (Array.isArray(value)) return value;
  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
};

const normalizeImages = (value) => {
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

export const normalizeLocation = (location) => {
  const fallback = {
    city: "",
    locality: "",
    projectName: "",
    state: "",
    pincode: null,
    address: "",
    latitude: null,
    longitude: null,
    mapUrl: "",
  };

  if (typeof location === "string") {
    return {
      ...fallback,
      locality: location,
      address: location,
    };
  }

  if (location && typeof location === "object") {
    return {
      ...fallback,
      ...location,
      city: location.city || fallback.city,
      locality: location.locality || location.address || fallback.locality,
      state: location.state || fallback.state,
      address: location.address || location.locality || fallback.address,
    };
  }

  return fallback;
};

export const normalizePropertyData = (raw = {}) => {
  const locationInfo = normalizeLocation(
    raw.location && typeof raw.location === "object"
      ? raw.location
      : raw.locationObj || raw.locationInfo || raw.address || raw.location,
  );
  const typeValue = raw.type || raw.propertyType || "";
  const titleValue = raw.title || raw.name || raw.propertyName || raw.shortTitle || "";
  const locationLabel =
    typeof raw.location === "string"
      ? raw.location
      : typeof raw.locationText === "string"
        ? raw.locationText
      : locationInfo.address ||
        [locationInfo.locality, locationInfo.city].filter(Boolean).join(", ") || "";
  const imageValue = raw.images ?? raw.imageUrls ?? raw.gallery ?? raw.image ?? "";
  const propertyDetails = raw.propertyDetails || {};
  const priceValue = raw.price ?? raw.salePrice ?? raw.askingPrice ?? raw.priceValue ?? "";
  const areaValue =
    raw.area ?? raw.plotArea ?? raw.builtUpArea ?? raw.landArea ?? raw.areaValue ?? "";

  const normalized = {
    ...raw,
    id: raw.id || raw.propertyId || "",
    propertyId: raw.propertyId || raw.id || "",
    title: titleValue,
    name: raw.name || raw.propertyName || titleValue,
    type: typeValue,
    propertyType: raw.propertyType || typeValue,
    propertyCategory: raw.propertyCategory || raw.category || "",
    transactionType: raw.transactionType || raw.transaction || "",
    status: raw.status || "",
    price: priceValue,
    area: areaValue,
    areaUnit: raw.areaUnit || raw.plotAreaUnit || raw.builtUpAreaUnit || "",
    builtUpArea: raw.builtUpArea ?? propertyDetails.builtUpArea ?? raw.area ?? raw.plotArea ?? "",
    builtUpAreaUnit: raw.builtUpAreaUnit || raw.areaUnit || "",
    plotArea: raw.plotArea ?? raw.landArea ?? raw.area ?? "",
    plotAreaUnit: raw.plotAreaUnit || raw.areaUnit || "",
    location: locationLabel,
    locationObj: locationInfo,
    locationInfo: locationInfo,
    city: locationInfo.city,
    locality: locationInfo.locality,
    state: locationInfo.state,
    pincode: locationInfo.pincode,
    description: raw.description || raw.summary || "",
    features: normalizeList(raw.features ?? raw.featuresText ?? propertyDetails.features),
    amenities: normalizeList(raw.amenities ?? raw.amenitiesText ?? propertyDetails.amenities),
    images: normalizeImages(imageValue, titleValue),
    bedrooms: raw.bedrooms ?? propertyDetails.bedrooms ?? "",
    bathrooms: raw.bathrooms ?? propertyDetails.bathrooms ?? "",
    balconies: raw.balconies ?? propertyDetails.balconies ?? "",
    parking: raw.parkingCovered ?? raw.parking ?? propertyDetails.parkingCovered ?? "",
    parkingOpen: raw.parkingOpen ?? propertyDetails.parkingOpen ?? "",
    facing: raw.facing ?? propertyDetails.facing ?? "",
    furnishing: raw.furnishing ?? propertyDetails.furnishing ?? "",
    floor: raw.floor ?? raw.floorNumber ?? propertyDetails.floorNumber ?? "",
    totalFloor: raw.totalFloor ?? raw.totalFloors ?? propertyDetails.totalFloors ?? "",
    propertyAge: raw.propertyAge ?? propertyDetails.propertyAge ?? "",
    constructionStatus:
      raw.constructionStatus ?? propertyDetails.constructionStatus ?? "",
    carpetArea: raw.carpetArea ?? "",
    priceNegotiable: raw.priceNegotiable ?? false,
    priceOnRequest: raw.priceOnRequest ?? false,
    ownershipType: raw.ownershipType ?? propertyDetails.ownershipType ?? "",
    landArea: raw.landArea ?? raw.plotArea ?? raw.area ?? "",
    bookingAmount: raw.bookingAmount || "",
    landmarks: raw.landmarks || "",
    flooring: raw.flooring ?? propertyDetails.flooring ?? "",
    lift: raw.lift ?? propertyDetails.liftAvailable ?? "",
    additionalRooms: raw.additionalRooms ?? propertyDetails.additionalRooms ?? "",
    societyName: raw.societyName ?? raw.projectName ?? locationInfo.projectName ?? "",
    possessionDate: raw.possessionDate ?? "",
    reraNumber: raw.reraNumber ?? "",
    waterSupply: raw.waterSupply ?? propertyDetails.waterSupply ?? "",
    powerBackup: raw.powerBackup ?? propertyDetails.powerBackup ?? "",
    gasConnection: raw.gasConnection ?? propertyDetails.gasConnection ?? "",
    gatedCommunity: raw.gatedCommunity ?? propertyDetails.gatedCommunity ?? "",
    approvalAuthority: raw.approvalAuthority ?? propertyDetails.approvalAuthority ?? "",
    cornerProperty: raw.cornerProperty ?? propertyDetails.cornerProperty ?? null,
    roadWidth: raw.roadWidth ?? propertyDetails.roadWidth ?? "",
    roadWidthUnit: raw.roadWidthUnit ?? propertyDetails.roadWidthUnit ?? "",
    plotDimensions: raw.plotDimensions ?? propertyDetails.plotDimensions ?? "",
    boundaryWall: raw.boundaryWall ?? propertyDetails.boundaryWall ?? "",
    maintenanceCharges: raw.maintenanceCharges ?? propertyDetails.maintenanceCharges ?? "",
    pricePerSqft: (() => {
      const p = Number(raw.price ?? raw.salePrice ?? raw.askingPrice ?? 0);
      const unit = String(
        raw.areaUnit || raw.builtUpAreaUnit || raw.plotAreaUnit || "",
      ).toLowerCase();
      if (!/[\s_-]*(sq[\s_-]*ft|square feet|sqft)/.test(unit)) return null;
      const a = parseFloat(raw.area ?? raw.builtUpArea ?? raw.landArea ?? 0);
      if (p && a && !isNaN(p) && !isNaN(a) && a > 0) return Math.floor(p / a);
      return null;
    })(),
    contact: raw.contact ?? null,
  };

  return normalized;
};

export const buildFirestorePropertyPayload = (data = {}) => {
  const normalized = normalizePropertyData(data);
  const existingLocation =
    data.locationObj || data.locationInfo ||
    (data.location && typeof data.location === "object" ? data.location : {});
  const locationInfo = normalizeLocation({
    ...existingLocation,
    city: data.city ?? existingLocation.city,
    locality: data.locality ?? existingLocation.locality,
    state: data.state ?? existingLocation.state,
    pincode: data.pincode ?? existingLocation.pincode,
    address:
      typeof data.location === "string"
        ? data.location
        : data.address ?? existingLocation.address,
    projectName: data.societyName ?? existingLocation.projectName,
  });
  const imageList = normalizeImages(
    data.images || data.imageUrls || data.gallery || normalized.images,
    normalized.name,
  );
  const imageObjects = imageList.map((url, index) => ({
    url,
    alt: normalized.name,
    caption: "",
    isPrimary: index === 0,
  }));

  const payload = {
    ...data,
    propertyId: data.propertyId || data.id || normalized.id || `ABT-${Date.now()}`,
    slug: data.slug || data.name || normalized.title || "property",
    title: normalized.title,
    name: normalized.name,
    propertyType: normalized.propertyType,
    propertyCategory: normalized.propertyCategory,
    transactionType: normalized.transactionType,
    status: normalized.status,
    price: normalized.price === "" ? null : Number(normalized.price) || 0,
    priceNegotiable: data.priceNegotiable ?? null,
    priceOnRequest: data.priceOnRequest ?? false,
    area: normalized.area,
    areaUnit: normalized.areaUnit,
    builtUpArea: normalized.builtUpArea,
    builtUpAreaUnit: normalized.builtUpAreaUnit,
    carpetArea: data.carpetArea ?? null,
    plotArea: normalized.plotArea,
    plotAreaUnit: normalized.plotAreaUnit,
    location: locationInfo,
    locationText: normalized.location,
    address: locationInfo.address || normalized.location,
    propertyDetails: {
      ...(data.propertyDetails || {}),
      bedrooms: normalized.bedrooms,
      bathrooms: normalized.bathrooms,
      balconies: normalized.balconies,
      facing: normalized.facing,
      propertyAge: data.propertyAge ?? data.propertyDetails?.propertyAge ?? null,
      constructionStatus:
        data.constructionStatus ||
        data.propertyDetails?.constructionStatus ||
        null,
      furnishing: normalized.furnishing,
      floorNumber: normalized.floor || null,
      totalFloors: normalized.totalFloor || null,
      parkingCovered: data.parking ?? data.propertyDetails?.parkingCovered ?? null,
      parkingOpen: data.parkingOpen ?? data.propertyDetails?.parkingOpen ?? null,
      cornerProperty: data.cornerProperty ?? data.propertyDetails?.cornerProperty ?? null,
      roadWidth: data.roadWidth ?? data.propertyDetails?.roadWidth ?? null,
      roadWidthUnit: data.roadWidthUnit || data.propertyDetails?.roadWidthUnit || null,
      ownershipType: normalized.ownershipType,
      approvalAuthority: data.approvalAuthority ?? data.propertyDetails?.approvalAuthority ?? null,
      gatedCommunity: data.gatedCommunity ?? data.propertyDetails?.gatedCommunity ?? null,
      liftAvailable: data.lift ?? normalized.lift ?? null,
      powerBackup: data.powerBackup ?? data.propertyDetails?.powerBackup ?? null,
      waterSupply: data.waterSupply ?? data.propertyDetails?.waterSupply ?? null,
      additionalRooms: data.additionalRooms ?? normalized.additionalRooms ?? null,
      flooring: data.flooring ?? normalized.flooring ?? null,
      gasConnection: data.gasConnection ?? normalized.gasConnection ?? null,
      plotDimensions: data.plotDimensions ?? normalized.plotDimensions ?? null,
      boundaryWall: data.boundaryWall ?? normalized.boundaryWall ?? null,
      maintenanceCharges: data.maintenanceCharges ?? normalized.maintenanceCharges ?? null,
    },
    description: normalized.description,
    features: normalized.features,
    amenities: normalized.amenities,
    images: imageObjects,
    imageUrls: imageList,
    contact: data.contact || normalized.contact,
    societyName: data.societyName ?? normalized.societyName ?? "",
    possessionDate: data.possessionDate ?? normalized.possessionDate ?? null,
    reraNumber: data.reraNumber ?? normalized.reraNumber ?? "",
    pricePerSqft: normalized.pricePerSqft ?? null,
    maintenanceCharges: data.maintenanceCharges ?? normalized.maintenanceCharges ?? null,
    waterSupply: data.waterSupply ?? normalized.waterSupply ?? null,
    powerBackup: data.powerBackup ?? normalized.powerBackup ?? null,
    gasConnection: data.gasConnection ?? normalized.gasConnection ?? null,
    gatedCommunity: data.gatedCommunity ?? normalized.gatedCommunity ?? null,
    approvalAuthority: data.approvalAuthority ?? normalized.approvalAuthority ?? null,
    cornerProperty: data.cornerProperty ?? normalized.cornerProperty ?? null,
    roadWidth: data.roadWidth ?? normalized.roadWidth ?? null,
    roadWidthUnit: data.roadWidthUnit ?? normalized.roadWidthUnit ?? null,
    propertyAge: data.propertyAge ?? normalized.propertyAge ?? null,
    constructionStatus: data.constructionStatus ?? normalized.constructionStatus ?? null,
    parkingOpen: data.parkingOpen ?? normalized.parkingOpen ?? null,
    featured: data.featured ?? false,
    verified: data.verified ?? false,
    ...(data.createdAt !== undefined ? { createdAt: data.createdAt } : {}),
    ...(data.updatedAt !== undefined ? { updatedAt: data.updatedAt } : {}),
    ...(data.publishedAt !== undefined ? { publishedAt: data.publishedAt } : {}),

    // Keep compatibility with older UI fields
    type: normalized.type,
    shortTitle: data.shortTitle || normalized.title,
    locationValue: normalized.location,
    areaValue: normalized.area,
    image: imageList[0] || "",
    featuresText: normalized.features.join(", "),
    amenitiesText: normalized.amenities.join(", "),
    flooring: normalized.flooring,
    lift: normalized.lift,
    additionalRooms: normalized.additionalRooms,
  };

  return payload;
};

export default {
  normalizePropertyData,
  buildFirestorePropertyPayload,
  normalizeLocation,
};
