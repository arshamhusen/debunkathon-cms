import { appConfig } from "@/configs/app.config";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { UserNav } from "./user-nav";
import { Search } from "./search";
import Icon from "./Icon";
import { useAppSelector } from "@/stores/hooks";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const { loading } = useAppSelector((state) => state.app);

  return (
    <nav
      className={cn(
        "flex sticky bg-background z-50 top-0 justify-between w-full h-16 border-b items-center lg:px-4",
        className
      )}
      {...props}
    >
      {appConfig.mainNavLinks.map((item) => (
        <Link
          to={item.href}
          className="text-sm font-medium transition-colors hover:text-primary"
        >
          {item.label}
        </Link>
      ))}

      <img
        src="/pi_icon.png"
        alt="Logo"
        className="block lg:hidden py-2 w-20"
      />
      <div className="hidden lg:block">
        <Search />
      </div>
      <div className="flex items-center">
        <div className="nav-icons border-r px-5">
          <Icon name="bell" className="text-foreground" />
        </div>

        <UserNav />
      </div>
    </nav>
  );
}
