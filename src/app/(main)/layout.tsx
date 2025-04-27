import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import React, { ReactNode } from "react";
import "../../assets/styles/globals.css";
import { Toaster } from "sonner";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div>
        <Navbar />
        <main className="">{children}</main>
        <Toaster></Toaster>
        <Footer />
      </div>
    </>
  );
};

export default layout;
