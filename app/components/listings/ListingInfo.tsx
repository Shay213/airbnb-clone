"use client";

import React, { useMemo } from "react";
import { CATEGORIES } from "@/app/components/navbar/Categories";
import { User } from "@prisma/client";
import useCountries from "@/app/hooks/useCountries";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../Map"), { ssr: false });

interface ListingInfoProps {
  user: User;
  description: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  locationValue: string;
  category: string | undefined;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  roomCount,
  guestCount,
  bathroomCount,
  locationValue,
  category,
}) => {
  const { getByValue } = useCountries();
  const coordinates = getByValue(locationValue)?.latlng;
  const categoryInfo = useMemo(() => {
    return CATEGORIES.find((c) => c.label === category);
  }, [category]);

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div
          className="
            text-xl font-semibold flex items-center gap-2
          "
        >
          <div>Hosted by {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div
          className="
          flex items-center gap-4 font-light text-neutral-500"
        >
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {categoryInfo && (
        <ListingCategory
          icon={categoryInfo.icon}
          label={categoryInfo.label}
          description={categoryInfo.description}
        />
      )}
      <hr />
      <div className="text-lg font-light text-neutral-500">{description}</div>
      <hr />
      <Map center={coordinates} />
    </div>
  );
};

export default ListingInfo;
