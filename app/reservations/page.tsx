import React from "react";

import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import Reservations from "./Reservations";

const page = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const reservations = await getReservations({ authorId: currentUser.id });

  if (!reservations.length) {
    return (
      <EmptyState
        title="No reservations found"
        subtitle="Look like you have no reservations on your properties"
      />
    );
  }

  return <Reservations reservations={reservations} currentUser={currentUser} />;
};

export default page;
