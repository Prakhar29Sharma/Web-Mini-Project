import React, { useEffect, useState } from "react";
import { getToken } from "../../utils/auth";
import axios from "axios";

export default function Analysis() {
    const [author, setAuthor] = useState([]);
    const [videoCount, setVideoCount] = useState([]);
    const [pdfCount, setPdfCount] = useState([]);
  
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
          
          const authorList = response.data.data.filter(
            (course) => course.status === "UnderReview"
          );
  
          const videoCounts = authorList.map((course) => {
            const exists = course.courseVideoPath && course.courseVideoPath.trim() !== "";
            return exists ? 1 : 0;
          });
  
          const pdfCounts = authorList.map((course) => course.coursePdfPath.length);
  
          setAuthor(authorList);
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
        <tr key={author._id}>
          <td>{author.authorName}</td>
          <td>{videoCount[index]}</td>
          <td>{pdfCount[index]}</td>
        </tr>
      ));
    };
  
    return (
      <div>
        <main id="main">
          <h2>Analysis</h2>
  
          <table>
            <thead>
              <tr>
                <th>Author Name</th>
                <th>Total Videos</th>
                <th>Total PDFs</th>
              </tr>
            </thead>
            <tbody>{renderTableRows()}</tbody>
          </table>
        </main>
      </div>
    );
  }
  