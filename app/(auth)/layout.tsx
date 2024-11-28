import { FC, ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-full flex items-center justify-center p-8 md:p-4 min-h-screen">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
};

export default Layout;
