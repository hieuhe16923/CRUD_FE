import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
const Header = () => {
  return (
    <header className="bg-white shadow-sm py-4 px-6 flex w-full justify-end">
      {/* Right side icons */}
      <div className="flex items-center space-x-5">
        {/* Notifications */}
        <button className="p-1 rounded-full flex items-center gap-2 text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer ">
          <NotificationsOutlinedIcon className="h-6 w-6" />
          <p>Notifications</p>
        </button>

        {/* Help */}
        <button className="p-1 rounded-full flex items-center gap-2 text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer ">
          <HelpOutlineOutlinedIcon className="h-6 w-6" />
          <p>Help</p>
        </button>

        {/* User avatar (placeholder) */}
        <div className="ml-2 relative">
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600">TV</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
