import './global.scss';
import NextAuthProvider from "./Providers";

export const metadata = {
  title: "Swite - Apprenez sans effort",
  description: "Swite est une application qui vous permet d'apprendre sans effort.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
