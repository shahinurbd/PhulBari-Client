import React, { useEffect, useState } from 'react';
import ProfileForm from '../components/Dashboard/Profile/ProfileForm';
import useAuthContext from '../hooks/useAuthContext';
import { useForm } from 'react-hook-form';
import ErrorAlert from '../components/ErrorAlert';
import SuccessAlert from '../components/SuccessAlert';
import PasswordChangeForm from '../components/Dashboard/Profile/PasswordChangeForm';
import ProfileButton from '../components/Dashboard/Profile/ProfileButton';


const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const {user, updateUserProfile, changePassword} = useAuthContext();
    const {register, setValue, handleSubmit, watch, formState:{errors}, } = useForm();
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    
    useEffect(() => {
        Object.keys(user).forEach((key) => setValue(key, user[key]));
    }, [user, setValue]);

    const onSubmit = async (data) => {
        try{
            //profile update
            const profilePayload = {
            email: data.email,
            first_name: data.first_name, 
            last_name: data.last_name,
            phone_number: data.phone_number,
            address: data.address
            };
            const res = await updateUserProfile(profilePayload);
            if(res.success){
                setSuccessMsg(res.message);
            }

            //password change
            if(data.new_password && data.current_password){
                const response = await changePassword({
                    new_password: data.new_password,
                    current_password: data.current_password
                })
                if(response.success){
                setSuccessMsg(response.message);
            } else {
                setErrorMsg(response.message);
            }
            
            
            
            }
        } catch(error){
            console.log(error);
        }
    }
    return (
        <div className='md:mt-25 mt-3 xl:mx-20 lg:mx-10 md:mx-5 mx-4 mb-5'>
           <div className='mx-6'> 
            {errorMsg && <ErrorAlert error={errorMsg} />}
            {successMsg && !errorMsg && <SuccessAlert success={successMsg} />}
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
    
                <ProfileForm 
                register={register}
                errors={errors}
                isEditing={isEditing}
                />
                <PasswordChangeForm 
                register={register}
                errors={errors}
                watch={watch}
                isEditing={isEditing}
                />

                <ProfileButton 
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                />
            
            </form>
        </div>
    );
};

export default Profile;