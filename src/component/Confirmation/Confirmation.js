import React from 'react'
import Header from '../Header/Header'
import Container from 'react-bootstrap/esm/Container'
import './Confirmation.css'

function Confirmation() {
  return (
    <>
        <Header />
        <Container>
            <div className="content">
                <h1>Thank you for your reservation!</h1>

                <p>At Express we are passionate about making people feel good while looking their best.
                   Attending advanced education allows us to keep up with the latest trends and provide
                   each guest with a unique & customizable result. For your convenience, we are open 7 days
                   a week & offers online booking 24 hours a day.
                </p>

                <h4>For further information contact us</h4>

                <img src="./contact-us.png" alt="contact-us" />

                <h6>(487) 1070 1087</h6>

                <h6>sales.salonexpress@sp.com</h6>
            </div>
        </Container>
    </>
  )
}

export default Confirmation