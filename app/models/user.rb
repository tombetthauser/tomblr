class User < ApplicationRecord

  attr_reader :password

  validates :username, :password_digest, :session_token, presence: true
  validates :password, length: { minimum: 6 }, allow_nil: true
  validates :username, uniqueness: true
  after_initialize :ensure_session_token

  has_many :blogs,
    class_name: :Blog,
    foreign_key: :author_id

  has_many :follows,
    class_name: :Follow,
    foreign_key: :follower_id

  has_many :followed_blogs,
    through: :follows,
    source: :blog

  # has_many :followed_blogs,
  #   class_name: :element,
  #   foreign_key: :element_id

  # has_many :posts
  # has_many :likes
  # has_many :follows / :followers ?

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil unless user && user.is_password?(password)
    user
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def generate_session_token
    SecureRandom.urlsafe_base64(16)
  end

  def ensure_session_token
    self.session_token ||= generate_session_token
  end

  def reset_session_token!
    self.session_token = generate_session_token
    self.save!
    self.session_token
  end

end
