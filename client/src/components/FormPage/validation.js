// validation.js

const validateForm = (formData) => {
    const errors = {};
  
    // Validar nombre hasta 20 caracteres y sin simbolos especiales.
    const nameRegex = /^[a-zA-Z0-20\s]+$/;
    if (!formData.name || !nameRegex.test(formData.name)) {
      errors.name = "El nombre del videojuego es inválido";
    }

    // Validar plataformas, No debe contener símbolos especiales
    const platformsRegex = /^[a-zA-Z0-9\s,]+$/;
    if (!formData.platforms || !platformsRegex.test(formData.platforms)) {
      errors.platforms = "Las plataformas son inválidas";
    }
  
    // Validar descripción, Debe tener al menos 10 caracteres
    if (formData.description && formData.description.length < 10) {
      errors.description = "La descripción debe tener al menos 10 caracteres";
    }
  
    // Validar fecha de lanzamiento: Debe ser una fecha válida en el pasado
    const currentDate = new Date();
    const selectedDate = new Date(formData.released);
    if (!formData.released || selectedDate > currentDate) {
      errors.released = "La fecha de lanzamiento es inválida";
    }
  
    // Validar calificación: Debe ser un número entre 0 y 10
    const ratingRegex = /^[0-9]+(\.[0-9]{1,2})?$/;
    if (!formData.rating || !ratingRegex.test(formData.rating) || formData.rating < 0 || formData.rating > 10) {
      errors.rating = "La calificación es inválida";
    }
  
    // Validar géneros: Debe seleccionar al menos un género
    if (!formData.genres || formData.genres.length === 0) {
      errors.genres = "Debe seleccionar al menos un género";
    }
  
    return errors;
  };
  
  export default validateForm;
  