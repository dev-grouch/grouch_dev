class ContactController < ApplicationController
  def new
    @contact_form = ContactForm.new
  end

  def create
    @contact_form = ContactForm.new(contact_params)

    if @contact_form.call
      flash[:notice] = "Thank you for reaching out! We will be in touch soon."
      redirect_to root_path
    else
      redirect_back_or_to root_path
    end
  end

  private

  def contact_params
    params.require(:contact_form).permit(:name, :email, :message)
  end
end
