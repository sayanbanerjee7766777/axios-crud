import React, { useEffect, useState } from "react";
import { addApi, updateApi } from "../api/PostApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = ({ data, setData, updateData, cancelEdit }) => {
  const [addData, setAddData] = useState({
    title: "",
    body: "",
  });

  const resetForm = () => {
    setAddData({ title: "", body: "" });
  };

  // edit mode data load
  useEffect(() => {
    if (updateData) {
      setAddData(updateData);
    } else {
      resetForm();
    }
  }, [updateData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ FORM VALIDATION
  const isValidForm = () => {
    if (!addData.title.trim()) {
      toast.error("Title is required");
      return false;
    }

    if (!addData.body.trim()) {
      toast.error("Description is required");
      return false;
    }

    return true;
  };

  const addPostData = async () => {
    try {
      const res = await addApi(addData);
      if (res.status === 201) {
        setData([...data, res.data]);
        toast.success("Post added successfully");
        resetForm();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updatePostData = async () => {
    try {
      const res = await updateApi(updateData.id, addData);

      setData((prev) =>
        prev.map((cur) =>
          cur.id === res.data.id ? res.data : cur
        )
      );

      toast.success("Post updated successfully");
      resetForm();
      cancelEdit();
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ❌ invalid হলে এখানেই থামবে
    if (!isValidForm()) return;

    if (updateData) {
      updatePostData();
    } else {
      addPostData();
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto m-6 p-4 border rounded shadow">
        <h1 className="text-center text-xl font-semibold mb-4">
          Form Component
        </h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter title"
            className="w-full mb-3 px-3 py-2 border rounded"
            name="title"
            value={addData.title}
            onChange={handleChange}
          />

          <textarea
            placeholder="Enter description"
            className="w-full mb-4 px-3 py-2 border rounded"
            name="body"
            rows="4"
            value={addData.body}
            onChange={handleChange}
          />

          <div className="text-center">
            <button className="btn btn-info text-white mx-2">
              {updateData ? "Edit" : "Add"}
            </button>

            {updateData && (
              <button
                type="button"
                className="btn btn-outline mx-2"
                onClick={cancelEdit}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* 🔔 Toast container */}
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
};

export default Form;
