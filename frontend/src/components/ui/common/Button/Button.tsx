import '../../../../App.css'
type ButtonProps = {
    type?: "button" | "submit" | "reset";
    style? : "primary" | "secondary";
    text?: string;
    size?: "small" | "normal" | "big";
    onClick?: () => void;
}
const Button = ({ 
    style="primary",
    type="button",
    size="normal",
    text,
    onClick,
}: ButtonProps) => {

    return (
        <button onClick={onClick}
        type={type}
        className={`btn-${style} btn-${size} ${style === 'primary' ? 'm-3 bg-main-color text-white font-bold border border-main-color rounded-md hover:brightness-50' : 'bg-secondary-button-background text-secondary-button-text border border-secondary-button-border rounded-2xl hover:brightness-50'} ${size === 'small' ? 'p-2 w-1/3' : size === 'normal' ? 'p-2 w-2/3' : 'p-4 w-full'}`}
        >
            {text}
        </button>
    );
    }
    export default Button;