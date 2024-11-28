import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

const Success: FC = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Card className="max-w-[400px] w-full mx-auto">
        <CardContent className="p-4 flex flex-col w-full items-center">
          <div className="bg-green-500/10 rounded-full p-4 flex items-center justify-center">
            <Check className="w-8 h-8 stroke-green-500" />
          </div>
          <h1 className="text-2xl font-semibold">This event is scheduled</h1>
          <p className="text-center text-sm text-muted-foreground mt-1">
            We emailed you a calendar invitation with all the details and the
            video call link
          </p>
        </CardContent>
        <CardFooter>
          <Link href="/" className={buttonVariants({ className: "w-full" })}>
            Close this page
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Success;
