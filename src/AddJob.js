import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export default function AddJobModal(props) {
  return (
    <Modal
    {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Form onSubmit={props.handleSubmit}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add a new job listing
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Job Title</Form.Label>
          <Form.Control placeholder="Job Title" onChange={(e) => props.setJobTitle(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control placeholder="Decription" onChange={(e) => props.setJobDescription(e.target.value)}/>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
      <Button variant="primary" type="submit">
          Submit
        </Button>
      </Modal.Footer>
      </Form>
    </Modal>
  );
}
