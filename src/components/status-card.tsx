import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

interface StatusCardProps {
  title: string;
  value: any;
}

export default function StatusCard(props: StatusCardProps) {
  return (
    <Card className="status-card  rounded-none lg:rounded-lg w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-md ">{props.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{props.value}</div>
      </CardContent>
    </Card>
  );
}
