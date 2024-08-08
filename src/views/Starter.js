import { Col, Row } from "reactstrap";
import SalesChart from "../components/dashboard/SalesChart";
import Feeds from "../components/dashboard/Feeds";
import ProjectTables from "../components/dashboard/ProjectTable";
import TopCards from "../components/dashboard/TopCards";
import Blog from "../components/dashboard/Blog";
import bg1 from "../assets/images/bg/bg1.jpg";
import bg2 from "../assets/images/bg/bg2.jpg";
import bg3 from "../assets/images/bg/bg3.jpg";
import bg4 from "../assets/images/bg/bg4.jpg";
import { useEffect, useState } from "react";

const BlogData = [
  {
    image: bg1,
    title: "This is simple blog",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
  {
    image: bg2,
    title: "Lets be simple blog",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
  {
    image: bg3,
    title: "Don't Lamp blog",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
  {
    image: bg4,
    title: "Simple is beautiful",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
];

const Starter = () => {
  const [totalOrders, setTotalOrder] = useState([]);
  const [totalOrdersNew, setTotalOrderNew] = useState([]);
  const [cancel, setCancel] = useState([]);

  const [totalApplicants, setTotalApplicants] = useState([]);
  const [totalProcess, setTotalProcess] = useState([]);
  const [totalDone, setTotalDone] = useState([]);

  const fetchData = async () => {
    const order = await fetch("https://demo.annk.info/api/orders");
    const orders = await order.json();

    const newData = orders.filter((order) => order.status === "new");
    const cancelData = orders.filter((order) => order.status === "cancel");

    setTotalOrder(orders.length);
    setTotalOrderNew(newData.length);
    setCancel(cancelData.length);

    const applicant = await fetch("https://demo.annk.info/api/applicants");
    const applicants = await applicant.json();

    const totalApplicants = applicants.filter(
      (applicant) => applicant.status === "confirm"
    );
    const totalProcess = applicants.filter(
      (applicant) => applicant.status === "process"
    );
    const totalDone = applicants.filter(
      (applicant) => applicant.status === "done"
    );

    setTotalApplicants(totalApplicants.length);
    setTotalProcess(totalProcess.length);
    setTotalDone(totalDone.length);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {/***Top Cards***/}
      <Row>
        <Col sm="6" lg="4">
          <TopCards
            bg="bg-light-success text-success"
            title="Total orders"
            subtitle="Tổng đơn hàng"
            earning={totalOrders}
            icon="bi bi-wallet"
          />
        </Col>
        <Col sm="6" lg="4">
          <TopCards
            bg="bg-light-danger text-danger"
            title="Refunds"
            subtitle="Tổng đơn mới"
            earning={totalOrdersNew}
            icon="bi bi-coin"
          />
        </Col>
        <Col sm="6" lg="4">
          <TopCards
            bg="bg-light-warning text-warning"
            title="New Project"
            subtitle="Tổng đơn hủy"
            earning={cancel}
            icon="bi bi-basket3"
          />
        </Col>
      </Row>
      <Row>
        <Col sm="6" lg="4">
          <TopCards
            bg="bg-light-info text-into"
            title="Sales"
            subtitle="Tổng hồ sơ"
            earning={totalApplicants}
            icon="bi bi-bag"
          />
        </Col>
        <Col sm="6" lg="4">
          <TopCards
            bg="bg-light-info text-into"
            title="Sales"
            subtitle="Tổng hồ sơ đã nộp"
            earning={totalProcess}
            icon="bi bi-bag"
          />
        </Col>
        <Col sm="6" lg="4">
          <TopCards
            bg="bg-light-info text-into"
            title="Sales"
            subtitle="Tổng hồ sơ hoàn tất"
            earning={totalDone}
            icon="bi bi-bag"
          />
        </Col>
      </Row>
      {/***Sales & Feed***/}
      <Row>
        <Col sm="6" lg="6" xl="7" xxl="8">
          <SalesChart />
        </Col>
        <Col sm="6" lg="6" xl="5" xxl="4">
          <Feeds />
        </Col>
      </Row>
      {/***Table ***/}
      <Row>
        <Col lg="12">
          <ProjectTables />
        </Col>
      </Row>
      {/***Blog Cards***/}
      <Row>
        {BlogData.map((blg, index) => (
          <Col sm="6" lg="6" xl="3" key={index}>
            <Blog
              image={blg.image}
              title={blg.title}
              subtitle={blg.subtitle}
              text={blg.description}
              color={blg.btnbg}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Starter;
