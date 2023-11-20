class ContactMailerService
  def initialize(contact_form)
    @contact_form = contact_form
  end

  def call
    ContactMailer.contact_email(@contact_form.attributes).deliver_now

    true
  end
end
