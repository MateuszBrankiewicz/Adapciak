import Button from "../Button/Button";

interface ErrorStateProps {
    title: string;
    description: string;
    actionButton?: {
        text: string;
        onClick?: () => void;
        link?: string;
    };
    icon?: string;
}

const ErrorState = ({ 
    title, 
    description, 
    actionButton, 
    icon = "error_outline" 
}: ErrorStateProps) => {
    return (
        <div className="flex flex-col items-center justify-center py-20">
            <div className="text-center">
                <span className="material-icons text-red-500 text-6xl mb-4">{icon}</span>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">{title}</h2>
                <p className="text-gray-600 mb-6">{description}</p>
                {actionButton && (
                    <Button 
                        size="normal" 
                        style="primary" 
                        text={actionButton.text} 
                        onClick={actionButton.onClick}
                    />
                )}
            </div>
        </div>
    );
};

export default ErrorState;
