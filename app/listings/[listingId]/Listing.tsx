import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import ListingReservation from "@/app/components/listings/ListingReservation";
import { SafeUser } from "@/app/types";
import { Listing, Reservation, User } from "@prisma/client";
import React from "react";

interface ListingProps {
  reservations?: (Reservation & {
    listing: Listing;
  })[];
  listing: Listing & { user: User };
  currentUser?: SafeUser | null;
}

const Listing: React.FC<ListingProps> = ({
  listing,
  currentUser,
  reservations = [],
}) => {
  return (
    <Container>
      <div className="max-w-screen-lg max-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              user={listing.user}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
              category={listing.category}
            />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                reservations={reservations}
                initialPrice={listing.price}
                currentUser={currentUser}
                listingId={listing.id}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Listing;
