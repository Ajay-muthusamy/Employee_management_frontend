import { UserButton } from "@clerk/clerk-react";
import { useClerk } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Navigate, useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Outlet } from "react-router-dom";
import dashlogo from "../../assets/adminpage.jpg";
import { BreadCrumbHome } from "@/ui_Layout/BreadCrumbHome";


import Sidebar from "./Sidebar";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useClerk();

  return (
    <div>
      <nav>
        <div className="flex justify-around items-center border-b p-5 bg-white space-x-40">
          <div>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/TANGO_controls_logo.png/1200px-TANGO_controls_logo.png"
              alt=""
              className="w-28"
            />
          </div>

          <div className="flex gap-10">

          </div>
        </div>

        <div className="pl-10 mt-2 font-poppins font-semibold">
          <BreadCrumbHome />
        </div>
        <div className="font-poppins pt-3 m-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <UserButton />
              <h4 className="text-xl   font-medium leading-none">
                Welcome {user.firstName}! ✌️
              </h4>
            </div>
            <p className="text-sm text-muted-foreground">
              An open-source for Employee Management
            </p>
          </div>
          <Separator className="my-4" />
          <div className="flex h-5 items-center space-x-4 text-sm">
            <div>Home</div>
            <Separator orientation="vertical" />
            <div onClick={() => navigate("/add-employee")}>Add</div>
            <Separator orientation="vertical" />
            <div>Source</div>
          </div>
        </div>
      </nav>

      <div className="flex   m-10 gap-[20vh] ">
        <div>
          <Sidebar />
        </div>
        <div>
          <Outlet />
        </div>
      </div>
      
    </div>
  );
};

export default Dashboard;
