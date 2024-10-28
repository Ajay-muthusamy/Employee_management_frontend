import React, { useEffect, useState } from "react";
import { CiLinkedin } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";
import Modal from "react-modal";
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { sub } from "date-fns";

const EmployeeData = () => {
  const [position, setPosition] = useState("bottom");
  const [showStatusBar, setShowStatusBar] = useState(true);
  const [showActivityBar, setShowActivityBar] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setemail] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
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

    if (filterName === "") {
      e.preventDefault();
    } else {
      const filteredData = employees.filter((employee) => {
        return employee.name.toLowerCase().includes(filterName);
      });
      setEmployees(filteredData);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(recipient,subject,text);
    try {
      const res = await axios.post("https://employee-management-backend-kjh6.onrender.com/api/send-email", {
        recipient,
        subject,
        text,
      });
      setResponse(res.data.message || "Email sent successfully");
      toast.success("Custom Success Message", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    } catch (error) {
      setResponse("Error sending email");
    }
  };

  return (
    <div>
      <div className="text-left flex justify-between items-center">
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
          <Input
            type="text"
            placeholder="Search"
            className="w-72"
            onChange={handleSearchChange}
          />
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

        <button
          className="px-5 py-2 rounded-lg bg-violet-600 text-white font-poppins"
          onClick={() => navigate("/add-employee")}
        >
          Create Employee
        </button>
      </div>

      <div className="employee-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-poppins bg-gray-50 mt-10 p-10 rounded-xl border-2">
        {employees.map((data, index) => (
          <HoverCard key={index}>
            <HoverCardTrigger>
              <div
                className="employee-card bg-white shadow-lg rounded-lg p-4 flex flex-col items-center cursor-pointer "
                onClick={() => setRecipient(data.email)}
              >
                <img
                  src={`https://employee-management-backend-kjh6.onrender.com/uploads/${data.photo}`}
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
              <p className="employee-email text-sm text-gray-600 mb-2">
                Email: {data.email}
              </p>
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
              <button
                className="px-16 py-2 bg-black text-white rounded-lg mt-4"
                onClick={openModal}
              >
                Send Mail
              </button>
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Send Email"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            padding: 0, // remove default padding to use Tailwind's padding
            borderRadius: "0.5rem",
            border: "none",
            maxWidth: "400px",
            width: "90%", // responsive width
          },
        }}
      >
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Send Email
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <textarea
              placeholder="Message"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full py-2 mt-2 text-white bg-green-500 rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Send
            </button>
          </form>
          <button
            onClick={closeModal}
            className="mt-4 w-full py-2 text-white bg-red-600 rounded-md hover:bg-gray-200 focus:outline-none"
          >
            Close
          </button>
        </div>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default EmployeeData;
