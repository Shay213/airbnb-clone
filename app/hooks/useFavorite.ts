import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { SafeUser } from "../types";
import useLoginModal from "./useLoginModal";
import { useCallback, useMemo } from "react";

interface IUseFavorite {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(listingId);
  }, [currentUser?.favoriteIds, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        const request = hasFavorited
          ? () => axios.delete(`/api/favorites/${listingId}`)
          : () => axios.post(`/api/favorites/${listingId}`);

        await request();
        router.refresh();
        toast.success("Success");
      } catch (error) {
        toast.error("Something went wrong!");
      }
    },
    [currentUser, hasFavorited, listingId, loginModal, router]
  );
  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorite;
