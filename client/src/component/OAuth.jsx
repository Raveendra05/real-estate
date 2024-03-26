import{ GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth';
import { app } from '../firebase';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { signInSucess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
export default function OAuth() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleWithGoogle =async()=>{
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)

            const result = await signInWithPopup(auth , provider)
            const res = await axios.post('/api/auth/google' , {
                name:result.user.displayName , 
                email:result.user.email,
                photo:result.user.photoURL
            })
            if(res.status===200){
                dispatch(signInSucess(res.data))
                navigate('/')
            }
        } catch (error) {
            console.log("could not sign in with google" , error);
        }
    }
  return (
    <button type='button' className='bg-red-700 p-3 rounded-lg  text-white uppercase hover:opacity-90' onClick={handleWithGoogle}>Continue with google</button>
  )
}
