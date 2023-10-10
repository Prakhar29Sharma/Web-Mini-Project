import React, { useState } from "react";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import {useRouteLoaderData} from 'react-router-dom';
import axios from "axios";
import { getToken } from "../../utils/auth";
import "../../assets/vendor/bootstrap/css/bootstrap.min.css";
import "../../assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "../../assets/vendor/boxicons/css/boxicons.min.css";
import "../../assets/vendor/quill/quill.snow.css";
import "../../assets/vendor/quill/quill.bubble.css";
import "../../assets/vendor/remixicon/remixicon.css";
import "../../assets/vendor/simple-datatables/style.css";
import "../../assets/css/style.css";
import "./Admin.modules.css";
import PageTitle from "../../components/PageTitle";
import { Grid, Card, CardContent, Typography } from "@mui/material";

function Admin() {

    const [userCount, setUserCount] = useState(0);
    const [studentCount, setStudentCount] = useState(0);
    const [contributorCount, setContributorCount] = useState(0);
    const [evaluatorCount, setEvaluatorCount] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:5000/api/users/count/all', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken(),
            }
        })
        .then((response) => {
            // console.log(response.data);
            if (response.data.status === 'ok') {
                setUserCount(response.data.user_count);
                setStudentCount(response.data.student_count);
                setContributorCount(response.data.contributor_count);
                setEvaluatorCount(response.data.evaluator_count);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }, []);

    const { isAuthenticated } = useRouteLoaderData('admin');

    if (!isAuthenticated) {
        return (<div></div>);
    }

    return (
        <>
      <main id="main" className="main">
        <PageTitle title="Dashboard" />
        <section className="section dashboard">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="div">
                    Total Users
                  </Typography>
                  <Typography variant="h4" color="primary">
                    {userCount}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="div">
                    Students
                  </Typography>
                  <Typography variant="h4" color="primary">
                    {studentCount}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="div">
                    Contributors
                  </Typography>
                  <Typography variant="h4" color="primary">
                    {contributorCount}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="div">
                    Evaluators
                  </Typography>
                  <Typography variant="h4" color="primary">
                    {evaluatorCount}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </section>
      </main>
    </>
    );
}

export default Admin;

export async function loader({ request }) {
    const token = await getToken();
    // console.log('token:', token);
    if (token !== null && token !== undefined) {

        if (token === 'EXPIRED') {
            localStorage.clear();
            window.location.href = '/login';
            return { isAuthenticated: false };
        }

        const user = jwtDecode(token);
        // console.log('user:', user);
        if (user) {
            if (user.role === 'ADMIN') {
                return { isAuthenticated: true };
            }
        }
    }
    window.location.href = '/login';
    return { isAuthenticated: false };
}