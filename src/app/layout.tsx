import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { DarkProvider } from "@/context/DarkContext";
import { SidebarProvider } from "@/context/SidebarContext";
import { MercadoPagoProvider } from "@/context/MercadoPagosContext";
import { SocketProvider } from "@/context/SocketContext";


const inter = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UltraNet",
  description: "Plataforma de Administración",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <DarkProvider>
       <SidebarProvider>
        <SocketProvider>
         <MercadoPagoProvider>
          <html lang="en">
            <body className={inter.className}>
                {children}
            </body>
          </html>
         </MercadoPagoProvider>
        </SocketProvider>
      </SidebarProvider>
     </DarkProvider>
    </AuthProvider>
  );
}
