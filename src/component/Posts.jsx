import React, { useEffect, useState } from "react";
import { deleteApi, getApi } from "../api/PostApi";
import Form from "./Form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Posts = () => {
  const [data, setData] = useState([]);
  const [updateData , setUpdateData] = useState(null)

  // Get Api

  const getPostData = async () => {
    try {
      const res = await getApi();
      setData(res.data);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  useEffect(() => {
    getPostData();
  }, []);

  // Deelete Api

  const handleDelete = async (id) => {
    try {
      const res = await deleteApi(id);
      if (res.status === 200) {
        const updateData = data.filter((cur) => cur.id !== id);
        toast.success("Post Deleted successfully");
        setData(updateData);
      } else {
        console.log("Please Check status", res.status);
      }
    } catch (error) {
      console.log("error", error.message);
    }
  };

  // edit api

const handleEdit = (data) => setUpdateData(data)

// cancel edit

const cancelEdit = () => {
  setUpdateData(null)
}

  return (
    <div className="min-h-screen bg-base-200 py-6">
      <h2 className="text-center font-bold text-3xl mb-6 text-fuchsia-700">
        Our Posts
      </h2>

      <section>
        <Form data={data} setData={setData} updateData = {updateData} setUpdateData = {setUpdateData} cancelEdit = {cancelEdit}/>
      </section>

      <section className="container mx-auto px-4">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((cur) => (
            <li
              key={cur.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transform hover:scale-[1.02] transition duration-300"
            >
              {/* ID Badge */}
              <div className="p-3 flex justify-end">
                <span className="badge badge-outline badge-secondary">
                  {cur.id}
                </span>
              </div>

              {/* Title */}
              <div className="bg-linear-to-r from-fuchsia-600 to-pink-500 text-white p-4">
                <p className="font-semibold text-lg">Title : {cur.title}</p>
              </div>

              {/* Body */}
              <div className="p-4 text-gray-700 text-sm leading-relaxed">
                <span className="font-medium text-gray-900">Body : </span>{" "}
                {cur.body}
              </div>

              {/* Buttons */}
              <div className="flex justify-between p-4 border-t">
                <button
                  className="btn btn-sm btn-info hover:scale-105 transition"
                  onClick={() => handleEdit(cur)}
                >
                  ✏️ Edit
                </button>
                <button
                  className="btn btn-sm btn-error text-white hover:scale-105 transition"
                  onClick={() => handleDelete(cur.id)}
                >
                  🗑️ Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Posts;
