import { FormInput, SubmitButton } from "../components";
import { Link, Form, redirect, useNavigate } from "react-router-dom";
import { customFetch } from "../utils";
import { toast } from 'react-toastify';
import { loginUser } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";



export const action = (store) => async ({request}) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    const response = await customFetch.post('/auth/local', data);
    
    store.dispatch(loginUser(response.data));
    toast.success('Login successful');
    return redirect('/');    
  } catch (error) {
    const errorMessage =
      error?.response?.data?.error?.message || 'please double check your credentials';
    
    toast.error(errorMessage);
    return null;    
  }
}


function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginAsGuestUser = async () => {
    try {
      const response = await customFetch.post('/auth/local', {identifier:'test@test.com', password: 'secret'});
      dispatch(loginUser(response.data));
      toast.success('Login successful');
      navigate('/');
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error?.message || 'please double check your credentials';
      
      toast.error(errorMessage);
      return null;    
    }
  }


  return (
    <section className="grid place-items-center h-screen">
      <Form method="post" className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4">
        <h3 className="text-center font-bold text-4xl">Login</h3>
        <FormInput 
          label="Email" 
          type="email" 
          name="identifier" 
          defaultValue="test@test.com"
        />
        <FormInput 
          label="Password" 
          type="password" name="password" defaultValue="secret" 
        />
        <div className="mt-4">
            <SubmitButton text="Login" />          
        </div>
        <button className="btn btn-secondary btn-block" onClick={loginAsGuestUser}>guest user</button>
        <p className="text-center">
          Don't have an account? <Link to="/register" className="ml-2 link-hover link-primary capitalize">Register</Link>
        </p>
      </Form>
    </section>
  )
}

export default Login