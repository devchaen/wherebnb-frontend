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
  // if (process.env.NODE_ENV === "development") {
  //   if (typeof window === "undefined") {
  //     (async () => {
  //       const { server } = await import("@/mocks/server");
  //       server.listen();
  //     })();
  //   } else {
  //     (async () => {
  //       const { worker } = await import("@/mocks/browser");
  //       worker.start();
  //     })();
  //   }
  // }

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
