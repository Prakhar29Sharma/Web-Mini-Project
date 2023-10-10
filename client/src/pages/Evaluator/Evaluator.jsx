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

  const countUnits = () => {
    if (courses.length !== 0) {
      const unitCounts = {};
      // Iterate through the courses array
      courses.forEach((course) => {
        const unitName = course.unitData.unitName;

        // If the unit name doesn't exist in unitCounts, initialize it with a count of 1
        if (!unitCounts[unitName]) {
          unitCounts[unitName] = 1;
        } else {
          // If the unit name already exists, increment the count
          unitCounts[unitName]++;
        }
      });
      setUnitCounts(unitCounts);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    const username = JSON.parse(user).username;

    axios
      .get(`http://localhost:5000/api/evaluator/${username}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getToken(),
        },
      })
      .then((response) => {
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
          // Use a functional update to setSubjects
          setSubjects((prevSubjects) => subjectsOfInterest.split(","));
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // Move fetchCourses outside of the useEffect
    const fetchCourses = async () => {
      // console.log('subjects:', subjects);
      axios
        .get("http://localhost:5000/api/courses/subjects/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getToken(),
          },
          params: {
            subjects: subjects ? subjects : [],
            isPublic: false,
          },
        })
        .then((response) => {
          console.log(response.data.data);
          setCourses(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    // Call fetchCourses here
    if (subjects.length > 0) {
      fetchCourses();
      countUnits();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctx]);

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
                          <h5 className="card-title">Course Counts by Unit</h5>
                            <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                <TableRow>
                                    <TableCell>Unit Name</TableCell>
                                    <TableCell>
                                    Courses submitted for review
                                    </TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {Object.entries(unitCounts).map(
                                    ([unitName, count]) => (
                                    <TableRow key={unitName}>
                                        <TableCell>{unitName}</TableCell>
                                        <TableCell>{count}</TableCell>
                                    </TableRow>
                                    )
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
