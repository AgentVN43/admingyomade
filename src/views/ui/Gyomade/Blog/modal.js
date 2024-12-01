import { Modal, Button, Row, Col, Image, Checkbox } from "antd";
import React, { useState } from "react";
// import "antd/dist/antd.css";

export default function ImageSelectModal({
  visible,
  toggle,
  allImages,
  handleImageSelect,
  insertSelectedImage,
}) {
  const [selectedImages, setSelectedImages] = useState([]);

  const handleCheckboxChange = (url) => {
    setSelectedImages((prevSelected) =>
      prevSelected.includes(url)
        ? prevSelected.filter((img) => img !== url)
        : [...prevSelected, url]
    );
  };

  const handleInsert = () => {
    if (selectedImages.length > 0) {
      handleImageSelect(selectedImages); // Ensure selected images are passed to the parent
      setSelectedImages([]);
      insertSelectedImage(); // Call the insert function
    }
  };

  console.log(selectedImages);

  return (
    // <Modal
    //   visible={visible}
    //   onCancel={toggle}
    //   footer={null}
    //   title="Select Image"
    //   centered
    //   width={800}
    //   bodyStyle={{ padding: "16px 24px" }}
    //   destroyOnClose
    // >
    //   <Row gutter={16}>
    //     {allImages.map((image, index) => (
    //       <Col span={6} key={index}>
    //         <div
    //           className="img-card"
    //           style={{
    //             border: "1px solid #e8e8e8",
    //             borderRadius: "4px",
    //             overflow: "hidden",
    //             cursor: "pointer",
    //             marginBottom: "16px",
    //             transition: "transform 0.3s ease",
    //           }}
    //           onClick={() => handleImageSelect(image.url_image)}
    //         >
    //           <Image
    //             src={image.url_image}
    //             alt={`Image ${index + 1}`}
    //             style={{
    //               width: "100%",
    //               height: "200px",
    //               objectFit: "cover",
    //             }}
    //           />
    //         </div>
    //       </Col>
    //     ))}
    //   </Row>
    //   <div
    //     style={{
    //       textAlign: "right",
    //       marginTop: "24px",
    //     }}
    //   >
    //     <Button type="primary" onClick={insertSelectedImage}>
    //       Insert Image
    //     </Button>
    //     <Button style={{ marginLeft: "8px" }} onClick={toggle}>
    //       Cancel
    //     </Button>
    //   </div>
    // </Modal>
    <Modal
      visible={visible}
      onCancel={() => {
        toggle();
        setSelectedImages([]);
      }}
      footer={null}
      title="Select Images"
      centered
      width={800}
      bodyStyle={{ padding: "16px 24px" }}
      destroyOnClose
    >
      <Row gutter={16}>
        {allImages.map((image, index) => (
          <Col span={6} key={index} style={{ position: "relative" }}>
            <div
              className="img-card"
              style={{
                border: "1px solid #e8e8e8",
                borderRadius: "4px",
                overflow: "hidden",
                marginBottom: "16px",
                transition: "transform 0.3s ease",
              }}
            >
              <Checkbox
                checked={selectedImages.includes(image.url_image)}
                onChange={() => handleCheckboxChange(image.url_image)}
                style={{ position: "absolute", zIndex: 1, top: 8, left: 8 }}
              />
              <Image
                src={image.url_image}
                alt={`Image ${index + 1}`}
                style={{
                  width: "100%", // Adjust width to fit container
                  maxHeight: "200px", // Set max height to control the size
                  objectFit: "contain", // Adjust to ensure the image fits within dimensions
                }}
              />
            </div>
          </Col>
        ))}
      </Row>
      <div
        style={{
          textAlign: "right",
          marginTop: "24px",
        }}
      >
        <Button type="primary" onClick={handleInsert}>
          Insert Images
        </Button>
        <Button style={{ marginLeft: "8px" }} onClick={toggle}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
}
