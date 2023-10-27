import Icon from "./Icon";
import { Input } from "./ui/input";

export function Search() {
  return (
    <div className="flex space-x-2 items-center">
      <Icon name="search" className="h-5 w-5" />
      <Input
        type="search"
        placeholder="Search..."
        className="border-transparent focus:border-transparent focus:ring-0 focus:outline-none  border-none lg:w-[300px]"
      />
    </div>
  );
}
