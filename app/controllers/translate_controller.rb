class TranslateController < ApplicationController

    def translate
      lang = URI.escape(params[:lang])
      text = URI.escape(params[:text])
      translatedText = URI("https://translate.yandex.net/api/v1.5/tr.json/translate?lang=#{lang}&key=trnsl.1.1.20200508T133120Z.e8519251856cc65f.602a81b26bd9eb876a5d3a20d95ffbb5f75de29f&text=#{text}")
      data = Net::HTTP.get(translatedText)

    render json: data
  end


end
