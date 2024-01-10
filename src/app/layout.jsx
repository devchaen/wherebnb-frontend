import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/navbar/Navbar";
import LoginModal from "@/app/components/ui/modals/LoginModal";
import RegisterModal from "@/app/components/ui/modals/RegisterModal";
import ToastProvider from "@/app/providers/ToastProvider";
import { SessionProvider } from "next-auth/react";

export const metadata = {
  title: "WhereBnb",
  description: "WhereBnb-web-application",
};

const font = Nunito({
  subsets: ["latin"],
});

export default function RootLayout({ children, session }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <SessionProvider session={session}>
          <ToastProvider />
          <RegisterModal />
          <LoginModal />
          <Navbar />
          <div className="md:pt-[200px] pt-[95px]">{children}</div>
        </SessionProvider>
      </body>
    </html>
  );
}
