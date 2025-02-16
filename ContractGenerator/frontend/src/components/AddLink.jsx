// File: src/components/AddLink.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ModalWrapper from './ModalWrapper';
import Loading from './Loader';

const AddLink = ({ open, setOpen, refetchLinks }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleAddLink = async () => {
    if (!file) {
      toast.error('Please select a file.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await axios.post('http://localhost:8080/api/uploadPDF', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        toast.success('Link added successfully');
        setOpen(false);
        refetchLinks();
      } else {
        toast.error('Error adding link');
      }
    } catch (error) {
      console.error('Error adding link:', error);
      toast.error('Error adding link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={(e) => { e.preventDefault(); handleAddLink(); }} className="p-4">
        <h2 className="text-base font-bold leading-6 text-gray-900 mb-4">UPLOAD PDF AND ADD LINK</h2>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="w-full rounded mb-4 p-2 border border-gray-300"
          required
        />
        {loading ? (
          <div className="py-5">
            <Loading />
          </div>
        ) : (
          <div className="py-3 mt-4 sm:flex sm:flex-row-reverse">
            <button type="submit" className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700 sm:w-auto">
              Upload and Add Link
            </button>
            <button type="button" className="bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto" onClick={() => setOpen(false)}>
              Cancel
            </button>
          </div>
        )}
      </form>
    </ModalWrapper>
  );
};

export default AddLink;
