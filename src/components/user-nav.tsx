import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { useNavigate } from "react-router-dom";

export function UserNav() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    // dispatch(logoutAsync()).then((x) => {
    //   navigate("/auth/login");
    // });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative rounded-lg">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/01.png" alt="@shadcn" />
            <AvatarFallback>N/A</AvatarFallback>
          </Avatar>
          {/* <p className=" px-3 leading-none text-start text-muted-foreground">
            <span className="block text-sm">{user?.name ?? user?.name}</span>
            <span className="block text-xs">{user?.email}</span>
          </p> */}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuItem>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
