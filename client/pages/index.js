import axios from "axios";

const LandingPage = ({ color }) => {
  console.log(color);
  return <h1>Olá mundo!</h1>;
};

LandingPage.getInitialProps = async () => {
  const response = await axios
    .get(
      "https://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser"
    )
    .catch((err) => {
      console.log(err.message);
    });

  return { color: "red" };
};

export default LandingPage;
