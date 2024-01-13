import { useRouteError, useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);
  let navigate = useNavigate();

  function handleClick() {
    navigate("/");
  }

  return (
    <div>
      <h1>Something didn't work out quite right..</h1>
      <div>
          <button onClick={handleClick}>Go Home</button>
      </div>
    </div>
  )
};

export default ErrorPage;