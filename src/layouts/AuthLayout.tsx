import { Outlet } from "react-router-dom";

type Props = {};

const AuthLayout = (props: Props) => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default AuthLayout;
