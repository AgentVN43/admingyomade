import { Col, Row } from "reactstrap";
import OrderTable from "../../components/dashboard/OrderTable";

const Order = () => {
  return (
    <Row>
      <Col lg="12">
        <OrderTable />
      </Col>
    </Row>
  );
};

export default Order;
