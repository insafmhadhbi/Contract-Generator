import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { MdDelete, MdOutlineRestore } from "react-icons/md";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Title from "../components/Title";
import Button from "../components/Button";
import Loading from "../components/Loader";
import { toast } from "sonner";
import ConfirmationDialog from "../components/Dialogs";

const Trash = () => {
  const { t } = useTranslation();
  const [links, setLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [msg, setMsg] = useState(null);
  const [type, setType] = useState("delete");
  const [selected, setSelected] = useState("");

  useEffect(() => {
    const fetchTrashedLinks = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/forms/links/trashed');
        setLinks(response.data.links);
      } catch (error) {
        toast.error(t("trash:fetchError"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrashedLinks();
  }, [t]);

  const deleteRestoreHandler = async () => {
    try {
      let response;
      switch (type) {
        case "delete":
          response = await axios.put(`http://localhost:8080/api/v1/forms/links/delete-restore/${selected}`, null, {
            params: { actionType: "delete" }
          });
          break;
        case "deleteAll":
          response = await axios.put('http://localhost:8080/api/v1/forms/links/delete-restore', null, {
            params: { actionType: "deleteAll" }
          });
          break;
        case "restore":
          response = await axios.put(`http://localhost:8080/api/v1/forms/links/delete-restore/${selected}`, null, {
            params: { actionType: "restore" }
          });
          break;
        case "restoreAll":
          response = await axios.put('http://localhost:8080/api/v1/forms/links/delete-restore', null, {
            params: { actionType: "restoreAll" }
          });
          break;
        default:
          break;
      }

      toast.success(response.data.message);
      setOpenDialog(false);
      if (type === "restoreAll" || type === "deleteAll") {
        setLinks([]);
      } else {
        setLinks((prevLinks) => prevLinks.filter(link => link._id !== selected));
      }
    } catch (error) {
      toast.error(t("trash:error"));
    }
  };

  const deleteClick = (id) => {
    setSelected(id);
    setType("delete");
    setMsg(t("trash:deleteConfirmation"));
    setOpenDialog(true);
  };

  const restoreClick = (id) => {
    setSelected(id);
    setType("restore");
    setMsg(t("trash:restoreConfirmation"));
    setOpenDialog(true);
  };

  const deleteAllClick = () => {
    setType("deleteAll");
    setMsg(t("trash:deleteAllConfirmation"));
    setOpenDialog(true);
  };

  const restoreAllClick = () => {
    setType("restoreAll");
    setMsg(t("trash:restoreAllConfirmation"));
    setOpenDialog(true);
  };

  if (isLoading) {
    return <Loading />;
  }

  const TableHeader = () => (
    <thead className="border-b border-gray-300">
      <tr className="text-black text-left">
        <th className="py-2">{t("trash:link")}</th>
        <th className="py-2">{t("trash:dateModified")}</th>
        <th className="py-2">{t("trash:actions")}</th>
      </tr>
    </thead>
  );

  const TableRow = ({ item }) => (
    <tr key={item._id} className="border-b border-gray-200 text-gray-600 hover:bg-gray-400/10">
      <td className="py-2">
        <p className="w-full line-clamp-2 text-base text-black">{item.link}</p>
      </td>
      <td className="py-2 text-sm">{new Date(item.updatedAt).toDateString()}</td>
      <td className="py-2 flex gap-1 justify-end">
        <Button
          icon={<MdOutlineRestore className="text-xl text-gray-500" />}
          onClick={() => restoreClick(item._id)}
        />
        <Button
          icon={<MdDelete className="text-xl text-red-600" />}
          onClick={() => deleteClick(item._id)}
        />
      </td>
    </tr>
  );

  return (
    <>
      <div className="w-full md:px-1 px-0 mb-6">
        <div className="flex items-center justify-between mb-8">
          <Title title={t("trash:title")} />

          <div className="flex gap-2 md:gap-4 items-center">
            <Button
              label={t("trash:restoreAll")}
              icon={<MdOutlineRestore className="text-lg hidden md:flex" />}
              className="flex flex-row-reverse gap-1 items-center text-black text-sm md:text-base rounded-md 2xl:py-2.5"
              onClick={restoreAllClick}
            />
            <Button
              label={t("trash:deleteAll")}
              icon={<MdDelete className="text-lg hidden md:flex" />}
              className="flex flex-row-reverse gap-1 items-center text-red-600 text-sm md:text-base rounded-md 2xl:py-2.5"
              onClick={deleteAllClick}
            />
          </div>
        </div>
        <div className="bg-white px-2 md:px-6 py-4 shadow-md rounded">
          <div className="overflow-x-auto">
            <table className="w-full mb-5">
              <TableHeader />
              <tbody>
                {links.map((link, index) => (
                  <TableRow key={index} item={link} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ConfirmationDialog
        open={openDialog}
        setOpen={setOpenDialog}
        msg={msg}
        setMsg={setMsg}
        type={type}
        setType={setType}
        onClick={deleteRestoreHandler}
      />
    </>
  );
};

export default Trash;
