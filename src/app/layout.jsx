import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import LoginModal from "../components/ui/modals/LoginModal";
import RegisterModal from "../components/ui/modals/RegisterModal";
import ToastProvider from "@/providers/ToastProvider";
import { MswProvider } from "../providers/MswProvider";
import AuthSession from "@/providers/AuthSessionProvider";
import getCurrentUser from "./actions/getCurrentUser";

export const metadata = {
  title: "WhereBnb",
  description: "WhereBnb-web-application",
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({ children }) {
  // 이 getCurrentUser 로직은 서버 세션 정보를 불러와서 그 값으로 직접 DB에 접근해 정보를 조회하는 로직이라,
  // 지금으로써 저희에게는 필요하지 않은 로직인 것 같아요. action/getCurrentUser.js 는 삭제해도 되지 않을까 싶습니다!
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <MswProvider />
        <AuthSession>
          <ToastProvider />
          <RegisterModal />
          <LoginModal />
          <Navbar />
          <div className="md:pt-[200px] pt-[95px]">{children}</div>
        </AuthSession>
      </body>
    </html>
  );
}
