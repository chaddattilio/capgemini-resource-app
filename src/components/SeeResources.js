import React, { useState } from "react";
import { Link } from "@reach/router";
import { fetchEmployees } from "../utils/api";
import { Modal, Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function EmployeesListing(props) {
  const [show, setShow] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChange = date => {
    console.log(startDate);
    setStartDate(date);
  };

  return (
    <div className="employee-container container-fluid">
      {props.data.data.map(employee => {
        return (
          <>
            <div className="employee" key={employee.emp_id}>
              <div className="name">
                {employee.last_name}, {employee.first_name}
              </div>
              <div className="role">{employee.emp_type}</div>
              <div className="weeks">
                {Object.keys(employee.projects.weeks).map(week => {
                  let hoursLeftForWeek = 0;

                  return (
                    <div className="week" key={week.week_id}>
                      <div className="date">
                        {employee.projects.weeks[week].start_date
                          .toDate()
                          .toDateString()}
                      </div>

                      {Object.keys(employee.projects.weeks[week].projects).map(
                        project => {
                          hoursLeftForWeek +=
                            employee.projects.weeks[week].projects[project]
                              .hours;

                          return (
                            <div
                              className="project-hours"
                              key={
                                employee.projects.weeks[week].projects[project]
                                  .project_id
                              }
                            >
                              <div className="name">
                                Project name:
                                {
                                  employee.projects.weeks[week].projects[
                                    project
                                  ].project_name
                                }
                              </div>
                              <div className="hours">
                                Hours allocated:{" "}
                                {
                                  employee.projects.weeks[week].projects[
                                    project
                                  ].hours
                                }
                              </div>
                            </div>
                          );
                        }
                      )}
                      <div className="hours-left">
                        Hours available this week: {40 - hoursLeftForWeek}
                      </div>

                      {40 - hoursLeftForWeek > 1 ? (
                        <div>
                          <button
                            className="btn btn-primary"
                            onClick={handleShow}
                          >
                            Reserve {employee.first_name}
                          </button>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>
                  Request resource time: {employee.first_name}{" "}
                  {employee.last_name}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Project</Form.Label>
                    <Form.Control as="select">
                      <option>Art Van</option>
                      <option>GoPro</option>
                      <option>Hibbett</option>
                      <option>DMAT</option>
                      <option>Under Armour</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Week of:</Form.Label>
                    <DatePicker selected={startDate} onChange={handleChange} />
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlInput2">
                    <Form.Label>Hours requested:</Form.Label>
                    <Form.Control type="text" />
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Comments:</Form.Label>
                    <Form.Control as="textarea" rows="3" />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        );
      })}
    </div>
  );
}

class SeeResources extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      employees: [],
      error: null
    };

    this.updateEmployees = this.updateEmployees.bind(this);
    this.isLoading = this.isLoading.bind(this);
  }

  componentDidMount = async () => {
    this.updateEmployees();

    /*this.setState({ posts })*/

    /*this.unsubscribe = firestore.collection('posts').onSnapshot(snapshot => {
      const posts = snapshot.docs.map(collectIdsAndDocs)
      this.setState({ posts })
    })*/
  };

  updateEmployees() {
    /*this.setState({
      employees: [],
      error: null
    });*/

    fetchEmployees()
      .then(data => {
        this.setState(({ employees }) => ({
          employees: {
            ...employees,
            data
          }
        }));
      })
      .catch(() => {
        console.warn("Error fetching employees: " + error);

        this.setState({
          error: "There was an error fetching the employees."
        });
      });
  }

  isLoading() {
    const { employees } = this.state;

    return employees.length == 0;
  }

  render() {
    const { employees, error } = this.state;

    return (
      <React.Fragment>
        {this.isLoading() ? (
          <p>LOADING</p>
        ) : (
          <EmployeesListing data={employees} />
        )}

        {error && <p>{error}</p>}

        <div>
          <Link to="/">Back to home</Link>
        </div>
      </React.Fragment>
    );
  }
}

export default SeeResources;
