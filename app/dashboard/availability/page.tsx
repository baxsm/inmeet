import { getAvailabilities } from "@/actions/availability";
import AvailabilityForm from "@/components/availability/availability-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FC } from "react";

const Availability: FC = async () => {
  const availabilities = await getAvailabilities();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Availability</CardTitle>
        <CardDescription>Manage your availability</CardDescription>
      </CardHeader>
      <CardContent>
        <AvailabilityForm initAvailabilities={availabilities} />
      </CardContent>
    </Card>
  );
};

export default Availability;
