import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Listblog() {
  const [post, setPost] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://gyomade.vn/mvc/blog/`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const FormattedDate = ({ dateString }) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so we add 1
    const year = date.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    return <span>{formattedDate}</span>;
  };

  return (
    <table
      className="table table-row-dashed table-row-gray-300 gy-7"
      style={{ width: "100%", borderCollapse: "collapse" }}
    >
      <thead>
        <tr
          className="fw-bolder fs-6 text-gray-800"
          style={{
            position: "sticky",
            top: "0",
            zIndex: "1",
            backgroundColor: "#f2f2f2",
          }}
        >
          <th>Title</th>
          <th>Create Date</th>
          <th>Update Date</th>
        </tr>
      </thead>
      <tbody>
        {post.contents?.map((item) => (
          <tr key={item.id}>
            <td>
              <Link to={`/blog/edit/${item.id}`}>{item.title}</Link>
            </td>
            <td>
              <FormattedDate dateString={item.created_at} />
            </td>
            <td>
              <FormattedDate dateString={item.updated_at} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
