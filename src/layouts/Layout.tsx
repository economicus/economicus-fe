import MainNavigation from "./MainNavigation";

const Layout: React.FC = (props) => {
  return (
    <div>
      <MainNavigation />
      <div>{props.children}</div>
    </div>
  );
};

export default Layout;
