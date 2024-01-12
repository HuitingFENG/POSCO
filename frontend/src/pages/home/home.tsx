import React from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Body from '../../components/body';

const Home: React.FC = () => {
    return (
      <>
      <main>
        <Header />
        <Body />
      </main><Footer />
      </>
    );
  };
  
  export default Home;