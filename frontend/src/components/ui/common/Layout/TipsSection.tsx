import { Link } from "react-router-dom";

interface TipsSectionProps {
    tipText: string;
    linkText?: string;
    linkUrl?: string;
    icon?: string;
    className?: string;
}

const TipsSection = ({ 
    tipText, 
    linkText = "Dowiedz się więcej", 
    linkUrl = "#", 
    icon = "lightbulb",
    className = "bg-main-color bg-opacity-10 py-8 mt-12"
}: TipsSectionProps) => {
    return (
        <div className={className}>
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center">
                        <span className={`material-icons text-main-color text-3xl mr-4`}>{icon}</span>
                        <p className="text-gray-800 font-medium">
                            {tipText}
                        </p>
                    </div>
                    {linkText && linkUrl && (
                        <Link to={linkUrl} className="text-main-color font-medium hover:underline flex items-center">
                            {linkText}
                            <span className="material-icons ml-1">arrow_forward</span>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TipsSection;
