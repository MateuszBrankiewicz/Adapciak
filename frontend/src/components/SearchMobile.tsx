import { useState, FC } from "react";

interface SearchData {
  searchQuery: string;
  category: string;
  size: string;
  voivodeship: string;
  district: string;
  city: string;
}

interface SearchMobileProps {
  onSearch: (data: SearchData) => void;
  initialValues?: Partial<SearchData>;
  onClose?: () => void; // Opcjonalna funkcja do zamknięcia/ukrycia komponentu
}

const SearchMobile: FC<SearchMobileProps> = ({ onSearch, initialValues = {}, onClose }) => {
  // Initialize state with default values or provided initial values
  const [searchQuery, setSearchQuery] = useState(initialValues.searchQuery || "");
  const [category, setCategory] = useState(initialValues.category || "");
  const [size, setSize] = useState(initialValues.size || "");
  const [voivodeship, setVoivodeship] = useState(initialValues.voivodeship || "");
  const [district, setDistrict] = useState(initialValues.district || "");
  const [city, setCity] = useState(initialValues.city || "");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handle form submission
  const handleFilters = () => {
    // Optional: Validate data
    const newErrors: Record<string, string> = {};
    if (searchQuery.trim() === "") {
      newErrors.searchQuery = "Pole wyszukiwania nie może być puste";
    }
    
    setErrors(newErrors);

    // If no errors or if you want to submit even with errors
    if (Object.keys(newErrors).length === 0) {
      // Pass data to parent component
      onSearch({
        searchQuery,
        category,
        size,
        voivodeship,
        district,
        city
      });
      
      // If onClose is provided, call it after submitting data
      if (onClose) {
        onClose();
      }
    }
  };

  return (
    <div className="bg-gray-50 w-full p-4 rounded shadow">
      <div className="flex flex-col gap-4 mt-10">
        <input
          type="text"
          placeholder="Szukaj..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded"
        />
        {errors.searchQuery && (
          <span className="text-red-500 text-sm">{errors.searchQuery}</span>
        )}
        
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Wybierz gatunek</option>
          <option value="psy">Psy</option>
          <option value="koty">Koty</option>
          <option value="inne">Inne</option>
        </select>
        
        <select 
          className="border p-2 rounded"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        >
          <option value="">Wybierz rozmiar</option>
          <option value="Małe">Małe</option>
          <option value="Średni">Średni</option>
          <option value="Duży">Duży</option>
        </select>
        
        <select 
          value={voivodeship} 
          onChange={(e) => setVoivodeship(e.target.value)} 
          className="border p-2 rounded"
        >
          <option value="">Wojewodztwo</option>
          <option value="Lubelskie">Lubelskie</option>
        </select>
        
        <select 
          value={district} 
          onChange={(e) => setDistrict(e.target.value)} 
          className="border p-2 rounded"
        >
          <option value="">Wybierz powiat</option>
        </select>
        
        <select 
          name="city" 
          id="city" 
          value={city} 
          onChange={(e) => setCity(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Wybierz miasto</option>
        </select>
        
        <button
          onClick={handleFilters}
          className="bg-secondary-button-background text-secondary-button-text px-4 py-2 rounded hover:brightness-75"
        >
          Szukaj
        </button>
      </div>
    </div>
  );
};

export default SearchMobile;