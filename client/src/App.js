import Navbar from "./pages/Navbar";
import HeroSection from "./pages/HeroSection";
import FeaturesSection from "./pages/FeaturesSection";
import HowItWorks from "./pages/HowItWorks";
import CTA from "./pages/CTA";
import Testimonials from "./pages/Testimonilas";
import Footer from "./pages/Footer";

function App() {
  return (
   <div>
      
    
      <Navbar />

   
      <HeroSection/>
      <FeaturesSection/>
      <HowItWorks/>
      <Testimonials/>
      <CTA/>
      

      <Footer />
    </div>
  );
}

export default App;