import { FC, ReactElement, useContext } from "react";
import { AuthSessionContext } from "./AuthSessionContext";
import { Navigate } from "react-router-dom";

type PrivateProps = {
  component: ReactElement;
};

const Private: FC<PrivateProps> = ({ component }) => {
  const { session, loading } = useContext(AuthSessionContext);

  if (loading) {
    return <>Authenticating...</>;
  }

  return session ? component : <Navigate to="/auth" />;
};

export default Private;
