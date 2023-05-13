import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Axios from 'axios'
import './style.css'
import TrashCan from './trashCan.png'
import Update from './update.png'
import cross from './cross.svg'

const Users = () => {
    const [data, setData] = useState([]);
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [key, setKey] = useState();
    const history = useNavigate();

    var id;

    useEffect(() => {
        Axios.get('/users').then(res => {
            setData(res.data);
        })
            .catch(err => {
                console.log(err);
            })
    })

    function deleteUser(e) {
        e.preventDefault();
        const did = e.target.name;
        const payload = {
            key: did
        }
        Axios.post('/deleteUser', { key: did }).then(res => {
            console.log(res.data);
        }).catch(e => {
            console.log(e);
        })
        history("/users")

    }
    function modifyUser(e) {
        setKey(e.target.name);

        Axios.post('/getSpecificUser', { id: key }).then(res => {
            // document.getElementById('fname').value = res.FirstName;
            console.log(res.data);
        }
        )

        document.getElementsByClassName('updateForm')[0].style.left = '33%';


        // this is wrongggggg



    }
    function updateNow() {
        Axios.post('/updateUser', { key, fname, lname, email }).then(res => {
            console.log(res.data);
            history("/users")
        })
        // console.log(key+fname+lname+email);
    }

    function handleChange(e) {

        const name = e.target.name;
        if (name === 'fname')
            setFname(e.target.value);
        if (name === 'lname')
            setLname(e.target.value);
        if (name === 'email')
            setEmail(e.target.value);
    }
    function closeForm(e) {
        document.getElementsByClassName('updateForm')[0].style.left = '-33%';
    }
    return (
        <div className='Table_of_users'>

            <h1 className='headings'>Participants</h1>
            <table class="main-table">
                <tr>
                    <th>FirstName</th>
                    <th>LastName</th>
                    <th>Email</th>
                    <th>Event</th>
                    <th>Update</th>
                    <th>Delete</th>
                </tr>
                {
                    data.map(dataItem =>
                    (
                        <tr key={dataItem._id}>
                            <td> {dataItem.FirstName}</td>
                            <td> {dataItem.LastName}</td>
                            <td> {dataItem.Email}</td>
                            <td> {dataItem.Type_of_event}</td>
                            <td><form method='delete'><img src={Update} alt='update' name={dataItem._id} onClick={modifyUser} /></form></td>
                            <td><form method='delete'><img src={TrashCan} alt='trash img' name={dataItem._id} onClick={deleteUser} /></form></td>
                        </tr>
                    ))
                }
            </table>

            <div className='updateForm' id='updateFormData'>
                <h2>Update Mahiti</h2>
                <img src={cross} alt='crossimg' className='close-btn' onClick={closeForm} />
                <form><p>First name</p>
                    <input type="test" name='fname' id='fname' value={fname} onChange={handleChange} />
                    <p>Last name</p>
                    <input type="test" name='lname' id='lname' value={lname} onChange={handleChange} />
                    <p>Email</p>
                    <input type="email" name='email' id='email' value={email} onChange={handleChange} />
                    <button type='button' name={key} onClick={updateNow} className="update-btn">Update</button>
                </form>
            </div>
        </div>
    )
}

export default Users