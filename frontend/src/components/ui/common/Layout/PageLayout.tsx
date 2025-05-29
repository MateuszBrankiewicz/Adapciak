import NavigationBar from "../../../layout/Navigation/NavigationBar";
import LoadingState from "../PageState/LoadingState";
import ErrorState from "../PageState/ErrorState";

interface PageLayoutProps {
    children: React.ReactNode;
    isLoading?: boolean;
    isError?: boolean;
    loadingMessage?: string;
    errorTitle?: string;
    errorDescription?: string;
    errorAction?: {
        text: string;
        onClick?: () => void;
    };
    className?: string;
}

const PageLayout = ({
    children,
    isLoading = false,
    isError = false,
    loadingMessage,
    errorTitle = "Wystąpił błąd",
    errorDescription = "Nie udało się załadować danych.",
    errorAction,
    className = "w-full min-h-screen bg-gray-50"
}: PageLayoutProps) => {
    return (
        <div className={className}>
            <NavigationBar />
            
            {isLoading ? (
                <div className="container mx-auto px-4 py-8 max-w-6xl">
                    <LoadingState message={loadingMessage} />
                </div>
            ) : isError ? (
                <div className="container mx-auto px-4 py-8 max-w-6xl">
                    <ErrorState 
                        title={errorTitle}
                        description={errorDescription}
                        actionButton={errorAction}
                    />
                </div>
            ) : (
                children
            )}
        </div>
    );
};

export default PageLayout;
