"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import ListingCardSkeleton from "../listingCard/ListingCardSkeleton";
import ListingCard from "../listingCard/ListingCard";
import { getRoomsList } from "@/actions";
import { useSearchParams } from "next/navigation";
import qs from "query-string";
import ErrorState from "../ErrorState";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import LoadingSpinner from "../LoadingSpinner";

const Listings = ({ currentUser, queryKey }) => {
  const searchParams = qs.parse(useSearchParams().toString());
  const { ref, inView } = useInView();

  const {
    data: list,
    status,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    is,
  } = useInfiniteQuery({
    queryKey: [`${queryKey}`],
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

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [ref, inView, fetchNextPage, hasNextPage]);

  return (
    <>
      {isLoading && <ListingCardSkeleton number={20} />}
      {isError && <ErrorState showReset={true} />}
      {status === "success" &&
        // list.pages?.map((page) =>
        // page.content.map((room) =>
        list?.map((room) => (
          <ListingCard
            key={room.propertyId}
            propertyId={room.propertyId}
            room={room}
            currentUser={currentUser}
          />
        ))}

      <div
        className={`w-[100%] h-[44px] flex flex-col items-center pb-3 mt-3`}
        ref={ref}
      >
        {isFetchingNextPage && <LoadingSpinner />}
      </div>
    </>
  );
};

export default Listings;
