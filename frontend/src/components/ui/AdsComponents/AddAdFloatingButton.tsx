import { Link } from "react-router-dom";

const AddAdFloatingButton = () => {
    return (
        <div className="fixed bottom-8 right-8 z-10">
            <Link to="/ads/add">
                <button className="bg-main-color text-white rounded-full w-20 h-20 flex items-center justify-center shadow-xl hover:brightness-95 transition transform hover:scale-105">
                    <span className="material-icons text-3xl">add</span>
                </button>
            </Link>
        </div>
    );
};

export default AddAdFloatingButton;
