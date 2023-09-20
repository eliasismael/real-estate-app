const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-8 text-center text-white relative bottom-0">
      <div className="container mx-auto">
        Copyright &copy; {new Date().getFullYear()}. All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
