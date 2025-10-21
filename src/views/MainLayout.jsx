import { Navbar } from '../views/ui/Navbar';
import { Footer } from '../views/ui/Footer';

export const MainLayout = ({ children, showFooter = true }) => {
  return (
    <>
      <Navbar />
      <div className="container mb-3 mt-3">
        {children}
      </div>
      <Footer />
    </>
    
  );
};