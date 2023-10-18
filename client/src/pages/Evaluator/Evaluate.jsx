import React, { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import axios from "axios";
import { getToken } from "../../utils/auth";
import { Form, Link } from "react-router-dom";
import DoneIcon from '@mui/icons-material/Done';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import BasicRating from "../../components/BasicRating";
import createNotification from "../../utils/notification";

export default function Evaluate() {
  const [subjects, setSubjects] = useState([]);
  const [units, setUnits] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [courseUnderReview, setCourseUnderReview] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [selectedCourseAuthor, setSelectedCourseAuthor] = useState("");

  // State to track viewed courses
  const [viewedCourses, setViewedCourses] = useState({});

  const openApproveDialog = (courseId, authorName) => {
    setSelectedCourseId(courseId);
    setSelectedCourseAuthor(authorName);
    setOpenDialog(true);
  };

  const handleViewCourse = (courseId) => {
    // Mark the course as viewed
    setViewedCourses({ ...viewedCourses, [courseId]: true });
  };

  const handleApproveCourse = () => {
    // Check if the selected course for approval matches the viewed course
    if (selectedCourseId in viewedCourses) {
      // Perform the approval action here
      const courseId = selectedCourseId;
      const authorName = selectedCourseAuthor;
      console.log("Approving course with ID: " + courseId);
      setTimeout(() => {
        setOpenDialog(false);
        setSelectedCourseId("");
      }, 1000); // Simulating a delay for demonstration purposes

      axios
        .patch(`http://localhost:5000/api/courses/${courseId}`, {}, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + getToken(),
          },
          params: {
            status: 'Approved',
          }
        })
        .then((response) => {
          console.log(response);
          if (response.data.status === 'ok') {
            createNotification(authorName, 'Success', `Your course with id ${courseId} has been approved successfully.`);
            window.location.href = '/evaluator/evaluate/';
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // Handle the case where the Approve button was clicked without viewing the course
      console.log("You must view the course before approving it.");
    }
  };

  useEffect(() => {
    const profileData = localStorage.getItem("profileData");
    const profile = JSON.parse(profileData);
    const subjectsOfInterest = profile.subjectsOfInterest;
    setSubjects(subjectsOfInterest.split(","));
  }, []);

  const fetchUnits = (e) => {
    const subject = e.target.value;
    axios
      .get("http://localhost:5000/api/units/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getToken(),
        },
      })
      .then((response) => {
        const data = response.data.units;
        const units = data.filter((unit) => unit.subjectName === subject);
        setUnits(
          units.map((unit) => {
            return { unitName: unit.unitName, unitNumber: unit.unitNumber };
          })
        );
        setSelectedUnit(""); // Clear selected unit when subject changes
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (selectedUnit) {
      axios
        .get("http://localhost:5000/api/courses", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getToken(),
          },
          params: {
            status: "UnderReview",
          },
        })
        .then((response) => {
            // console.log(response.data.data);
          // Filter courses based on the selected unit
          const filteredCourses = response.data.data.filter(
            (course) => course.unitData.unitNumber === selectedUnit && course.subjectData.subjectName === selectedSubject
          );
          setCourseUnderReview(filteredCourses);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [selectedUnit, selectedSubject]);

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
            <Button onClick={handleApproveCourse} color="primary">
            Confirm
            </Button>
        </DialogActions>
    </Dialog>
    <main id="main" className="main">
      <PageTitle title="Evaluate" />
      <section className="section dashboard">
        <div className="row">
          <div className="col-lg-6">
            <Card>
              <CardContent>
                <Form method="post" action="">
                  <FormControl fullWidth variant="outlined" margin="normal">
                    <InputLabel htmlFor="subject">Subject</InputLabel>
                    <Select
                      name="subject"
                      id="subject"
                      label="Subject"
                      value={selectedSubject}
                      onChange={(e) => {
                        setSelectedSubject(e.target.value);
                        fetchUnits(e);
                      }}
                      required
                    >
                      <MenuItem value="">
                        <em>Select Subject</em>
                      </MenuItem>
                      {subjects.map((subject, index) => {
                        return (
                          <MenuItem key={index} value={subject}>
                            {subject}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth variant="outlined" margin="normal">
                    <InputLabel htmlFor="unit">Unit</InputLabel>
                    <Select
                      name="unit"
                      id="unit"
                      label="Unit"
                      value={selectedUnit}
                      onChange={(e) => setSelectedUnit(e.target.value)}
                      required
                    >
                      <MenuItem value="">
                        <em>Select Unit</em>
                      </MenuItem>
                      {units.map((unit, index) => {
                        return (
                          <MenuItem key={index} value={unit.unitNumber}>
                            {unit.unitName}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Form>
              </CardContent>
            </Card>
          </div>
          <div className="col-lg-12" style={{ marginTop: '20px' }}>
            {courseUnderReview.length > 0 && (
              <Card>
                <CardContent>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>CONTRIBUTOR</TableCell>
                          <TableCell>PDF</TableCell>
                          <TableCell>VIDEO</TableCell>
                          <TableCell>NOTES</TableCell>
                          <TableCell>AVG RATING</TableCell>
                          <TableCell>VIEW</TableCell>
                          <TableCell>ACTION</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {courseUnderReview.map((course, index) => (
                          <TableRow key={index}>
                            <TableCell><Link to={`/contributor/${course.authorName}`} target='_blank'>{course.authorName}</Link></TableCell>
                            <TableCell>{course.coursePdfPath.length !== 0 ? <DoneIcon /> : <CloseRoundedIcon /> }</TableCell>
                            <TableCell>{course.courseVideoPath !== '' ? <DoneIcon /> : <CloseRoundedIcon /> }</TableCell>
                            <TableCell>{course.courseContent.length >= 100 ? <DoneIcon /> : <CloseRoundedIcon /> }</TableCell>
                            <TableCell>
                                <BasicRating type="read" rating={course.rating} size="medium"/>
                            </TableCell>
                            <TableCell>
                                <Link to={`review/course/${course._id}`} target="_blank" className="btn btn-primary"  onClick={() => handleViewCourse(course._id)}>View</Link>
                            </TableCell>
                            <TableCell>
                            <Button
                            className="btn btn-primary"
                            onClick={() => openApproveDialog(course._id, course.authorName)}
                            disabled={!viewedCourses[course._id]}
                            style={{ backgroundColor: 'green', color: 'white' }}
                            >
                            Approve
                            </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            )}
            {courseUnderReview.length === 0 && (
              <Card>
                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    align="center"
                  >
                    No courses under review for the selected unit.
                  </Typography>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
