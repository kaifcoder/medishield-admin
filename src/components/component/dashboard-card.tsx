interface DashboardCardProps {
  title: string;
  heading: string;
  value: string;
}
export function DashboardCard({ title, heading, value }: DashboardCardProps) {
  return (
    <div className="rounded-xl border shadow-sm">
      <div className="overflow-hidden rounded-xl">
        <div className="border-t border-gray-200">
          <div className="p-4 grid gap-4">
            <div className="text-sm font-medium tracking-wide uppercase">
              {title}
            </div>
            <div className="text-base font-semibold leading-none">
              {heading}
            </div>
            <div className="text-3xl font-bold leading-snug">{value}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
