import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Axios from 'axios';
import "./Form.css"


const Form = () => {

    //const history = useNavigate();
    //to update the components without reloding the actual page is called hooks

    const [user, setUser] = useState({ sqc: "", lsqc: "", label: "", count: "" });
    const [amount, setAmount] = useState();

    const RegisterMe = async (e) => {

        e.preventDefault();
        // if (user.event === 'App development')
        //     setAmount(90);
        // else if (user.event === 'Webber')
        //     setAmount(50);
        // if (user.event === 'Code-a-thon')
        //     setAmount(100);


        try {

            var data = await Axios.post('/registerUser', {
                sqc: user.sqc, lsqc: user.lsqc, label: user.label, count: user.count
            }).then(function (res) {
                console.log(res.data);
                //history('/thankyou')
            }).catch(function (e) {
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
            <h1>Scan QR codes with ease..!</h1>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="inputFirstName">Scan QR code</label>
                    <input type="text" class="form-control" id="inputFirstName" placeholder="abc" name="sqc" value={user.fname} onChange={Changed} />
                </div>
                <div class="form-group col-md-6">
                    <label for="inputLastName">Last Scan QR code</label>
                    <input type="text" class="form-control" id="inputLastName" placeholder="mnq" name="lsqc" value={user.lname} onChange={Changed} />
                </div>
            </div>
            <div class="form-group">
                <label for="inputEmail">Label</label>
                <input type="text" class="form-control" id="inputEmail" placeholder="some label" name="label" value={user.email} onChange={Changed} />
            </div>
            <div class="form-row">

                <div class="form-group">
                    <label for="inputCount">Count</label>
                    <input type="text" class="form-control" id="inputCount" placeholder="example@gmail.com" name="count" value={user.email} onChange={Changed} />
                </div>
            </div>
            <input type="number" value={Rand} hidden />
            <button class="btn btn-primary my-btn" onClick={RegisterMe}>Pay Now and Register</button>
        </form>
    )
}

export default Form