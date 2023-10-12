import { ref, update } from "firebase/database";
import React, { forwardRef, useEffect, useState } from "react";
import { db } from "./firebase.config";
import toast from "react-hot-toast";

const UpdateData = ({ user, modalRef }) => {
  const { name, email, phone, uuid } = user;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    setFormData({ name, email, phone });
  }, [name, email, phone]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  // create data
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await update(ref(db, `/${uuid}`), {
        ...formData,
        uuid: uuid,
      });
      toast.success("update successfully");
      modalRef.current.close();
    } catch (error) {
      toast.error(error.message);
      console.error("Error updating data:", error);
    }
  };
  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <div>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="flex justify-end">
              <button type="submit" className="btn btn-secondary btn-sm">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default UpdateData;
