class FormValidator {
    constructor(validationConfig, formElement) {
      this._formSelector = validationConfig.formSelector;
      this._inputSelector = validationConfig.inputSelector;
      this._submitButtonSelector = validationConfig.submitButtonSelector;
      this._inactiveButtonClass = validationConfig.inactiveButtonClass;
      this._inputErrorClass = validationConfig.inputErrorClass;
      this._errorClass = validationConfig.errorClass;
      this._formElement = formElement;
      this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector)); // Преобразовываю коллекцию в массив методом Array.from.
      this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    }
  
  
    /** Функция, которая добавляет класс с ошибкой */
    _showInputError = (inputElement, errorMessage) => { // 3 параметра: форма, поле, сообщение об ошибке.
      this._errorElement = this._formElement.querySelector(`#${inputElement.id}-error`); // Значение этой переменной — ошибка, которая найдена внутри formEl.
  
      inputElement.classList.add(this._inputErrorClass); // Добавляет красное подчеркивание
      this._errorElement.textContent = errorMessage; // Так текст ошибки попадёт в нужное место.
      this._errorElement.classList.add(this._errorClass);
    };
    
   
    /** Функция, которая удаляет класс с ошибкой */
    _hideInputError = (inputElement) => { // 2 параметра: форма, поле.
      this._errorElement = this._formElement.querySelector(`#${inputElement.id}-error`); // Значение этой переменной — ошибка, которая найдена внутри formEl.
     
      inputElement.classList.remove(this._inputErrorClass);
      this._errorElement.classList.remove(this._errorClass);
  
      this._errorElement.textContent = ""; // Это скроет ошибку под полем.
    };
  
  
    /** Функция переключения кнопки */
    toggleButtonState = () => { // InputList и buttonElement. Первый — массив полей, второй — кнопка «Сохранить, создать».
      if (this._hasInvalidInput()) { // есть ли в массиве inputList невалидные поля.
        this.disableSubmitButton();
      } else {
        this.enableSubmitButton();
      }
    };
    
  
    /** Функция состояния кнопок */
    disableSubmitButton = () => {
      this._buttonElement.classList.add(this._inactiveButtonClass);  
      this._buttonElement.disabled = true; // Сделаем кнопку неактивной 
    };
  
  
    enableSubmitButton = () => {
      this._buttonElement.classList.remove(this._inactiveButtonClass);  
      this._buttonElement.disabled = false; // Сделаем её активной 
    };
  
  
    /** Добавляю слушатель события на все поля ввода сразу */
    _setEventListeners = () => { 
      this._inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          this._checkInputValidity(inputElement);
          this.toggleButtonState();
        });
      });
    }; 
  
  
    enableValidation = () => { 
      this._setEventListeners();
    };
  
  
    /*-----------------------Валидация-----------------------*/
  
    
    /** Функция которая проверяет formInput на корректность введённых данных и вызывает hideError и showError */
    _checkInputValidity = (inputElement) => { // formElement — html-элемент формы, в которой находится проверяемое поле ввода. Он нужен для поиска элемента ошибки в форме.
      // inputElement — проверяемое поле ввода.
      if (!inputElement.validity.valid) { // Если поле popup__input не проходит валидацию, покажем ошибку
      // Передадим сообщение об ошибке вторым аргументом
        this._showInputError(inputElement, inputElement.validationMessage); 
      } else { // Если поле проходит валидацию, скроем сообщение об ошибке
        this._hideInputError(inputElement);
      }
    };
  
    
  //   /** Обходит массив полей и отвечает на вопрос: «Есть ли здесь хотя бы одно поле, которое не прошло валидацию?» */
    _hasInvalidInput = () => { // // Функция возвращает true, если в массиве inputList есть хотя бы один невалидный input. Если все поля валидны — false.
      // проходим по этому массиву методом some
      return this._inputList.some((inputElement) => { 
        return !inputElement.validity.valid;
      });
    };
  };
   
  
  export default FormValidator;