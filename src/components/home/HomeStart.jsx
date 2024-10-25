import React from "react";
import Startbg from "../../assets/employe_ma.jpg";
import { Button } from "@/components/ui/button";
import Home from "../home/Home";
import { useNavigate } from "react-router-dom";

const HomeStart = () => {
  const navigate = useNavigate();
  const backgroundImageStyle = {
    backgroundImage: `url(${Startbg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    width: "100%",
  };
  return (
    <>
      <main>
        <div
          className="h-full font-poppins"
          id="bg"
          style={backgroundImageStyle}
        >
          <nav>
            <div className="flex justify-around items-center border-b p-5 bg-white space-x-40">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/TANGO_controls_logo.png/1200px-TANGO_controls_logo.png"
                alt=""
                className="w-28"
              />
              <div className="flex gap-10">
                <button>Signin</button>
                <Button variant="outline">Get Started</Button>
              </div>
            </div>
          </nav>
          <div className="flex flex-col justify-center items-center h-full">
            <h1 className="font-inter text-[8vh] font-bold w-[130vh] text-center leading-[10vh]">
              The Most Comprehensive Employee Management Platform
            </h1>
            <p className="text-[1.1rem] pt-5 font-poppins">
              Empowering businesses with efficient employee management solutions
            </p>
            {/* <Home /> */}
            <div className="flex justify-center items-center mt-10">
              <div className="bg-gradient-to-r p-2 rounded-lg">
                <Button
                  mode="modal"
                  onClick={()=>navigate('/dashboard')}
                  className="text-white font-semibold px-6 rounded-md transition duration-300 hover:opacity-90"
                >
                  Get Started
                </Button>
              </div>
            </div>
            <div>
              <div className="flex justify-between space-x-36 items-center mt-16">
                <div className="w-80 text-center">
                  <p>Trusted by fast-growing companies around the world</p>
                </div>
                <div className="flex h-10 items-center gap-10">
                  <img
                    src="https://www.zohowebstatic.com/sites/default/files/zoho_general_pages/dont-1.png"
                    alt=""
                    className="w-24"
                  />
                  <img
                    src="http://purepng.com/public/uploads/large/purepng.com-google-logo-2015brandlogobrand-logoiconssymbolslogosgoogle-6815229372333mqrr.png"
                    alt=""
                    className="w-24"
                  />
                  <img
                    src="https://logos-marques.com/wp-content/uploads/2021/03/Amazon-logo.png"
                    alt=""
                    className="w-24"
                  />
                  <img
                    src="https://logos-world.net/wp-content/uploads/2020/11/Flipkart-Logo-2007-2015.png"
                    alt=""
                    className="w-24"
                  />
                  <img
                    src="https://michiganfuture.org/wp-content/uploads/2021/05/Oracle-Logo-PNG8.png"
                    alt=""
                    className="w-24"
                  />
                  <img
                    src="http://www.freepnglogos.com/uploads/netflix-logo-0.png"
                    alt=""
                    className="w-24"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default HomeStart;
