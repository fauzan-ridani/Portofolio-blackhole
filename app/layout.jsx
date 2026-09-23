import "./globals.css";
import { profile } from "../lib/data";

export const metadata = {
  title: `${profile.name} — Portfolio`,
  description: profile.intro,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
