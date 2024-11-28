import DashboardCards from "@/components/dashboard/dashboard-cards";
import { FC } from "react";

const Dashboard: FC = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex md:flex-row gap-4 md:items-center justify-between px-0">
        <div className="flex flex-col space-y-1.5">
          <h5 className="text-2xl font-semibold">Dashboard</h5>
          <p className="text-sm text-muted-foreground">
            View all of your data in one place
          </p>
        </div>
      </div>
      <DashboardCards />
    </div>
  );
};

export default Dashboard;
