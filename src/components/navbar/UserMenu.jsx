"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../ui/Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import { useSession, signOut } from "next-auth/react";

const UserMenu = () => {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  let menuContent;
  if (status === "loading") {
    menuContent = null;
  } else if (session?.user) {
    menuContent = (
      <>
        <MenuItem onClick={() => {}} label="메시지" />
        <MenuItem onClick={() => {}} label="여행" />
        <MenuItem onClick={() => {}} label="위시리스트" />
        <MenuItem onClick={() => {}} label="숙소 관리" />
        <hr />
        <MenuItem onClick={() => signOut()} label="로그아웃" />
      </>
    );
  } else {
    menuContent = (
      <>
        <MenuItem
          onClick={() => {
            loginModal.onOpen();
            toggleOpen();
          }}
          label="로그인"
        />
        <MenuItem
          onClick={() => {
            registerModal.onOpen();
            toggleOpen();
          }}
          label="회원 가입"
        />
      </>
    );
  }
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => {}}
          className="
                        hidden
                        md:block
                        text-sm
                        font-semibold
                        py-3
                        px-4
                        rounded-full
                        hover:bg-neutral-100
                        transition
                        cursor-pointer
                    "
        >
          당신의 공간을 웨어비앤비 하세요
        </div>
        <div
          onClick={toggleOpen}
          className="
                p-4
                md:py-[7px]
                md:px-[12px]
                border-[1px]
                border-neutral-300
                flex
                flex-row
                items-center
                gap-3
                rounded-full
                cursor-pointer
                hover:shadow-md
                transition
            "
        >
          <AiOutlineMenu size={18} />
          <div className="hidden md:block">
            <Avatar src={session?.user?.image} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="
            absolute
            rounded-xl
            shadow-md
            w-[40vw]
            md:w-3/4
            bg-white
            overflow-hidden
            right-0
            top-14
            text-sm
        "
        >
          <div className="flex flex-col cursor-pointer">{menuContent}</div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
