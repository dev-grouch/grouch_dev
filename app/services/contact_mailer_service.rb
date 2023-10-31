class ContactMailerService
  def initialize(attributes)
    @attributes = attributes
  end

  def call
    ContactMailer.contact_email(@attributes).deliver_now
  end
end
