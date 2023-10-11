import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import BasicChips from '../../components/BasicChips';
import ImageAvatar from '../../components/ImageAvatar';

export default function PublicProfile() {

    const [ImagePath, setImagePath] = useState('');
    const [profileData, setProfileData] = useState({});

    const params = useParams();
    const { username } = params;

    useEffect(() => {
        axios.get(`http://localhost:5000/api/public/contributor/${username}`,{
            headers: {
            'Content-Type': 'application/json',
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
    }, [username]);

    return (
        <>
            <div style={{ margin: '15px' }}>
            <section className="section profile">
                <div className="row">
                    <div className="col-xl-4">
                        <div className="card">
                            <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                            <ImageAvatar imagePath={ ImagePath } username="avatar" size="100px" />
                            <h2>{profileData.firstName} {profileData.lastName}</h2>
                            <h3>Contributor</h3>
                            <div className="social-links mt-2">
                                <Link to={profileData.github} className="github" target='_blank'><i className="bi bi-github"></i></Link>
                                <Link to={profileData.linkedIn} className="linkedin" target='_blank'><i className="bi bi-linkedin"></i></Link>
                                <Link to={profileData.portfolio} className="portfolio" target='_blank'><i className="bi bi-link"></i></Link>
                            </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                            <h2>Badges Unlocked</h2>
                            <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', marginTop: '10px' }}>
                            <ImageAvatar imagePath={ "http://localhost:5000/assets/contributor_badge.png" } username="badge" size="80px" />
                            <ImageAvatar imagePath={ "http://localhost:5000/assets/contributor_badge.png" } username="badge" size="80px" />
                            <ImageAvatar imagePath={ "http://localhost:5000/assets/contributor_badge.png" } username="badge" size="80px" />
                            </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-8">

                        <div className="card">
                            <div className="card-body pt-3">
                            <div className="tab-content pt-2">

                                <div className="tab-pane fade show active profile-overview" id="profile-overview">
                                <h5 className="card-title">Profile Details</h5>

                                <div className="row">
                                    <div className="col-lg-3 col-md-4 label ">Full Name</div>
                                    <div className="col-lg-9 col-md-8">{ profileData.firstName + " " + profileData.lastName }</div>
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

                                <div className="row">
                                    <div className="col-lg-3 col-md-4 label">Qualification</div>
                                    <div className="col-lg-9 col-md-8">{ profileData.qualification }</div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-3 col-md-4 label">Years of Experience</div>
                                    <div className="col-lg-9 col-md-8">{ profileData.yearsOfExperience }</div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-3 col-md-4 label">Subjects to Contribute</div>
                                    <div className="col-lg-9 col-md-8">{ /* profileData.subjectsToContribute */ }{
                                        profileData.subjectsOfInterest !== undefined ? profileData.subjectsToContribute.split(",").map((subject, index) => {
                                            return (
                                                <BasicChips key={index} label={subject} />
                                            );
                                        }) : ""
                                    }</div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-3 col-md-4 label">Subjects of Interest</div>
                                    <div className="col-lg-9 col-md-8">{ /* profileData.subjectsOfInterest */ } {
                                        profileData.subjectsOfInterest !== undefined ? profileData.subjectsOfInterest.split(",").map((subject, index) => {
                                            return (
                                                <>
                                                    <BasicChips key={index} label={subject} />
                                                </>
                                            );
                                        }) : ""
                                    }</div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-3 col-md-4 label">Course Uploaded</div>
                                    <div className="col-lg-9 col-md-8">{ profileData.noOfCoursesPublic }</div>
                                </div>
                            </div>
                    </div>
                </div>
                </div>
                </div>
                </div>
                </section>
            </div>
        </>
    );
}
