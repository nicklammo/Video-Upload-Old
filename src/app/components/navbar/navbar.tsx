import NavBarCenter from "./navbar-center";
import NavBarLeft from "./navbar-left";
import NavBarRight from "./navbar-right";

const NavBar: React.FC = () => {
  return (
    <div className="pl-64">
      <nav className="flex flex-row justify-between px-6 py-3">
        <NavBarLeft />
        <NavBarCenter />
        <NavBarRight />
      </nav>
    </div>
  );
}

export default NavBar;