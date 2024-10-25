import React from "react";

const projects = [
  {
    title: "AI-powered Analytics Platform",
    description: "A platform that leverages AI to provide business insights and predictive analytics.",
    image: "https://miro.medium.com/v2/resize:fit:1000/0*GeJ-4KpdvUh22eb4.png",
    link: "#",
  },
  {
    title: "E-commerce Website",
    description: "A fully functional e-commerce platform with real-time inventory management and payment integration.",
    image: "https://framerusercontent.com/images/BtSOiu1CJrIjCK2LCNTsFwBj0wg.jpeg",
    link: "#",
  },
  {
    title: "Mobile Apps For Business",
    description: "A mobile application for food ordering and delivery with integrated GPS tracking.",
    image: "https://www.stellardigital.in/blog/wp-content/uploads/2022/02/Know-why-do-your-business-need-mobile-applications.jpg",
    link: "#",
  },
  {
    title: "Custom CRM Solution",
    description: "A custom-built Customer Relationship Management (CRM) system to streamline client interactions.",
    image: "https://media.licdn.com/dms/image/D4D12AQF3eFDY511i0Q/article-cover_image-shrink_720_1280/0/1710821099769?e=2147483647&v=beta&t=CUrQDOBod-22fQywqftkRpDrkzQPm6GyxSmeJ6Y8k6o",
    link: "#",
  },
];

const Projects = () => {
  return (
    <div >
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Company Projects</h2>
        
        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <a
                  href={project.link}
                  className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                >
                  Learn More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
