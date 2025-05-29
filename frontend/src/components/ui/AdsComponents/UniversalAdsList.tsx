import { ReactNode } from "react";
import { Link } from "react-router-dom";
import Button from "../common/Button/Button";
import { Ad } from "../../../types/models/adTypes";

type CardRendererFunction = (ad: Ad, index: number) => ReactNode;

interface ActionButton {
    text: string;
    link?: string;
    onClick?: () => void;
}

interface StateProps {
    icon: string;
    title: string;
    description: string;
    actionButton?: ActionButton;
}

interface UniversalAdsListProps {
    ads: Ad[];
    isLoading: boolean;
    emptyStateProps?: StateProps;
    errorStateProps?: StateProps;
    renderCard: CardRendererFunction;
    isError?: boolean;
    className?: string;
}

const UniversalAdsList = ({ 
    ads, 
    isLoading, 
    emptyStateProps,
    errorStateProps,
    renderCard,
    isError = false,
    className = "space-y-8"
}: UniversalAdsListProps) => {
    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-main-color"></div>
            </div>
        );
    }

    if (isError && errorStateProps) {
        return (
            <div className="text-center py-16 bg-white rounded-lg shadow-md border border-gray-200">
                <div className="text-red-500 text-6xl mb-4">
                    <span className="material-icons text-7xl">{errorStateProps.icon}</span>
                </div>
                <h2 className="text-3xl font-semibold text-gray-700 mb-2">{errorStateProps.title}</h2>
                <p className="text-xl text-gray-500 mb-4">{errorStateProps.description}</p>
                {errorStateProps.actionButton && (
                    <>
                        {errorStateProps.actionButton.link ? (
                            <Link to={errorStateProps.actionButton.link}>
                                <Button 
                                    type="button" 
                                    style="primary" 
                                    text={errorStateProps.actionButton.text} 
                                    size="small"
                                />
                            </Link>
                        ) : (
                            <Button 
                                type="button" 
                                style="primary" 
                                text={errorStateProps.actionButton.text} 
                                size="small"
                                onClick={errorStateProps.actionButton.onClick}
                            />
                        )}
                    </>
                )}
            </div>
        );
    }

    if (ads.length === 0 && emptyStateProps) {
        return (
            <div className="text-center py-16 bg-white rounded-lg shadow-md border border-gray-200">
                <div className="text-gray-400 text-6xl mb-4">
                    <span className="material-icons text-7xl">{emptyStateProps.icon}</span>
                </div>
                <h2 className="text-3xl font-semibold text-gray-700 mb-2">{emptyStateProps.title}</h2>
                <p className="text-xl text-gray-500 mb-6">{emptyStateProps.description}</p>
                {emptyStateProps.actionButton && (
                    <>
                        {emptyStateProps.actionButton.link ? (
                            <Link to={emptyStateProps.actionButton.link}>
                                <Button 
                                    type="button" 
                                    style="primary" 
                                    text={emptyStateProps.actionButton.text} 
                                    size="small"
                                />
                            </Link>
                        ) : (
                            <Button 
                                type="button" 
                                style="primary" 
                                text={emptyStateProps.actionButton.text} 
                                size="small"
                                onClick={emptyStateProps.actionButton.onClick}
                            />
                        )}
                    </>
                )}
            </div>
        );
    }

    return (
        <div className={className}>
            {ads.map((ad, index) => renderCard(ad, index))}
        </div>
    );
};

export default UniversalAdsList;
