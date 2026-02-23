interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  isActive: boolean;
}

const HamburgerButton: React.FC<ButtonProps> = ({ onClick, children, className, isActive }) => {
  return (
    <div
      className={`flex w-full h-full items-center justify-end relative ${
        isActive ? "justify-start" : ""
      }`}
    >
      <button
        onClick={onClick}
        className={`group grid place-items-center abslute w-[35px] h-[28px] cursor-pointer ${className}`}
      >
        <span
          className={`block absolute w-[30px] h-[4px] bg-black rounded-2xl duration-100 transition-all ease-in-out ${
            isActive ? "rotate-225 transform-[translateY(50.%)] " : "top-[20%]"
          }`}
        ></span>
        <span
          className={`block absolute w-[30px] h-[4px] bg-black rounded-2xl duration-100 transition-all ease-in-out ${
            isActive ? "opacity-0 w-0" : ""
          }`}
        ></span>
        <span
          className={`block absolute w-[30px] h-[4px] bg-black rounded-2xl duration-100 transition-all ease-in-out ${
            isActive
              ? "-rotate-225 transform-[translateY(-50.%)]"
              : "bottom-[20%]"
          }`}
        ></span>
        {children}
      </button>
    </div>
  );
};

export default HamburgerButton;
