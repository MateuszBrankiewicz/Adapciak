interface ImagesSectionProps {
    base64Images: string[];
    setBase64Images: (images: string[]) => void;
    selectedImage: number;
    setSelectedImage: (index: number) => void;
    readImageToBase64: (file: File) => Promise<string>;
}

const ImagesSection = ({
    base64Images,
    setBase64Images,
    selectedImage,
    setSelectedImage,
    readImageToBase64
}: ImagesSectionProps) => {
    const deleteSelectedImage = () => {
        if (selectedImage >= 0) {
            const updatedImages = [...base64Images];
            updatedImages[selectedImage] = "";
            setBase64Images(updatedImages);
            setSelectedImage(-1);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-5">
                <div className="w-10 h-10 rounded-full bg-main-color bg-opacity-10 flex items-center justify-center mr-4">
                    <span className="material-icons text-main-color">photo_library</span>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">Zdjęcia</h2>
            </div>
            
            <p className="text-gray-600 mb-4">Dodaj zdjęcia zwierzęcia - im lepiej widoczne, tym większa szansa na adopcję.</p>
            
            <div className="grid grid-cols-3 gap-2 mb-4">
                {base64Images.map((data, idx) => (
                    <div 
                        key={idx} 
                        onClick={() => data !== "" && setSelectedImage(idx)}
                        className={`
                            relative aspect-square overflow-hidden rounded-lg border 
                            ${data === "" ? 'bg-gray-100 border-dashed border-gray-300 flex items-center justify-center' : 'cursor-pointer'}
                            ${selectedImage === idx ? 'ring-2 ring-main-color' : ''}
                        `}
                    >
                        {data === "" ? (
                            <span className="material-icons text-gray-400">add_photo_alternate</span>
                        ) : (
                            <>
                                <img 
                                    src={data} 
                                    alt={`Zdjęcie ${idx + 1}`}
                                    className="w-full h-full object-cover"
                                />
                                {selectedImage === idx && (
                                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                                        <span className="material-icons text-white">check_circle</span>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                ))}
            </div>
            
            <div className="flex flex-col space-y-3">
                <input
                    type="file"
                    id="images"
                    name="images"
                    accept="image/*"
                    multiple
                    onChange={async (event) => {
                        const files = event.target.files;
                        if (files && files.length > 0) {
                            const promises = Array.from(files).map(file => readImageToBase64(file));
                            try {
                                const results = await Promise.all(promises);
                                setBase64Images(results.slice(0, 5)); // Limit to 5 images
                            } catch (err) {
                                console.error("Error reading image files:", err);
                            }
                        }
                    }}
                    className="hidden"
                />
                
                <label
                    htmlFor="images"
                    className="w-full px-4 py-3 bg-main-color text-white font-medium rounded-md cursor-pointer flex items-center justify-center hover:bg-opacity-90 transition-colors"
                >
                    <span className="material-icons mr-2">upload</span>
                    Wybierz zdjęcia
                </label>
                
                {selectedImage >= 0 && (
                    <button
                        type="button"
                        onClick={deleteSelectedImage}
                        className="w-full px-4 py-3 border border-red-500 text-red-500 font-medium rounded-md hover:bg-red-50 transition-colors flex items-center justify-center"
                    >
                        <span className="material-icons mr-2">delete</span>
                        Usuń wybrane zdjęcie
                    </button>
                )}
            </div>
        </div>
    );
};

export default ImagesSection;
