import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { FunctionComponent } from "react";

interface ModalRouteProps {
  title: string;
  description: string;
  slot: FunctionComponent;
  footer?: React.ReactNode;
  classes?: string;
  modal?: boolean;
  onSubmit?: () => void;
  onCancel?: () => void;
}

export default function modalRoute(props: ModalRouteProps) {
  return (
    <Sheet open={true} modal={props.modal ?? false} defaultOpen={true}>
      <SheetContent className="!lg:w-[50vh]">
        <SheetHeader>
          <SheetTitle>{props.title}</SheetTitle>
          <SheetDescription>{props.description}</SheetDescription>
        </SheetHeader>
        {props.slot({})}
      </SheetContent>
    </Sheet>
  );
}
