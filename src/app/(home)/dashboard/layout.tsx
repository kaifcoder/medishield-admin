import MySidebar from "@/components/component/MySidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex items-start justify-between">
      <MySidebar />
      <main className="w-full h-full">{children}</main>
    </div>
  );
}
