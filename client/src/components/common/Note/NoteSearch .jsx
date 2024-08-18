import React from 'react'

const NoteSearch  = ({ onSearch }) => {

    const [query, setQuery] = React.useState('');
    
    const handleChange=(e) => {
      const newQuery = e.target.value;
      setQuery(newQuery);
      // onSearch(newQuery);
    }

    const handleClear=() => {
      setQuery('');
      // onSearch('');
    }

  return (
     
    
    <div className="flex items-center w-auto border border-gray-300 rounded-3xl overflow-hidden shadow-md">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search notes..."
        className="w-full py-3 px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {query && (
        <button
          onClick={handleClear}
          className="px-4 py-3 bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Clear
        </button>
      )}
    </div>
    
     
  )
}

export default NoteSearch 