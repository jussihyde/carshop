import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import Button from "@mui/material/Button";
import AddCar from "./AddCar";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { API_ADDRESS } from "../Constants";
import EditCar from "./EditCar";

function Carlist() {
    const [cars, setCars] = useState([]);
    const [columndefs] = useState([
        {field: "brand", sortable: true, filter: true,},
        {field: "model", sortable: true, filter: true,},
        {field: "color", sortable: true, filter: true,},
        {field: "fuel", sortable: true, filter: true,},
        {field: "year", sortable: true, filter: true,},
        {field: "price", sortable: true, filter: true,},
        {cellRenderer: (params) => (
            <EditCar data={params.data} updateCar={updateCar} />
        ),},
        {cellRenderer: (params) => (
            <Button color="error" variant="contained" onClick={() => deleteCar(params.data)}>
                {""} Delete{""}
            </Button>
        ),},
    ]);

    useEffect(() => {
        getCars();
    }, []);

    const getCars = () => {
        fetch(API_ADDRESS)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                alert("Error with obtaining data")
            }
        })
        .then((data) => setCars(data._embedded.cars))
        .catch((err) => console.error(err));
    };

    const addCar = (car) => {
        fetch(API_ADDRESS, {
          method: "POST", headers: { "Content-type": "application/json" },
          body: JSON.stringify(car),
        })
          .then((response) => {
            if (response.ok) {
              getCars();
            } else {
              alert("Error with adding data");
            }
          })
          .catch((err) => console.log(err));
      };

    const deleteCar = (data) => {
        if (window.confirm("Do you want to delete?")) {
            fetch(data._links.car.href, {
                method: "DELETE",
            })
            .then((response) => {
                if (response.ok) {
                    getCars();
                } else {
                    alert("Error with delete")
                }
            })
            .catch((err) => console.log(err));
        }
    };

    const updateCar = (car, url) => {
        fetch(url, {
            method: "PUT", headers: { "Content-type": "application/json" },
            body: JSON.stringify(car),
        })
        .then((response) => {
            if (response.ok) {
                getCars();
            } else {
                alert("Error updating edited data")
            }
        })
        .catch((err) => console.log(err));
    };

    return (
        <>
            <AddCar addCar={addCar} />
            <div
                className="ag-theme-material"
                style={{
                    height: 650,
                    width: "90%",
                    margin: "auto",
                  }}
                >
                  <AgGridReact
                    rowData={cars}
                    columnDefs={columndefs}
                    pagination={true}
                    paginationPageSize={10}
                  />{" "}
                </div>
              </>
    );
}

export default Carlist;