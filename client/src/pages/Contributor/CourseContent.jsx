import React from 'react'
import PageTitle from '../../components/PageTitle'
import { Link } from 'react-router-dom'

export default function CourseContent() {
  return (
    <>
       <main id="main" classNameName="main">
                <PageTitle title="Create Course" />

{/* <!-- End Page Title --> */}

<section className="section">
    <div className="row">
        <div className="col-lg-8">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Create Course</h5>

                    <form method="post" enctype="multipart/form-data">
                        
                        <div className="row mb-3">
                          <label for="course_title" className="col-sm-2 col-form-label">Course Title</label>
                          <div className="col-sm-10">
                            <input name="course_title" id="course_title" type="text" className="form-control" placeholder="Course Title, Ex: Python OOPs Concepts" required/>
                          </div>
                        </div>

                        <div className="row mb-3">
                          <label for="subject" className="col-sm-2 col-form-label">Subject</label>
                          <div className="col-sm-10">
                            <input name="subject" id="subject" type="text" className="form-control" value="{{ subject }} " disabled/>
                          </div>
                        </div>

                        <div className="row mb-3">
                          <label for="unit" className="col-sm-2 col-form-label">Unit</label>
                          <div className="col-sm-10">
                            <input name="unit" id="unit" type="text" className="form-control" value="{{ unit }} " disabled/>
                          </div>
                        </div>

                        <div className="row mb-3">
                          <label for="course_desc" className="col-sm-2 col-form-label">Course Description</label>
                          <div className="col-sm-10">
                            <textarea name="course_description" id="course_desc" className="form-control"  placeholder="Course Description, Ex: This course will help you build foundation in DSA"></textarea>
                          </div>
                        </div>

                        <div className="row mb-3">
                          <label for="course_objectives" className="col-sm-2 col-form-label">Course Objectives</label>
                            <div className="field_wrapper ">
                              <div className="input-group mb-3">
                                  <Link to="javascript:void(0);" className="add_button btn btn-outline-success" title="Add field">
                                  <span className="bi bi-plus-lg"></span></Link>
                                  <input id="course_objectives" type="text" name="objectives" value="" className="form-control " placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                            </div>
                          </div>
                         </div>


                        <div className="row mb-3">
                          <label for="course_prerequisite" className="col-sm-2 col-form-label">Course Prerequisite</label>
                            <div className="field_wrapper2">
                              <div className="input-group mb-3">
                                  <Link to="javascript:void(0);" className="add_button btn btn-outline-success" title="Add field">
                                  <span className="bi bi-plus-lg"></span></Link>
                                  <input id="course_prerequisite" type="text" name="prerequisites" value="" className="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                            </div>
                          </div>
                        </div>
                      {/* <!-- endof prerequisite --> */}

                        <div className="row mb-3">
                          <label for="course_image" className="col-sm-2 col-form-label">Course Image</label>
                          <div className="col-sm-10">
                            <input name="course_image" id="course_image" type="file" accept=".jpg,.jpeg,.png" className="form-control" required/>
                          </div>
                        </div>

                        <div className="row mb-3">
                          <label for="course_video" className="col-sm-2 col-form-label">Course Video</label>
                          <div className="col-sm-10">
                            <input name="course_video" id="course_video" type="file" accept="video/*" className="form-control"/>
                          </div>
                        </div>

                        <div className="row mb-3">
                          <div className="col-sm-10">
                            {/* {{form.media}} {{form.as_p}} */}
                          </div>
                        </div>

                        <div className="row mb-3">
                          <div className="col-sm-10">
                            <button type="submit" className="btn btn-primary">Save as a draft</button>
                          </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>

</main>
</>
  )
}
