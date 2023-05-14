import Footer from "../footer/Footer";
import Header from "../header/Header";
const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;
