

const SortRepos = ({sortType, onSort}:{sortType:string, onSort:(sortType: string) => void}) => {
  
  const BUTTONS = [
    {type: "recent", text: "Most Recent"},
    {type: "stars", text: "Most Stars"},
    {type: "forks", text: "Most Forks"}
  ]

  return (
    <div className="mb-2 flex justify-center lg:justify-end">
      {BUTTONS.map((button, index) =>(
        <button
          key={index}
          type="button"
          className={`py-2.5 px-5 me-2 mb-2 text-xs sm:text-sm font-medium focus:outline-none rounded-lg bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 hover:bg-gray-600/10 border text-white ${sortType ===button.type ?'border-blue-500':'border-gray-800'}`}
          onClick={() => onSort(button.type)}
        >
        {button.text}
        </button>
      ))}
    </div>
  )
}

export default SortRepos