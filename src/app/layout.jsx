import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import LoginModal from "@/components/ui/modals/LoginModal";
import RegisterModal from "@/components/ui/modals/RegisterModal";
import ToastProvider from "@/providers/ToastProvider";
import AuthProvider from "@/providers/AuthProvider";

export const metadata = {
  title: "WhereBnb",
  description: "WhereBnb-web-application",
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <AuthProvider>
          <ToastProvider />
          <RegisterModal />
          <LoginModal />
          <Navbar />
          <div className="md:pt-[200px] pt-[95px]">{children}</div>
        </AuthProvider>
      </body>
    </html>
  );
}
