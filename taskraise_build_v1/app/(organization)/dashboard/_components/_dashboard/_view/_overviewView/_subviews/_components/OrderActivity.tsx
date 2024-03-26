import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tables } from "@/types/supabase";
import { formatNumberToId, formatToDollar } from "@/utils/functions/helper";
import { getInitials } from "@/utils/functions/helper";
import { ActivityWithProfile } from "../../../../../types";

const activity = [
  {
    customer: "Jake Adams",
    orderID: "#000-000-015",
    action: "Completed",
    total: 2990.37,
  },
  {
    customer: "Jake Adams",
    orderID: "#000-000-015",
    action: "Completed",
    total: 2990.37,
  },
];

export function OrderActivity({
  activities,
}: {
  activities: ActivityWithProfile[];
}) {
  return (
    <div className="space-y-8 h-full overflow-auto">
      {activities.length > 0 ? (
        activities.slice(0, 4).map((activity) => (
          <div className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/avatars/01.png" alt="Avatar" />
              <AvatarFallback>
                {getInitials(activity.profiles?.username as string)}
              </AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                Order {activity.action} ({activity.profiles?.username})
              </p>
              <p className="text-sm text-muted-foreground">
                #{formatNumberToId(activity.order_id)}
              </p>
            </div>
            <div className="ml-auto font-medium">
              {formatToDollar(activity.total)}
            </div>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-sm text-muted-foreground">No recent activities</p>
        </div>
      )}
    </div>
  );
}
