import React from "react";
import {
  MdDashboard,
  MdOutlinePendingActions,
  MdTaskAlt,
} from "react-icons/md";
import { FaTasks, FaTrashAlt, FaUsers } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setOpenSidebar } from "../redux/slices/authSlice";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import logo from "../assets/1.png";

const linkData = (t) => [
  {
    label: t("sidebar:tasks"),
    link: "tasks",
    icon: <MdDashboard />,
  },
  {
    label: t("sidebar:contracts"),
    link: "Contracts",
    icon: <MdOutlinePendingActions />,
  },
  {
    label: t("sidebar:completed"),
    link: "Completed",
    icon: <FaTasks />,
  },
  {
    label: t("sidebar:trash"),
    link: "trashed",
    icon: <FaTrashAlt />,
  },
  {
    label: t("sidebar:team"),
    link: "team",
    icon: <FaUsers />,
  },
];

const Sidebar = () => {
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const sidebarLinks = user?.isAdmin ? linkData(t) : linkData(t).slice(0, 4);

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  const NavLink = ({ el }) => {
    return (
      <Link
        to={el.link}
        onClick={closeSidebar}
        className={clsx(
          "w-full lg:w-3/4 flex gap-2 px-3 py-2 rounded-full items-center text-gray-800 text-base hover:bg-[#2564ed2d]",
          path === el.link.split("/")[0] ? "bg-[#1f418a] text-neutral-100" : ""
        )}
      >
        {el.icon}
        <span className="hover:text-[#2564ed]">{el.label}</span>
      </Link>
    );
  };

  return (
    <div
      className="w-full h-full flex flex-col bg-[#C8D9ED] gap-6 p-5"
      style={{ boxShadow: "0 4px 16px rgba(0, 0, 0, 0.25)" }} // Ombre personnalisée
    >
      <h1 className="flex flex-col items-center gap-2 mb-6">
        <img src={logo} alt="Logo" className="w-16 h-16 object-contain" />{" "}
        {/* Taille augmentée */}
        <span className="text-2xl font-bold text-[#1f418a]">
          {t("sidebar:title")}
        </span>{" "}
        {/* Couleur du texte modifiée */}
      </h1>

      <div className="flex-1 flex flex-col gap-y-5 py-8">
        {sidebarLinks.map((link) => (
          <NavLink el={link} key={link.label} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
