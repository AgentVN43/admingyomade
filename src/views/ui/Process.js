import { Col, Row } from "reactstrap";
import ProcessTable from "../../components/dashboard/ProcessTable";

const Process  = () => {
  return (
    <Row>
      <Col lg="12">
        <ProcessTable />
      </Col>
    </Row>
  );
};

export default Process;
