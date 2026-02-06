import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Flowcharts from '../components/Flowcharts';
import Metrics from '../components/Metrics';
import LogosSlider from '../components/LogosSlider';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Flowcharts />
      <Metrics />
      <LogosSlider />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />
    </>
  );
};

export default Home;
