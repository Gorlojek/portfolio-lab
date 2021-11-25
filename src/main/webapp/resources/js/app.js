document.addEventListener("DOMContentLoaded", function() {
  // class MainPage{
  //   constructor() {
  //     hideLastInstitution()
  //   }
  // }
  // new MainPage();
  // function hideLastInstitution() {
  //   const lastInstitutionElement = document.querySelectorAll(".title")[document.querySelectorAll(".title").length - 1].innerText.length;
  //   const formElementDataStep = document.querySelectorAll(".title")[document.querySelectorAll(".title").length - 1].parentElement.parentElement.parentElement.parentElement.dataset.step
  //
  //   if (lastInstitutionElement != null && lastInstitutionElement == 11 && formElementDataStep==null) {
  //     console.log("dodany styl visibility:hidden")
  //     document.querySelectorAll(".title")[document.querySelectorAll(".title").length - 1].parentElement.style.visibility = "hidden";
  //   }
  // }
  /**
   * Form Select
   */
  class FormSelect {
    constructor($el) {
      this.$el = $el;
      this.options = [...$el.children];
      this.init();
    }


    init() {
      this.createElements();
      this.addEvents();
      this.$el.parentElement.removeChild(this.$el);
    }

    createElements() {

      // Input for value
      this.valueInput = document.createElement("input");
      this.valueInput.type = "text";
      this.valueInput.name = this.$el.name;

      // Dropdown container
      this.dropdown = document.createElement("div");
      this.dropdown.classList.add("dropdown");

      // List container
      this.ul = document.createElement("ul");

      // All list options
      this.options.forEach((el, i) => {
        const li = document.createElement("li");
        li.dataset.value = el.value;
        li.innerText = el.innerText;

        if (i === 0) {
          // First clickable option
          this.current = document.createElement("div");
          this.current.innerText = el.innerText;
          this.dropdown.appendChild(this.current);
          this.valueInput.value = el.value;
          li.classList.add("selected");
        }

        this.ul.appendChild(li);


      });

      this.dropdown.appendChild(this.ul);
      this.dropdown.appendChild(this.valueInput);
      this.$el.parentElement.appendChild(this.dropdown);
      document.querySelector("input[name='quantity']").type = 'number'
    }

    addEvents() {
      this.dropdown.addEventListener("click", e => {
        const target = e.target;
        this.dropdown.classList.toggle("selecting");

        // Save new value only when clicked on li
        if (target.tagName === "LI") {
          this.valueInput.value = target.dataset.value;
          this.current.innerText = target.innerText;
        }
      });
    }
  }
  document.querySelectorAll(".form-group--dropdown select").forEach(el => {
    new FormSelect(el);
  });


  /**
   * Hide elements when clicked on document
   */
  document.addEventListener("click", function(e) {
    const target = e.target;
    const tagName = target.tagName;

    if (target.classList.contains("dropdown")) return false;

    if (tagName === "LI" && target.parentElement.parentElement.classList.contains("dropdown")) {
      return false;
    }

    if (tagName === "DIV" && target.parentElement.classList.contains("dropdown")) {
      return false;
    }

    document.querySelectorAll(".form-group--dropdown .dropdown").forEach(el => {
      el.classList.remove("selecting");
    });
  });

  /**
   * Switching between form steps
   */
  class FormSteps {

    constructor(form) {
      this.$form = form;
      this.$next = form.querySelectorAll(".next-step");
      this.$prev = form.querySelectorAll(".prev-step");
      this.$step = form.querySelector(".form--steps-counter span");
      this.currentStep = 1;
      localStorage.setItem("currentStep", this.currentStep);
      this.$stepInstructions = form.querySelectorAll(".form--steps-instructions p");
      const $stepForms = form.querySelectorAll("form > div");
      this.slides = [...this.$stepInstructions, ...$stepForms];

      this.init();
    }


    /**
     * Init all methods
     */
    init() {

      this.events();
      this.updateForm();
      // document.querySelectorAll("input[type='hidden']").forEach(function (e){
      //   e.parentNode.removeChild(e);
      //     }
      // );


    }
    validations(){
      let valid = true;
      const secondFormStep = document.querySelector('div[data-step="2"]');
      const thirdFormStep = document.querySelector('div[data-step="3"]');


      const categoryChbx = document.querySelectorAll("input[name='categories']:checked").length;
      if (categoryChbx == 0){
        alert("Musisz zaznaczyć conajmniej jedną kategorię!");
        valid = false;

      }
      const quantityInput = document.querySelector("input[name='quantity']");
      let quantityInputValue = Math.floor(quantityInput.value);
      console.log(quantityInputValue)
      if(quantityInputValue == 0&&secondFormStep.classList[0]=="active"){
        quantityInput.style.borderColor = 'red';

        alert("Liczba oddanych worków musi być większa od zera");
        valid=false;
      }
      if(quantityInputValue >= 100&&secondFormStep.classList[0]=="active"){
        console.log(quantityInput.value )
        quantityInput.style.borderColor = 'red';

        alert("Nie można oddać więcej niż 100 worków")
        valid=false;
      }
      if((quantityInput.value == "" || isNaN(quantityInputValue))&&secondFormStep.classList[0]=="active" ){
        quantityInput.style.borderColor = 'red';
        alert("Podaj poprawną liczbę worków")
        valid=false;
      }
      const institutionsRadioButtons = document.querySelectorAll("input[name='institution']:checked").length;
      if (institutionsRadioButtons == 0&&thirdFormStep.classList[0]=="active"){
        alert("Proszę wybrać instytucję");
        valid = false;
      }
      return valid;
        }
    lastStepValidation() {
      let valid = true;
      console.log("sprawdzam ostatnią stronę")
      const lastFormStep = document.querySelector('div[data-step="4"]');
      const streetInput = document.querySelector("input[name='street']");
      const cityInput = document.querySelector("input[name='city']");
      const zipCodeInput = document.querySelector("input[name='zipCode']");
      const phoneNumberInput = document.querySelector("input[name='phoneNumber']");
      const dateInput = document.querySelector("input[name='pickUpDate']");
      const hourInput = document.querySelector("input[name='pickUpTime']");
      const textInputs = [streetInput,cityInput,zipCodeInput,phoneNumberInput];
      if(streetInput.value=='' && lastFormStep.classList[0] == "active"){
        alert("podaj poprawną datę");
        valid = false;
      }

      return valid;
    }
    /**
     * All events that are happening in form
     */
    events() {
      this.$next.forEach(btn => {
        btn.addEventListener("click", e => {
          e.preventDefault();
          if(this.validations()){
            this.currentStep++;
            localStorage.setItem("currentStep",this.currentStep);
            this.updateForm();
          }


        });
      });

      // Previous step
      this.$prev.forEach(btn => {
        btn.addEventListener("click", e => {
          e.preventDefault();
          this.currentStep--;
          localStorage.setItem("currentStep",this.currentStep);
          this.updateForm();
        });
      });

      // Form submit

        this.$form.querySelector("form").addEventListener("submit", e => {
        if(!this.lastStepValidation()){
          e.preventDefault();
        }

        });


    }

    /**
     * Update form front-end
     * Show next or previous section etc.
     */

    updateForm() {
      if(this.$step  == null ){
        return;
      }
      this.$step.innerText = this.currentStep;

      // TODO: Validation

      this.slides.forEach(slide => {
        slide.classList.remove("active");

        if (slide.dataset.step == this.currentStep) {
          slide.classList.add("active");
        }
      });

      this.$stepInstructions[0].parentElement.parentElement.hidden = this.currentStep >= 5;
      this.$step.parentElement.hidden = this.currentStep >= 5;


      // TODO: get data from inputs and show them in summary

    }

  }
  const form = document.querySelector(".form--steps");
  if (form !== null) {
    new FormSteps(form);
  }

});
