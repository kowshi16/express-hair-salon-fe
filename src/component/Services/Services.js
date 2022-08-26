import React from 'react'
import './Services.css'
import Header from '../Header/Header'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { useNavigate, useParams } from "react-router-dom";

function Services() {

  const navigate = useNavigate();
  let { type } = useParams();
  

  return (
    <>
      <Header />
      <Row className="row-services">
        <Col className="col-lg-6">
          <div className="left_data">
            <div className="services-content">
              <h3>{type}</h3>
              <div className="col">
                <p>
                  At Express we are passionate about making people feel good while looking their best.
                  Attending advanced education allows us to keep up with the latest trends and provide each
                  guest with a unique & customizable result. For your convenience, Schedule your reservation
                  today!
                </p>
              </div>
              <Button variant="dark" className="reserve-btn" onClick={() => navigate("/booking/"+type)}>Make a Reservation</Button>
            </div>
          </div>
        </Col>
        <Col className="col-lg-6">
          <div className="right_data_services">
          </div>
        </Col>
      </Row>
    </>
  )
}

export default Services
