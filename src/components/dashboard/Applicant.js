import { map } from "lodash";
import Q from "q";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { Card, CardBody, CardSubtitle, CardTitle, Table } from "reactstrap";
import Loading from "../loading";
import Popup from "../popup/popup";
import { useLocation } from "react-router-dom/dist";

const Applicant = () => {
  const [applicantData, setApplicantData] = useState("");
  const [orderData, setOrderData] = useState("");
  const { orderId } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const status = searchParams.get("status");
  const [selectedImage, setSelectedImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const callback = useRef(null);
  const [modal, setModal] = useState({
    title: "Confirm Modal",
    body: "Do you want to continue?",
    yesText: "Ok",
    visible: false,
    onNo: () => setModal({ ...modal, visible: false }),
  });

  const callDeleteApplicant = useCallback(async (id) => {
    const response = await fetch(
      `https://demo.annk.info/api/applicants/delete/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  }, []);

  const fetchApplicantData = useCallback(async () => {
    setLoading(true);
    try {
      let result = [];
      if (status === "order") {
        const response = await fetch(
          `https://demo.annk.info/api/applicants/${orderId}`
        );
        const resultTmp = await response.json();
        result = resultTmp
          .filter((applicant) => applicant.status === "new")
          .reverse();
      } else {
        const response = await fetch(
          `https://demo.annk.info/api/applicants/applicant-detail/${orderId}`
        );
        result.push(await response.json());
      }
      setApplicantData(result);
      const id = sessionStorage.getItem("orderId");
      const orderRes = await fetch(`https://demo.annk.info/api/orders/${id}`);
      const orderData = await orderRes.json();
      setOrderData(orderData);
    } catch (error) {
      console.error("Error fetching applicant data:", error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (orderId) {
      fetchApplicantData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handlePopupClose = (event) => {
    event.preventDefault(); // Prevent default behavior
    setSelectedImage(null);
  };

  const callUpdateApplicant = useCallback(async (id) => {
    const nextStatus = {
      order: "process",
      process: "submit",
      submit: "done",
    };
    const bodyReq = {
      status: nextStatus[status],
    };
    const response = await fetch(
      `https://demo.annk.info/api/applicants/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyReq),
      }
    );
    return response;
  }, []);

  const updateApplicantStatus = async (id) => {
    setLoading(true);
    Q.when(callUpdateApplicant(id))
      .then((res) => {
        if (res.ok) {
          if (status === "order") {
            Q.when(callCheckNewApplicant(orderId)).then(async (res) => {
              if (res.ok) {
                const dataRes = await res.json();
                if (dataRes.data === 0) {
                  switch (status) {
                    case "order":
                      window.location.href = "/order";
                      break;
                    case "process":
                      window.location.href = "/process";
                      break;
                    case "submit":
                      window.location.href = "/submit";
                      break;
                    case "done":
                      window.location.href = "/done";
                      break;
                    default:
                      break;
                  }
                } else {
                  if (orderId) {
                    fetchApplicantData();
                  }
                }
              }
            });
          } else {
            switch (status) {
              case "process":
                window.location.href = "/process";
                break;
              case "submit":
                window.location.href = "/submit";
                break;
              case "done":
                window.location.href = "/done";
                break;
              default:
                break;
            }
          }
        }
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  };

  const callCheckNewApplicant = useCallback(async (oderId) => {
    const response = await fetch(
      `https://demo.annk.info/api/applicants/check-new/${oderId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  }, []);

  const deleteApplicant = (id, orderId) => {
    setLoading(true);
    Q.when(callDeleteApplicant(id))
      .then((res) => {
        if (res.ok) {
          if (status === "order") {
            Q.when(callCheckNewApplicant(orderId)).then(async (res) => {
              if (res.ok) {
                const dataRes = await res.json();
                if (dataRes.data === 0) {
                  switch (status) {
                    case "order":
                      window.location.href = "/order";
                      break;
                    case "process":
                      window.location.href = "/process";
                      break;
                    case "submit":
                      window.location.href = "/submit";
                      break;
                    case "done":
                      window.location.href = "/done";
                      break;
                    default:
                      break;
                  }
                } else {
                  if (orderId) {
                    fetchApplicantData();
                  }
                }
              }
            });
          } else {
            switch (status) {
              case "process":
                window.location.href = "/process";
                break;
              case "submit":
                window.location.href = "/submit";
                break;
              case "done":
                window.location.href = "/done";
                break;
              default:
                break;
            }
          }
        }
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  };

  return (
    <>
      {loading && <Loading />}
      <div
        className="modal show"
        style={{ display: "block", position: "initial" }}
      >
        <Modal show={modal.visible} onClick={() => modal.onNo()}>
          <Modal.Header closeButton>
            <Modal.Title>{modal.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{modal.body}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => modal.onNo()}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                callback.current();
              }}
            >
              {modal.yesText}
            </Button>
          </Modal.Footer>
        </Modal>
        <Card>
          <CardBody>
            <Link
              style={{
                cursor: "pointer",
                textDecoration: "none",
              }}
              onClick={() => {
                window.history.back();
              }}
            >
              <i className="bi bi-arrow-left-short" />
              Back
            </Link>
            <CardTitle tag="h5" className="mt-3">
              Order ID: {orderId}
            </CardTitle>
            <CardSubtitle className="mb-2 text-muted" tag="h6">
              <p>
                Người liên hệ: {orderData.fullName}
                {" - "}
                {orderData.phoneNumber}
              </p>
              <p>
                Giá trị: {orderData.totalPrices} USD ~{" "}
                {(24000 * orderData.totalPrices).toLocaleString("en-US", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
            </CardSubtitle>

            <Table className="no-wrap mt-3 align-middle" responsive borderless>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Full Name</th>
                  <th>Nationality</th>
                  <th>Passport</th>
                  <th>Arrival</th>
                  <th>Expiry</th>
                  <th>Portrait</th>
                  <th>Passport</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {map(applicantData, (row) => (
                  <tr key={row.id}>
                    <td>{row.orderId}</td>

                    <td>{row.fullName}</td>
                    <td>{row.nationality}</td>
                    <td>{row.passportNumber}</td>
                    <td>{new Date(row.issue).toLocaleDateString("en-GB")}</td>
                    <td>{new Date(row.expiry).toLocaleDateString("en-GB")}</td>
                    <td style={{ width: "100px" }}>
                      <img
                        src={row.portraitData}
                        alt="portrait"
                        width={"100%"}
                        onClick={() => handleImageClick(row.portraitData)}
                      />
                    </td>
                    <td style={{ width: "100px" }}>
                      <img
                        src={row.passportData}
                        alt="passport"
                        width={"100%"}
                        onClick={() => handleImageClick(row.passportData)}
                      />
                    </td>
                    <td>
                      <td>
                        <button
                          style={{ border: "none", backgroundColor: "white" }}
                          onClick={() => {
                            callback.current = () =>
                              updateApplicantStatus(row._id);
                            setModal({
                              ...modal,
                              title: "Change status",
                              body: "Do you want to change the status of this profile?",
                              visible: true,
                            });
                          }}
                        >
                          <i
                            className="bi bi-check-circle"
                            style={{ color: "green" }}
                          ></i>
                        </button>
                        <button
                          style={{ border: "none", backgroundColor: "white" }}
                          onClick={() => {
                            callback.current = () =>
                              deleteApplicant(row._id, row.orderId);
                            setModal({
                              ...modal,
                              title: "Confirm delete",
                              body: "Do you want to delete this profile?",
                              visible: true,
                            });
                          }}
                        >
                          <i
                            className="bi bi-x-circle"
                            style={{ color: "red" }}
                          ></i>
                        </button>
                      </td>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
          {selectedImage && (
            <Popup imageURL={selectedImage} onClose={handlePopupClose} />
          )}
        </Card>
      </div>
    </>
  );
};

export default Applicant;
