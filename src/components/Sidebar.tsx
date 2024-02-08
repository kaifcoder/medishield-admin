import Link from "next/link";
import NavItem from "./nav-item";
import { Package2Icon } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="md:block relative md:fixed h-screen w-64 p-2 bg-gray-100  max-md:w-full font-medium text-xs py-4 mb-1">
      <div className="flex h-[60px] items-center px-6 mb-4">
        <Link className="flex items-center  gap-2 font-semibold" href="#">
          <Package2Icon className="h-6 w-6" />
          <span className="">MediShield Admin</span>
        </Link>
      </div>
      <NavItem />
    </div>
  );
};

export default Sidebar;
