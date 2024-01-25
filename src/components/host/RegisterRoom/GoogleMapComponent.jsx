"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  LoadScript,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import axios from "axios";
import LocationParsingInput from "@/components/host/Hosting/LocationParsingInput";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

const libraries = ["places"];

const containerStyle = {
  width: "700px",
  height: "700px",
};

function GoogleMapComponent({ initialData, onLocationSelect, center }) {
  const [location, setLocation] = useState(center);
  const searchBoxRef = useRef(null);
  const [searchBoxValue, setSearchBoxValue] = useState("");
  const [address, setAddress] = useState(
    initialData || {
      country: "",
      state: "",
      city: "",
      street: "",
      zipcode: "",
      details: "",
    }
  );

  useEffect(() => {
    onLocationSelect(address, location);
  }, [address, location]);

  const getAddressFromLatLng = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json`,
        {
          params: {
            latlng: `${lat},${lng}`,
            key: GOOGLE_MAPS_API_KEY,
          },
        }
      );

      if (response.data.status === "OK") {
        processAddressComponents(
          response.data.results[0].address_components,
          response.data.results[0].formatted_address
        );
        return response.data.results[0].formatted_address;
      }
    } catch (error) {
      console.error("Error fetching address:", error);
    }
    return "";
  };

  const onSearchBoxLoad = useCallback((ref) => {
    searchBoxRef.current = ref;
  }, []);

  const onPlacesChanged = () => {
    const places = searchBoxRef.current.getPlaces();
    if (places && places.length > 0) {
      const place = places[0];

      if (place.geometry) {
        const newLocation = {
          latitude: place.geometry.location.lat(),
          lat: place.geometry.location.lat(),
          longitude: place.geometry.location.lng(),
          lng: place.geometry.location.lng(),
        };
        setLocation(newLocation); // Update location for Marker
        setAddress({ ...address, details: place.formatted_address }); // Optional: Update address details with new place

        // Extract address components from the selected place and update address state
        const addressComponents = place.address_components;
        const formattedAddress = place.formatted_address;
        processAddressComponents(addressComponents, formattedAddress);
        setSearchBoxValue(formattedAddress);
      }
    }
  };

  const processAddressComponents = (components, formattedAddress) => {
    const parts = formattedAddress.split(" ");

    const addressState = {
      country: "",
      state: "",
      city: "",
      street: "",
      zipcode: "",
    };

    if (parts.length > 0) {
      addressState.country = parts[0]; // 첫 번째 요소는 나라
    }
    if (parts.length > 1) {
      // 두 번째 요소가 '도'로 끝나면 주(도)에 할당
      if (parts[1].endsWith("도")) {
        addressState.state = parts[1];
      } else {
        addressState.city = parts[1];
      }
    }
    if (parts.length > 2) {
      // 두 번째 요소가 '도'로 끝나면 세 번째 요소는 시에 할당
      if (addressState.state) {
        addressState.city = parts[2];
        addressState.street = parts.slice(3).join(" ");
      } else {
        addressState.street = parts.slice(2).join(" ");
      }
    }
    components.forEach((component) => {
      if (component.types.includes("postal_code")) {
        addressState.zipcode = component.long_name;
      }
    });

    setAddress(addressState);
  };

  const handleMapClick = async (event) => {
    const newLocation = {
      latitude: event.latLng.lat(),
      lat: event.latLng.lat(),
      longitude: event.latLng.lng(),
      lng: event.latLng.lng(),
    };
    await setLocation(newLocation);
    const address = await getAddressFromLatLng(
      newLocation.latitude,
      newLocation.longitude
    );
    setSearchBoxValue(address); // Update the search box value
  };

  const handleDetailsChange = (e) => {
    // details 필드만 업데이트
    setAddress((prev) => ({ ...prev, details: e.target.value }));
  };

  return (
    <>
      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={libraries}>
        <div className="flex flex-col w-2/5 pr-10 flex-center">
          <h4 className="text-4xl font-bold">숙소의 위치는 어디인가요?</h4>
          <StandaloneSearchBox
            onLoad={onSearchBoxLoad}
            onPlacesChanged={onPlacesChanged}
          >
            <input
              className="w-full h-12 px-4 text-xl p-10 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
              type="text"
              placeholder="Search places..."
              value={searchBoxValue}
              onChange={(e) => setSearchBoxValue(e.target.value)}
            />
          </StandaloneSearchBox>
          <div>
            <LocationParsingInput
              value={address.country}
              placeholder="Country"
            />
            <LocationParsingInput value={address.state} placeholder="State" />
            <LocationParsingInput value={address.city} placeholder="City" />
            <LocationParsingInput value={address.street} placeholder="Street" />
            <LocationParsingInput
              value={address.zipcode}
              placeholder="Zipcode"
            />
            <LocationParsingInput
              isReadOnly={false}
              onChange={(e) => handleDetailsChange(e)}
              value={address.details}
              placeholder="Detail"
            />
          </div>
          {/* Display address details from state */}
        </div>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={location}
          zoom={10}
          onClick={handleMapClick}
        >
          <Marker position={location} />
        </GoogleMap>
      </LoadScript>
    </>
  );
}

export default GoogleMapComponent;
