import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import React from "react";

interface SheetRouteProps {
  title: string;
  size: "sm" | "md" | "lg";
  description?: string;
  content: React.ReactNode;
  footer?: React.ReactNode;
}

export const SheetRoute = ({
  size,
  title,
  description,
  content,
  footer,
}: SheetRouteProps) => {
  const calculateWidth = () => {
    switch (size) {
      case "md":
        return "min-w-[600px]";
      case "lg":
        return "min-w-[800px]";
      default:
        return "w-auto";
    }
  };

  return (
    <div className="w-full h-screen relative">
      <Sheet
        defaultOpen={true}
        open={true}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            window.history.back();
          }
        }}
      >
        <SheetContent className={cn(calculateWidth())}>
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
            {description && <SheetDescription>{description}</SheetDescription>}
          </SheetHeader>
          <div className={cn("flex flex-col  gap-4 py-4 h-[96%]")}>
            {content && <div className="flex-1">{content}</div>}
          </div>
          {footer && (
            <SheetFooter>
              <SheetClose asChild>{footer}</SheetClose>
            </SheetFooter>
          )}
        </SheetContent>
      </Sheet>
    </div>
    //   );
    // }
  );
};

export default SheetRoute;
