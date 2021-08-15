import React from "react";
import { Button, Popconfirm, Tag, Divider } from "antd";
import { EditOutlined } from "@ant-design/icons";
// import { Tag, Divider } from 'antd';

export function ColumnFields({ ColumnSearch, isEditing, editingKey, save, cancel, edit }) {
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
      width: "25%",
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
      width: "20%",
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
            <Tag style={{ cursor: "pointer" }} onClick={() => console.log("Promote")} color="success">
              Promote
            </Tag>
            <Tag style={{ cursor: "pointer" }} onClick={() => console.log("suspend")} color="error">
              Suspend
            </Tag>

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
              //   <Typography.Link disabled={editingKey !== ""} onClick={() => edit(record)}>
              //     Edit
              //   </Typography.Link>

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
