import React from "react";
import Navbar from "../Navbar";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <div
        style={{
          minHeight: "calc(100vh - 46px)",
          width: "100%",
          backgroundColor: "black",
        }}
      >
        {children}
      </div>
    </>
  );
};
export default Layout;
