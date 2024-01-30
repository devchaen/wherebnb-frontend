import { useRouter } from "next/navigation";
import useLoginModal from "./useLoginModal";
import { useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import { addWishlist, removeWishlist } from "@/actions";

const useFavorite = ({ listingId, currentUser }) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const wishList = currentUser?.favoriteList;

    if (!currentUser) return false;

    if (!wishList) return false;

    return wishList.includes(Number(listingId));
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e) => {
      e.stopPropagation();
      console.log("함수실행?", currentUser);
      if (!currentUser) {
        return loginModal.onOpen();
      }

      let res;
      if (hasFavorited) {
        res = await removeWishlist(currentUser.id, listingId);

        if (res === 200) {
          router.refresh();
          toast.success("위시리스트에서 삭제되었습니다.");
        } else {
          toast.error("문제가 발생했습니다.");
        }
      } else {
        res = await addWishlist(currentUser.id, listingId);

        if (res === 200) {
          router.refresh();
          toast.success("위시리스트에 추가되었습니다.");
        } else {
          toast.error("문제가 발생했습니다.");
        }
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
