
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import Title from '../components/Title';
// import ConfirmationDialog from '../components/Dialogs';
// import VerifyLink from '../components/verifyLink';  // Corrected import path
// import Button from '../components/Button';
// import AddLink from '../components/AddLink';
// import ExtractedInfo from '../components/ExtractedInfo';
// import { FaFilePdf } from 'react-icons/fa'; // Using react-icons for PDF icon
// import clsx from "clsx";

// const CompletedLinks = () => {
//   const [openDialog, setOpenDialog] = useState(false);
//   const [links, setLinks] = useState([]);
//   const [error, setError] = useState(null);
//   const [selectedLink, setSelectedLink] = useState(null);
//   const [dialogMessage, setDialogMessage] = useState("");
//   const [openAddLink, setOpenAddLink] = useState(false); // State for AddLink modal
//   const [formData, setFormData] = useState({});

//   const refetchLinks = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/api/v1/forms/links');
//       setLinks(response.data.links);
//     } catch (error) {
//       setError('Error fetching completed links');
//     }
//   };

//   useEffect(() => {
//     refetchLinks();
//   }, []);

//   const verifyHandler = async (linkId) => {
//     try {
//       const res = await axios.patch(`http://localhost:8080/api/v1/forms/verify-link/${linkId}`);
//       const updatedLinks = links.map(linkItem => {
//         if (linkItem._id === linkId) {
//           return { ...linkItem, isVerified: !linkItem.isVerified };
//         }
//         return linkItem;
//       });
//       setLinks(updatedLinks);
//       setSelectedLink(null);
//       toast.success(res.data.message, {
//         autoClose: 500,
//         onClose: () => {}
//       });
//     } catch (error) {
//       console.error('Error verifying link:', error);
//       toast.error(error?.response?.data?.message || error.message);
//     }
//   };

//   const deleteHandler = async () => {
//     try {
//       await axios.put(`http://localhost:8080/api/v1/forms/links/trash/${selectedLink._id}`);
//       setLinks(links.filter(link => link._id !== selectedLink._id));
//       toast.success("Link deleted successfully");
//       setOpenDialog(false);
//       setSelectedLink(null);
//     } catch (error) {
//       console.error('Error deleting link:', error);
//       toast.error("Error deleting link");
//     }
//   };

//   const confirmDeleteClick = (link) => {
//     setSelectedLink(link);
//     setDialogMessage("Are you sure you want to delete the selected link?");
//     setOpenDialog(true);
//   };

//   const TableHeader = () => (
//     <thead className='border-b border-gray-300'>
//       <tr className='text-black text-left'>
//         <th className='py-2'>Contract</th>
//         <th className='py-2'></th>
//         <th className='py-2'>Created At</th>
//         <th className='py-2'>Verified</th>
//         <th className='py-2'>Actions</th>
//       </tr>
//     </thead>
//   );

//   const TableRow = ({ link }) => (
//     <tr key={link._id} className='border-b border-gray-200 text-gray-600 hover:bg-gray-400/10'>
//       <td className='p-2'>
//         <a href={link.link} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:underline">
//           <FaFilePdf className="mr-2 text-red-600" /> {link.contractName}
//         </a>
//       </td>
//       <td className='p-2'>
//         {link.formData && (
//           <div className="ml-2 bg-blue-600 text-white px-2 py-1 rounded-full ">
//             <div className="bg-blue-600 w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1 ">
//               <ExtractedInfo data={link.formData} />
//             </div>
//           </div>
//         )}
//       </td>
//       <td className='p-2'>{new Date(link.createdAt).toLocaleString()}</td>
//       <td className='p-2'>
//         <VerifyLink onConfirm={() => verifyHandler(link._id)} isVerified={link.isVerified} />
//       </td>
//       <td className='p-2 flex gap-4 justify-end'>
//         <button
//           className='text-red-700 hover:text-red-500 font-semibold sm:px-0'
//           onClick={() => confirmDeleteClick(link)}
//         >
//           Delete
//         </button>
//       </td>
//     </tr>
//   );

//   return (
//     <>
//       <div className='w-full md:px-1 px-0 mb-6'>
//         <div className='flex items-center justify-between mb-8'>
//           <Title title='Completed Links' />
//           <Button
//             label='+ Add New Link'
//             className='flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md 2xl:py-2.5'
//             onClick={() => setOpenAddLink(true)}
//           />
//         </div>

//         <div className='bg-white px-2 md:px-4 py-4 shadow-md rounded'>
//           {error && <p className='text-red-500'>{error}</p>}
//           <div className='overflow-x-auto'>
//             <table className='w-full mb-5'>
//               <TableHeader />
//               <tbody>
//                 {links.map((link, index) => (
//                   <TableRow key={index} link={link} />
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       <AddLink
//         open={openAddLink}
//         setOpen={setOpenAddLink}
//         refetchLinks={refetchLinks}
//       />

//       <ConfirmationDialog
//         open={openDialog}
//         setOpen={setOpenDialog}
//         msg={dialogMessage}
//         onClick={deleteHandler}
//       />
//     </>
//   );
// };

