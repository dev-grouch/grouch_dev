class ContactMailer < ApplicationMailer
  def contact_email(attributes)
    @name = attributes[:name]
    @email = attributes[:email]
    @message = attributes[:message]
    mail(
      to: Rails.application.secrets.contact_receiver,
      subject: t(".subject"),
    )
  end
end
