import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import AddJobModal from './AddJob';
import { Container } from 'react-bootstrap';
import { Stack } from 'react-bootstrap';

// const express = require("express");
// const { URL } = require("url");
// const { v4: uuid } = require("uuid");
// const fs = require("fs/promises");

function JobCard({job, description, id}) {

  const [comment, setComment] = useState('')

  const [commentsJobsArray, setCommentsJobsArray] = useState([])

  const myHeaders = new Headers();


  const myRequest = new Request('http://localhost:4200/jobs', {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default',
  });
 
  async function getComments() {

    let commentsArray =[]

    await fetch(myRequest)
    .then(response => response.json())
    .then(myResponse => {
      myResponse.content.map(job => {
        if (job.id === id) {
          job.comments.map(data => {
            commentsArray.push(data.comment)
            console.log(commentsArray)
            return commentsArray
          })
        } else {
          return "no id match"
        }
      })
      return "comments added"})

      setCommentsJobsArray(commentsArray)

      }
      



  async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  function handleCommentSubmit(e) {
    e.preventDefault();
    postData('http://localhost:4200/comments', { comment: comment, id: id})
    .then(data => {
      console.log(data); // JSON data parsed by `data.json()` call
    });
  }

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{job}</Card.Title>
        <Card.Text>
         {description}
        </Card.Text>
        <Form onSubmit={handleCommentSubmit}>
        <Form.Group className="mb-3">
          <Form.Control placeholder="Write a comment..." onChange={(e) => setComment(e.target.value)}/>
        </Form.Group>
        <Button variant="primary" type="submit" size="sm">
          Post Comment
        </Button>
      </Form>
      <Button className="mt-2" size="sm"onClick={() => getComments()}>
        View Comments
      </Button>
      {commentsJobsArray.map(comment => (<h6 className="mt-2">{comment}</h6>))}
      </Card.Body>
    </Card>
  );
}

function App() {

  async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  

  // function getJobs() {
  //   fetch('http://localhost:4200/jobs')
  //   .then(data => {
  //   console.log(data.json())
  //   return data.json();
  //   })
  // }

  const myHeaders = new Headers();

  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobsArray, setJobsArray] = useState([])
  const [modalShow, setModalShow] = useState(false);

  const myRequest = new Request('http://localhost:4200/jobs', {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default',
  });
 
  function getJobs() {
    fetch(myRequest)
    .then(response => response.json())
    .then(myResponse => {
      console.log(myResponse);
      setJobsArray(myResponse.content)
    });
  }
  
  
  function handleSubmit(e) {
    e.preventDefault();
    postData('http://localhost:4200/jobs', { job: jobTitle, description: jobDescription })
    .then(data => {
      console.log(data); // JSON data parsed by `data.json()` call
    });
    setModalShow(false)
  }
 




  // const app = express();
  // const url = new URL('https://localhost:3000')
  // console.log(url)

  // function handleSubmit() {
  //   app.post("/jobs", async (req, res) => {
  //     const id = uuid();
  //     const content = {
  //           "title": jobTitle,
  //           "description": jobDescription
  //     };
    
  //     if(!content) {
  //       return res.sendStatus(400);
  //     }
    
  //     await fs.writeFile(`data/job-info/${id}.txt`, content)
    
  //     res.status(201).json({
  //       id: id
  //     });
  //   })
  // }
  

  // app.listen(3000, () => console.log("API Server is running..."));

  return (
    <Container className="my-4">
    <Stack direction='horizontal' gap='2' className='mb-4'>
      <h1 className="me-auto">Jobs</h1>
      <Button variant="primary" onClick={() => setModalShow(true)}>
          Add Job
      </Button>
      <Button onClick={() => getJobs()}>
        Update Job Listing
      </Button>
    </Stack>
      <AddJobModal
        handleSubmit={handleSubmit}
        setJobTitle={setJobTitle}
        setJobDescription={setJobDescription}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      {jobsArray.map(job => (<JobCard
        job={job.job}
        description={job.description}
        id={job.id}
      />))}
    </Container>
  );
}


export default App;
