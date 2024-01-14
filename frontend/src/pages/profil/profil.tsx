import React from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import UserProfil from '../../components/userProfil';

const Profil: React.FC = () => {
    return (
      <>
      <main>
        <Header />
        <UserProfil />
      </main><Footer />
      </>
    );
  };
  
  export default Profil;