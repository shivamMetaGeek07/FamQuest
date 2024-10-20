"use client";
import React, { useEffect, useRef, useState } from "react";
import { RiMenu2Fill } from "react-icons/ri";
import { GiCrossMark } from "react-icons/gi";
import Link from "next/link";
import { useSelector,useDispatch } from "react-redux";
import LoginPage from "./mob-login";
import { useRouter, usePathname } from "next/navigation";
import { toggleNav,selectNavState } from "@/redux/reducer/navSlice";
import {RootState,AppDispatch} from "@/redux/store";

const Sidebar = () => {
  const router = useRouter();
   const dispatch = useDispatch<AppDispatch>(); 
  const pathname = usePathname();
  const [isLandingPage, setIsLandingPage] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.login?.user);
   const navOpen = useSelector((state: RootState) => selectNavState(state));

  const handleNav = () => {
    if(isLandingPage){
      return;
    }
    dispatch(toggleNav(!navOpen));
  };

  const handleLinkClick = (path: string) => {
    dispatch(toggleNav(false));
    router.push(path);
  };

  const prevPathRef = useRef(pathname);

  useEffect(() => {
    if (pathname === "/login" || prevPathRef.current === "/login") {
      dispatch(toggleNav(false));
      if (pathname === "/login") {
        router.push("/home");
      }
    }
    if(pathname === "/" || pathname==="" ) {
      console.log("landing page", pathname);
      setIsLandingPage(true);
    }
    prevPathRef.current = pathname;
  }, [router]);

  return (
    <>
      <div className="w-[4rem] hidden sm:flex flex-col border-r-gray-600/45 bg-[#15151557] z-50 fixed md:h-screen glass_effect top-0">
        <Link
          href="#"//change this to the home page
          className="fixed top-0 left-0 flex justify-center items-center border-b-gray-600/45 md:border-b border-b w-full h-[5rem]"
        >
          <img
            src="https://clusterprotocol2024.s3.amazonaws.com/website+logo/logo.png"
            alt="logo"
          />
        </Link>
        <div className="flex-1 flex items-center justify-center ">
          <button
            className={` ${isLandingPage?("hidden"):("flex items-center justify-center")}  border-none text-white text-2xl cursor-pointer`}//change this to flex to show the menu icon
            onClick={handleNav} 
          >
            {!navOpen ? (
              <RiMenu2Fill
                size={40}
                className="text-[#e2dcdcb3] cursor-pointer"
              />
            ) : (
              <GiCrossMark
                size={40}
                className="text-[#e2dcdcb3] cursor-pointer"
              />
            )}
          </button>
        </div>
      </div>
      <div
        className={`top-0 flex flex-col w-screen md:w-full bg-[#5638ce40] z-40 h-screen glass_effect fixed ${
          !navOpen ? "transform -translate-x-full" : ""
        } transition-transform duration-500 ease-in-out`}
      >
        {/* <button
          className="block md:hidden border-none text-white text-2xl cursor-pointer"
          onClick={handleNav}
        >
          {!navOpen ? (
            <div className="px-2 m-auto">
              <RiMenu2Fill
                size={40}
                className="text-[#e2dcdcb3] cursor-pointer"
              />
            </div>
          ) : (
            <div className="px-2 m-auto">
              <GiCrossMark
                size={40}
                className="text-[#e2dcdcb3] cursor-pointer"
              />
            </div>
          )}
        </button> */}

        {user ? (
          <>
          <div className="hidden sm:flex flex-col border-none justify-between sm:flex-row items-center m-auto md:ml-5 w-screen text-center text-white">
            <div
              className="justify-center items-center m-auto border-l border-r flex h-12 md:h-40 md:border-r w-[12rem] md:w-full border-r-white"
              onClick={() => handleLinkClick("/user/profile")}
            >
              <div className="border-l md:w-full hover:bg-opacity-15 hover:bg-[#5638ce48] border-t w-full p-3 md:border-l-transparent border-b border-b-white hover:border-b-4 hover:border-b-voilet-700 cursor-pointer">
                <button>PROFILE</button>
              </div>
            </div>
            <div
              className="justify-center items-center m-auto border-l flex h-12 md:h-40 border-r w-[12rem] md:w-full border-r-white"
              onClick={() => handleLinkClick("/user/my-community")}
            >
              <div className="md:w-full border-t w-full hover:bg-opacity-15 hover:bg-[#5638ce40] border-b p-3 hover:border-b-4 hover:border-b-voilet-700 cursor-pointer">
                <button> MY COMMUNITY </button>
              </div>
            </div>
            <div
              className="justify-center items-center m-auto border-l flex h-12 md:h-40 border-r w-[12rem] md:w-full border-r-white"
              onClick={() => handleLinkClick("/leaderboard")}
            >
              <div className="md:w-full border-t w-full hover:bg-opacity-15 hover:bg-[#5638ce40] border-b p-3 hover:border-b-4 hover:border-b-voilet-700 cursor-pointer">
                <button>LEADERBOARD</button>
              </div>
            </div>
            <div
              className="justify-center items-center m-auto border-l border-r flex h-12 md:h-40 md:border-r w-[12rem] md:w-full border-r-white"
              onClick={() => handleLinkClick("/")}
            >
              <div className="md:w-full border-t w-full hover:bg-opacity-15 hover:bg-[#5638ce40] border-b p-3 hover:border-b-4 hover:border-b-voilet-700 cursor-pointer">
                <button>REWARDS</button>
              </div>
            </div>
            <div
              className="justify-center items-center m-auto border-l border-r flex h-12 md:h-40 md:border-r w-[12rem] md:w-full border-r-white"
              onClick={() => handleLinkClick("/user/rate-kols")}
            >
              <div className="md:w-full border-t w-full hover:bg-opacity-15 hover:bg-[#5638ce40] border-b p-3 hover:border-b-4 hover:border-b-voilet-700 cursor-pointer">
                <button>RANK KOLS</button>
              </div>
            </div>
          </div>
          <div className="sm:hidden flex flex-col gap-8 justify-center items-center w-[90%] mx-auto h-[90vh] " >
           <div className="flex flex-col gap-6 mb-4 border-none justify-between w-full items-center text-center text-white">
            <div
              className="flex w-full h-12 md:h-40 justify-center items-center m-auto border-x-1 p-4 border-x-[#ffffff47] "
              onClick={() => handleLinkClick("/user/profile")}
            >
              <div className=" hover:bg-opacity-15 hover:bg-[#5638ce48] w-full px-8 py-6 border-b-1 border-b-[#ffffff47] cursor-pointer">
              PROFILE
              </div>
            </div>
            <div
              className="flex w-full h-12 md:h-40 justify-center items-center m-auto border-x-1 p-4 border-x-[#ffffff47] "
              onClick={() => handleLinkClick("/user/my-community")}
            >
              <div className="hover:bg-opacity-15 hover:bg-[#5638ce48] w-full px-8 py-6 border-b-1 border-b-[#ffffff47] cursor-pointer">
               MY COMMUNITY 
              </div>
            </div>
            <div
              className="flex w-full h-12 md:h-40 justify-center items-center m-auto border-x-1 p-4 border-x-[#ffffff47] "
              onClick={() => handleLinkClick("/leaderboard")}
            >
              <div className="hover:bg-opacity-15 hover:bg-[#5638ce48] w-full px-8 py-6 border-b-1 border-b-[#ffffff47] cursor-pointer">
                LEADERBOARD
              </div>
            </div>
            <div
              className="flex w-full h-12 md:h-40 justify-center items-center m-auto border-x-1 p-4 border-x-[#ffffff47] "
              onClick={() => handleLinkClick("/")}
            >
              <div className="hover:bg-opacity-15 hover:bg-[#5638ce48] w-full px-8 py-6 border-b-1 border-b-[#ffffff47] cursor-pointer">
                REWARDS
              </div>
            </div>
            <div
              className="flex w-full h-12 md:h-40 justify-center items-center m-auto border-x-1 p-4 border-x-[#ffffff47] "
              onClick={() => handleLinkClick("/user/rate-kols")}
            >
              <div className="hover:bg-opacity-15 hover:bg-[#5638ce48] w-full px-8 py-6 border-b-1 border-b-[#ffffff47] cursor-pointer">
                RANK KOLS
              </div>
            </div>
            </div>
            <div className="flex justify-center items-center gap-4" >
              <div className="border-1 border-[#ffffff59] bg-[#ffffff17] p-2 w-12 h-12 ">
              <img src="https://clusterprotocol2024.s3.amazonaws.com/website+logo/logo.png" className="w-full h-full object-cover" alt="logo" />
              </div>
              <div className="border-1 border-[#ffffff59] bg-[#ffffff17]  flex justify-center items-center w-12 h-12" onClick={handleNav} ><i className="bi bi-x-lg"></i></div>
            </div>
          </div>
          </>
          
        ) : (
          <LoginPage />
        )}
      </div>
    </>
  );
};

export default Sidebar;
