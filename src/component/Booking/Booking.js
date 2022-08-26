import React, { useState, useEffect, useRef } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Header from "../Header/Header";
import "./Booking.css";
import servicesData from "../../ServiceType.json";
import StripeCheckout from "react-stripe-checkout";
import { useParams, useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
function Booking() {
  let { type } = useParams();
  const navigate = useNavigate();
  const form = useRef();
  const buttonRef = useRef();
  // let [typePrice, setTypePrice] = useState();
  const [service, setService] = useState({
    name: type,
    price: 25,
  });
  const handleStripeSuccess = () => {
    MySwal.fire({
      icon: "success",
      title: "Payment was successful",
    });
    navigate("/confirmation");
    // email sending
    console.log("email sending");
    emailjs
      .sendForm(
        "service_1bdx64m",
        "template_hm0t755",
        form.current,
        "nUK50uZ1kc7Hjlash"
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  const makePayment = (token) => {
    const body = {
      token,
      service,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return fetch(`http://localhost:3001/api/payment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        handleStripeSuccess();
        console.log("RESPONSE ", response);
        const { status } = response;
        console.log("STATUS ", status);
      })
      .catch((error) => console.log(error));
  };
  // form validation goes here
  const initialValues = {
    service: type,
    fname: "",
    lname: "",
    email: "",
    dateBook: "",
    timeBook: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  // const handleChangeService = (e) =>{
  //   if(e.target.value === 'Haircut'){
  //     setTypePrice = servicesData[0].price;
  //     console.log("price ------------ " + servicesData[0].price);
  //     console.log("service price ------------ " + typePrice);
  //   }
  //   else if(e.target.value === 'Hair Styling'){
  //     setTypePrice = servicesData[2].price;
  //     console.log("price ------------ " + servicesData[2].price);
  //     console.log("service price ------------ " + typePrice);
  //   }
  //   else if(e.target.value === 'Makeup'){
  //     setTypePrice = servicesData[3].price;
  //     console.log("price ------------ " + servicesData[3].price);
  //     console.log("service price ------------ " + typePrice);
  //   }
  // }
  const handleSubmit = (e) => {
    console.log("inside handle submit method");
    e.preventDefault();
    const validateStatus = validate(formValues);
    setFormErrors(validateStatus);
    if (Object.keys(validateStatus).length === 0) {
      setIsSubmit(true);
      buttonRef.current.click();
      console.log("form values ----------- " + formValues);
    }
  };
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.fname) {
      errors.fname = "First name is required!";
    }
    if (!values.lname) {
      errors.lname = "Last name is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.dateBook) {
      errors.dateBook = "Date is required!";
    }
    if (!values.timeBook) {
      errors.timeBook = "Time is required!";
    } else if (values.timeBook < "08:00" || values.timeBook > "18:00") {
      errors.timeBook = "Working hours 8AM to 6PM";
    }
    return errors;
  };
  return (
    <>
      <Header />
      <Row className="row-booking">
        <Col className="col-lg-6">
          <div className="left_data">
            <div className="form-container-booking">
              <form className="form-booking" ref={form} onSubmit={handleSubmit}>
                <div className="form-content-booking">
                  <h3>Booking details</h3>
                  <div className="form-inner-content">
                    <Form.Group className="mb-3" controlId="formService">
                      <Form.Select
                        name="service"
                        defaultValue={type}
                        onChange={handleChange}
                      >
                        <option value="Haircut">Haircut</option>
                        <option value="Hair Styling">Hair Styling</option>
                        <option value="Makeup">Makeup</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formFirstName">
                      <Form.Control
                        type="text"
                        name="fname"
                        placeholder="First Name*"
                        value={formValues.fname}
                        onChange={handleChange}
                        required
                      />
                      <p className="error-txt">{formErrors.fname}</p>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formLastName">
                      <Form.Control
                        type="text"
                        name="lname"
                        placeholder="Last Name*"
                        value={formValues.lname}
                        onChange={handleChange}
                        required
                      />
                      <p className="error-txt">{formErrors.lname}</p>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="Email*"
                        value={formValues.email}
                        onChange={handleChange}
                        required
                      />
                      <p className="error-txt">{formErrors.email}</p>
                    </Form.Group>
                    <div className="row">
                      <Form.Group className="mb-3 col-lg-6">
                        <Form.Control
                          type="date"
                          name="dateBook"
                          placeholder="Date"
                          value={formValues.dateBook}
                          onChange={handleChange}
                          required
                        />
                        <p className="error-txt">{formErrors.dateBook}</p>
                      </Form.Group>
                      <Form.Group className="mb-3 col-lg-6">
                        <Form.Control
                          type="time"
                          name="timeBook"
                          placeholder="Time"
                          value={formValues.timeBook}
                          onChange={handleChange}
                          required
                        />
                        <p className="error-txt">{formErrors.timeBook}</p>
                      </Form.Group>
                    </div>
                  </div>
                  <div className="booking-payment">
                    <h3>Total: USD {service.price}.00</h3>
                    <button
                      className="btn-submit"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Pay Now
                    </button>
                    <StripeCheckout
                      stripeKey="pk_test_51LIe9RLReLCeEpqKFO4jfDTlZD2r2sudEnL5mOihAT5kjoUOTpCYKHkrgViUjUepdT0X627XWiXVzsrCDFCoaAXP007elxJFc7"
                      token={makePayment}
                      name="Express Hair Saloon"
                      amount={service.price * 100}
                    >
                      <button
                        className="btn-submit"
                        type="submit"
                        ref={buttonRef}
                        hidden
                      >
                        Pay Now
                      </button>
                    </StripeCheckout>
                    {/* <button className="btn-submit" type='submit' onClick={handleSubmit}>Pay Now</button> */}
                    {/* <Button className="btn-submit" type='submit'>Pay Now</Button> */}
                    {/* <Button className="btn-submit" onClick={handleSubmit}>Pay Now</Button> */}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Col>
        <Col className="col-lg-6">
          <div className="right_data_booking"></div>
        </Col>
      </Row>
      {/* <StripeCheckout
        token={this.onToken}
        stripeKey="my_PUBLISHABLE_stripekey"
      /> */}
    </>
  );
}
export default Booking;
