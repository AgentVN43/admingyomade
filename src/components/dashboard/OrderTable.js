import { map } from "lodash";
import Q from "q";
import { useEffect, useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Card, CardBody, CardSubtitle, CardTitle, Table } from "reactstrap";
import Loading from "../loading";

const OrderTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const callback = useRef(null);
  const [modal, setModal] = useState({
    title: "Confirm Modal",
    body: "Do you want to continue?",
    yesText: "Ok",
    visible: false,
    onNo: () => setModal({ ...modal, visible: false }),
  });

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch("https://demo.annk.info/api/orders");
    const result = await response.json();

    const newData = result
      .filter((order) => order.status === "new" || order.status === "draft")
      .reverse();

    setData(newData);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateOrder = async (orderID) => {
    setLoading(true);
    const apiUrl = `https://demo.annk.info/api/orders/${orderID}`;
    Q.when(
      fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "process",
        }),
      })
    )
      .then(async () => {
        const response = await fetch(
          `https://demo.annk.info/api/applicants/${orderID}`
        );
        const resultTmp = await response.json();
        return resultTmp
          .filter((applicant) => applicant.status === "new")
          .reverse();
      })
      .then((applicants) => {
        return map(applicants, async (applicant) => {
          await fetch(
            `https://demo.annk.info/api/applicants/${applicant._id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ status: "process" }),
            }
          );
        });
      })
      .catch((e) => console.log(e))
      .finally(() => {
        fetchData();
        setLoading(false);
      });
  };

  const deleteOrder = async (orderID) => {
    setLoading(true);
    try {
      const apiUrl = `https://demo.annk.info/api/orders/delete/${orderID}`;
      await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error updating order status:", error);
    }
    fetchData();
  };

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
            <CardTitle tag="h5">Order Listing</CardTitle>
            <CardSubtitle className="mb-2 text-muted" tag="h6">
              Overview of the applicant
            </CardSubtitle>

            <Table className="no-wrap mt-3 align-middle" responsive borderless>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Phone</th>
                  <th>Name</th>
                  <th>Total</th>
                  <th>Services</th>
                  <th>Purpose</th>
                  <th>Port Entry</th>
                  <th>Arrival Date</th>
                  <th>Fast Track</th>
                  <th>Total Prices</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {map(data, (row) => (
                  <>
                    <tr key={row.id}>
                      <td>
                        {row?.status === "draft" ? (
                          row.orderId
                        ) : (
                          <Link
                            to={`/apply/${row.orderId}?status=order`} // Replace "#" with your actual link or use a proper route
                            style={{
                              cursor: "pointer",
                              textDecoration: "none",
                            }}
                            onClick={() =>
                              sessionStorage.setItem("orderId", row.orderId)
                            }
                          >
                            {row.orderId}
                          </Link>
                        )}
                      </td>
                      <td>{row.phoneNumber}</td>
                      <td>{row.fullName}</td>
                      <td>{row.applicant}</td>
                      <td>
                        {row.services === "40"
                          ? "E-visa single"
                          : row.services === "65"
                          ? "E-visa multiple"
                          : ""}
                      </td>
                      <td>
                        {row.purpose === "1"
                          ? "Tourist"
                          : row.services === "2"
                          ? "Business"
                          : ""}
                      </td>

                      <td>{row.portentry}</td>
                      <td>
                        {new Date(row.arrivaldate).toLocaleDateString("en-GB")}
                      </td>
                      <td>
                        {row.otherServices === "20"
                          ? "Standard"
                          : row.services === "27"
                          ? "VIP"
                          : ""}
                      </td>
                      <td>{row.totalPrices}</td>
                      <td>{row.status}</td>
                      <td>
                        {row?.status === "draft" ? (
                          <></>
                          // <button
                          //   style={{ border: "none", backgroundColor: "white" }}
                          //   // TODO: add edit form
                          // >
                          //   <i
                          //     className="bi bi-pencil-square"
                          //     style={{ color: "blue" }}
                          //   ></i>
                          // </button>
                        ) : (
                          <button
                            style={{ border: "none", backgroundColor: "white" }}
                            onClick={() => {
                              callback.current = () => updateOrder(row.orderId);
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
                        )}
                        <button
                          style={{ border: "none", backgroundColor: "white" }}
                          onClick={() => {
                            callback.current = () => deleteOrder(row.orderId);
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
        </Card>
      </div>
    </div>
  );
};

export default OrderTable;
