interface MobileSearchToggleProps {
    showSearch: boolean;
    onToggle: () => void;
}

const MobileSearchToggle = ({ showSearch, onToggle }: MobileSearchToggleProps) => {
    return (
        <div className="relative mb-8">
            <button
                className={`flex items-center justify-center w-full py-4 px-5 rounded-lg border ${
                    showSearch ? 'bg-gray-100 border-gray-300' : 'bg-white border-gray-200'
                } shadow-md transition-colors text-lg`}
                onClick={onToggle}
            >
                <span className="material-icons mr-2 text-2xl text-gray-700">
                    {!showSearch ? "search" : "close"}
                </span>
                <span className="font-medium text-gray-800">
                    {!showSearch ? "Pokaż filtry wyszukiwania" : "Ukryj filtry"}
                </span>
            </button>
        </div>
    );
};

export default MobileSearchToggle;
