import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import React, { Suspense, lazy, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface TabRouteProps {
  title: string;
  tabs: string[];

  // The
  location?: string;
}

export default function TabRoute(props: TabRouteProps) {
  // @ts-ignore
  let [defaultTab, setDefaultTab] = React.useState<string>(props.tabs[0]);

  const TabNotFound = () => {
    return <div>Tab not found</div>;
  };

  const renderTab = (_tab: string) => {
    // Load the component dynamically in the sub directory of @/views/{props.title}/Tabs without using
    // require

    // remove space and pascal case the tab name

    const normalizedTab = _tab.replace(/\s/g, "");

    console.log(`../features/${props.title}/Tabs/${normalizedTab}.tsx`);

    const Component = lazy(() =>
      import(`../features/${props.title}/Tabs/${normalizedTab}.tsx`).catch(
        (e) => {
          console.log(e);
          return TabNotFound;
        }
      )
    );

    const navigate = useNavigate();
    useEffect(() => {
      console.log("TabRoute mounted");
      navigate(`/settings/${props.tabs[0]}`);
    }, []);

    return (
      <Suspense fallback={<div>Loading...</div>}>
        <TabsContent value={_tab}>{<Component />}</TabsContent>
      </Suspense>
    );
  };

  return (
    <div className="tab-route">
      <h1 className="text-2xl font-bold pb-4">{props.title}</h1>
      <Tabs defaultValue={defaultTab}>
        <TabsList className={cn(`flex justify-start space-x-4 border-b`)}>
          {props.tabs.map((tab) => {
            return (
              <TabsTrigger onClick={() => {}} value={tab}>
                {tab}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {props.tabs.map((tab) => {
          return renderTab(tab);
        })}
      </Tabs>
    </div>
  );
}
