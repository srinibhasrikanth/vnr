import React, { useState, useEffect } from "react";
import {
  Button,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  Table,
  Paper,
  TableContainer,
  Typography,
} from "@mui/material";
import * as XLSX from "xlsx";
import axios from "axios";

const ReportTable = ({ courseId }) => {
  const [registrations, setRegistrations] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [resourcePerson, setResourcePerson] = useState("");

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/registration/get-register/${courseId}`
        );
        setRegistrations(response.data.registrations);
        console.log(response.data.registrations);
        console.log(response.data.courseName);
        console.log(response.data.resourcePerson);
        setCourseName(response.data.courseName);
        setResourcePerson(response.data.resourcePerson);
      } catch (error) {
        console.error("Error fetching registrations:", error);
      }
    };

    fetchRegistrations();
  }, [courseId]);

  const downloadExcel = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.table_to_sheet(
      document.getElementById("report-table")
    );
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, `${courseName}.xlsx`);
  };

  return (
    <div>
      <TableContainer
        component={Paper}
        sx={{ margin: "auto", maxWidth: "80%", marginTop: "20px" }}
      >
        <Typography variant="h4" className=" flex justify-items-center">
          COURSE NAME: {courseName}
        </Typography>
        <Typography variant="h5" className=" flex justify-items-center">
          RESOURCE PERSON: {resourcePerson}
        </Typography>
        <Table aria-label="basic table" id="report-table">
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell>Roll No.</TableCell>
              <TableCell>Std. Name</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Branch</TableCell>
              <TableCell>Section</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {registrations.map((registration, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{registration.userDetails.rollNumber}</TableCell>
                <TableCell>{registration.userDetails.name}</TableCell>
                <TableCell>{registration.userDetails.year}</TableCell>
                <TableCell>{registration.userDetails.branch}</TableCell>
                <TableCell>{registration.userDetails.section}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        container
        sx={{ marginTop: "20px", marginLeft: "60rem" }}
        onClick={downloadExcel}
      >
        Download Excel
      </Button>
    </div>
  );
};

export default ReportTable;
