import MainNavigation from "./MainNavigation";

const Layout: React.FC = (props) => {
  return (
    <>
      <MainNavigation />
      {props.children}
    </>
  );
};

export default Layout;
