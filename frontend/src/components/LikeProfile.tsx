import { FaHeart } from "react-icons/fa"
import { UserProfile } from "./ProfileInfo"
import toast from "react-hot-toast"
import { useAuthContext } from "../context/authContext"


const LikeProfile = ({userProfile}: {userProfile:UserProfile}) => {

    const {authUser} = useAuthContext();
    const isOwnProfile = authUser?.username === userProfile.login;

    const handleLikeProfile = async ()=>{
        try {
            const res = await fetch(`/api/users/like/${userProfile.login}`, {
                method: "POST",
                credentials: 'include'
            })
            const data = await res.json();
            if(data.error) throw new Error(data.error);
            toast.success(data.message)
        } catch (error) {
            if(error instanceof Error){
                toast.error(error.message);
            }else{
                toast.error("Error liking the profile")
            }
        }
    }

    if(!authUser || isOwnProfile) return null;

  return (
    <button 
        className=" p-2 text-xs w-full font-medium rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 hover:bg-gray-600/10 text-white border border-blue-400 flex items-center gap-2"
        onClick={handleLikeProfile}
    >
        <FaHeart size={16} /> Like Profile
    </button>
  )
}

export default LikeProfile