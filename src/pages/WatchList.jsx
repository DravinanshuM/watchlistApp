import SideHeader from "../components/SideHeader";

const WatchList = () => {
  return (
    <>
      <div className="w-full h-screen flex flex-row bg-slate-200">
        <div className="w-1/4">
          <SideHeader />
        </div>
        <div className="w-2/3 m-11">
          <div className="border-2 border-red-500 p-7 rounded-md">
            <div
              className="text-4xl font-normal capitalize mb-7 leading-7"
              id="welcomeText"
              name="welcomeText"
            >
              Welcome to <span className="text-red-500">Watchlists</span>
            </div>
            <div className="text-md leading-7">
              Browse movies, add them to watchlists and share them with fiends.{" "}
              <br />
              just click the + to add a movie the poster to see more details to
              mark the movies as watched.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WatchList;
