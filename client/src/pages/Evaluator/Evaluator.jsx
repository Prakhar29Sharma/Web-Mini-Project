import React, { useContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { getToken } from "../../utils/auth";
import { Link, useRouteLoaderData } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import ProfileContext from "../../store/ProfileContext";
import axios from "axios";
import Alert from "../../components/Alert";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

function Evaluator() {
  const ctx = useContext(ProfileContext);
  const [subjects, setSubjects] = useState([]);
  const [courses, setCourses] = useState([]);
  const [unitCounts, setUnitCounts] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const user = localStorage.getItem("user");
      const username = JSON.parse(user).username;

      try {
        const response = await axios.get(`http://localhost:5000/api/evaluator/${username}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getToken(),
          },
        });

        const data = response.data;

        if (data.status === "error" && data.message === "Evaluator not found") {
          localStorage.setItem("isProfileComplete", false);
          ctx.setIsProfileCreated(false);
        } else if (data.status === "ok") {
          localStorage.setItem("isProfileComplete", true);
          ctx.setIsProfileCreated(true);
          localStorage.setItem("profileData", JSON.stringify(data.data));
          const profileData = localStorage.getItem("profileData");
          const profile = JSON.parse(profileData);
          const subjectsOfInterest = profile.subjectsOfInterest;
          setSubjects(subjectsOfInterest.split(","));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [ctx]);

  useEffect(() => {
    const fetchCourses = async () => {
      if (subjects.length > 0) {
        try {
          const response = await axios.get("http://localhost:5000/api/courses/subjects/", {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + getToken(),
            },
            params: {
              subjects: subjects,
              isPublic: false,
              status: "UnderReview"
            },
          });

          const data = response.data;
          setCourses(data.data);
        } catch (error) {
          console.error("Error fetching courses:", error);
        }
      }
    };

    fetchCourses();
  }, [subjects]);

  useEffect(() => {
    if (courses.length > 0) {
      const unitCountsData = {};

      courses.forEach((course) => {
        const unitName = course.unitData.unitName;
        const subjectName = course.subjectData.subjectName;

        const key = `${subjectName}_${unitName}`;

        if (!unitCountsData[key]) {
          unitCountsData[key] = 1;
        } else {
          unitCountsData[key]++;
        }
      });

      sessionStorage.setItem("unitCounts", JSON.stringify(unitCountsData));
      setUnitCounts(unitCountsData);
    }
  }, [courses]);

  const { isAuthenticated } = useRouteLoaderData("evaluator");

  if (!isAuthenticated) {
    return <div></div>;
  }

  return (
    <main id="main" className="main">
      <PageTitle title="Dashboard" />
      {ctx.isProfileCreated ? (
        <>
          <section className="section dashboard">
            <div className="row">
              <div className="col-lg-8">
                <div className="row">
                  <div className="col-xxl-20 col-md-">
                    <div className="card info-card sales-card">
                      <div className="card-body">
                        <Link to="">
                          <h5 className="card-title">
                            Get started with evaluation
                          </h5>

                          <div className="d-flex align-items-center">
                            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                              <Link to="evaluate">
                                <i
                                  className="fas fa-plus"
                                  style={{ fontSize: "36px" }}
                                ></i>
                              </Link>
                            </div>
                            <div className="ps-3">
                              <h6> </h6>
                              <span className="text-success small pt-1 fw-bold"></span>{" "}
                              <span className="text-muted small pt-2 ps-1"></span>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>

                    <div className="card info-card sales-card">
                      <div className="card-body">
                        <Link to="">
                          <h5 className="card-title">
                            Total Course be Evaluated
                          </h5>
                          <div className="d-flex align-items-center">
                            <div className="">
                              <h6>{courses.length}</h6>
                              <span className="text-success small pt-1 fw-bold"></span>{" "}
                              <span className="text-muted small pt-2 ps-1"></span>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>

                    <div className="card info-card sales-card">
                      <div className="card-body">
                        <Link to="">
                          <h5 className="card-title">Course Counts by Unit and Subject</h5>
                            <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                <TableRow>
                                    <TableCell>Subject</TableCell>
                                    <TableCell>Unit Name</TableCell>
                                    <TableCell>
                                    Courses submitted for review
                                    </TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {Object.entries(unitCounts).map(
                                    ([key, count]) => {
                                      const [subjectName, unitName] = key.split("_");
                                      return (
                                        <TableRow key={key}>
                                            <TableCell>{subjectName}</TableCell>
                                            <TableCell>{unitName}</TableCell>
                                            <TableCell>{count}</TableCell>
                                        </TableRow>
                                      );
                                    }
                                )}
                                </TableBody>
                            </Table>
                            </TableContainer>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <Alert
          message="complete your profile!"
          link="create_profile"
          link_text="click here to create profile"
        />
      )}
    </main>
  );
}

export default Evaluator;

export async function loader({ request }) {
  const token = await getToken();
  // console.log('token:', token);

  if (token === "EXPIRED") {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("expiration");
    window.location.href = "/login";
    return { isAuthenticated: false };
  }

  if (token !== null && token !== undefined) {
    const user = jwtDecode(token);
    // console.log('user:', user);
    if (user) {
      if (user.role === "EVALUATOR") {
        return { isAuthenticated: true };
      }
    }
  }
  window.location.href = "/login";
  return { isAuthenticated: false };
}
