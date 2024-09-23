import Notes from "./Notes";

const Home = ({ showAlert }) => {
  return (
    <div className="my-3">
      <Notes showAlert={showAlert} />
    </div>
  );
};

export default Home;
