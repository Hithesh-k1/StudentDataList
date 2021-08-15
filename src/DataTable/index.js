import React, { useEffect, useState } from "react";
import { Table, Button, Form } from "antd";
import firebaseDb from "../Service/firebase";
import { EditableCell } from "./EditableCell";
import { ColumnFields } from "./ColumnFields";
import { ColumnSearch } from "./ColumnSearch";

export default function DataTable() {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    firebaseDb.child("student").on("value", (snapshot) => {
      if (snapshot.val() != null) {
        let studentData = { ...snapshot.val() };
        studentData = Object.keys(studentData).map((key) => ({
          key: key,
          name: studentData[key].name,
          regNo: studentData[key].regNo,
          totalMark: studentData[key].totalMark,
        }));
        setData(studentData);
      }
    });
  }, []);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRow(selectedRowKeys);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
  };

  ColumnSearch();

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      regNo: "",
      totalMark: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey("");
        updateFirebaseDb(key, newData);
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const updateFirebaseDb = (id, updatedData) => {
    let result = updatedData.find((e) => {
      return e.key === id;
    });
    firebaseDb.child(`student/${id}`).update(result);
  };

  const deleteFirebaseDb = (id) => {
    firebaseDb.child(`student/${id}`).remove();
    setSelectedRow(null);
  };

  const handleDelete = () => {
    deleteFirebaseDb(selectedRow);
  };

  const columns = ColumnFields({ ColumnSearch, isEditing, editingKey, save, cancel, edit });

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "regNo" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
      <Button onClick={handleDelete} danger>
        Delete User
      </Button>
    </Form>
  );
}
