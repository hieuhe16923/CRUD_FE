import React from "react";
import SiderBar from "./SiderBar";
import Header from "./Header";

interface MainLayoutProps {
  children: React.ReactNode;
}
const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div>
      <div className="flex">
        <SiderBar />
        <div className="w-full">
          <Header />
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
