class TranslateController < ApplicationController

    def translate
    lang = URI.escape(params[:lang])
    text = URI.escape(params[:text])
    translatedText = URI.escape(params[:translatedText])
    uri = URI("https://translate.yandex.net/api/v1.5/tr.json/translate/?key=trnsl.1.1.20200508T133120Z.e8519251856cc65f.602a81b26bd9eb876a5d3a20d95ffbb5f75de29f&text=#{text}&lang=#{lang}")
    data = Net::HTTP.get(uri)

    render json: translatedText
  end
end
