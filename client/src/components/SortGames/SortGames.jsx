import { useDispatch } from 'react-redux';
import { sortGamesAscending, sortGamesDescending, filterGamesByRatingAscending, filterGamesByRatingDescending } from '../../redux/actions';
import './SortGames.modules.css';

const SortGames = () => {
  const dispatch = useDispatch();

  const handleSortChange = (event) => {
    const sortOption = event.target.value;
    console.log('Sort option:', sortOption);
    if (sortOption === 'ascending') {
      dispatch(sortGamesAscending());
    } else if (sortOption === 'descending') {
      dispatch(sortGamesDescending());
    } else if (sortOption === 'ratingAscending') {
      dispatch(filterGamesByRatingAscending());
    } else if (sortOption === 'ratingDescending') {
      dispatch(filterGamesByRatingDescending());
    }
  };

  return (
    <div className="sort-container">
      <div className="sort-group">
        <label htmlFor="sortSelect" className="sort-label">Sort Games:</label>
        <select id="sortSelect" className="sort-select" onChange={handleSortChange}>
          <option value="">Sort Games</option>
          <option value="ascending">A-Z</option>
          <option value="descending">Z-A</option>
        </select>
      </div>
      <div className="sort-group">
        <label htmlFor="ratingSortSelect" className="sort-label">Sort by Rating:</label>
        <select id="ratingSortSelect" className="sort-select" onChange={handleSortChange}>
          <option value="">Sort by Rating</option>
          <option value="ratingAscending">Rating Ascending</option>
          <option value="ratingDescending">Rating Descending</option>
        </select>
      </div>
    </div>
  );
};

export default SortGames;
