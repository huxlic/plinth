import Logo from "./ui/Logo"


const Navbar = () => {
  return (
    <nav className="fixed top-4 left-1/2 w-[98%] -translate-x-1/2 flex justify-between p-4 rounded-2xl border border-[#232326] bg-[#111112]/80 backdrop-blur-md overflow-hidden">
      <Logo />
    </nav>
  );
}

export default Navbar
