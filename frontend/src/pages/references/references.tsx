import React from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import ReferencesData from '../../components/referencesData';

const References: React.FC = () => {
    return (
      <>
      <main>
        <Header />
        {/* <References /> */}
        <ReferencesData />
      </main><Footer />
      </>
    );
  };
  
  export default References;