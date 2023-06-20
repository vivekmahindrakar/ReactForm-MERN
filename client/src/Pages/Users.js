import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Axios from 'axios'
import './style.css'
import TrashCan from './trashCan.png'
import Update from './update.png'
import cross from './cross.svg'

const Users = () => {
    const [data, setData] = useState([]);
    const [sqc, setSqc] = useState('');
    const [lsqc, setLsqc] = useState('');
    const [label, setLabel] = useState('');
    const [count, setCount] = useState('');
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
        //history("/users")

    }
    function modifyUser(e) {
        setKey(e.target.name);

        // Axios.post('/getSpecificUser', { id: key }).then(res => {
        //     // document.getElementById('fname').value = res.FirstName;
        //     console.log(res.data);
        // }
        // )

        document.getElementsByClassName('updateForm')[0].style.left = '33%';


        // this is wrongggggg



    }
    function updateNow() {
        Axios.post('/updateUser', { key, sqc, lsqc, label, count }).then(function (res) {
            console.log(res.data);
            history("/users")
        })
        // console.log(key+fname+lname+email);
    }

    function handleChange(e) {

        const name = e.target.name;
        if (name === 'sqc')
            setSqc(e.target.value);
        if (name === 'lsqc')
            setLsqc(e.target.value);
        if (name === 'label')
            setLabel(e.target.value);
        if (name === 'count')
            setCount(e.target.value);
    }
    function closeForm(e) {
        document.getElementsByClassName('updateForm')[0].style.left = '-33%';
    }
    return (
        <div className='Table_of_users'>

            <h1 className='headings'>Participants</h1>
            <table class="main-table">
                <tr>
                    <th>Scan Qr Code</th>
                    <th>Latest Scan QR Code</th>
                    <th>Label</th>
                    <th>Count</th>
                    <th>Update</th>
                    <th>Delete</th>
                </tr>
                {
                    data.map(dataItem =>
                    (
                        <tr key={dataItem._id}>
                            <td> {dataItem.ScanQrCode}</td>
                            <td> {dataItem.LatestScanQrCode}</td>
                            <td> {dataItem.Label}</td>
                            <td> {dataItem.Count}</td>
                            <td><form method='delete'><img src={Update} alt='update' name={dataItem._id} onClick={modifyUser} /></form></td>
                            <td><form method='delete'><img src={TrashCan} alt='trash img' name={dataItem._id} onClick={deleteUser} /></form></td>
                        </tr>
                    ))
                }
            </table>

            <div className='updateForm' id='updateFormData'>
                <h2>Update Mahiti</h2>
                <img src={cross} alt='crossimg' className='close-btn' onClick={closeForm} />
                <form><p>Scan Qr Code</p>
                    <input type="test" name='sqc' id='fname' value={sqc} onChange={handleChange} />
                    <p>Latest Scan Qr Code</p>
                    <input type="test" name='lsqc' id='lname' value={lsqc} onChange={handleChange} />
                    <p>Label</p>
                    <input type="email" name='label' id='email' value={label} onChange={handleChange} />
                    <button type='button' name={key} onClick={updateNow} className="update-btn">Update</button>
                </form>
            </div>
        </div>
    )
}

export default Users