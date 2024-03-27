import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase'
export default function Profile() {
  const {currentUser} = useSelector((state)=>state.user)
  const fileRef = useRef(null)
  const [file , setFile] = useState(undefined)
  const [filePerc , setFilePerc] = useState(0)
  const [fileUploadError , setFileUploadError] = useState(false)
  const [formData , setFormData] = useState({})
  console.log(formData);
console.log(fileUploadError);
  // console.log(file);
  //firebase storage rules
  // rules_version = '2';

// Craft rules based on data in your Firestore database
// allow write: if firestore.get(
// databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin;
// service firebase.storage {
//   match /b/{bucket}/o {
//     match /{allPaths=**} {
//       allow read;
//       allow write: if 
//       request.resource.size > 2*1024 *1024 &&
//       request.resource.contentType.matches('images/.*')
//     }
//   }
// }
// console.log(file);
useEffect(()=>{
  if(file){
    handleFileUpload(file)
  }
}, [file])
const handleFileUpload = (file)=>{
  const storage = getStorage(app)
  const fileName = new Date().getTime() + file.name
  const storageRef = ref(storage , fileName)
  const uploadTask = uploadBytesResumable(storageRef  , file)

  uploadTask.on('state_changed' , (snapshot)=>{
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
    console.log('upload is' +progress + '% done');
    setFilePerc(Math.round(progress))
console.log(filePerc);
  },
  (error) =>{
    setFileUploadError(true)
    console.log(error);
  },
  ()=>{
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>
    setFormData({...formData , avatar:downloadURL})
    );
  }
  )
}
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <input type="file"
          onChange={(e)=>setFile(e.target.files[0])}
          ref={fileRef}
          hidden accept='image/*' />
        <img  onClick={()=>fileRef.current.click()} 
        src={formData.avatar||currentUser.avatar} className='rounded-full  h-24 w-24 object-cover cursor-pointer self-center mt-2' 
        alt="no-image" />
        <p className='text-sm self-center'>
          {
            fileUploadError ? (
              <span className='text-red-700'>
                Error image upload ! (image must be less than 2 mb)
              </span>
            )
            :filePerc > 0 &&filePerc < 100 ?
            (
              <span className='text-slate-700'>
                {`Uploading ${filePerc} %`}
              </span>
            ):filePerc ===100 ?(
              <span className='text-green-700'>
                Image Uploaded Sucessfully
              </span>
            ):("")
          }
        </p>
        <input type="text" placeholder='username' className='border p-3 rounded-lg' />
        <input type="text" placeholder='email' className='border p-3 rounded-lg' />
        <input type="text" placeholder='password' className='border p-3 rounded-lg' />
        <button className='bg-slate-700 p-3 rounded-lg text-white  uppercase hover:opacity-95 disabled:opacity-80'>Update</button>
      </form>
      <div className='flex justify-between mt-4'>
        <span className='text-red-700 cursor-pointer'>Delete account</span>
        <span className='text-red-700 cursor-pointer'>Sign out</span>
      </div>
    </div>
  )
}
