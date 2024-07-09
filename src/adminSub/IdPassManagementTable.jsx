import React, { useMemo } from "react";
//REACT - DATA - TABLE - COMPONENT
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import './Style.css'

function IdPassManagementTable({ view, type }) {
  console.log(view)
  console.log(type)

  const handleBoxId = (id) => {
    if (!Array.isArray(view)) {
      console.error("view is not an array or is undefined");
      return `addIdPass/${id}`; // Default URL if view is not an array
    }

    const matchingBoxPass = view.find((boxpass) => boxpass.id === id);
    console.log("HERE", matchingBoxPass)
    if (matchingBoxPass) {
      if (matchingBoxPass.type === 'code') {
        console.log("Code")
        return `addcode/${id}`;
      } else {
        console.log("id")
        return `addIdPass/${id}`;
      }
    }
    console.log("No matching boxpass found");
    return `addIdPass/${id}`; // Default URL if no matching box_id found
  };

  const columns = [
    {
      name: "#id",
      selector: (row) => row.id,
      width: "100px",
      // color: "#white",
      center: true,
    },
    {
      name: "รายการ",
      selector: (row) => row.title,
      width: "150px",
    },
    {
      name: "คำอธิบาย",
      selector: (row) => row.des,
      width: "350px",
    },
    {
      name: "ราคา",
      selector: (row) => row.price,
      width: "100px",
      center: true,
    },
    {
      name: "คงเหลือ",
      selector: (row) => row.boxpass_remain,
      width: "100px",
      center: true,
    },
    {
      name: "option",
      width: "100px",
      color: "white",
      cell: (row) => (
        <Link to={`/admin/${handleBoxId(row.id)}`} className="editSelecter" style={{ color: "white", border: '1px solid gray' }}>
          ...
        </Link>
      ),
      center: true,
      selector: (row) => row.option,
    },
  ];

  const paginationComponentOptions = {
    noRowsPerPage: true,
  };

  const customStyles = {
    rows: {
      style: {
        backgroundColor: 'transparent',
        // color: '#fff'
      },
    },
    
    headCells: {
      style: {
        backgroundColor: 'transparent',
        color: '#fff'
      },
    
    },
    cells: {
      style: {
        backgroundColor: 'transparent',
        
      },
    },
  };

  const conditionalRowStyles = [
    {
      when: (row) => row.boxpass_remain == 0,
      style: {
        color: "red",
      },
    },
    {
      when: (row) => row.boxpass_remain < 5 && row.boxpass_remain > 0,
      style: {
        color: "orange",
      },
    },
    {
      when: (row) => row.boxpass_remain >= 5,
      style: {
        color: "green",
      },
    },
  ];

  return (
    <div className="container">
      <div className="menu">
        <h3 className="title">Id/pass Management</h3>
        <Link to={"../addidpass"} className="button">
          back
        </Link>
      </div>
      <div className="dataTableWrapper">

      <DataTable
        columns={columns}
        data={view}
        className="editDataTable"
        customStyles={customStyles}
        // highlightOnHover
        pagination
        // striped
        paginationComponentOptions={paginationComponentOptions}
        conditionalRowStyles={conditionalRowStyles}
      />
      </div>
    </div>
  );
}

export default IdPassManagementTable;
