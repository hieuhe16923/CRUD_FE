import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import logo from "../assets/logo.png";

type NavItem = {
  name: string;
  path: string;
  icon?: React.ElementType;
};

const navItems: NavItem[] = [
  { name: "Dashboard", path: "#", icon: DashboardCustomizeOutlinedIcon },
  { name: "Pet Lookup", path: "/lookup-pet-id", icon: PetsOutlinedIcon },
  { name: "Appointments", path: "#", icon: FavoriteBorderOutlinedIcon },
  { name: "Settings", path: "#", icon: SettingsOutlinedIcon },
];

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState<string>("Pet Lookup");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden cursor-pointer fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md"
      >
        {isMobileSidebarOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      {/* Overlay for mobile */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:static z-50 w-64 bg-white shadow-lg flex flex-col h-screen transition-all duration-200 ease-linear ${
          isMobileSidebarOpen ? "left-0" : "-left-64 md:left-0"
        }`}
      >
        {/* Logo/Brand area */}
        <div className="p-4 flex justify-between items-center">
          <figure className="size-10">
            <img src={logo} className="w-full h-full" alt="Logo" />
          </figure>
          <button
            onClick={toggleSidebar}
            className="md:hidden p-1 cursor-pointer rounded-full hover:bg-gray-100"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Menu items */}
        <nav className="flex-1 py-6 overflow-y-auto">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors mx-2 ${
                    activeMenu === item.name
                      ? "bg-[#f3f4f6] text-[#565D6DFF] font-medium"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                  onClick={() => {
                    setActiveMenu(item.name);
                    setIsMobileSidebarOpen(false);
                  }}
                >
                  <span className="mr-3">{item.icon && <item.icon />}</span>
                  <span className="whitespace-nowrap">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User profile and footer */}
        <div className="p-4 border-t border-gray-200 mt-auto">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 font-medium">TV</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Mr.Vuong</h3>
              <p className="text-sm text-gray-500">VanVuong</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
