import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./index.scss";
import { Col, Container, Image, Row } from "react-bootstrap";

const Media = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [allImages, setAllImages] = useState([]);

  const [note, setNote] = useState("");
  const { id } = useParams();

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`https://gyomade.vn/mvc/images`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setAllImages(data.images);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpload = () => {
    if (!selectedImage) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);
    formData.append("product_id", id);
    formData.append("note", note);

    fetch("https://cdn.annk.info/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          alert("Image uploaded successfully!");
          setSelectedImage(null);
          setNote("");
          fetchData();
        } else {
          alert("Error uploading image.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error uploading image.");
      });
  };

  console.log(allImages);

  return (
    <>
      <div>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <input
          type="text"
          placeholder="Alt tex for SEO"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button onClick={handleUpload}>Upload</button>
        {selectedImage && (
          <div>
            <h2>Selected Image:</h2>
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected"
              style={{ maxWidth: "10%" }}
            />
          </div>
        )}
      </div>
      <Container>
        <Row>
          {allImages.map((image, index) => (
            <Col md={4} key={index}>
              <div className="img-card">
                <Image
                  style={{ width: "300px", height: "300px" }}
                  thumbnail
                  src={image.url_image}
                  alt={`Image ${index + 1}`}
                />
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Media;
