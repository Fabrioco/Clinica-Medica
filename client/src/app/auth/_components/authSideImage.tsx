export const AuthSideImage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-1/2 bg-[#1f3a6d] flex-col justify-center items-center text-white p-12 hidden sm:flex">
      {children}
    </div>
  );
};
