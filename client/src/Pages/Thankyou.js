import React from 'react'
import Thanks from '../components/images/thankyou.svg';
const Thankyou = () => {
    return (
        <div className='thanks'>
            <img src={Thanks} alt="errorCode" className='thanks-img' />
            <div class="textdiv">
                <h1>
                    Thank you!
                </h1>
                <h3>
                    We appreciate your eagerness towards learning :D
                </h3>
                <p id="usefulp">We will reach out to you ASAP </p>
                <div class="linkDiv">
                    <a href="/" className='home-btn'>Home</a>


                </div>
            </div>
        </div>

    )
}

export default Thankyou