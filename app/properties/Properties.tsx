"use client";

import { Listing } from "@prisma/client";
import React, { useCallback, useState } from "react";
import { SafeUser } from "../types";
import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

interface PropertiesProps {
  listings: Listing[];
  currentUser?: SafeUser | null;
}

const Properties: React.FC<PropertiesProps> = ({ listings, currentUser }) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Listing deleted");
          router.refresh();
        })
        .catch((e) => {
          toast.error(e?.response?.data?.error);
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading title="Properties" subTitle="List of your properties" />
      <div
        className="
          mt-10 grid grid-cols-1 sm:grid-cols-2 
          md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 
          2xl:grid-cols-6 gap-8
        "
      >
        {listings.map((l) => (
          <ListingCard
            key={l.id}
            data={l}
            actionId={l.id}
            onAction={onCancel}
            disabled={deletingId === l.id}
            actionLabel="Delete property"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default Properties;
