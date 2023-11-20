import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['form']

  connect() {
    this.formTarget.addEventListener('input', this.onChange)
  }

  get formFields() {
    return this.formTarget.querySelectorAll(
      '.form__field input, .form__field textarea'
    )
  }

  get submitButton() {
    return this.formTarget.querySelector('input[type="submit"]')
  }

  validateForm() {
    return Array.from(this.formFields).every((field) =>
      this.validateField(field, true)
    )
  }

  validateField(field, showError = false) {
    const isValidEmail = (field) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)
    const isValid =
      !field.required ||
      (field.type === 'email' && isValidEmail(field)) ||
      field.validity.valid

    if (!isValid) {
      showError && this.showErrorMessage(field)
      this.disableSubmitButton()
    } else {
      this.removeErrorMessage(field)
    }

    return isValid
  }

  onChange = (event) => {
    this.validateField(event.target, true)
    if (this.validateForm()) {
      this.enableSubmitButton()
    }
  }

  showErrorMessage(field) {
    let errorElement = field.parentNode.querySelector('.form__error')
    if (!errorElement) {
      errorElement = document.createElement('div')
      errorElement.classList.add('form__error')
      errorElement.innerText = field.dataset.errorMessage
      field.parentNode.appendChild(errorElement)
    }
    field.classList.add('input--error')
  }

  removeErrorMessage(field) {
    const errorElement = field.parentNode.querySelector('.form__error')
    if (errorElement) {
      errorElement.remove()
    }
    field.classList.remove('input--error')
  }

  disableSubmitButton() {
    this.submitButton.disabled = true
  }

  enableSubmitButton() {
    this.submitButton.disabled = false
  }
}
