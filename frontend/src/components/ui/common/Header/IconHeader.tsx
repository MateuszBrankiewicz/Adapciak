interface IconHeaderProps {
    icon: string;
    title: string;
    subtitle?: string;
    iconColor?: string;
    titleColor?: string;
    borderColor?: string;
    className?: string;
}

const IconHeader = ({ 
    icon, 
    title, 
    subtitle, 
    iconColor = "text-main-color",
    titleColor = "text-gray-800",
    borderColor = "border-main-color",
    className = "bg-white p-8 rounded-lg shadow-sm mb-8 border-t-4"
}: IconHeaderProps) => {
    return (
        <div className={`${className} ${borderColor}`}>
            <div className="flex items-center mb-3">
                <span className={`material-icons ${iconColor} mr-3 text-3xl`}>{icon}</span>
                <h1 className={`text-3xl font-bold ${titleColor}`}>{title}</h1>
            </div>
            {subtitle && (
                <p className="text-gray-500 flex items-center">
                    <span className="material-icons mr-2 text-gray-400 text-base">bookmark</span>
                    {subtitle}
                </p>
            )}
        </div>
    );
};

export default IconHeader;
