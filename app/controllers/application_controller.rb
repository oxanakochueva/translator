class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token

  #before_action :set_user

  #def set_user
  #  self.current_user = SecureRandom.uuid
  # Проверить есть ли у гостя уже идентификатор
  #guest_uuid = cookies[:guest_uuid]
  #puts "=========== GUEST UUID ==========="
  #puts guest_uuid

  # ЕСЛИ ЕСТЬ ТО
  #  if guest_uuid
    # Найти последнюю активную вопрос этого гостя
  #  @user = Workspace.where(guest_uuid: guest_uuid).last
  #  @user ||= Workspace.create!(guest_uuid: guest_uuid)
    # ЕСЛИ НЕТ ТО
  #  else
    # Тегировать гостевого пользователя (добавить пользователю идентификатор)
    # Создать вопросы
  #  uuid = SecureRandom.uuid
  #  cookies[:guest_uuid] = uuid

  #  @user = Workspace.create!(guest_uuid: uuid)
  #  end
  #end
end
