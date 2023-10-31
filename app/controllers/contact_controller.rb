class ContactController < ApplicationController
  def create
    @contact_form = ContactForm.new(contact_form_params)

    respond_to do |format|
      if @contact_form.call
        format.turbo_stream {
          render turbo_stream: turbo_stream.replace(@contact_form, partial: "contact_form", locals: { contact_form: ContactForm.new, feedback: "success" })
        }
        format.html { redirect_to root_path, notice: "Message sent successfully" }
      else
        format.turbo_stream { render turbo_stream: turbo_stream.replace(@contact_form, partial: "contact_form", locals: { contact_form: @contact_form }) }
        format.html { redirect_to root_path, alert: "Message not sent" }
      end
    end
  end

  private

  def contact_form_params
    params.require(:contact_form).permit(:name, :email, :message)
  end
end
