import React , {     useState    } from 'react'
import "../styles/register.css"
import  {   Form , Button   } from 'react-bootstrap'
import axios  from 'axios'
function Register() {


    const [registerForm, setregisterForm] = useState({
        name:'',
        email:'',
        password:''
    })


    const handleInputChange = (e)=>{
        
        const {name,value}=e.target

        setregisterForm({...registerForm,[name]:value})
    
    }

    const register=(e)=> {
        e.preventDefault()
        const { name, email, password } = registerForm
        if( name && email && password ){
            axios.post('http://localhost:3001/register',registerForm)
            .then(res=>console.log('registration passed with success'))
        }else{
            alert("invlid input")
        }
    }


    return (
        <div className="page center">
            {
                console.log(registerForm)
            }
            <Form className='formulaire' onSubmit={register} >
                    <Form.Group className="mb-3" controlId="formBasicname">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="name"  name="name" value={registerForm.name} onChange={handleInputChange} placeholder="Enter name" />
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email"  name="email" value={registerForm.email} onChange={handleInputChange} placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" value={registerForm.password} onChange={handleInputChange}  placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary"  type="submit">
                        Submit
                    </Button>
            </Form>

        </div>
    )
}

export default Register
