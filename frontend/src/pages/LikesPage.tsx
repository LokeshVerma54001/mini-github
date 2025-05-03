import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { FaHeart } from "react-icons/fa"
import { formatDate } from "../utils/functions";

interface User{
  avatarUrl: string,
  username: string,
  likedDate: string
}

const LikesPage = () => {

  const [likes, setLikes] = useState([]);

  useEffect(()=>{
    const getLikes = async () =>{
      try {
        const res = await fetch('/api/users/likes', {credentials: 'include'});
        const data = await res.json();
        if(data.error) throw new Error(data.error);
        setLikes(data.likedBy)
      } catch (error) {
        if(error instanceof Error){
          toast.error(error.message);
        }
        else{
          toast.error("Error fetching likes")
        }
      }
    }
    getLikes()
  },[])

  console.log("likes", likes);

  return (
    <div className=" relative overflow-x-auto shadow-md rounded-lg px-4">
      <table className="w-full text-sm text-left rtl:text-right bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 
		hover:bg-gray-600/10 border border-gray-800 text-white overflow-hidden">
        <thead className=" text-xs uppercase bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 
		hover:bg-gray-600/10 border border-gray-800 text-white overflow-hidden ">
          <tr>
            <th scope="col" className=" p-4">
              <div className=" flex items-center">No</div>
            </th>
            <th scope="col" className="px-6 py-3">
              Username
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {likes.map((user:User, index) =>(
            <tr key={index} className="bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 hover:bg-gray-600/10 border border-gray-800 text-white overflow-hidden border-b">
            <td className="w-4 p-4">
              <div className="flex items-center">
                <span>{index +1}</span>
              </div>
            </td>
            <th scope="row" className="flex items-center px-6 py-4 whitespace-nowrap">
              <img src={user.avatarUrl} className=" w-10 h-10 rounded-full" />
              <div className=" ps-3">
                <div className=" text-base font-semibold">
                  {user.username}
                </div>
              </div>
            </th>
            <td className=" px-6 py-4">{formatDate(user.likedDate)}</td>
            <td className=" px-6 py-4">
              <div className=" flex items-center">
                <FaHeart size={22} className="text-red-500 mx-2" />
                Liked your profile
              </div>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LikesPage