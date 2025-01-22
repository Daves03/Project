import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

import "./admin-css/enroll-student.css";
import logo from "./assets-admin/cvsu_logo.png";

import "bootstrap/dist/css/bootstrap.min.css";

const EnrollStudent = () => {
  const [approvedEnrollments, setApprovedEnrollments] = useState([]);
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sectionFilter, setSectionFilter] = useState("");
  const [yearLevelFilter, setYearLevelFilter] = useState("");
  const [courseFilter, setCourseFilter] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          "https://backend.cvsu.online/api/students/on_process_COR"
        );
        setStudents(response.data);
      } catch (error) {
        console.error(
          "Error fetching students with on process COR status:",
          error
        );
      }
    };

    fetchStudents();
  }, []);
  useEffect(() => {
    const fetchApprovedEnrollments = async () => {
      try {
        const response = await axios.get(
          "https://backend.cvsu.online/api/approved-enrollments",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setApprovedEnrollments(response.data);
      } catch (error) {
        console.error("Error fetching approved enrollments:", error);
      }
    };

    fetchApprovedEnrollments();
  }, []);

  const fetchAndGeneratePDF = async (student) => {
    try {
      const response = await axios.get(
        `https://backend.cvsu.online/api/students/${student.user_id}/cor`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const corData = response.data; // Set COR data
      generatePDF(student, corData);
    } catch (error) {
      console.error("Error fetching COR data:", error);
    }
  };

  const generatePDF = (student, corData) => {
    const doc = new jsPDF();
    const img = new Image();
    img.src = logo;
    doc.addImage(img, "PNG", 60, 5, 20, 20);
    doc.setTextColor(0, 100, 0);
    doc.setFontSize(12);
    doc.text(
      "Cavite State University",
      doc.internal.pageSize.getWidth() / 2 + 5,
      10,
      null,
      null,
      "center"
    );
    doc.setFontSize(10);
    doc.text(
      "Bacoor City Campus",
      doc.internal.pageSize.getWidth() / 2 + 5,
      14,
      null,
      null,
      "center"
    );
    doc.setFontSize(14);
    doc.setFont(undefined, "bold");
    doc.text(
      "REGISTRATION FORM",
      doc.internal.pageSize.getWidth() / 2 + 5,
      20,
      null,
      null,
      "center"
    );
    const today = new Date();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const formattedDate = `${today.getDate()}-${
      monthNames[today.getMonth()]
    }-${today.getFullYear()}`;
    doc.setFontSize(12);
    doc.setTextColor(0, 100, 0);
    doc.autoTable({
      startY: 23,
      head: [["", "", "", "", "", ""]],
      body: [
        [
          {
            content: "Student Number:",
            styles: { textColor: [0, 80, 0], fontStyle: "bold" },
          },
          {
            content: student.student_number,
            styles: { textColor: [0, 0, 0], fontStyle: "bold" },
          },
          {
            content: "Semester:",
            styles: { textColor: [0, 100, 0], fontStyle: "bold" },
          },
          {
            content: student.semester,
            styles: { textColor: [0, 0, 0], fontStyle: "bold" },
          },
          {
            content: "Encoder:",
            styles: { textColor: [0, 100, 0], fontStyle: "bold" },
          },
          {
            content: "M. ANSUAS",
            styles: { textColor: [0, 0, 0], fontStyle: "bold" },
          },
        ],
        [
          {
            content: "Student Name:",
            styles: { textColor: [0, 100, 0], fontStyle: "bold" },
          },
          {
            content: `${student.last_name}, ${student.first_name} ${student.middle_name}`,
            styles: { textColor: [0, 0, 0], fontStyle: "bold" },
          },
          {
            content: "Year:",
            styles: { textColor: [0, 100, 0], fontStyle: "bold" },
          },
          { content: student.year_level, styles: { textColor: [0, 0, 0] } },
          {
            content: "Major:",
            styles: { textColor: [0, 100, 0], fontStyle: "bold" },
          },
          { content: "", styles: { textColor: [0, 0, 0] } },
        ],
        [
          {
            content: "Course:",
            styles: { textColor: [0, 100, 0], fontStyle: "bold" },
          },
          {
            content: student.course,
            styles: { textColor: [0, 0, 0], fontStyle: "bold" },
          },
          {
            content: "Date:",
            styles: { textColor: [0, 100, 0], fontStyle: "bold" },
          },
          { content: formattedDate, styles: { textColor: [0, 50, 0] } },
          {
            content: "School Year:",
            styles: { textColor: [0, 100, 0], fontStyle: "bold" },
          },
          {
            content: `${today.getFullYear()}-${today.getFullYear() + 1}`,
            styles: { textColor: [0, 0, 0], fontStyle: "bold" },
          },
        ],
        [
          {
            content: "Address:",
            styles: { textColor: [0, 100, 0], fontStyle: "bold" },
          },
          { content: student.address, styles: { textColor: [0, 0, 0] } },
          {
            content: "Section:",
            styles: { textColor: [0, 100, 0], fontStyle: "bold" },
          },
          { content: student.section, styles: { textColor: [0, 0, 0] } },
          { content: "", styles: { textColor: [0, 100, 0] } },
          { content: "", styles: { textColor: [0, 100, 0] } },
        ],
      ],
      theme: "plain",
      styles: { overflow: "linebreak", cellPadding: 0.5, fontSize: 7 },
      columnStyles: {
        0: { cellWidth: 21 },
        1: { cellWidth: 40 },
        2: { cellWidth: 20 },
        3: { cellWidth: 40 },
        4: { cellWidth: 20 },
        5: { cellWidth: 40 },
      },
    });

    // Add the schedule table with a main header and sub-columns
    doc.autoTable({
      startY: doc.previousAutoTable.finalY + 10,
      head: [
        [
          {
            content: "Sched Code",
            colSpan: 1,
            styles: { halign: "center", textColor: [0, 100, 0] },
          },
          {
            content: "Course Code",
            colSpan: 1,
            styles: { halign: "center", textColor: [0, 100, 0] },
          },
          {
            content: "Course Description",
            colSpan: 1,
            styles: { halign: "center", textColor: [0, 100, 0] },
          },
          {
            content: "Units",
            colSpan: 2,
            styles: { halign: "center", textColor: [0, 100, 0] },
          },
          {
            content: "Time",
            colSpan: 1,
            styles: { halign: "center", textColor: [0, 100, 0] },
          },
          {
            content: "Day",
            colSpan: 1,
            styles: { halign: "center", textColor: [0, 100, 0] },
          },
          {
            content: "Room",
            colSpan: 1,
            styles: { halign: "center", textColor: [0, 100, 0] },
          },
        ],
      ],
      body: [
        ...corData.subjects.map((subject) => [
          "TBA",
          subject.course_code,
          subject.course_title,
          subject.credit_unit_lec ? `${subject.credit_unit_lec}` : "",
          subject.credit_unit_lab ? `${subject.credit_unit_lab}` : "",
          "TBA",
          "TBA",
          "TBA",
        ]),
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "LEC", "LAB", "", "", ""],
      ],
      theme: "plain",
      styles: {
        overflow: "linebreak",
        cellPadding: 1,
        fontSize: 8,
        lineColor: [0, 100, 0],
        textColor: [0, 0, 0],
        halign: "center",
      },
      columnStyles: {
        0: { cellWidth: 20 },
        1: { cellWidth: 20 },
        2: { cellWidth: 60 },
        3: { cellWidth: 10 },
        4: { cellWidth: 10 },
        5: { cellWidth: 30 },
        6: { cellWidth: 10 },
        7: { cellWidth: 20 },
      },
      didDrawCell: (data) => {
        const cell = data.cell;
        const rowIndex = data.row.index;
        const columnIndex = data.column.index;
        const columnCount = data.table.columns.length;

        // Set the border color to dark green
        doc.setDrawColor(0, 120, 0); // Dark green color

        if (rowIndex === 0) {
          // Draw the top border for the first row (header row)
          doc.line(cell.x, cell.y, cell.x + cell.width, cell.y);
        }

        if (rowIndex === data.table.body.length - 1) {
          // Draw the bottom border for the last row
          doc.line(
            cell.x,
            cell.y + cell.height,
            cell.x + cell.width,
            cell.y + cell.height
          );
        }

        // Draw the inner vertical borders
        if (columnIndex > 0) {
          // Inner left border
          if (columnIndex !== 4) {
            // Skip left border for the "Units" sub-columns
            doc.line(cell.x, cell.y, cell.x, cell.y + cell.height);
          }
        }

        if (columnIndex < columnCount - 1) {
          // Inner right border, except inside "Units" sub-columns
          if (!(columnIndex === 3 || columnIndex === 4)) {
            doc.line(
              cell.x + cell.width,
              cell.y,
              cell.x + cell.width,
              cell.y + cell.height
            );
          }
        }

        // Explicitly skip drawing inner horizontal lines
        if (rowIndex > 0 && rowIndex < data.table.body.length - 1) {
          return;
        }
      },
    });

    doc.setFont("Dejavusans");
    doc.autoTable({
      startY: doc.previousAutoTable.finalY + 0,
      head: [
        [
          {
            content: "Laboratory Fees",
            colSpan: 2,
            styles: { halign: "left", valign: "middle" },
          },
          {
            content: "Other Fees",
            colSpan: 2,
            styles: { halign: "left", valign: "middle" },
          },
          {
            content: "Assessment",
            colSpan: 2,
            styles: { halign: "left", valign: "middle" },
          },
          {
            content: "Total UNITS",
            colSpan: 2,
            styles: { halign: "left", valign: "baseline" },
          },
        ],
      ],
      body: [
        [
          "Com Lab",
          "PHP 800.00",
          "NSTP",
          "-",
          "Tuition Fee",
          "PHP 3,200.00",
          {
            content: "Total HOURS:",

            styles: { halign: "left", valign: "top", fontStyle: "bold" },
          },
        ],
        ["", "", "Reg. Fee", "PHP 55.00", "SFDF", "PHP 1,500", ""],
        [
          "",
          "",
          "ID",
          "-",
          "SRF",
          "PHP 2,025.00",
          {
            content: "TOTAL AMOUNT:",

            styles: { halign: "center", fontStyle: "bold" },
          },
          "PHP 8,290.00",
        ],
        ["", "", "Late Reg.", "-", "Misc.", "PHP 435.00", "Scholarship", ""],
        [
          "",
          "",
          "Insurance PHP",
          "PHP 25.00",
          "Athletics",
          "PHP 100.00",
          {
            content: "CHED Free Tuition and Misc. Fee",
            colSpan: 2,
            styles: { halign: "center", fontStyle: "bold" },
          },
        ],
        ["", "", "", "", "SCUAA", "PHP 100.00", "", ""],
        ["", "", "", "", "SCUAA", "PHP 100.00", "Tuition", "PHP 3,200.00"],
        ["", "", "", "", "Library Fee", "PHP 50.00", "SFDF", "PHP 1,500.00"],
        ["", "", "", "", "Lab Fees", "PHP 800.00", "SRF", "PHP 2,025.00"],
        ["", "", "", "", "Other Fees", "PHP 80.00", ""],

        [
          "",
          "",
          "",
          "",
          "",
          "",
          {
            content: "Terms of Payment",
            colSpan: 2,
            styles: { halign: "center", fontStyle: "bold" },
          },
        ],

        ["", "", "", "", "", "", "First", "8,290"],
        ["", "", "", "", "", "", "Second", "-"],
        ["", "", "", "", "", "", "Third", "-"],
      ],

      theme: "plain",
      styles: {
        overflow: "linebreak",
        cellPadding: 1,
        fontSize: 8,
        lineColor: [0, 100, 0],
        textColor: [0, 0, 0],
        font: "dejavusans",
        halign: "center",
        valign: "middle",
      },
      columnStyles: {
        0: { cellWidth: 22.5 },
        1: { cellWidth: 22.5 },
        2: { cellWidth: 22.5 },
        3: { cellWidth: 22.5 },
        4: { cellWidth: 22.5 },
        5: { cellWidth: 22.5 },
        6: { cellWidth: 25.5 },
        7: { cellWidth: 19.5, valign: "bottom" },
      },
      didDrawCell: (data) => {
        const cell = data.cell;
        const rowIndex = data.row.index;
        const columnIndex = data.column.index;
        const columnCount = data.table.columns.length;

        // Set the border color to dark green
        doc.setDrawColor(0, 100, 0); // Dark green color

        // Draw top and bottom borders
        if (rowIndex === 0) {
          // Draw the top border for the header row
          doc.line(cell.x, cell.y, cell.x + cell.width, cell.y);
        }

        if (rowIndex === data.table.body.length - 1) {
          // Draw the bottom border for the last row
          doc.line(
            cell.x,
            cell.y + cell.height,
            cell.x + cell.width,
            cell.y + cell.height
          );
        }
        // Horizontal line below "CHED Free Tuition and Misc. Fee" (Total UNITS column only)
        if (rowIndex === 1 && (columnIndex === 6 || columnIndex === 7)) {
          doc.line(
            cell.x,
            cell.y + cell.height,
            cell.x + cell.width,
            cell.y + cell.height
          );
        }

        // Horizontal line above "TOTAL AMOUNT" (Total UNITS column only)
        if (rowIndex === 6 && (columnIndex === 6 || columnIndex === 7)) {
          doc.line(cell.x, cell.y, cell.x + cell.width, cell.y);
        }

        // Horizontal line above "Terms of Payment" (Total UNITS column only)
        if (rowIndex === 10 && (columnIndex === 6 || columnIndex === 7)) {
          doc.line(cell.x, cell.y, cell.x + cell.width, cell.y);
        }

        // Skip outer borders
        const isOuterLeftBorder = columnIndex === 0;
        const isOuterRightBorder = columnIndex === columnCount - 1;

        // Skip inner borders for specific columns

        const isUnderLabFees = columnIndex === 0 || columnIndex === 1;
        const isUnderOtherFees = columnIndex === 2 || columnIndex === 3;
        const isUnderAssessment = columnIndex === 4 || columnIndex === 5;
        const isUnderTotalUnits = columnIndex === 6 || columnIndex === 7;

        // Draw the left border (only if not outer left or skipped inner border)
        if (
          !isOuterLeftBorder &&
          !(isUnderLabFees && columnIndex === 1) &&
          !(isUnderOtherFees && columnIndex === 3) &&
          !(isUnderAssessment && columnIndex === 5) &&
          !(isUnderTotalUnits && columnIndex === 7)
        ) {
          doc.line(cell.x, cell.y, cell.x, cell.y + cell.height);
        }

        // Draw the right border (only if not outer right or skipped inner border)
        if (
          !isOuterRightBorder &&
          !(isUnderLabFees && columnIndex === 0) &&
          !(isUnderOtherFees && columnIndex === 2) &&
          !(isUnderAssessment && columnIndex === 4) &&
          !(isUnderTotalUnits && columnIndex === 6)
        ) {
          doc.line(
            cell.x + cell.width,
            cell.y,
            cell.x + cell.width,
            cell.y + cell.height
          );
        }
      },
    });

    // // Add the fees table content to the PDF
    // doc.text("Laboratory Fees", 20, doc.previousAutoTable.finalY + 10);
    // doc.text("Other Fees", 60, doc.previousAutoTable.finalY + 10);
    // doc.text("Assessment", 100, doc.previousAutoTable.finalY + 10);
    // doc.setTextColor(0, 50, 0); // Dark green color for the total units text
    // doc.text("Total UNITS:", 140, doc.previousAutoTable.finalY + 10);
    // const totalUnits = student.total_units || 0; // Adjust according to your data structure
    // doc.text(`${totalUnits}`, 180, doc.previousAutoTable.finalY + 10);

    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, "_blank");
  };
  const filteredStudents = students.filter((student) => {
    return (
      (searchTerm === "" ||
        student.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.student_number.includes(searchTerm)) &&
      (sectionFilter === "" || student.details.section === sectionFilter) &&
      (yearLevelFilter === "" || student.details.year_level === yearLevelFilter) &&
      (courseFilter === "" || student.details.course === courseFilter)
    );
  });

  const handleSearchChange = (event) => setSearchTerm(event.target.value);
  const handleSectionChange = (event) => setSectionFilter(event.target.value);
  const handleYearLevelChange = (event) => setYearLevelFilter(event.target.value);
  const handleCourseChange = (event) => setCourseFilter(event.target.value);

  return (
    <div className="enroll-student-container">
      <h1 className="title">Enroll Student</h1>

      <div className="top-controls">
      <input
          type="text"
          placeholder="Search by name or student number"
          className="search-bar-faculty"
          value={searchTerm}
          onChange={handleSearchChange}
        />

        <select
          className="filter-faculty"
          value={sectionFilter}
          onChange={handleSectionChange}
        >
          <option value="">Filter by Section</option>
          <option value="1-1">1-1</option>
          <option value="1-2">1-2</option>
          <option value="1-3">1-3</option>
          <option value="1-4">1-4</option>
          <option value="1-5">1-5</option>
          <option value="1-6">1-6</option>
          <option value="1-7">1-7</option>
          <option value="2-1">2-1</option>
          <option value="2-2">2-2</option>
          <option value="2-3">2-3</option>
          <option value="2-4">2-4</option>
          <option value="2-5">2-5</option>
          <option value="2-6">2-6</option>
          <option value="2-7">2-7</option>
          <option value="3-1">3-1</option>
          <option value="3-2">3-2</option>
          <option value="3-3">3-3</option>
          <option value="3-4">3-4</option>
          <option value="3-5">3-5</option>
          <option value="3-6">3-6</option>
          <option value="3-7">3-7</option>
          <option value="4-1">4-1</option>
          <option value="4-2">4-2</option>
          <option value="4-3">4-3</option>
          <option value="4-4">4-4</option>
          <option value="4-5">4-5</option>
          <option value="4-6">4-6</option>
          <option value="4-7">4-7</option>
        </select>

        <select
          className="filter-faculty"
          value={yearLevelFilter}
          onChange={handleYearLevelChange}
        >
          <option value="">Filter by Year Level</option>
          <option value="First Year">First Year</option>
          <option value="Second Year">Second Year</option>
          <option value="Third Year">Third Year</option>
          <option value="Fourth Year">Fourth Year</option>
        </select>

        <select
          className="filter-faculty"
          value={courseFilter}
          onChange={handleCourseChange}
        >
          <option value="">Filter by Course</option>
          <option value="Bachelor of Science in Computer Science">
            Bachelor of Science in Computer Science
          </option>
          <option value="Bachelor of Science in Information Technology">
            Bachelor of Science in Information Technology
          </option>
        </select>
      </div>

      <div className="table-container">
        <table className="student-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Student Number</th>
              <th>Status</th>
              <th>Year Level</th>
              <th>Semester</th>
              <th>Section</th>
              <th>Course</th>
              <th>Address</th>
              <th>Email</th>
              <th>Guardian</th>
              <th>Guardian Number</th>

              <th>Select</th>
            </tr>
          </thead>
          <tbody>
          {(approvedEnrollments.concat(filteredStudents || []))
            .filter((student) => student?.details && student.details.first_name && student.details.last_name)
            .map((student) => (
              <tr key={student.id}>
                <td>{student.details.first_name} {student.details.last_name}</td>
                <td>{student.details.student_number}</td>
                <td>{student.details.status}</td>
                <td>{student.details.year_level}</td>
                <td>{student.details.semester}</td>
                <td>{student.details.section}</td>
                <td>{student.details.course}</td>
                <td>{student.details.address}</td>
                <td>{student.details.email}</td>
                <td>{student.details.guardian_name}</td>
                <td>{student.details.guardian_phone}</td>
                <td>
                  <button onClick={() => fetchAndGeneratePDF(student)}>
                    Download COR
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnrollStudent;
