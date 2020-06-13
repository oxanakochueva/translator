class TranslateController < ApplicationController

    def translate
      lang = URI.escape(params[:lang])
      text = URI.escape(params[:text])
      translatedText = URI("https://translate.yandex.net/api/v1.5/tr.json/translate?lang=#{lang}&format=plain&key=trnsl.1.1.20200508T133120Z.e8519251856cc65f.602a81b26bd9eb876a5d3a20d95ffbb5f75de29f&text=#{text}")
      data = Net::HTTP.get(translatedText)

      render json: {text: JSON.parse(data)['text']}

    end

    def dictionary
      lang = URI.escape(params[:lang])
      text = URI.escape(params[:text])
      meaning = URI("https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=dict.1.1.20200508T133259Z.caceaf2b72d10b77.d2b562cf58b2a6c31512cbe478e09b02daf6d741&lang=#{lang}&text=#{text}")

      data = Net::HTTP.get(meaning)
      translations = []
      synonims = []
      meaning = []
      partOfSpeech =[]
      test = []

      fls = []
      texts = []
      tss = []

      puts JSON.parse(data)['def']
      test.push(JSON.parse(data)['def'])



      JSON.parse(data)['def'].each_with_index do |df, i|
        if df['pos']
         poss = Array.new
         poss.push(df['pos'])
        end

        if df['fl']
          fl = Array.new
          fl.push(df['fl'])
        end

        if df['text']
          text = Array.new
          text.push(df['text'])
        end
        if df['ts']
          ts = Array.new
          ts.push('[', df['ts'], ']')
        end


        df['tr'].each_with_index do |tr, i|

            translations.push(tr['text'])
            if tr['syn']
              syns = Array.new
              tr['syn'].each_with_index do |syn,i|

                  syns.push(syn['text'])
              end
            end

            if tr['mean']
              means = Array.new
              tr['mean'].each do |mean|
                  means.push(mean['text'])
              end
            end

            synonims.push(syns)
            meaning.push(means)

        end
        partOfSpeech.push(poss)
        fls.push(fl)
        texts.push(text)
        tss.push(ts)
      end

      puts translations
      puts synonims
        json = {
          translations: translations,
          synonims: synonims,
          meaning: meaning,
          test: test,
          partOfSpeech: partOfSpeech,
          fls: fls,
          texts: texts,
          tss: tss
        }

        render json: json




  end
end
