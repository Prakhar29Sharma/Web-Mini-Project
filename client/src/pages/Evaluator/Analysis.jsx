import React, { useEffect, useState } from 'react'
import { Form, Link } from 'react-router-dom'
import { getToken } from '../../utils/auth'
import axios from 'axios'
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

export default function Analysis() {
  const [units,setUnits]= useState([])
  const [subjects,setSubjects]= useState([])
  const [selectedUnit, setSelectedUnit] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')
  const [courses, setCourses] = useState([]); 
  const [notesCount, setNotesCount] = useState([]);
  const [courseId,setCourseId]=useState([])
  const [author, setAuthor] = useState([]);
  const [videoCount, setVideoCount] = useState([]);
  const [pdfCount, setPdfCount] = useState([]);
  const [status, setStatus] = useState([]);
  const fetchSubjects = (e) => {
    try {
      const response = axios.get('http://localhost:5000/api/subjects/', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken(),
        }
    })
        .then((response)=>{
          const subjectData = response.data.subjects;
          const subjectList=subjectData.map((subject)=>subject.subjectName);
          setSubjects(subjectList);
          // console.log(subjectList);

          
        })
    } catch (error) {
      console.error(error)
    }
  }
  const fetchUnits = (e) => {
    const subject = e.target.value;
    setSelectedSubject(subject);
    axios.get('http://localhost:5000/api/units/', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getToken(),
      }
    })
    .then((response) => {
      const data = response.data.units;
     
      const unitList = data.filter((unit) => unit.subjectName === subject);
      setUnits(unitList.map((unit) => { return {"unitName":unit.unitName, "unitNumber": unit.unitNumber} }));
      
    })
    .catch((error) => {
      console.log(error);
    })
  }
  
  const fetchCourses = (subject, unit) => {
    
    axios.get('http://localhost:5000/api/courses/', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getToken(),
      },
     
    })
    .then((response) => {
      const courses = response.data.data;
      // console.log("selectedUnit:", selectedUnit);
  const courseList = courses
  .filter((course) => course.status === "Approved" || course.status === "Under-Review")
  .filter((course) => course.subjectData.subjectName === subject)
  // .filter((course) => {
  //   console.log(`Course Unit Number: ${course.unitData.unitNumber}`);
  //   console.log(`Selected Unit: ${selectedUnit}`);
  //   return course.unitData.unitNumber === 1;
  // }); // Filter courses based on subject and unit
      // const filteredCoursesSubject = courses.filter((course) => course.subjectData.subjectName===subject ).filter((course) => course.status === "Approved" || course.status === "UnderReview");
      // const filteredCoursesUnit = filteredCoursesSubject.filter((course) => course.unitData.unitNumber === unit);
      // console.log(`Course: ${course.unitData.unitNumber},${course.unitData.unitNumber === unit}`);
      //console.log(`Course: ${course.subjectData.subjectName},${course.subjectData.subjectName === subject}`);
      
      console.log(courseList);
      const courseId = courseList.map((course) => course._id);
      const author = courseList.map((course) => course.authorName);
      const status = courseList.map((course)=>course.status)
      const videoCounts = courseList.map((course) => {
        const exists =
          course.courseVideoPath && course.courseVideoPath.trim() !== "";
        return exists ? 1 : 0;
      });
      // {CheckCircleOutlineRoundedIcon} : {CancelRoundedIcon};
      // console.log(videoCounts);
      const pdfCounts = courseList.map((course) => {
        const count= course.coursePdfPath.length
        const exists = count > 0 ? 1 : 0;
        return exists ? count : 0;
      });
      const notesCount = courseList.map((course) => {
        const notesContent = course.courseNotesPath; // Assuming course.courseNotesPath contains the notes content as a string
        const count = notesContent ? notesContent.length : 0; // Get the length of the notes content
        
        // You can set a threshold length to consider it as present or not
        const threshold = 25; // You can adjust this value as needed
      
        const exists = count >= threshold ? 1 : 0; // Check if length exceeds the threshold
      
        return exists ? count : 0; });

      console.log(notesCount);
      setNotesCount(notesCount);
      setCourseId(courseId);
      setAuthor(author);
      setVideoCount(videoCounts);
      setPdfCount(pdfCounts);
      setStatus(status);
      // Handle the fetched courses as needed
    })
     
  }
  
  const renderIcon = (exists) => {
    if (exists) {
      return <CheckCircleOutlineRoundedIcon style={{ color: 'green' }} />;
    } else {
      return <CancelRoundedIcon style={{ color: 'red' }} />;
    }
  };
  

