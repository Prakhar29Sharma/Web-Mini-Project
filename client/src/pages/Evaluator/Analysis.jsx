import React, { useEffect, useState } from "react";
import { getToken } from "../../utils/auth";
import axios from "axios";

import { TableBody,TableContainer,TableCell,TableHead,Table,TableRow, Paper } from "@mui/material";

export default function Analysis() {
  const [author, setAuthor] = useState([]);
  const [videoCount, setVideoCount] = useState([]);
  const [pdfCount, setPdfCount] = useState([]);
  const [subjectName,setSubjectName]=useState([])

  useEffect(() => {
    const user = localStorage.getItem("user");
    const username = JSON.parse(user).username;

    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/courses", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getToken(),
          },
        });

console.log(response.data.data)

        const authorList = response.data.data.filter(
          (course) => course.status === "UnderReview"
        );

        const subjectName=authorList.map((course)=>{
          
          return course.subjectData.subjectName
        })
        console.log(subjectName)
        const videoCounts = authorList.map((course) => {
          const exists =
            course.courseVideoPath && course.courseVideoPath.trim() !== "";
          return exists ? 1 : 0;
        });

        const pdfCounts = authorList.map(
          (course) => course.coursePdfPath.length
        );

        setAuthor(authorList);
        setSubjectName(subjectName)
        setVideoCount(videoCounts);
        setPdfCount(pdfCounts);

      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  // Function to render the table rows
  const renderTableRows = () => {
    return author.map((author, index) => (
      <TableRow key={author._id}>
        <TableCell align='centre'>{author.authorName}</TableCell>
        <TableCell align='centre'>{subjectName[index]}</TableCell>
        <TableCell align='centre'>{videoCount[index]}</TableCell>
        <TableCell align='centre'>{pdfCount[index]}</TableCell>
      </TableRow>
    ));
  };

  return (
    <div>
      <main id="main">
        <h2>Analysis</h2>

        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="Analysis">
        <TableHead>
        <TableRow>
        
        <TableCell>Author</TableCell>
        <TableCell>Subject</TableCell>
        <TableCell>Video</TableCell>
        <TableCell>PDF</TableCell>
             
              </TableRow>
            </TableHead>
          <TableBody>{renderTableRows()}</TableBody>
          </Table>
        </TableContainer>
      </main>
    </div>
  );
}
