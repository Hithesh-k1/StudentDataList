import React, { useState } from "react";
import { Col, Input, Row, Button } from "antd";
import firebaseDb from "../Service/firebase";

const AddUserForm = (props) => {
  const initialFormState = { name: "", regNo: "", totalMark: "" };
  const [user, setUser] = useState(initialFormState);

  const inputHandler = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };
  const handleAdd = () => {
    firebaseDb.child("student").push(user);
    setUser(initialFormState);
  };
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <label>Name</label>
          <Input
            type="text"
            name="name"
            placeholder="Enter a name..."
            value={user.name}
            onChange={inputHandler}
          />
        </Col>
        <Col span={8}>
          <label>Reg. no</label>
          <Input
            type="text"
            name="regNo"
            placeholder="Enter a Reg No..."
            value={user.regNo}
            onChange={inputHandler}
          />
        </Col>
        <Col span={8}>
          <label>Total Mark</label>
          <Input
            type="text"
            name="totalMark"
            placeholder="Enter Total mark..."
            value={user.totalMark}
            onChange={inputHandler}
          />
        </Col>
      </Row>
      <Button type="primary" onClick={handleAdd}>
        Add New User
      </Button>
    </>
  );
};

export default AddUserForm;
