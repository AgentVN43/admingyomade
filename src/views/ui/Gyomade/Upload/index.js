import React, { useState } from "react";
import { Form, Upload, Modal, Input, Button, Spin, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";

const UploadImg3D = ({productId}) => {
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
    setFileList(fileList.map(file => {
      if (!file.url && !file.preview) {
        file.preview = URL.createObjectURL(file.originFileObj);
      }
      return file;
    }));
  };

  const handleCancel = () => setPreviewVisible(false);

  const handleSubmit = async () => {
    if (fileList.length === 0) {
      message.error("Please select at least one image");
      return;
    }

    setLoading(true);

    try {
      for (let file of fileList) {
        const formData = new FormData();
        formData.append('image', file.originFileObj);
        formData.append('product_id', productId.trim());
        formData.append('note', note.trim());

        await axios.post('https://gyomade.vn/mvc/images/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      message.success("All images uploaded successfully");
      setFileList([]);
      setNote("");
    } catch (error) {
      message.error("An error occurred while uploading images");
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
        <Form.Item label="Product ID">
          <Input
            value={productId}
            // onChange={e => setProductId(e.target.value)}
            placeholder="Enter product ID (optional)"
            readOnly
          />
        </Form.Item>
        <Form.Item label="Note">
          <Input
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="Enter note (optional)"
          />
        </Form.Item>
        <Form.Item label="Images">
          <Upload
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            beforeUpload={() => false}  // Prevent auto upload
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

export default UploadImg3D;