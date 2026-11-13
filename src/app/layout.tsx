import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Dra. Alejandra Villada | Diseño de Sonrisa de Alta Estética en Pereira",
  description: "Especialista en Diseño de Sonrisa con Lentes Cerámicos y Resina de Alta Estética en Pereira, Colombia. Resultados naturales, armonía facial y planificación digital 3D con la Dra. Alejandra Villada.",
  robots: { index: false, follow: false }, // Mantener hasta validar información clínica, permisos de imágenes y privacidad.
  openGraph: {
    title: "Dra. Alejandra Villada | Diseño de Sonrisa",
    description: "Diseño de Sonrisa de Alta Estética en Pereira, Colombia. +10 años de experiencia.",
    images: ["/images/real/portada-facebook-marca.webp"],
  },
};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="es"><body>{children}</body></html>}
