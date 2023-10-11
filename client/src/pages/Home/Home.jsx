import React from "react";

function Home() {
    return (
        <div>
            <header class="pt-5">
                <div class="container pt-4 pt-xl-5">
                    <div class="row pt-5">
                        <div class="col-md-8 text-center text-md-start mx-auto">
                            <div class="text-center">
                                <h1 class="display-4 fw-bold mb-5">Inspire. Educate. Empower</h1>
                                <p class="fs-5 text-muted mb-5">OER Platform for MU Students</p>
                            </div>
                        </div>
                        <div class="col-12 col-lg-10 mx-auto">
                            <div class="text-center position-relative"><img class="img-fluid" src="http://localhost:5000/assets/illustration.jpg" width="500" height="500"/></div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default Home;