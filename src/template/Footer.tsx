// import Styles from './Footer.module.css'

function Footer() {
  return (
    <footer className="p-3 fixed w-full bottom-0 z-10 bg-white text-gray-400 text-center text-sm">
      KeyPass - Copyright &copy; {new Date().getFullYear()}
    </footer>
  );
}

export default Footer;
