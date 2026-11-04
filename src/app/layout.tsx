import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dra. Alejandra Villada | Tu sonrisa, una historia propia",
  description:
    "Odontología estética y ortodoncia en Pereira, Colombia. Conoce nuestra experiencia visual de demostración y descubre la orientación virtual gratuita con la doctora.",
  robots: { index: false, follow: false }, // Prototipo; quitar en el lanzamiento.
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
