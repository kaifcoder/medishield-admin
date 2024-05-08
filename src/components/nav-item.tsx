"use client";
import { Button } from "@/components/ui/button";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import CategoryIcon from "@mui/icons-material/Category";
import GradingIcon from "@mui/icons-material/Grading";
import SettingsIcon from "@mui/icons-material/Settings";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
const permissionsCodes = {
  MANAGE_ACCOUNTS: "manage_accounts",
  MANAGE_PRODUCTS: "manage_products",
  MANAGE_ORDERS: "manage_orders",
  MANAGE_BRANDS: "manage_brands",
  MANAGE_ROLES: "manage_roles",
};

const routes = [
  {
    label: "Dashboard",
    icon: <DashboardIcon className="h-4 w-4 mr-2" />,
    href: `/dashboard`,
    permission: ["manage_orders"],
  },
  {
    label: "Orders",
    icon: <GradingIcon className="h-4 w-4 mr-2" />,
    href: `/dashboard/orders`,
    permission: ["manage_orders"],
  },
  {
    label: "Products",
    icon: <ProductionQuantityLimitsIcon className="h-4 w-4 mr-2" />,
    href: `/dashboard/products`,
    permission: ["manage_products", "manage_brands"],
  },

  {
    label: "Brands",
    icon: <CategoryIcon className="h-4 w-4 mr-2" />,
    href: `/dashboard/brands`,
    permission: ["manage_brands"],
  },
  {
    label: "Banners",
    icon: <CategoryIcon className="h-4 w-4 mr-2" />,
    href: `/dashboard/banners`,
    permission: ["manage_products", "manage_brands"],
  },
  {
    label: "Roles and Permissions",
    icon: <CategoryIcon className="h-4 w-4 mr-2" />,
    href: `/dashboard/roles`,
    permission: ["manage_roles"],
  },
  {
    label: "Settings",
    icon: <SettingsIcon className="h-4 w-4 mr-2" />,
    href: `/dashboard/settings`,
    permission: ["manage_roles", "manage_accounts"],
  },

  {
    label: "Logout",
    icon: <LogOut className="h-4 w-4 mr-2" />,
    href: `/`,
    permission: [
      "manage_roles",
      "manage_accounts",
      "manage_products",
      "manage_brands",
      "manage_orders",
    ],
  },
];

const NavItem = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(routes);

  const userPermissions = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/permissions");
      const data = await response.json();

      setPermissions(data.permission);
      const filteredRoutes = routes.filter((route) =>
        data.permission.some((permission: any) =>
          route.permission.includes(permission)
        )
      );
      setFilter(filteredRoutes);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };
  // fetch current user permissions
  useEffect(() => {
    userPermissions();
  }, []);

  const onClickHandler = (href: string) => {
    if (href === "/") {
      signOut({
        callbackUrl: "/",
      });
    } else {
      router.push(href);
    }
  };

  return (
    <div className="flex flex-col flex-start">
      {filter.map((route) => (
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
