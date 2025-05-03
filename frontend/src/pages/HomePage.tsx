import { useCallback, useEffect, useState } from "react"
import ProfileInfo, { UserProfile } from "../components/ProfileInfo"
import Repos from "../components/Repos"
import Search from "../components/Search"
import SortRepos from "../components/SortRepos"
import toast from "react-hot-toast"
import Spinner from "../components/Spinner"
import { RepoType } from "../components/Repo"



const HomePage = () => {

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [repos, setRepos] = useState<RepoType[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortType, setSortType] = useState("recent");

  const onSearch = async (e:React.FormEvent<HTMLFormElement>, username:string) =>{
    e.preventDefault();
    setLoading(true);
    setRepos([]);
    setUserProfile(null);
    const res = await getUserProfileAndRepos(username);
    if(res){
      const {userProfile, repos} = res;
      console.log(userProfile);
      setUserProfile(userProfile);
      setRepos(repos);
    }
    setLoading(false);
  }

  const onSort = (sortType:string) =>{
    if(sortType === 'recent'){
      repos.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }else if(sortType === "stars"){
      repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
    }else if(sortType === 'forks'){
      repos.sort((a,b) => b.forks_count - a.forks_count);
    }
    setSortType(sortType);
    setRepos([...repos]);
  }

  const getUserProfileAndRepos = useCallback(async (username: string = "LokeshVerma54001") => {
    setLoading(true);
    try {
      const res = await fetch(`/api/users/profile/${username}`);
      const {repos, userProfile} = await res.json();
      setUserProfile(userProfile);
      setRepos(repos);
      return {userProfile, repos};
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        toast.error(error.message);
      } else {
        toast.error("Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  }, [])
  

  useEffect(() => {
    getUserProfileAndRepos();
  }, [getUserProfileAndRepos])



  return (
    <div className=" m-4">
      <Search onSearch={onSearch} />
      {repos.length > 0 && <SortRepos 
        sortType = {sortType} 
        onSort={onSort}
      />}
      <div className=" flex gap-4 flex-col lg:flex-row justify-center items-start">
        {userProfile && !loading && 
        <ProfileInfo 
          userProfile={userProfile}
        />}
        {!loading && <Repos repos={repos}/>}
        {loading && <Spinner/>}
      </div>
    </div>
  )
}

export default HomePage