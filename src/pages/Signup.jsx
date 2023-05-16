import React , {  useState } from 'react';
import Helmet from '../components/Helmet/Helmet';
import { Link } from 'react-router-dom';
import {Container, Row, Col, Form, FormGroup} from 'reactstrap';
import { createUserWithEmailAndPassword , updateProfile} from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { auth } from '../firebase.config';
import { db, storage } from '../firebase.config';
import { setDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify'; 
// import { db } from '../firebase.config';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [file, setFile] = useState(null);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const signup = async(e) =>{
    e.preventDefault()
    setLoading(true)
    try {
      const userCredential= await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const storageRef = ref(storage, `images/${Date.now() + username}` )
      const uploadTask = uploadBytesResumable(storageRef,file);
      
      uploadTask.on((error) =>{
        toast.error(error.message)},() =>{
          getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL)=>{
            await updateProfile(user,{
              displayName: username,
              photoURL: downloadURL,
            });
            await setDoc(doc(db,'users', user.uid),{
              uid: user.uid,
              displayName : username,
              email,
              photoURL: downloadURL,
            });
          });
        });
      setLoading(false)
      toast('Account Created')
      navigate('/login')
    } catch (error) {
      toast.error('something went wrong');
    }
  }
  return (
    <Helmet title='Signup'>
      <section>
      <Container>
        <Row>
          {
            loading ? <Col lg='12' className='text-center'>
              <h6 className='fw-bold'>
              Loading....
            </h6>
            </Col> :
                      <Col lg='6' className='m-auto text-center'>
                      <h3 className='fw-bold mb-4'>Signup</h3>
                      <Form className='auth__form' onSubmit={signup}>
                        <FormGroup className='form__group'>
                          <input type="text" placeholder='Username' 
                          value={username} onChange={e=> setUsername(e.target.value)} />
                        </FormGroup>
                        <FormGroup className='form__group'>
                          <input type="email" placeholder='Enter your email' 
                          value={email} onChange={e=> setEmail(e.target.value)} />
                        </FormGroup>
                        <FormGroup className='form__group'>
                          <input type="password" placeholder='Enter your password'
                          value={password} onChange={e=> setPassword(e.target.value)} />
                        </FormGroup>
                        <FormGroup className='form__group'>
                          <input type="file" 
                          onChange={e=> setFile(e.target.file[0])} />
                        </FormGroup>
                        <button type='submit' className='shop__btn auth__btn'>Create an account</button>
                        <p>Already have an account? <Link to='/login'>Login</Link></p>
                      </Form>
                    
                    </Col>
          }
        </Row>
      </Container>
      </section>
    </Helmet>
  )
};

export default Signup;