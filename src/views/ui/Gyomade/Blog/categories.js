import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Button, Input } from "reactstrap";

export default function Categories() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [categories, setCategories] = useState([]);

  const handleChange = (e) => {
    const newName = e.target.value;

    setName(newName);

    const newSlug = generateSlug(newName);
    setSlug(newSlug);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`https://gyomade.vn/mvc/blog/categories`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const content = {
      name: name,
      slug: slug,
    };

    if (!content.name) {
      console.error("Editor content is empty or undefined");
      return;
    }

    try {
      const response = await fetch(
        `https://gyomade.vn/mvc/blog/categories/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ contentdata: content }),
        }
      );

      if (response.ok) {
        console.log("Editor content submitted successfully:", content);
        setName("");
        setSlug("");
        fetchData();
      } else {
        console.error("Error submitting editor content:", response.status);
      }
    } catch (error) {
      console.error("Error submitting editor content:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const generateSlug = (name) => {
    const asciiName = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    return asciiName
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with dash
      .replace(/[^\w-]+/g, ""); // Remove non-word characters except dash
  };

  return (
    <Container>
      <Row>
        <Col md={4}>
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={handleChange}
          />
          <Input type="text" placeholder="Slug" value={slug} readOnly />
          <Button color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Col>
        <Col md={8}>
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
                <th>ID</th>
                <th>Name</th>
                <th>Slug</th>
              </tr>
            </thead>
            <tbody>
              {categories.categories?.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.slug}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
      </Row>
    </Container>
  );
}
