import Repo, { RepoType } from "./Repo";



const Repos = ({repos}:{repos:RepoType[]}) => {

	

	return (
		<div className={`lg:w-2/3 w-full bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 hover:bg-gray-600/10 border border-gray-800 text-white rounded-lg px-8 py-6`}>
			<ol className='relative border-s border-gray-200'>
				{repos.map((repo: RepoType) => (
					<Repo key={repo.id}  repo={repo}/>
				))}
				{repos.length === 0 && <p className="flex items-center justify-center h-32">No repos found</p>}
			</ol>
		</div>
	);
};

export default Repos