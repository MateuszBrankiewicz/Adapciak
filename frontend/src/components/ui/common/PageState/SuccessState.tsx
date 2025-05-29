import Button from "../Button/Button";
import { Link } from "react-router-dom";

interface SuccessStateProps {
    title: string;
    description: string;
    additionalInfo?: string;
    actionButton?: {
        text: string;
        link?: string;
        onClick?: () => void;
    };
}

const SuccessState = ({ title, description, additionalInfo, actionButton }: SuccessStateProps) => {
    return (
        <div className="flex-1 flex items-center justify-center flex-col p-8">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="material-icons text-green-500 text-3xl">check_circle</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
                <p className="text-gray-600 mb-6">{description}</p>
                {additionalInfo && (
                    <p className="text-gray-500 text-sm">{additionalInfo}</p>
                )}
                {actionButton && (
                    <div className="mt-6">
                        {actionButton.link ? (
                            <Link to={actionButton.link}>
                                <Button 
                                    type="button" 
                                    style="primary" 
                                    text={actionButton.text} 
                                />
                            </Link>
                        ) : (
                            <Button 
                                type="button" 
                                style="primary" 
                                text={actionButton.text} 
                                onClick={actionButton.onClick}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SuccessState;
