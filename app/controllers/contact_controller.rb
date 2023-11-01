class ContactController < ApplicationController
  def create
    @contact_form = ContactForm.new(contact_form_params)

    @contact_form.call
  end

  private

  def contact_form_params
    params.require(:contact_form).permit(:name, :email, :message)
  end
end
