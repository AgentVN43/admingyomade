import { Card, Col, Pagination, Row, Spin } from "antd";
import React, { useEffect, useState } from "react";
import UploadImg from "../Blog/upload";

export default function Media() {
  const [gallery, setGallery] = useState([]);

  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0);

  const fetchData = async (page) => {
    setLoading(true); // Start loading
    try {
      const response = await fetch(
        `https://gyomade.vn/mvc/images?page_number=${page}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setGallery(data.images);
      setPageSize(data.page_size); // Keep track of the page size from the backend
      setPageNumber(data.page_number);
      setTotalEntries(data.total_entries); // Set total number of entries
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchData(pageNumber);
  }, [pageNumber]);

  const handlePageChange = (page) => {
    setPageNumber(page); // Only handle page number changes
  };

  return (
    <>
      <div style={{ padding: "20px" }}>
        <UploadImg />
        {loading ? (
          <Spin size="large" />
        ) : (
          <>
            <Row gutter={[16, 16]}>
              {gallery.map((item) => (
                <Col xs={24} sm={12} md={8} lg={6} key={item.id}>
                  <Card
                    hoverable
                    cover={
                      <img
                        alt={`${item.id}`}
                        src={item.url_image}
                        style={{ width: "100%", height: "50%" }}
                      />
                    }
                  >
                  </Card>
                </Col>
              ))}
            </Row>
            <Pagination
              current={pageNumber}
              pageSize={pageSize} // Keep using the page size from the backend
              total={totalEntries} // Set total number of entries
              onChange={handlePageChange}
              style={{ marginTop: "20px", textAlign: "center" }}
            />
          </>
        )}
      </div>
    </>
  );
}
