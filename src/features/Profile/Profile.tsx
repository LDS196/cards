import React from "react"
import { useSelector } from "react-redux"
import { selectProfile } from "features/Profile/profile.select"

const Profile = () => {
    const logoutHandler = () => {}
    const profile = useSelector(selectProfile)
    return (
        <div>
            Profile
            <div>{profile?._id}</div>
            <button onClick={logoutHandler}></button>
        </div>
    )
}

export default Profile
