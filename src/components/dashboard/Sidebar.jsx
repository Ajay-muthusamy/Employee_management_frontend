import React from "react";
import { FaPeopleGroup } from "react-icons/fa6";
import { GoProjectSymlink } from "react-icons/go";
import { MdHolidayVillage } from "react-icons/md";
import { FcLeave } from "react-icons/fc";
import { FaRegCalendarCheck } from "react-icons/fa";
import { MdFeedback } from "react-icons/md";
import { Link, Outlet,useLocation  } from "react-router-dom"; 
const sideContent = [
  {
    img: FaPeopleGroup,
    heading: "Employees",
    route: "/dashboard",
  },
  {
    img: GoProjectSymlink,
    heading: "Projects",
    route: "/dashboard/Projects",
  },
  {
    img: MdHolidayVillage,
    heading: "Holidays",
    route: "/holidays",
  },
  {
    img: FcLeave,
    heading: "Leave",
    route: "/leave",
  },
  {
    img: FaRegCalendarCheck,
    heading: "Attendance",
    route: "/attendance",
  },
  {
    img: MdFeedback,
    heading: "Feedback",
    route: "/feedback",
  },
];

const Sidebar = () => {
  const location = useLocation();
  return (
    <div>
      <div>
        {sideContent.map((data, index) => (
          <Link key={index} to={data.route} className="no-underline text-black">
            <div className="flex items-center py-3 px-6 mb-5 font-poppins hover:bg-gray-100 rounded-md">
              <div className="text-sm">{<data.img />}</div>
              <div className="ml-2">{data.heading}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
