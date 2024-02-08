"use client";
import { Button } from "@/components/ui/button";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import CategoryIcon from "@mui/icons-material/Category";
import GradingIcon from "@mui/icons-material/Grading";
import SettingsIcon from "@mui/icons-material/Settings";
import { usePathname, useRouter } from "next/navigation";
import ArtTrackIcon from "@mui/icons-material/ArtTrack";
import GroupIcon from "@mui/icons-material/Group";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import { LogOut } from "lucide-react";

const routes = [
  {
    label: "Dashboard",
    icon: <DashboardIcon className="h-4 w-4 mr-2" />,
    href: `/dashboard`,
  },
  {
    label: "Orders",
    icon: <GradingIcon className="h-4 w-4 mr-2" />,
    href: `/dashboard/orders`,
  },
  {
    label: "Products",
    icon: <ProductionQuantityLimitsIcon className="h-4 w-4 mr-2" />,
    href: `/dashboard/products`,
  },
  {
    label: "Categories",
    icon: <CategoryIcon className="h-4 w-4 mr-2" />,
    href: `/dashboard/category`,
  },
  {
    label: "Brands",
    icon: <CategoryIcon className="h-4 w-4 mr-2" />,
    href: `/dashboard/brands`,
  },

  {
    label: "Manage Users",
    icon: <GroupIcon className="h-4 w-4 mr-2" />,
    href: `/dashboard/users`,
  },
  {
    label: "Logout",
    icon: <LogOut className="h-4 w-4 mr-2" />,
    href: `/`,
  },
];

const NavItem = () => {
  const router = useRouter();
  const pathname = usePathname();

  const onClickHandler = (href: string) => {
    router.push(href);
  };

  return (
    <div className="flex flex-col flex-start">
      {routes.map((route) => (
        <Button
          onClick={() => onClickHandler(route.href)}
          key={route.href}
          size="sm"
          variant="ghost"
          className={`w-full text-black font-normal justify-start ${
            (pathname === route.href ||
              pathname.startsWith(`${route.href}/new`)) &&
            "bg-slate-600 text-white font-semibold"
          }`}
        >
          {route.icon}
          {route.label}
        </Button>
      ))}
    </div>
  );
};

export default NavItem;
