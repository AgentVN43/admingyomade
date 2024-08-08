import { map } from "lodash";
import Q from "q";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardSubtitle, CardTitle, Table } from "reactstrap";
import Loading from "../loading";
import Popup from "../popup/popup";
import { Button, Modal } from "react-bootstrap";

const ProcessTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
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

  const callUpdateApplicant = useCallback(async (id) => {
    const bodyReq = {
      status: "submit",
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
          setLoading(false);
          alert("Updated successfully");
        }
      })
      .catch((e) => console.log(e))
      .finally(() => init());
  };

  const deleteApplicant = (id) => {
    setLoading(true);
    Q.when(callDeleteApplicant(id))
      .then((res) => {
        if (res.ok) {
          setLoading(false);
          alert("Deleted successfully");
        }
      })
      .catch((e) => console.log(e))
      .finally(() => init());
  };

  const init = useCallback(() => {
    setLoading(true);
    Q.when(
      fetch("https://demo.annk.info/api/applicants/applicant-status/process")
    )
      .then(async (res) => {
        if (res.ok) {
          const resData = await res.json();
          const dataDetail = map(resData, (item) => {
            return {
              order: { ...item.order._doc },
              applicant: { ...item.applicant._doc },
            };
          });
          setData(dataDetail);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    init();
  }, []);

  return (
    <div>
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
            <CardTitle tag="h5">ĐƠN HÀNG ĐANG XỬ LÝ</CardTitle>
            <CardSubtitle className="mb-2 text-muted" tag="h6"></CardSubtitle>

            <Table className="no-wrap mt-3 align-middle" responsive borderless>
              <thead>
                <tr>
                  <th>OrderID</th>
                  <th>Order Name</th>
                  <th>Phone</th>
                  <th>Applicant Name</th>
                  <th>Services</th>
                  <th>Fast Track</th>
                  <th>Portrait</th>
                  <th>Passport</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {map(data, (row) => (
                  <>
                    <tr key={row.applicant._id}>
                      <td>
                        <Link
                          to={`/apply/${row.applicant._id}?status=process`} // Replace "#" with your actual link or use a proper route
                          style={{
                            cursor: "pointer",
                            textDecoration: "none",
                          }}
                          onClick={() =>
                            sessionStorage.setItem("orderId", row.order.orderId)
                          }
                        >
                          {row.applicant.orderId}
                        </Link>
                      </td>
                      <td>{row.order.fullName}</td>
                      <td>{row.order.phoneNumber}</td>
                      <td>{row.applicant.fullName}</td>
                      <td>
                        {row.order.services === "40"
                          ? "E-visa single"
                          : row.order.services === "65"
                          ? "E-visa multiple"
                          : ""}
                      </td>
                      <td>
                        {row.order.otherServices === "20"
                          ? "Standard"
                          : row.services === "27"
                          ? "VIP"
                          : ""}
                      </td>
                      <td style={{ width: "100px" }}>
                        <img
                          src={row.applicant.portraitData}
                          alt="portrait"
                          width={"100%"}
                          onClick={() =>
                            setSelectedImage(row.applicant.portraitData)
                          }
                        />
                      </td>
                      <td style={{ width: "100px" }}>
                        <img
                          src={row.applicant.passportData}
                          alt="passport"
                          width={"100%"}
                          onClick={() =>
                            setSelectedImage(row.applicant.passportData)
                          }
                        />
                      </td>
                      <td>
                        <button
                          style={{ border: "none", backgroundColor: "white" }}
                          onClick={() => {
                            callback.current = () =>
                              updateApplicantStatus(row.applicant._id);
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
                              deleteApplicant(row.applicant._id);
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
                    </tr>
                  </>
                ))}
              </tbody>
            </Table>
          </CardBody>
          {selectedImage && (
            <Popup
              imageURL={selectedImage}
              onClose={(e) => {
                e.preventDefault(); // Prevent default behavior
                setSelectedImage(null);
              }}
            />
          )}
        </Card>
      </div>
    </div>
  );
};

export default ProcessTable;
