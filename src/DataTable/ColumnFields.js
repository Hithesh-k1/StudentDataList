import React from "react";
import { Button, Popconfirm, Tag, Row, Col } from "antd";
import { DownCircleOutlined, EditOutlined, UpCircleOutlined } from "@ant-design/icons";

export function ColumnFields({
  ColumnSearch,
  isEditing,
  editingKey,
  save,
  cancel,
  edit,
  handlePromoteSuspend,
}) {
  return [
    {
      title: "Reg. no.",
      dataIndex: "regNo",
      width: "15%",
      editable: true,
    },
    {
      title: "Name",
      dataIndex: "name",
      width: "20%",
      editable: true,
      ...ColumnSearch("name"),
    },

    {
      title: "Total Mark",
      dataIndex: "totalMark",
      width: "20%",
      editable: true,
      ...ColumnSearch("totalMark"),
    },
    {
      title: "Status",
      dataIndex: "status",
      width: "30%",
      render: (_, record) => {
        console.log(record);
        return (
          <>
            <Row gutter={16}>
              <Col span={14}>
                {record.status && (
                  <Tag
                    color={
                      (record.status === "PROMOTED" && "success") ||
                      (record.status === "SUSPENDED" && "error")
                    }
                  >
                    {record.status}
                  </Tag>
                )}
              </Col>
              <Col span={4}>
                <UpCircleOutlined
                  onClick={() => handlePromoteSuspend(record, "PROMOTED")}
                  style={{ color: "#5CC41A", cursor: "pointer", fontSize: "20px" }}
                />
              </Col>
              <Col span={4}>
                <DownCircleOutlined
                  onClick={() => handlePromoteSuspend(record, "SUSPENDED")}
                  style={{ color: "#F6443F", cursor: "pointer", fontSize: "20px" }}
                />
              </Col>
            </Row>
          </>
        );
      },
      // editable: true,
      // ...ColumnSearch("totalMark"),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => {
        const editable = isEditing(record);
        return (
          <>
            {editable ? (
              <span>
                <Button
                  onClick={() => save(record.key)}
                  style={{
                    marginRight: 8,
                  }}
                >
                  Save
                </Button>
                <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                  <Button>Cancel</Button>
                </Popconfirm>
              </span>
            ) : (
              <EditOutlined
                style={{ fontSize: "20px", color: "#08c" }}
                disabled={editingKey !== ""}
                onClick={() => edit(record)}
              />
            )}
          </>
        );
      },
    },
  ];
}
