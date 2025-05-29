interface LoadingStateProps {
    message?: string;
}

const LoadingState = ({ message = "Ładowanie..." }: LoadingStateProps) => {
    return (
        <div className="flex items-center justify-center py-20">
            <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-main-color mx-auto mb-4"></div>
                <p className="text-gray-600">{message}</p>
            </div>
        </div>
    );
};

export default LoadingState;
