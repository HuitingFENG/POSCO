import React from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Question from '../../components/question';

const Questionnaire: React.FC = () => {
    return (
      <>
      <main>
        <Header />
        questionnaire
        <Question />
      </main><Footer />
      </>
    );
  };
  
  export default Questionnaire;