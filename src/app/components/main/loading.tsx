import Image from "next/image";

const Loading: React.FC = () => {
  return (
    <div className="w-full h-full flex justify-center items-center z-50">
      <Image src="/images/Loader.svg" width={80} height={80} alt="" />
    </div>
  );
};

export default Loading;