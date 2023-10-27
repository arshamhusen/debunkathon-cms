import { SidebarNav } from "@/components/sidebar";
import { Outlet, useLocation, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import httpClient from "@/lib/http-client";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { useNavigate } from "react-router-dom";
import { appConfig } from "@/configs/app.config";
import { MainNav } from "@/components/navbar";
import { motion } from "framer-motion";
import {} from "@/stores/appSlice";

export default function AppLayout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [stateText, setStateText] = useState("Loading");

  const { loading } = useAppSelector((state) => state.app);

  const { token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // if (token) {
    //   dispatch(loadProfile());
    // } else {
    //   console.log("no token found. redirecting to login");
    //   navigate("/auth/login");
    //   ``;
    // }

    console.log("AppLayout mounted");
  }, []);

  const pageVariants = {
    initial: {
      opacity: 0,
    },
    in: {
      opacity: 1,
    },
    out: {
      opacity: 0,
    },
  };
  const { pathname } = useLocation();

  const pageTransition = {
    type: "tween",
    ease: "linear",
    duration: 0.5,
  };

  // if (token) {
  //   console.log("token found. rendering app layout");

  // }

  return (
    <div className="w-screen h-screen  flex bg-background overflow-hiddentext-foreground  flex-col">
      <div className="w-full flex h-full">
        <SidebarNav items={appConfig.sidebarLinks} />
        <div className="w-full h-full overflow-y-scroll overflow-x-hidden">
          <MainNav />
          <motion.div
            key={pathname}
            initial="initial"
            animate="in"
            variants={pageVariants}
            transition={pageTransition}
          >
            <div className="p-4">
              <Outlet />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Is loading full screen spinner with red background */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white ">
          <div className=" p-4  flex items-center space-x-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
            <div>{stateText}...</div>
          </div>
        </div>
      )}
    </div>
  );
}
