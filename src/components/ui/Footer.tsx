const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#232326] font-jetbrains-mono text-tertiary text-[10px] p-4">
      <p>© {currentYear} Plinth Systems · Global Collaborative Canvas</p>
    </footer>
  );
};

export default Footer;
