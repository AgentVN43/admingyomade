import { Button, Col, Image, Modal, Radio, Row, Tabs } from "antd";
import React, { useState } from "react";
import UploadImg from "../Blog/upload";

export default function MediaModal({ onSelectImage }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allImages, setAllImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const showModal = () => {
    setIsModalOpen(true);
    setSelectedImage("");
    fetchMedia();
  };

  const handleOk = (url_image) => {
    setIsModalOpen(false);
    onSelectImage(selectedImage);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedImage("");
  };

  const fetchMedia = async () => {
    try {
      const response = await fetch(`https://gyomade.vn/mvc/images`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      const sortedProducts = data.images.sort(
        (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
      );

      setAllImages(sortedProducts);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleImageClick = (url_image) => {
    setSelectedImage(url_image);
    console.log(url_image);
  };

  return (
    <>
      <Button onClick={showModal}>Featured Images</Button>
      <Modal
        title="Ảnh bìa bài viết"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null} // This removes the default OK and Cancel buttons
      >
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Hình ảnh" key="1">
            <Radio.Group value={selectedImage}>
              <Row gutter={[16, 16]}>
                {allImages.map((image) => (
                  <Col key={image.id} xs={24} sm={12} md={8} lg={6}>
                    <div
                      className="img-card"
                      onClick={() => handleImageClick(image.url_image)}
                      style={{
                        position: "relative",
                        cursor: "pointer",
                        border:
                          selectedImage === image.url_image
                            ? "2px solid #1890ff"
                            : "none",
                        padding: "10px",
                      }}
                    >
                      <img
                        src={image.url_image}
                        alt={`${image.id}`}
                        style={{
                          width: "100%",
                          height: "150px",
                          objectFit: "cover",
                        }}
                      />
                      <Radio
                        value={image.url_image}
                        style={{
                          position: "absolute",
                          top: "10px",
                          right: "10px",
                        }}
                      />
                    </div>
                  </Col>
                ))}
              </Row>
            </Radio.Group>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Upload" key="2">
            <UploadImg />
          </Tabs.TabPane>
        </Tabs>
        <Button type="primary" onClick={handleOk}>
          Select Image
        </Button>
      </Modal>
      <div style={{ padding: "5px 0px 5px 0px" }}>
        <Image width={200} src={selectedImage} />
      </div>
    </>
  );
}
