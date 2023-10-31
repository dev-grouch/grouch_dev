class ContactController < ApplicationController
  def create
    @contact_form = ContactForm.new(contact_form_params)

    puts "Params: #{contact_form_params.inspect}"

    if @contact_form.call
      @feedback = "success"
    else
      @feedback = "invalid"
    end
  end

  private

  def contact_form_params
    params.require(:contact_form).permit(:name, :email, :message)
  end
end
