import React, { useEffect, useState } from "react";
import { addApi, updateApi } from "../api/PostApi";

const Form = ({ data, setData, updateData, setUpdateData, cancelEdit }) => {
  const [addData, setAddData] = useState({
    title: "",
    body: "",
  });

  const resetForm = () => {
    setAddData({ title: "", body: "" });
    
  };

  // pass updatedata from postjsx

  useEffect(() => {
    if (updateData) {
      setAddData(updateData);
    }
    else{
        resetForm()
    }
  }, [updateData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddData((prev) => ({ ...prev, [name]: value }));
  };

  const addPostData = async () => {
    try {
      const res = await addApi(addData);
      if (res.status == 201) {
        setData([...data, res.data]);

        resetForm()
      }
      else{
        console.log("Please Check status", res.status);
      
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updatePostData = async () => {
    try {
      const res = await updateApi(updateData.id, addData);

      setData((prev) => {
        return prev.map((cur) => (cur.id == res.data.id ? res.data : cur));
      });

      resetForm()
      cancelEdit();
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (updateData) {
      updatePostData();
    } else {
      addPostData();
    }
  };

  return (
    <div className="max-w-md mx-auto m-6 p-4 border rounded shadow">
      <h1 className="text-center text-xl font-semibold mb-4">Form Component</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter title"
          className="w-full mb-3 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          name="title"
          value={addData.title}
          onChange={handleChange}
        />

        <textarea
          placeholder="Enter description"
          className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          name="body"
          rows="4" // Ekhane koiti line dekhabe seta bole deya jay
          value={addData.body}
          onChange={handleChange}
        />

        <div className="text-center ">
          <div className="text-center">
            <button className="btn btn-info text-white mx-2">
              {updateData ? "Edit" : "Add"}
            </button>
            {updateData && (
              <button
                className="btn btn-info text-white"
                onClick={() => cancelEdit()}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
