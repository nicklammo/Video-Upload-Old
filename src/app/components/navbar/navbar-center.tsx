import { Input } from "@/components/ui/input";

const NavBarCenter: React.FC = () => {
  return (
    <div>
      <form>
        <Input 
          type="text"
           placeholder="Search..." 
           name="search" 
           className="lg:w-[600px] md:w-[400px] dark:bg-transparent dark:border-gray-600 dark:ring-[#FF0E48]" 
        />
      </form>
    </div>
  );
};

export default NavBarCenter;