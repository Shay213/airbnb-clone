import { Listing } from "@prisma/client";
import React from "react";
import { SafeUser } from "../types";
import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";

interface FavoritesProps {
  listings: Listing[];
  currentUser?: SafeUser | null;
}

const Favorites: React.FC<FavoritesProps> = ({ listings, currentUser }) => {
  return (
    <Container>
      <Heading title="Favorites" subTitle="List of your favorite properties" />
      <div
        className="
          mt-10 grid grid-cols-1 sm:grid-cols-2 
          md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 
          2xl:grid-cols-6 gap-8
        "
      >
        {listings.map((l) => (
          <ListingCard key={l.id} currentUser={currentUser} data={l} />
        ))}
      </div>
    </Container>
  );
};

export default Favorites;
