import { Col, Divider, Row } from "antd";
import React from "react";
import DataTable from "./DataTable";
import AddUserForm from "./UserForm/AddUserForm";

const App = () => {
  return (
    <div className="space-align-container">
      <Row gutter={[16, 16]}>
        <Col span={20} offset={2}>
          <AddUserForm />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={20} offset={2}>
          <Divider />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={20} offset={2}>
          <DataTable />
        </Col>
      </Row>
    </div>
  );
};

export default App;
