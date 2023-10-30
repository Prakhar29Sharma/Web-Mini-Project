import React, { useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import { getToken } from '../../utils/auth';
import axios from 'axios';
import ImageAvatar from '../../components/ImageAvatar';

export default function Profile() {

    const [ImagePath, setImagePath] = useState('');
    const [profileData, setProfileData] = useState({});

    useEffect(() => {
        const user = localStorage.getItem('user');
        const username = JSON.parse(user).username;
        axios.get(`http://localhost:5000/api/student/${username}`,{
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken(),
            }
        })
        .then((response) => {
            console.log(response.data.data);
            setProfileData(response.data.data);
            const profileImagePath = response.data.data.profileImagePath;
            if (profileImagePath === null) {
            setImagePath('http://localhost:5000/assets/profile-image.jpg');
            } else {
            setImagePath('http://localhost:5000/' + profileImagePath.replace('\\', '/').replace('public/', ''));
            return;
            }
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    const isProfileComplete = localStorage.getItem('isProfileComplete');

    if (!isProfileComplete || !profileData) {
        window.location.href = '/student'; 
        return null; 
    }

    return (
        <>
        <main id="main" classNameName="main">
            <PageTitle title="Profile" />
            <section className="section profile">
                <div className="row">
                    <div className="col-xl-4">
                        <div className="card">
                            <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                            <ImageAvatar imagePath={ ImagePath } username="avatar" size="100px" />
                            <h2>{profileData.firstName} {profileData.lastName}</h2>
                            <h3>Student</h3>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-8">

                        <div className="card">
                            <div className="card-body pt-3">
                            <ul className="nav nav-tabs nav-tabs-bordered">

                                <li className="nav-item">
                                <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview">Overview</button>
                                </li>

                                <li className="nav-item">
                                <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-edit">Edit Profile</button>
                                </li>

                                <li className="nav-item">
                                <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-change-password">Change Password</button>
                                </li>

                            </ul>
                            <div className="tab-content pt-2">

                                <div className="tab-pane fade show active profile-overview" id="profile-overview">
                                <h5 className="card-title">Profile Details</h5>

                                <div className="row">
                                    <div className="col-lg-3 col-md-4 label ">Full Name</div>
                                    <div className="col-lg-9 col-md-8">{ profileData.firstName + " " + profileData.lastName }</div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-3 col-md-4 label">Email</div>
                                    <div className="col-lg-9 col-md-8">{ profileData.email }</div>
                                </div>

                                {/* <div className="row">
                                    <div className="col-lg-3 col-md-4 label">DOB</div>
                                    <div className="col-lg-9 col-md-8">{ profileData.dob.replace('T00:00:00.000Z','') }</div>
                                </div> */}

                                <div className="row">
                                    <div className="col-lg-3 col-md-4 label">Phone Number</div>
                                    <div className="col-lg-9 col-md-8">{ profileData.phone }</div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-3 col-md-4 label">City</div>
                                    <div className="col-lg-9 col-md-8">{ profileData.city }</div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-3 col-md-4 label">College</div>
                                    <div className="col-lg-9 col-md-8">{ profileData.college }</div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-3 col-md-4 label">University</div>
                                    <div className="col-lg-9 col-md-8">{ profileData.university }</div>
                                </div>
                            </div>
                    </div>
                </div>
                </div>
                </div>
                </div>
                </section>
            </main>
        </>
    );
}