// export default CompletedLinks;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import Title from '../components/Title';
import ConfirmationDialog from '../components/Dialogs';
import VerifyLink from '../components/verifyLink'; // Corrected import path
import Button from '../components/Button';
import AddLink from '../components/AddLink';
import ExtractedInfo from '../components/ExtractedInfo';
import { FaFilePdf } from 'react-icons/fa'; // Using react-icons for PDF icon
import clsx from "clsx";

const CompletedLinks = () => {
  const { t } = useTranslation();

  const [openDialog, setOpenDialog] = useState(false);
  const [links, setLinks] = useState([]);
  const [error, setError] = useState(null);
  const [selectedLink, setSelectedLink] = useState(null);
  const [dialogMessage, setDialogMessage] = useState("");
  const [openAddLink, setOpenAddLink] = useState(false); // State for AddLink modal
  const [formData, setFormData] = useState({});

  const refetchLinks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/forms/links');
      setLinks(response.data.links);
    } catch (error) {
      setError(t('completedLinks:errorFetching'));
    }
  };

  useEffect(() => {
    refetchLinks();
  }, []);

  const verifyHandler = async (linkId) => {
    try {
      const res = await axios.patch(`http://localhost:8080/api/v1/forms/verify-link/${linkId}`);
      const updatedLinks = links.map(linkItem => {
        if (linkItem._id === linkId) {
          return { ...linkItem, isVerified: !linkItem.isVerified };
        }
        return linkItem;
      });
      setLinks(updatedLinks);
      setSelectedLink(null);
      toast.success(res.data.message, {
        autoClose: 500,
        onClose: () => {}
      });
    } catch (error) {
      console.error('Error verifying link:', error);
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const deleteHandler = async () => {
    try {
      await axios.put(`http://localhost:8080/api/v1/forms/links/trash/${selectedLink._id}`);
      setLinks(links.filter(link => link._id !== selectedLink._id));
      toast.success(t('completedLinks:deleteSuccess'));
      setOpenDialog(false);
      setSelectedLink(null);
    } catch (error) {
      console.error('Error deleting link:', error);
      toast.error(t('completedLinks:deleteError'));
    }
  };

  const confirmDeleteClick = (link) => {
    setSelectedLink(link);
    setDialogMessage(t('completedLinks:deleteConfirmation'));
    setOpenDialog(true);
  };

  const TableHeader = () => (
    <thead className='border-b border-gray-300'>
      <tr className='text-black text-left'>
        <th className='py-2'>{t('completedLinks:contract')}</th>
        <th className='py-2'></th>
        <th className='py-2'>{t('completedLinks:createdAt')}</th>
        <th className='py-2'>{t('completedLinks:verified')}</th>
        <th className='py-2'>{t('completedLinks:actions')}</th>
      </tr>
    </thead>
  );

  const TableRow = ({ link }) => (
    <tr key={link._id} className='border-b border-gray-200 text-gray-600 hover:bg-gray-400/10'>
      <td className='p-2'>
        <a href={link.link} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:underline">
          <FaFilePdf className="mr-2 text-red-600" /> {link.contractName}
        </a>
      </td>
      <td className='p-2'>
        {link.formData && (
          <div className="ml-2 bg-blue-600 text-white px-2 py-1 rounded-full ">
            <div className="bg-blue-600 w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1 ">
              <ExtractedInfo data={link.formData} />
            </div>
          </div>
        )}
      </td>
      <td className='p-2'>{new Date(link.createdAt).toLocaleString()}</td>
      <td className='p-2'>
        <VerifyLink onConfirm={() => verifyHandler(link._id)} isVerified={link.isVerified} />
      </td>
      <td className='p-2 flex gap-4 justify-end'>
        <button
          className='text-red-700 hover:text-red-500 font-semibold sm:px-0'
          onClick={() => confirmDeleteClick(link)}
        >
          {t('completedLinks:delete')}
        </button>
      </td>
    </tr>
  );

  return (
    <>
      <div className='w-full md:px-1 px-0 mb-6'>
        <div className='flex items-center justify-between mb-8'>
          <Title title={t('completedLinks:title')} />
          <Button
            label={t('completedLinks:addNewLink')}
            className='flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md 2xl:py-2.5'
            onClick={() => setOpenAddLink(true)}
          />
        </div>

        <div className='bg-white px-2 md:px-4 py-4 shadow-md rounded'>
          {error && <p className='text-red-500'>{error}</p>}
          <div className='overflow-x-auto'>
            <table className='w-full mb-5'>
              <TableHeader />
              <tbody>
                {links.map((link, index) => (
                  <TableRow key={index} link={link} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AddLink
        open={openAddLink}
        setOpen={setOpenAddLink}
        refetchLinks={refetchLinks}
      />

      <ConfirmationDialog
        open={openDialog}
        setOpen={setOpenDialog}
        msg={dialogMessage}
        onClick={deleteHandler}
      />
    </>
  );
};

export default CompletedLinks;
