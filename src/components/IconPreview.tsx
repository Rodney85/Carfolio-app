import React from 'react';

// Import all the icon options
import { IoLayersOutline } from "react-icons/io5";
import { HiOutlineCollection } from "react-icons/hi";
import { BsGrid } from "react-icons/bs";
import { RiRoadMapLine } from "react-icons/ri";
import { FaRegObjectGroup } from "react-icons/fa";
import { MdOutlineHub } from "react-icons/md";

const IconPreview: React.FC = () => {
  const iconOptions = [
    { name: "IoLayersOutline", component: <IoLayersOutline size={40} color="#32E6C1" /> },
    { name: "HiOutlineCollection", component: <HiOutlineCollection size={40} color="#32E6C1" /> },
    { name: "BsGrid", component: <BsGrid size={40} color="#32E6C1" /> },
    { name: "RiRoadMapLine", component: <RiRoadMapLine size={40} color="#32E6C1" /> },
    { name: "FaRegObjectGroup", component: <FaRegObjectGroup size={40} color="#32E6C1" /> },
    { name: "MdOutlineHub", component: <MdOutlineHub size={40} color="#32E6C1" /> },
  ];

  return (
    <div className="p-8 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-8">Icon Options for Carfolio</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
        {iconOptions.map((icon, index) => (
          <div 
            key={index}
            className="flex flex-col items-center p-4 rounded-lg border border-gray-200 dark:border-dark-800"
          >
            <div className="bg-dark-900 p-4 rounded-full mb-3 flex items-center justify-center">
              {icon.component}
            </div>
            <span className="text-sm font-mono">{icon.name}</span>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          All icons shown with turquoise (#32E6C1) against dark background. 
          <br />Click an icon to select it for your app.
        </p>
      </div>
    </div>
  );
};

export default IconPreview;
