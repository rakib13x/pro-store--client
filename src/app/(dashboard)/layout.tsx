
import { Figtree, Fredoka } from "next/font/google";
import { Toaster } from "sonner";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
});
const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
});

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${figtree.variable} ${fredoka.variable}`}>
        <Toaster></Toaster>
        {children}
      </body>
    </html>
  );
}
