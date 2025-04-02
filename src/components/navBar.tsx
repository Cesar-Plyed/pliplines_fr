import Button from "./ui/Button";
import Icon from "../assets/Icon.svg";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

interface NavBarProps {
  onButtonClick: () => void;
  isSideBarOpen: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ onButtonClick, isSideBarOpen }) => {
  return (
    <div>
      <nav className="flex flex-col justify-center items-center h-full bg-[#f8edcd] p-[2px]">
        <ul className="grid grid-cols-[1fr_minmax(30px,40px)_1fr] place-items-center w-full gap-1.5">
          <li className="col-span-[1/2] h-full w-full">
            <Button onClick={onButtonClick} isActive={isSideBarOpen} children />
          </li>
          <li className="flex justify-center items-center col-span-[2/3] w-full h-full overflow-hidden">
            <img
              src={Icon}
              alt="icon"
              className="w-[45px] h-[38px] object-cover bg-contain transform-[scale(170%)]"
            />
          </li>
          <li className="col-span-[3/4] flex items-center justify-start w-full h-full">
            <SupportAgentIcon className="w-[40px] h-[30px] object-cover bg-contain transform-[scale(120%)]" />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
