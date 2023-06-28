import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import validateForm from "./validation";
import { setFormData, resetFormData, createVideogame, fetchGenres } from "../../redux/actions";
import "./FormPage.modules.css";

export const FormPage = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.formData);
  const genres = useSelector((state) => state.genres);
  const [errors, setErrors] = useState({});
  console.log(formData);

  const history = useHistory();


  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "genres") {
      const selectedGenres = Array.from(e.target.selectedOptions, (option) => option.value);
      dispatch(setFormData({ ...formData, genres: selectedGenres }));
    } else {
      dispatch(setFormData({ ...formData, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm(formData);

    if (Object.keys(formErrors).length === 0) {
      dispatch(createVideogame(formData));
      dispatch(resetFormData());
      history.push("/home/1");
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="fondo">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          {errors.name && <p className="error-message">{errors.name}</p>}

          <label htmlFor="background_image">URL de la imagen:</label>
          <input
            type="text"
            id="background_image"
            name="background_image"
            value={formData.background_image}
            onChange={handleInputChange}
          />
          {errors.background_image && <p className="error-message">{errors.background_image}</p>}

          <label htmlFor="platforms">Plataformas:</label>
          <input
            type="text"
            id="platforms"
            name="platforms"
            value={formData.platforms}
            onChange={handleInputChange}
          />
          {errors.platforms && <p className="error-message">{errors.platforms}</p>}

          <label htmlFor="description">Descripción:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          ></textarea>
          {errors.description && <p className="error-message">{errors.description}</p>}

          <label htmlFor="released">Fecha de lanzamiento:</label>
          <input
            type="date"
            id="released"
            name="released"
            value={formData.released}
            onChange={handleInputChange}
          />
          {errors.released && <p className="error-message">{errors.released}</p>}

          <label htmlFor="rating">Calificación:</label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleInputChange}
          />
          {errors.rating && <p className="error-message">{errors.rating}</p>}

          <label htmlFor="genres">Géneros:</label>
          <select
            id="genres"
            name="genres"
            value={formData.genres || []}
            onChange={handleInputChange}
            multiple
          >
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
          {errors.genres && <p className="error-message">{errors.genres}</p>}

          <button type="submit">Crear Videojuego</button>
        </form>
      </div>
    </div>
  );
};
