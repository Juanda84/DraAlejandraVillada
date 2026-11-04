import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Dra. Alejandra Villada | Ortodoncia y diseño de sonrisa en Pereira",
  description: "Conoce alternativas de ortodoncia y diseño de sonrisa en Pereira, Colombia. Solicita tu orientación virtual inicial gratuita directamente con la Dra. Alejandra Villada.",
  robots: { index: false, follow: false }, // Mantener hasta validar información clínica, permisos de imágenes y privacidad.
};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="es"><body>{children}</body></html>}
