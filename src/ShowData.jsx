import { onValue, ref, remove } from "firebase/database";
import React, { useEffect, useRef, useState } from "react";
import { db } from "./firebase.config";
import UpdateData from "./UpdateData";
import toast from "react-hot-toast";

const ShowData = () => {
  const [data, setdata] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const modalRef = useRef(null);
  useEffect(() => {
    onValue(ref(db), (result) => {
      setdata([]);
      const valu = result.val();
      if (valu !== null) {
        Object.values(valu).map((x) => {
          setdata((pre) => [...pre, x]);
        });
      }
    });
  }, []);

  // delete
  const handleDelete = async (id) => {
    try {
      await remove(ref(db, `/${id}`));

      toast.success("delete successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleUpdateClick = (user) => {
    setSelectedUser(user);
    modalRef.current.showModal();
  };
  return (
    <>
      <div className="flex-1 flex flex-col items-center">
        <h1 className="text-2xl my-5 lg:my-20 font-bold uppercase">Lists</h1>

        {data && (
          <div className="w-full flex justify-around flex-wrap ">
            {data?.map((user, y) => (
              <div
                key={y}
                className="w-full max-w-sm my-5 border p-1 text-xl  "
              >
                <p>Name: {user?.name}</p>
                <p>Email Address: {user?.email}</p>
                <p>Phone Number: {user?.phone}</p>
                <p className="flex justify-end gap-3">
                  <button
                    className="bg-green-500 text-white rounded-lg text-sm p-1"
                    onClick={() => {
                      handleUpdateClick(user);
                    }}
                  >
                    Update
                  </button>
                  {selectedUser && (
                    <UpdateData user={selectedUser} modalRef={modalRef} />
                  )}
                  <button
                    onClick={() => handleDelete(user?.uuid)}
                    className="bg-pink-500 text-white rounded-lg text-sm p-1"
                  >
                    Delete
                  </button>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ShowData;
