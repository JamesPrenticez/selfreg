import React, { type ReactElement, type ReactNode } from "react";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps): ReactElement => {
  return (
    <div className="relative">
      <Navbar />
      <main className="h-screen-4rem md:h-screen-5rem overflow-y-auto flex flex-col bg-muted relative">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
