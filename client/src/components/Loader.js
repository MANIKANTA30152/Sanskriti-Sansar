import './Loader.css';

function Loader() {
  return (
    <div className="loader-container">
      <div className="loader">
        <div className="loader-circle"></div>
        <div className="loader-circle"></div>
        <div className="loader-circle"></div>
      </div>
      <p>Loading Indian Cultural Experience...</p>
    </div>
  );
}

export default Loader;