import './global.scss';
import NextAuthProvider from "./Providers";

export const metadata = {
  title: "Swite - Apprenez sans effort",
  description: "Swite est l'application qui vous permet d'apprendre sans effort, grâce au speech to text qui enregistre vos cours. L'app permet également d'apprendre en écoutant grâce au text to speech.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
