const LandingPage = ({ currentUser }) => {
  return (
    <div className="container">
      {currentUser ? <h1>Usuário logado!</h1> : <h1>Usuário deslogado!</h1>}
    </div>
  );
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
  return {};
};

export default LandingPage;
