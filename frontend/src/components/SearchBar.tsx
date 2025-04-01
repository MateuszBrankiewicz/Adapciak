import { useState } from "react"

export const SearchBar = () => {
    const [query, setQuery] = useState("")

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    }

    const handleSearch = () => {
        console.log("Searching for:", query)
    }

    return (
        <div className="flex items-center w-3/4 border-b border-green-500 py-2">
            <input 
                type="text" 
                name="search" 
                placeholder="Wyszukaj lokalizacje z której chcesz adoptować zwierzaczka" 
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                value={query}
                onChange={handleInputChange}
            />
            <button 
                className="flex-shrink-0 bg-green-500 hover:bg-green-700 border-green-500 hover:border-green-700 text-sm border-4 text-white py-1 px-2 rounded"
                onClick={handleSearch}
            >
                search
            </button>
        </div>
    )
}