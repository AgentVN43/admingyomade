import { map, get } from "lodash";
import Q from "q";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardSubtitle, CardTitle, Table } from "reactstrap";
import Popup from "../popup/popup";
import Loading from "../loading";

export const airport = [
  { value: "HAN", label: "HAN - Hanoi - Noi Bai Airport" },
  { value: "SGN", label: "SGN - Ho Chi Minh - Tan Son Nhat  Airport" },
  { value: "DAD", label: "DAD - Danang - Da Nang  Airport" },
  { value: "VDO", label: "VDO - Quang Ninh - Van Don  Airport" },
  { value: "HPH", label: "HPH - Hai Phong - Cat Bi  Airport" },
  { value: "VII", label: "VII - Nghe An - Vinh  Airport" },
  { value: "HUI", label: "HUI - Hue - Phu Bai  Airport" },
  { value: "CXR", label: "CXR - Khanh Hoa - Cam Ranh  Airport" },
  { value: "DLI", label: "DLI - Lam Dong - Lien Khuong  Airport" },
  { value: "UIH", label: "UIH - Pacify - Phu Cat  Airport" },
  { value: "VCA", label: "VCA - Can Tho - Can Tho  Airport" },
  { value: "PQC", label: "PQC - Kien Giang - Phu Quoc  Airport" },
];

const DoneTable = () => {
  const [data, setData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const init = useCallback(() => {
    setLoading(true);
    Q.when(fetch("https://demo.annk.info/api/applicants/applicant-status/done"))
      .then(async (res) => {
        if (res.ok) {
          const resData = await res.json();
          const dataDetail = map(resData, (item) => {
            return {
              order: { ...item.order._doc },
              applicant: { ...item.applicant._doc },
            };
          });
          console.log(dataDetail);
          setData(dataDetail);
        }
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    init();
  }, []);

  const handlePopupClose = (event) => {
    event.preventDefault(); // Prevent default behavior
    setSelectedImage(null);
  };

  return (
    <div>
      {loading && <Loading />}
      <Card>
        <CardBody>
          <CardTitle tag="h5">Order Listing</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Overview of the applicant
          </CardSubtitle>

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
              </tr>
            </thead>
            <tbody>
              {map(data, (row) => (
                <>
                  <tr key={get(row, "applicant._id")}>
                    <td>
                      <Link
                        to={`/apply/${get(row, "applicant._id")}?status=done`} // Replace "#" with your actual link or use a proper route
                        style={{
                          cursor: "pointer",
                          textDecoration: "none",
                        }}
                        onClick={() =>
                          sessionStorage.setItem("orderId", row.order.orderId)
                        }
                      >
                        {get(row, "applicant.orderId")}
                      </Link>
                    </td>
                    <td>{get(row, "order.fullName")}</td>
                    <td>{get(row, "order.phoneNumber")}</td>
                    <td>{get(row, "applicant.fullName")}</td>
                    <td>
                      {get(row, "order.services") === "40"
                        ? "E-visa single"
                        : get(row, "order.services") === "65"
                        ? "E-visa multiple"
                        : ""}
                    </td>
                    <td>
                      {get(row, "order.otherServices") === "20"
                        ? "Standard"
                        : get(row, "services") === "27"
                        ? "VIP"
                        : ""}
                    </td>
                    <td style={{ width: "100px" }}>
                      <img
                        src={get(row, "applicant.portraitData")}
                        alt="portrait"
                        width={"100%"}
                        onClick={() =>
                          setSelectedImage(get(row, "applicant.portraitData"))
                        }
                      />
                    </td>
                    <td style={{ width: "100px" }}>
                      <img
                        src={get(row, "applicant.passportData")}
                        alt="passport"
                        width={"100%"}
                        onClick={() =>
                          setSelectedImage(get(row, "applicant.passportData"))
                        }
                      />
                    </td>
                    {/* <td>
  
                    <button
                        style={{ border: "none", backgroundColor: "white" }}
                        // onClick={() => updateOrder(row.orderId)}
                      >
                        <i
                          className="bi bi-check-circle"
                          style={{ color: "green" }}
                        ></i>
                      </button>

                      <button
                        style={{ border: "none", backgroundColor: "white" }}
                        // onClick={() => cancelOrder(row.orderId)}
                      >
                        <i
                          className="bi bi-x-circle"
                          style={{ color: "red" }}
                        ></i>
                      </button>
                    </td> */}
                  </tr>
                </>
              ))}
            </tbody>
          </Table>
        </CardBody>
        {selectedImage && (
          <Popup imageURL={selectedImage} onClose={handlePopupClose} />
        )}
      </Card>
    </div>
  );
};

export default DoneTable;