const handleContinueClick = () => {
  try {
   
    // console.log("handleContinueClick called");
    // console.log("Selected Subject:", selectedSubject);
    // console.log("Selected Unit:", selectedUnit);
    if (selectedSubject && selectedUnit) {
      fetchCourses(selectedSubject, selectedUnit);
    }
  } catch (error) {
    console.log(error);
  } 
}
  useEffect(() => {
    fetchSubjects();
    
  }, [])
 // Function to render the table rows
 const renderTableRows = () => {
  if (author.length === 0) return ("No courses found");
  return author.map((author, index) => (
    <TableRow key={author._id}>
      <TableCell centre>{author}</TableCell>
      <TableCell justify>{renderIcon(videoCount[index])}</TableCell>
      <TableCell centre>{renderIcon(pdfCount[index])}</TableCell>
      <TableCell centre>{renderIcon(notesCount[index])}</TableCell>
      <TableCell centre>  <Link to={`/evaluator/rate_and_review/${courseId[index]}`}>
      <Button color="secondary">Review</Button></Link>
</TableCell>

      <TableCell align='centre'><Button>{status[index]}</Button></TableCell>
    </TableRow>
  ));
};

  return (
    <div>
      <main id="main"  className="main"><h1>Analysis</h1>
      
      <Form method="get" action="">
                                <div className="row mb-3">
                                  <label className="col-sm-2 col-form-label">Subject</label>
                                  <div className="col-sm-10">
                                    <select name="subject" id="subject" className="form-select" aria-label="Default select example" onChange={fetchUnits} required>
                                      <option>Select Subject</option>
                                        {
                                            subjects.map((subject, index) => {
                                                return <option key={index} value={subject}>{subject}</option>
                                            })
                                        }
                                    </select>
                                  </div>
                                </div>
                                <div className="row mb-3">
                                  <label className="col-sm-2 col-form-label">Unit</label>
                                  <div className="col-sm-10">
                                    <select name="unit" id="unit" className="form-select" aria-label="Default select example" 
                                    onChange={(e) => setSelectedUnit(e.target.value)}
                                    disabled={ units.length === 0 ? true : false }  required>
                                      <option value='' >Select Unit</option>
                                        {
                                            units.map((unit, index) => {
                                                return <option key={index} value={unit.unitNumber}>{unit.unitName}</option>
                                            })
                                        }
                                    </select>
                                  </div>
                                </div>
                                <div className="row mb-3">
                                  <div className="col-sm-10">
                                    <button type="submit" className="btn btn-primary"   
                                    onClick={handleContinueClick} 
                                    disabled={units.length === 0 ? true: false}>Continue</button>
                                  </div>
                                </div>
                            </Form>

                             {/* Table to display fetched courses */}
        <Table className="table">
          <TableHead>
            <TableRow>
              <TableCell align='centre'>Author</TableCell>
              <TableCell align='centre'>Video</TableCell>
              <TableCell align='centre'>PDF</TableCell>
              <TableCell align='centre'>Notes</TableCell>
              <TableCell align='centre'>Course</TableCell>
              <TableCell align='centre'>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
           
         { renderTableRows()}
          </TableBody>
        </Table>
                            </main>
    </div>
  )
}
