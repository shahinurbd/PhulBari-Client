import React from 'react';

const ProfileButton = ({ isEditing, setIsEditing }) => {
    return (
       <div className='pt-8 sm:mx-6'>
            {isEditing ? 
            (
                <div className='space-x-4'>
                    <button type='submit' className='btn btn-primary px-8'>
                Save Changes
                </button>
                <button onClick={()=> setIsEditing(false)} className='btn btn-outline'>Cancel</button>
                </div> 
            ) : 
            (
                <button onClick={()=> setIsEditing(true)} className='btn btn-primary px-8'>
                Edit Profile
                </button> 
            )}
        </div>
    );
};

export default ProfileButton;