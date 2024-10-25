import React from 'react'
import {signInWithPopup , signOut} from "firebase/auth"
import { auth , provider } from '../../conf/FireBase'
import {useDispatch , useSelector} from "react-redux"
import { addUserData , removeUserData } from '../../uitls/authSlice'
import { toggleLogin } from '../../uitls/toggleSlice'
import { useNavigate } from 'react-router-dom'
function SignButton() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userData = useSelector((state) => state.authSlice.userData)

  const handleUserData = async() => {
  let data =  await signInWithPopup(auth , provider)
  const userData = {
    name : data.user.displayName,
    photo: data.user.photoURL
  }
  dispatch(addUserData(userData))
  dispatch(toggleLogin())
  navigate("/")
  }

  const remvoeUser = async() => {
  await signOut(auth)
  dispatch(removeUserData())
  dispatch(toggleLogin())
  navigate("/")
  }
  return (
    <>
    {userData ? (
        <button
            onClick={remvoeUser}
            className="my-5 w-full text-2xl p-5 bg-[#fc8019] text-white"
        >
            Logout
        </button>
    ) : (
        <button
            onClick={handleUserData}
            className="my-5 w-full text-2xl p-5 bg-[#fc8019] text-white"
        >
            Login with GOOGLE
        </button>
    )}
</>
  )
}

export default SignButton