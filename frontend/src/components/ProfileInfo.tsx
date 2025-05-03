import { FaEye } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import { IoLocationOutline } from "react-icons/io5"
import { RiGitRepositoryFill, RiUserFollowFill, RiUserFollowLine } from "react-icons/ri"
import { TfiThought } from "react-icons/tfi"
import { formatMemberSince } from "../utils/functions"
import LikeProfile from "./LikeProfile"

export interface UserProfile {
	login: string;
	id: number;
	node_id: string;
	avatar_url: string;
	gravatar_id: string;
	url: string;
	html_url: string;
	followers_url: string;
	following_url: string;
	gists_url: string;
	starred_url: string;
	subscriptions_url: string;
	organizations_url: string;
	repos_url: string;
	events_url: string;
	received_events_url: string;
	type: string;
	user_view_type: string;
	site_admin: boolean;
	name: string | null;
	company: string | null;
	blog: string;
	location: string | null;
	email: string | null;
	hireable: boolean | null;
	bio: string | null;
	twitter_username: string | null;
	public_repos: number;
	public_gists: number;
	followers: number;
	following: number;
	created_at: string;
	updated_at: string;
  }
  

const ProfileInfo = ({userProfile}:{userProfile:UserProfile}) => {

	const memberSince = formatMemberSince(userProfile.created_at);

  return (
    <div className='lg:w-1/3 w-full flex flex-col gap-2 lg:sticky md:top-10'>
			<div className='bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 hover:bg-gray-600/10 border border-gray-800 text-white rounded-lg p-4'>
				<div className='flex gap-3 items-center'>
					{/* User Avatar */}
					<a href={userProfile?.html_url} target='_blank' rel='noreferrer'>
						<img src={userProfile?.avatar_url} className='rounded-md w-24 h-24 mb-2' alt='' />
					</a>
					{/* View on Github */}

					<div className='flex gap-2 items-center flex-col'>
						<LikeProfile userProfile={userProfile} />
						<a
							href={userProfile?.html_url}
							target='_blank'
							rel='noreferrer'
							className='bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 hover:bg-gray-600/10 text-white font-medium w-full text-xs p-2 rounded-md cursor-pointer border border-blue-400 flex items-center gap-2'
						>
							<FaEye size={16} />
							View on Github
						</a>
					</div>
				</div>

				{/* User Bio */}
				{userProfile?.bio ? (
					<div className='flex items-center gap-2'>
						<TfiThought />
						<p className='text-sm'>{userProfile?.bio.substring(0, 60)}...</p>
					</div>
				) : null}

				{/* Location */}
				{userProfile?.location ? (
					<div className='flex items-center gap-2'>
						<IoLocationOutline />
						{userProfile?.location}
					</div>
				) : null}

				{/* Twitter Username */}
				{userProfile?.twitter_username ? (
					<a
						href={`https://twitter.com/${userProfile.twitter_username}`}
						target='_blank'
						rel='noreferrer'
						className='flex items-center gap-2 hover:text-sky-500'
					>
						<FaXTwitter />
						{userProfile?.twitter_username}
					</a>
				) : null}

				{/* Member Since Date */}
				<div className='my-2'>
					<p className='text-gray-600 font-bold text-sm'>Member since</p>
					<p className=''>{memberSince}</p>
				</div>

				{/* Email Address */}
				{userProfile?.email && (
					<div className='my-2'>
						<p className='text-gray-600 font-bold text-sm'>Email address</p>
						<p className=''>{userProfile.email}</p>
					</div>
				)}

				{/* Full Name */}
				{userProfile?.name && (
					<div className='my-2'>
						<p className='text-gray-600 font-bold text-sm'>Full name</p>
						<p className=''>{userProfile?.name}</p>
					</div>
				)}

				{/* Username */}
				<div className='my-2'>
					<p className='text-gray-600 font-bold text-sm'>Username</p>
					<p className=''>{userProfile?.login}</p>
				</div>
			</div>

			<div className='flex flex-wrap gap-2 mx-4'>
				{/* Followers Count */}
				<div className='flex items-center gap-2 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 hover:bg-gray-600/10 border border-gray-800 text-white rounded-lg p-2 flex-1 min-w-24'>
					<RiUserFollowFill className='w-5 h-5 text-blue-800' />
					<p className='text-xs'>Followers: {userProfile?.followers}</p>
				</div>

				{/* Following count */}
				<div className='flex items-center gap-2 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 hover:bg-gray-600/10 border border-gray-800 text-white rounded-lg p-2 flex-1 min-w-24'>
					<RiUserFollowLine className='w-5 h-5 text-blue-800' />
					<p className='text-xs'>Following: {userProfile?.following}</p>
				</div>

				{/* Number of public repos */}
				<div className='flex items-center gap-2 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 hover:bg-gray-600/10 border border-gray-800 text-white rounded-lg p-2 flex-1 min-w-24'>
					<RiGitRepositoryFill className='w-5 h-5 text-blue-800' />
					<p className='text-xs'>Public repos: {userProfile?.public_repos}</p>
				</div>

				{/* Number of public gists */}
				<div className='flex items-center gap-2 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 hover:bg-gray-600/10 border border-gray-800 text-white rounded-lg p-2 flex-1 min-w-24'>
					<RiGitRepositoryFill className='w-5 h-5 text-blue-800' />
					<p className='text-xs'>Public gists: {userProfile?.public_gists}</p>
				</div>
			</div>
		</div>
  )
}

export default ProfileInfo