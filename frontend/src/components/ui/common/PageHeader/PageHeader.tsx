import { Link } from "react-router-dom";
import Button from "../Button/Button";

interface PageHeaderProps {
    title: string;
    subtitle: string;
    showAddButton?: boolean;
    addButtonText?: string;
    addButtonLink?: string;
}

const PageHeader = ({ 
    title, 
    subtitle, 
    showAddButton = false, 
    addButtonText = "Dodaj nowe ogłoszenie",
    addButtonLink = "/ads/add"
}: PageHeaderProps) => {
    return (
        <>
            <div className="mb-8 text-center md:text-left">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">{title}</h1>
                <p className="text-lg text-gray-600">{subtitle}</p>
            </div>

            {showAddButton && (
                <div className="mb-8">
                    <Link to={addButtonLink}>
                        <Button 
                            type="button" 
                            style="primary" 
                            text={addButtonText} 
                            size="big"
                        />
                    </Link>
                </div>
            )}
        </>
    );
};

export default PageHeader;
