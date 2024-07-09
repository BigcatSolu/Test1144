import axios from "axios";
import React, { useEffect, useState } from "react";
import IdPassManagementTable from "./IdPassManagementTable";

const EditIdPass = () => {
  const [remain, setRemain] = useState([]);
  const [type, setType] = useState([]);

  const fetchData = async () => {
    // const response = await axios.get("/api/posts/remain");
    // **EDIT** fetch remain and view-boxpass (NEW CREATED VIEW)
    const remainResponse = await axios.get("/api/posts/stockinfo");
    const typeResponse = await axios.get("/api/posts/view-boxpass");
    // **EDIT**
    setRemain(remainResponse.data);
    console.log(remainResponse.data);
    setType(typeResponse.data);
    console.log(typeResponse);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="editIdPass">
      {/* Create the component to render the table passing in remain and type */}
      <IdPassManagementTable view={remain} type={type} className="table"/>
      {/* Create the component to render the table passing in remain and type */}
    </div>
  );
};

export default EditIdPass;
