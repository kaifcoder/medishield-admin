import MySidebar from "@/components/component/MySidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex items-start justify-between h-full">
      <MySidebar />
      <main className="w-full ml-[280px] overflow-y-auto">{children}</main>
    </div>
  );
}
