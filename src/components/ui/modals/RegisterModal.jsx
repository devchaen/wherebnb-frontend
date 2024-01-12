"use client";

import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import useRegisterModal from "@/hooks/useRegisterModal";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Button from "../Button";
import * as actions from "@/actions";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

function showMessage(messasge) {
  if (messasge === "no_id") {
    return "아이디를 입력하세요.";
  }
  if (messasge === "no_name") {
    return "닉네임을 입력하세요.";
  }
  if (messasge === "no_password") {
    return "비밀번호를 입력하세요.";
  }
  if (messasge === "user_exists") {
    return "이미 사용 중인 아이디입니다.";
  }
  return "에러가 발생하였습니다.";
}

const RegisterModal = () => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const action = handleSubmit(async (data) => {
    setIsLoading(true);

    const response = await actions.createUser(data);
    console.log("response!", response);

    if (response.status === 200) {
      toast.success("성공적으로 회원가입이 되었습니다.");
      router.refresh();
      registerModal.onClose();
    } else {
      setMessage(showMessage(response.data));
    }

    setIsLoading(false);
  });

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="웨어비앤비에 오신 것을 환영합니다."
        subtitle="계정을 생성해보세요!"
      />
      <Input
        id="email"
        label="이메일"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="이름"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        type="password"
        label="비밀번호"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      {message && <p className="text-sm text-error">{message}</p>}
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="구글로 로그인하기"
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      <Button
        outline
        label="깃허브로 로그인하기"
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className=" justify-center flex flex-row items-center gap-2">
          <div>이미 계정이 있으신가요?</div>
          <div
            onClick={registerModal.onClose}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            로그인 하기
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="회원 가입"
      actionLabel="계속"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(action)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
