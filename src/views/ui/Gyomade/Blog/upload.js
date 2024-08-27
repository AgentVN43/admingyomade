import React, { useState } from "react";
import { Form, Upload, Modal, Input, Button, Spin, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";

const UploadImg = ({ productId }) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePreview = (file) => {
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };

  const handleChange = ({ fileList }) => {
    setFileList(
      fileList.map((file) => {
        if (!file.url && !file.preview) {
          file.preview = URL.createObjectURL(file.originFileObj);
        }
        return file;
      })
    );
  };

  const handleCancel = () => setPreviewVisible(false);

  const handleSubmit = async () => {
    if (fileList.length === 0) {
      message.error("Please select at least one image");
      return;
    }

    setLoading(true);

    try {
      const file = fileList[0];
      const formData = new FormData();
      formData.append("image", file.originFileObj);
      formData.append("product_id", null);
      formData.append("note", null);

      const response = await axios.post(
        "https://gyomade.vn/mvc/images/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Extract the single URL from the response
      const { url_image } = response.data.data;
      if (url_image) {
        console.log("Uploaded Image URL:", url_image);
        message.success("Image uploaded successfully");
        // You can now use the `url_image` as needed
      } else {
        message.error("Failed to get image URL from the server.");
      }

      setFileList([]);
      setNote("");
    } catch (error) {
      message.error("An error occurred while uploading the image");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">Select Images</div>
    </div>
  );

  return (
    <>
      <Form layout="vertical">
        <Form.Item label="Upload Images">
          <Upload
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            beforeUpload={() => false} // Prevent auto upload
          >
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleSubmit} loading={loading}>
            Upload Images
          </Button>
        </Form.Item>
      </Form>
      <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};

export default UploadImg;
