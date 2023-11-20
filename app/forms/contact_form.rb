class ContactForm
  include ActiveModel::Model
  include ActiveModel::Attributes

  attr_accessor :name, :email, :message

  attribute :name, :string
  attribute :email, :string
  attribute :message, :string

  validates :name, presence: true
  validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :message, presence: true

  def call
    if valid?
      ContactMailerService.new(self).call
    else
      false
    end
  end

  def attributes
    {
      name: name,
      email: email,
      message: message
    }
  end
end
