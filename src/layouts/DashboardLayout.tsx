import {
  Bell,
  Book,
  CircleUser,
  Home,
  Menu,
  Package,
  Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, NavLink, Navigate, Outlet } from "react-router-dom";
import useUserStore from "@/store";
import { toast } from "@/components/ui/use-toast";

const DashboardLayout = () => {
  const { token, updateToken } = useUserStore((state) => state);

  if (!token) {
    return <Navigate to={"/auth/login"} replace />;
  }

  const handleLogout = () => {
    toast({
      variant: "success",
      title: "Logged out successfully ",
    });
    updateToken("");
  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] overflow-hidden">
      <div className="hidden border-r bg-card md:block">
        <div className="flex flex-col h-full max-h-screen gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link to="/" className="flex items-center gap-2 font-semibold">
              <Book className="w-6 h-6" />
              <span className="">Elib Inc</span>
            </Link>
            <Button variant="outline" size="icon" className="w-8 h-8 ml-auto">
              <Bell className="w-4 h-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <NavLink
                to="/dashboard/home"
                className={({ isActive }) => {
                  return `mx-0.5 flex items-center gap-4 rounded-md px-3 py-2 text-muted-foreground hover:text-foreground ${
                    isActive && "bg-popover-foreground/5"
                  }`;
                }}
              >
                <Home className="w-5 h-5" />
                Dashboard
              </NavLink>
              <NavLink
                to="/dashboard/books"
                className={({ isActive }) => {
                  return `mx-0.5 flex items-center gap-4 rounded-md px-3 py-2 text-muted-foreground hover:text-foreground ${
                    isActive && "bg-popover-foreground/5"
                  }`;
                }}
              >
                <Package className="w-5 h-5" />
                Books
              </NavLink>
            </nav>
          </div>
          <div className="p-4 mt-auto">
            <Card x-chunk="dashboard-02-chunk-0">
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Button size="sm" className="w-full">
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="w-5 h-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  to="#"
                  className="flex items-center gap-2 pb-4 text-lg font-semibold border-b"
                >
                  <Book className="w-6 h-6" />
                  <span className="sr">Elib Inc</span>
                </Link>
                <NavLink
                  to="/dashboard/home"
                  className={({ isActive }) => {
                    return `mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${
                      isActive && "bg-popover-foreground/5"
                    }`;
                  }}
                >
                  <Home className="w-5 h-5" />
                  Dashboard
                </NavLink>
                <NavLink
                  to="/dashboard/books"
                  className={({ isActive }) => {
                    return `mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${
                      isActive && "bg-popover-foreground/5"
                    }`;
                  }}
                >
                  <Package className="w-5 h-5" />
                  Books
                </NavLink>
              </nav>
              <div className="mt-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Upgrade to Pro</CardTitle>
                    <CardDescription>
                      Unlock all features and get unlimited access to our
                      support team.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" className="w-full">
                      Upgrade
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </SheetContent>
          </Sheet>
          <div className="flex-1 w-full">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full pl-8 shadow-none appearance-none bg-background md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full">
                <CircleUser className="w-5 h-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="font-bold text-primary"
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-col flex-1 gap-4 p-4 lg:gap-6 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
