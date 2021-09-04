import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

function Protected(props) {
  let Component = props.Cmp;

  const history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      history.push("/signin");
    }
  }, []);
  return (
    <div>
      <Component />
    </div>
  );
}

export default Protected;
