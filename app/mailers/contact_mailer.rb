class ContactMailer < ApplicationMailer
  def contact_email(contact_form_attributes)
    @contact_form = ContactForm.new(contact_form_attributes)
    mail(
      to: Rails.application.secrets.contact_receiver,
      subject: t(".subject"),
    )
  end
end
