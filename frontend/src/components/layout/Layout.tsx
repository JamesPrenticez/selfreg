import React, { type ReactElement, type ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps): ReactElement => {
  return (
    <>
      <Navbar />
      <main className="h-screen-4rem md:h-screen-5rem overflow-y-auto flex flex-col bg-muted">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
