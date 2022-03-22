import './App.css';
import { db } from './firebase-config'
import { useEffect, useState } from 'react';
import { collection, getDocs, addDoc , updateDoc , doc , deleteDoc} from 'firebase/firestore'
import { Button, Modal } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
function App() {
  const [newusername,setnewusername] = useState('')
  const [newuserage,setnewuserage] = useState('');


  const [cuserid,setcuserid] = useState('')
  const [cusername,setcusername] = useState('')
  const [cuserage,setcuserage] = useState('')
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);


  const [name, setName] = useState('');
  const [updateName,setUpdateName] = useState('')
  const [age, setAge] = useState('');
  const [updateAge,setUpdateAge] = useState('');
  const [users, setUsers] = useState([])
  const usersCollectionRef = collection(db, "users")
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef)
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getUsers();
  }, [])

  const handleSubmit = async () => {
    await addDoc(usersCollectionRef, { name: name, age: age })
    alert("User Added")
  }

  const handleUpdate = async() => {
    console.log(cuserid)
    const userdoc = doc(db,"users",cuserid)
    const newFields = {name:newusername,age:newuserage}
    await updateDoc(userdoc,newFields)
    setShow(false)
  }

  const handleShow = async (id, name, age) => {
    setShow(true)
    setcuserid(id)
    setcusername(name)
    setcuserage(age)
  };

  const handleDelete = async (id)=>{
    const userdoc = doc (db,"users",id)
    await deleteDoc(userdoc)
    window.alert("Data Removed Successfully")
  }


  return (
    <div className="App">
      <div style={{width:'30%',backgroundColor:'white',margin:'20px auto',padding:'30px',borderRadius:'20px',border:'2px solid blue'}}>
        <h2>Firebase CRUD App</h2>
        <input type="text" placeholder="Enter the Name" onChange={(e) => setName(e.target.value)} style={{width:'90%',padding:'8px',backgroundColor:'#EEEEEE',outline:'none',border:'none',borderRadius:'10px',marginTop:'20px'}}/><br />
        <input type="number" placeholder="Enter the Age" onChange={(e) => setAge(e.target.value)}  style={{width:'90%',padding:'8px',backgroundColor:'#EEEEEE',outline:'none',border:'none',borderRadius:'10px',marginTop:'20px'}}/><br />
        <button onClick={handleSubmit} style={{backgroundColor:'#0b64eb',outline:'none',border:'none',cursor:'pointer',padding:'8px',marginTop:'20px',color:'white'}}>Add user</button>
      </div>
      <div>
        <h2>Registered Users</h2>
        <div className="row">
        {
          users.map((user,index) => (
            <div className="col-lg-4" key={index} style={{ padding: '20px', width: '300px', borderRadius: '10px', backgroundColor: '#0b64eb', color: 'white', margin: '20px auto' }}>
              <p>Name : {user.name}</p>
              <p>Age : {user.age}</p>
              <button style={{ fontWeight:'bold',padding: '10px', border: 'none', outline: 'none', backgroundColor: '#F76E11', color: 'white', marginRight: '10px', cursor: 'pointer' }}
                onClick={() => { handleShow(user.id, user.name, user.age) }}>Update
              </button>
              <button style={{ fontWeight:'bold',padding: '10px', border: 'none', outline: 'none', backgroundColor: 'red', color: 'white', cursor: 'pointer' }} onClick={()=>{handleDelete(user.id)}}>Delete</button>
            </div>
          ))
        }
        </div>
        <div>
          <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
              <Modal.Title style={{ color: 'black', fontWeight: 'bold' }}>Update Information</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ textAlign: 'center' }}>
              <div>
                <input type="text" placeholder="Enter new Name" style={{ width: '90%' }} onChange={(e)=>setnewusername(e.target.value)}/><br /><br />
                <input type="number" placeholder="Enter new Age" style={{ width: '90%' }} onChange={(e)=>setnewuserage(e.target.value)}/><br />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>Close</Button>
              <Button variant="primary" style={{ backgroundColor: 'green', color: 'white' }} onClick={handleUpdate}>Update</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default App;
