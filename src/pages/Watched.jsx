import SideHeader from "../components/SideHeader.jsx";
import { BiSolidBookmarkPlus } from "react-icons/bi";
import MyWatched from "../components/MyWatched.jsx";

// context.
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalState.jsx";

const Watched = () => {
  const { state } = useContext(GlobalContext);
  console.log(state.watched);
  return (
    <>
      <div className="w-full h-auto flex flex-row ">
        <div className="w-1/4 fixed z-40">
          <SideHeader />
        </div>
        <div className="w-2/3 ml-20 sm:ml-44 md:ml-60 lg:ml-[396px] mt-7">
          {/* welcome section */}
          <section className="border-2 border-red-500 p-7 rounded-md">
            <header
              className="text-4xl font-normal capitalize mb-7 leading-7"
              id="welcomeText"
            >
              Welcome to <span className="text-red-500">My Lists</span>
            </header>
            <p className="text-[17px] leading-7">
              Browse movies, add them to watchlists, and share them with
              friends. <br />
              Just click the
              <BiSolidBookmarkPlus
                className="text-3xl inline-block text-gray-600"
                aria-label="Bookmark Icon"
              />
              to add a movie, click on the poster to see more details, and mark
              movies as watched.
            </p>
          </section>
          {/* show Here watched movies. */}
          <section>
            <h1 className="text-center text-2xl m-7 relative inline-block">
              <div className="text-center text-red-500">My Movie Cart</div>
              <span className="absolute left-0 right-0 bottom-0 border-b-2 border-b-red-500 border-current"></span>
            </h1>
            {state.watched && state.watched.length > 0 ? (
              <div className="flex flex-row justify-around flex-wrap">
                {state.watched.map((movie, index) => (
                  <MyWatched key={index} {...movie} />
                ))}
              </div>
            ) : (
              <span>There is no movie Added in watched.</span>
            )}
          </section>
        </div>
      </div>
    </>
  );
};

export default Watched;
