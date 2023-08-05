import AboutSection from '../../components/about';
import FeatureSection from '../../components/features';
import HeroSection from '../../components/hero';
import TestimonialsSection from '../../components/testimonials';

const HomePage = () => {
    return (
        <div className="homepage">
            <HeroSection />
            <FeatureSection />
            <AboutSection />
            <TestimonialsSection />            
        </div>
    );
}

export default HomePage;