import { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

export function AddVideo() {
  const [categories, setCategories] = useState([
    { Category_Id: 0, CategoryName: "" },
  ]);

  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      VideoId: 0,
      Title: "",
      Url: "",
      Likes: 0,
      Comments: "",
      Category_Id: 0,
    },
    onSubmit: (values) => {
      axios.post("http://127.0.0.1:2200/addvideo", values);
      alert("Video Added Successfully..");
      navigate("/admindashboard");
    },
  });

  function LoadCategories() {
    axios.get("http://127.0.0.1:2200/categories").then((response) => {
      response.data.unshift({
        Category_Id: -1,
        CategoryName: "Select Category",
      });
      setCategories(response.data);
    });
  }

  useEffect(() => {
    LoadCategories();
  }, []);

  return (
    <div className="text-center mt-5">
      <h4>Add New Video</h4>
      <form onSubmit={formik.handleSubmit}>
        <dl>
          <dt>Video Id</dt>
          <dd>
            <input
              className="rounded p-1"
              type="number"
              onChange={formik.handleChange}
              name="VideoId"
            />
          </dd>
          <dt>Title</dt>
          <dd>
            <input
              className="rounded p-1"
              type="text"
              onChange={formik.handleChange}
              name="Title"
            />
          </dd>
          <dt>Url</dt>
          <dd>
            <input
              className="rounded p-1"
              type="text"
              onChange={formik.handleChange}
              name="Url"
            />
          </dd>
          <dt>Likes</dt>
          <dd>
            <input
              className="rounded p-1"
              type="number"
              onChange={formik.handleChange}
              name="Likes"
            />
          </dd>
          <dt>Comments</dt>
          <dd>
            <input
              className="rounded p-1"
              type="text"
              onChange={formik.handleChange}
              name="Comments"
            />
          </dd>
          <dt>Category</dt>
          <dd>
            <select
              className="rounded p-1"
              name="Category_Id"
              onChange={formik.handleChange}
            >
              {categories.map((category) => (
                <option value={category.Category_Id} key={category.Category_Id}>
                  {category.CategoryName.toUpperCase()}
                </option>
              ))}
            </select>
          </dd>
        </dl>
        <button className="btn btn-primary ps-5 pe-5">Add</button>
      </form>
    </div>
  );
}
