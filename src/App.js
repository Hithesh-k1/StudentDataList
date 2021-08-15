import React from "react";
import DataTable from "./DataTable";
import AddUserForm from "./UserForm/AddUserForm";

const App = () => {
  return (
    <div className="space-align-container">
      <AddUserForm />
      <DataTable />
    </div>
  );
};

export default App;
