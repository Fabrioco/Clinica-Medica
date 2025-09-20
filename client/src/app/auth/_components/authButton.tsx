type ButtonType = "submit" | "reset" | "button";

export const AuthButton = ({
  text,
  type = "button" as ButtonType,
  onClick,
  isLink = false,
  disabled,
}: {
  text: string;
  type: ButtonType;
  onClick?: () => void;
  isLink?: boolean;
  disabled?: boolean;
}) => {
  return (
    <button
      className={
        isLink
          ? "text-[#1f3a6d] font-semibold hover:underline"
          : `w-full py-3 rounded-md bg-[#1f3a6d] text-white font-semibold hover:bg-[#16274a] ${
              disabled ? "opacity-50 cursor-not-allowed" : ""
            }`
      }
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  );
};
