import React, { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import axios from "axios";
import { getToken } from "../../utils/auth";
import {
    Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import BasicRating from "../../components/BasicRating";
import createNotification from "../../utils/notification";

export default function ApprovedCourses() {
  const [approvedCourses, setApprovedCourses] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [selectedCourseAuthor, setSelectedCourseAuthor] = useState("");

  const openMakePublicDialog = (courseId, authorName) => {
    setSelectedCourseId(courseId);
    setSelectedCourseAuthor(authorName);
    setOpenDialog(true);
  };

  const handleMakePublic = () => {
    // Perform the make public action here
    const courseId = selectedCourseId;
    const authorName = selectedCourseAuthor;
    console.log("Making course public with ID: " + courseId);
    
    // Simulate a delay for demonstration purposes
    setTimeout(() => {
      setOpenDialog(false);
      setSelectedCourseId("");
    }, 1000);

    // axios.patch(`http://localhost:5000/api/courses/${courseId}`, {}, {
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Authorization": 'Bearer ' + getToken(),
    //   },
    //   params: {
    //     status: 'Public',
    //     isPublic: true,
    //   }
    // })
    // .then((response) => {
    //   console.log(response);
    //   if (response.data.status === 'ok') {
    //     createNotification(authorName, 'Course made public', `Your course with id ${courseId} has been made public successfully.`);
    //     window.location.href = '/admin/courses';
    //   }
    // })
    // .catch((error) => {
    //   console.log(error);
    // });

    setSelectedCourseId("");
    setSelectedCourseAuthor("");
  };

  useEffect(() => {
    // Fetch the list of approved courses from your API
    axios
      .get("http://localhost:5000/api/courses", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getToken(),
        },
        params: {
          status: "Approved",
        },
      })
      .then((response) => {
        const approvedCoursesData = response.data.data;
        setApprovedCourses(approvedCoursesData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
    <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Course Approval</DialogTitle>
        <DialogContent>
            Are you sure you want to approve this course?
        </DialogContent>
        <DialogActions>
            <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
            </Button>
            <Button onClick={handleMakePublic} color="primary">
            Confirm
            </Button>
        </DialogActions>
    </Dialog>
    <main id="main" className="main">
      <PageTitle title="Approved Courses" />
      <section className="section dashboard">
        <div className="col-lg-12">
          {approvedCourses.length > 0 ? (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Subject Code</TableCell>
                    <TableCell>Subject Name</TableCell>
                    <TableCell>Unit Number</TableCell>
                    <TableCell>Unit Name</TableCell>
                    <TableCell>Contributor</TableCell>
                    <TableCell>Rating</TableCell>
                    <TableCell>View</TableCell>
                    <TableCell>Make Public</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {approvedCourses.map((course, index) => (
                    <TableRow key={index}>
                      <TableCell>{course.subjectData.subjectCode}</TableCell>
                      <TableCell>{course.subjectData.subjectName}</TableCell>
                      <TableCell>{course.unitData.unitNumber}</TableCell>
                      <TableCell>{course.unitData.unitName}</TableCell>
                      <TableCell>{course.authorName}</TableCell>
                      <TableCell><BasicRating type='read' rating={course.rating} size='medium' /></TableCell>
                      <TableCell>
                        <Link to={`/admin/review/course/${course._id}`} target="_blank" className="btn btn-primary">
                          View
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Button
                          className="btn btn-primary"
                          onClick={() => openMakePublicDialog(course._id, course.authorName)}
                          disabled={selectedCourseId !== "" && selectedCourseId !== course._id}
                          style={{ backgroundColor: 'green', color: 'white' }}
                        >
                          Make Public
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Card>
              <CardContent>
                <Typography variant="body2" color="textSecondary" align="center">
                  No approved courses available.
                </Typography>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </main>
    </>
  );
}
