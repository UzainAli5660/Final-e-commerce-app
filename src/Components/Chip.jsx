function Chip({ title, isChosen, onClick }) {
    return (
      <div
        onClick={onClick}
        className={`${
          isChosen ? "bg-gray-700 text-white" : "bg-gray-900 text-gray-400"
        } cursor-pointer hover:bg-gray-800 inline-block m-2 p-2 w-fit px-4 border border-gray-600 rounded-md whitespace-nowrap`}
      >
        <h1>{title}</h1>
      </div>
    );
  }
  
  export default Chip;
  