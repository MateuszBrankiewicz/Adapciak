import '../App.css';
import NavigationBar from '../components/NavigationBar';
import { Slider } from '../components/Slider';
import image1 from "../assets/image1.webp";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image3.jpg";
import { Link } from 'react-router-dom';
import { SearchBar } from '../components/SearchBar';

function HomePage() {
    const data = [image1, image2, image3];
    const ads = [
        { id: 1, name: "Burek", description: "Przyjazny pies szuka domu", image: image1 },
        { id: 2, name: "Mruczek", description: "Kot, który uwielbia się przytulać", image: image2 },
        { id: 3, name: "Reksio", description: "Energiczny pies dla aktywnej rodziny", image: image3 },
    ];

    return (
        <div className='w-full h-full'>
            <NavigationBar />
            <div className='w-full h-full flex flex-col justify-between items-center'>
                <Slider data={data}></Slider>
                <SearchBar></SearchBar>
                <div className='w-full max-w-4xl mt-8'>
                    <h2 className='text-2xl font-bold mb-4'>Ogłoszenia adopcyjne</h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {ads.map(ad => (
                            <div key={ad.id} className='border rounded-lg p-4 shadow-md'>
                                <img src={ad.image} alt={ad.name} className='w-full h-40 object-cover rounded-md mb-4' />
                                <h3 className='text-xl font-semibold'>{ad.name}</h3>
                                <p className='text-gray-600'>{ad.description}</p>
                                <button className='mt-4 px-4 py-2 bg-green-500 border-main-button-border text-white rounded hover:bg-blue-600'>
                                    Zobacz więcej
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className='mt-8 flex justify-center'>
                        <Link to="/ads/add" className='px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600'>
                            Dodaj ogłoszenie
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;