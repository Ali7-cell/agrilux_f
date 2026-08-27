import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import MouseTrail from "@/components/MouseTrail";

export const metadata = {
  title: "Agrilux — AI-Powered Smart Farming Platform",
  description: "Data-driven crop recommendations, fertilizer advice, and yield predictions for modern sustainable agriculture.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@100;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <LenisProvider>
          <MouseTrail />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
