import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Axios from 'axios';
import "./Form.css"


const Form = () => {

    const history = useNavigate();
    const [user, setUser] = useState({ fname: "", lname: "", email: "", event: "" });
    const [amount, setAmount] = useState();

    const RegisterMe = async (e) => {
        e.preventDefault();
        if (user.event === 'App development')
            setAmount(90);
        else if (user.event === 'Webber')
            setAmount(50);
        if (user.event === 'Code-a-thon')
            setAmount(100);


        try {

            var data = await Axios.post('/registerUser', {
                fname: user.fname, lname: user.lname, email: user.email, event: user.event, amount: amount
            }).then(res => {
                console.log(res.data);
                history('/thankyou')
            }).catch(e => {
                console.log(e);
            })


        } catch (error) {
            console.log(error);
        }


    }

    const Rand = Math.floor(Math.random() * 1000000000);

    let name, value;
    function Changed(e) {
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value });
    }

    return (
        <form className='register-form' method='POST' id='form'>
            <h1>Get set for the event now!</h1>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="inputFirstName">First Name</label>
                    <input type="text" class="form-control" id="inputFirstName" placeholder="Johnny" name="fname" value={user.fname} onChange={Changed} />
                </div>
                <div class="form-group col-md-6">
                    <label for="inputLastName">LastName</label>
                    <input type="text" class="form-control" id="inputLastName" placeholder="Depp" name="lname" value={user.lname} onChange={Changed} />
                </div>
            </div>
            <div class="form-group">
                <label for="inputEmail">Email</label>
                <input type="email" class="form-control" id="inputEmail" placeholder="example@gmail.com" name="email" value={user.email} onChange={Changed} />
            </div>
            <div class="form-row">

                <div class="form-group col-md-4">
                    <label for="inputState">Event</label>
                    <select id="inputState" class="form-control" name="event" value={user.event} onChange={Changed}>
                        <option selected>Webber</option>
                        <option>App development</option>
                        <option>Code-a-thon</option>
                    </select>
                </div>
            </div>
            <input type="number" value={Rand} hidden />
            <button class="btn btn-primary my-btn" onClick={RegisterMe}>Pay Now and Register</button>
        </form>
    )
}

export default Form