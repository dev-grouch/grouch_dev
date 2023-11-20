import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['form']

  get formFields() {
    return this.formTarget.querySelectorAll(
      '.form__field input, .form__field textarea'
    )
  }

  get submitButton() {
    return this.formTarget.querySelector('input[type="submit"]')
  }

  disableSubmitButton() {
    this.submitButton.disabled = true
  }

  enableSubmitButton() {
    this.submitButton.disabled = false
  }

  validEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  validField = (field, showError = false) => {
    if (!field.required) return true

    if (field.type === 'email' && !this.validEmail(field.value)) {
      this.disableSubmitButton()
      showError && this.showErrorState(field)
      return false
    }

    if (!field.validity.valid) {
      this.disableSubmitButton()
      showError && this.showErrorState(field)
      return false
    }

    this.removeErrorMessage(field)
    return true
  }

  showErrorState = (field) => {
    const errorPresent = field.parentNode.querySelector('.form__error')

    if (errorPresent) return

    const errorMessage = field.dataset.errorMessage
    const errorElement = document.createElement('div')
    errorElement.classList.add('form__error')
    errorElement.innerText = errorMessage
    field.parentNode.appendChild(errorElement)
    field.classList.add('input--error')
  }

  removeErrorMessage = (field) => {
    const errorElement = field.parentNode.querySelector('.form__error')
    if (errorElement) {
      errorElement.remove()
    }

    field.classList.remove('input--error')
  }

  onChange = (event) => {
    const valid = this.validField(event.currentTarget, true)
    if (!valid) return

    const allValid = Array.from(this.formFields).every((input) =>
      this.validField(input)
    )

    if (allValid) {
      this.enableSubmitButton()
    }
  }
}
