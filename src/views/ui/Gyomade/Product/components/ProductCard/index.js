import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

export default function ProductCard({ product }) {
  console.log(product);
  return (
    <Container>
      <Row xs={1} md={3} className="g-4">
        {product.map((item) => (
          <Col key={item.id}>
            <Card style={{ width: "100%" }}>
              <Card.Img variant="top" src={item.images} />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
                <Card.Text>Price: {item.price}</Card.Text>
                <Card.Text>Category: {item.barcode}-{item.display_id}</Card.Text>
                <Card.Text>Remain quantity: {item.remain_quantity}</Card.Text>
                <Card.Text>Size: {item.size}</Card.Text>
                <Button variant="primary">Add to Cart</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
