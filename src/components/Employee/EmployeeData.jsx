import React, { useEffect, useState } from "react";
import { CiLinkedin } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import axios from "axios";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const EmployeeData = () => {
  const [position, setPosition] = useState("bottom");
  const [showStatusBar, setShowStatusBar] = useState(true);
  const [showActivityBar, setShowActivityBar] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://employee-management-backend-kjh6.onrender.com/Em/employee-fetch"
        );
        setEmployees(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleSearchChange = async (e) => {
    const filterName = e.target.value.toLowerCase();
    console.log(filterName);

    if (filterName === "") {
      e.preventDefault();
    } else {
      const filteredData = employees.filter((employee) => {
        return employee.name.toLowerCase().includes(filterName);
      });
      setEmployees(filteredData);
    }

  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (employees.length === 0) return <div>No employee data available.</div>;

  return (
    <div>
      <div className=" text-left flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-poppins">Employee</h1>
          <p className="text-gray-400">view and manage Employee</p>
        </div>

        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Filter</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Frontend Developer</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={showStatusBar}
                onCheckedChange={setShowStatusBar}
              >
                UI/UX Designer
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showActivityBar}
                onCheckedChange={setShowActivityBar}
              >
                Database Manager
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showPanel}
                onCheckedChange={setShowPanel}
              >
                Panel
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="pl-5 font-poppins flex gap-10 border-b-2">
        <Link to="#" className="p-1">
          All
        </Link>
        <Link to="#" className="p-1">
          Invitation
        </Link>
      </div>

      <div className="flex justify-between mt-5">
        <div className="flex gap-4">
          <div>
            <Input
              type="text"
              placeholder="Search"
              className="w-72"
              onChange={handleSearchChange}
            />
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Sort by</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={position}
                  onValueChange={setPosition}
                >
                  <DropdownMenuRadioItem value="top">
                    Experience
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="bottom">
                    Age
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div>
          <button
            className="px-5 py-2 rounded-lg bg-violet-600 text-white font-poppins"
            onClick={() => navigate("/add-employee")}
          >
            Create Employee
          </button>
        </div>
      </div>

      <div className="employee-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-poppins bg-gray-50 mt-10 p-10 rounded-xl border-2">
        {employees.map((data, index) => (
          <HoverCard key={index}>
            <HoverCardTrigger>
              <div className="employee-card bg-white shadow-lg rounded-lg p-4 flex flex-col items-center cursor-pointer ">
                <img
                  src={`http://localhost:3000/uploads/${data.photo}`}
                  className="employee-photo w-full h-[40vh] object-cover rounded-md mb-4"
                />

                <div className="text-center">
                  <h2 className="employee-name text-xl font-bold mb-2">
                    {data.name}
                  </h2>
                </div>
                <p className="employee-role text-sm text-gray-600 mb-2">
                  {data.role}
                </p>
              </div>
            </HoverCardTrigger>

            {/* HoverCardContent showing employee details */}
            <HoverCardContent className="p-4 bg-white rounded-lg shadow-md">
              <h2 className="employee-name text-xl font-bold mb-2">
                {data.name}
              </h2>
              <p className="employee-role text-sm text-gray-600 mb-2">
                Role: {data.role}
              </p>
              <p className="employee-experience text-sm text-gray-600 mb-2">
                Experience: {data.experience} years
              </p>
              <p className="employee-mobile text-sm text-gray-600 mb-2">
                Mobile: {data.mobileNumber}
              </p>
              <p className="employee-address text-sm text-gray-600 mb-2">
                Address: {data.address}
              </p>

              {/* LinkedIn and GitHub Links */}
              <div className="flex gap-4 mt-2">
                {data.linkedInId && (
                  <a
                    href={data.linkedInId}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    <CiLinkedin size={24} />
                  </a>
                )}
                {data.githubId && (
                  <a
                    href={data.githubId}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-800 hover:underline"
                  >
                    <FaGithub size={24} />
                  </a>
                )}
              </div>
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>
    </div>
  );
};

export default EmployeeData;
