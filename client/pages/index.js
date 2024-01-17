import buildClient from "../api/build-client";

const LandingPage = ({ currentUser }) => {
  return (
    <div className="container">
      {currentUser ? <h1>Usuário logado!</h1> : <h1>Usuário deslogado!</h1>}
    </div>
  );
};

LandingPage.getInitialProps = async (context) => {
  const client = buildClient(context);
  const { data } = await client.get("/api/users/currentuser");
  return data;
};

export default LandingPage;
