import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllGames } from "../../redux/actions";
import Nav from "../Nav/Nav";
import GameCards from "../GameCards/GameCards";
import { useLocation, useHistory } from "react-router-dom";
import "./HomePage.modules.css";

const HomePage = () => {
  const dispatch = useDispatch();
  const filteredGames = useSelector((state) => state.filteredGames);
  const location = useLocation();
  const history = useHistory();

  const page = Number(location.pathname.split("/").pop());

  useEffect(() => {
    if (!isNaN(page) && page > 0) {
      dispatch(fetchAllGames(page));
    } else {
      history.push("/home/1");
    }
  }, [dispatch, history, page]);

  const totalPages = 5;
  const firstPage = 1;

  const renderPageButtons = () => {
    const buttons = [];

    for (let i = firstPage; i <= firstPage + totalPages - 1; i++) {
      const isActive = i === page;
      buttons.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={`paginationButton ${isActive ? "active" : ""}`}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };

  const goToPage = (pageNumber) => {
    history.push(`/home/${pageNumber}`);
  };

  const nextPage = () => {
    const nextPageNumber = page + 1;
    history.push(`/home/${nextPageNumber}`);
  };

  const previousPage = () => {
    const previousPageNumber = page - 1;
    if (previousPageNumber > 0) {
      history.push(`/home/${previousPageNumber}`);
    }
  };

  return (
    <div className="HomePage">
      <Nav />
      <h1>😀VideoGames😀</h1>
      <button className="previous" onClick={previousPage}>
        Previous
      </button>
      <button className="next" onClick={nextPage}>
        Next
      </button>
      <div className="pagination">{renderPageButtons()}</div>
      <GameCards games={filteredGames} key={page} />
      <div className="pagination">{renderPageButtons()}</div>
      <button className="previous" onClick={previousPage}>
        Previous
      </button>
      <button className="next" onClick={nextPage}>
        Next
      </button>
    </div>
  );
};

export default HomePage;
