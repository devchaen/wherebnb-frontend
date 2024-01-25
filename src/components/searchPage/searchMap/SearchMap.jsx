"use client";

import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  OverlayViewF,
  InfoWindowF,
} from "@react-google-maps/api";
import LoadingSpinner from "../LoadingSpinner";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import MarkerIcon from "./MarkerIcon";
import { useSearchParams } from "next/navigation";
import qs from "query-string";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const SearchMap = () => {
  const searchParams = qs.parse(useSearchParams().toString());
  const [selectedMarker, setSelectedMarker] = useState("");

  // Query Data 불러오기
  const { data: list, isLoading } = useInfiniteQuery({
    queryKey: [`/s`],
    queryFn: ({ pageParam }) => getRoomsList(searchParams, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.last) {
        return allPages.length;
      } else {
        return undefined;
      }
    },
  });

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  });

  const mapOptions = useMemo(
    () => ({
      clickableIcons: true,
      scrollwheel: false,
      streetViewControl: false,
      fullscreenControl: false,
      mapTypeControl: false,
    }),
    []
  );

  // mapCenter : 임의 지정 (제주시 부근)
  const mapCenter = useMemo(() => ({ lat: 33.487, lng: 126.531 }), []);

  const toggleSelectedMarker = useCallback((propertyId) => {
    setSelectedMarker(propertyId);
  }, []);

  if (!isLoaded || isLoading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <LoadingSpinner />
        <div className="text-sm font-normal text-accent mt-3">
          지도를 불러오고 있습니다...
        </div>
      </div>
    );
  }

  if (loadError) {
    return <div>LoadError! {loadError.message}</div>;
  }

  return (
    <div className="w-full h-full bg-neutral-200">
      <GoogleMap
        options={mapOptions}
        zoom={11}
        center={mapCenter}
        mapContainerStyle={containerStyle}
      >
        {/* {list?.pages?.map((page) => */}
        {list.map((room) => (
          <OverlayViewF
            position={{
              lat: room.address.latitude,
              lng: room.address.longtitude,
            }}
            mapPaneName="overlayMouseTarget"
          >
            <MarkerIcon
              onClick={toggleSelectedMarker}
              room={room}
              selected={selectedMarker === room.propertyId}
            />
          </OverlayViewF>
        ))}
      </GoogleMap>
    </div>
  );
};

export default SearchMap;
