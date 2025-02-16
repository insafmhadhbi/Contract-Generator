import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import clsx from "clsx";
import { FaQuestion } from "react-icons/fa";
import ModalWrapper from "./ModalWrapper";
import Button from "./Button";

const VerifyLink = ({ onConfirm, isVerified }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        type="button"
        className={clsx(
          "w-fit px-4 py-1 rounded-full",
          isVerified ? "bg-blue-200" : "bg-yellow-100"
        )}
        onClick={handleOpen}
        label={isVerified ? "Verified" : "Unverified"}
      />

      {open && (
        <ModalWrapper open={open} setOpen={handleClose}>
          <div className="py-4 w-full flex flex-col gap-4 items-center justify-center">
            <Dialog.Title as="h3">
              <p
                className={clsx(
                  "p-3 rounded-full ",
                  isVerified ? "text-red-600 bg-red-200" : "text-green-600 bg-green-200"
                )}
              >
                <FaQuestion size={60} />
              </p>
            </Dialog.Title>

            <p className="text-center text-gray-500">
              {isVerified ? "Are you sure you want to unverify this link?" : "Are you sure you want to verify this link?"}
            </p>

            <div className="bg-gray-50 py-3 sm:flex sm:flex-row-reverse gap-4">
              <Button
                type="button"
                className={clsx("px-8 text-sm font-semibold text-white sm:w-auto", isVerified ? "bg-red-600" : "bg-green-600")}
                onClick={() => {
                  onConfirm();
                  handleClose();
                }}
                label={isVerified ? "Unverify" : "Verify"}
              />

              <Button
                type="button"
                className="bg-white px-8 text-sm font-semibold text-gray-900 sm:w-auto border"
                onClick={handleClose}
                label="Cancel"
              />
            </div>
          </div>
        </ModalWrapper>
      )}
    </>
  );
};

export default VerifyLink;
