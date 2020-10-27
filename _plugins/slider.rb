# frozen_string_literal: true

module Jekyll
  ##
  # Usage:
  #
  # {% slider %}
  # <img src="/assets/images/posts/2020-05-12_IMG_1324.jpeg">
  # ![alt text](/image/file.png)
  # {% endslider %}
  class SliderTag < Liquid::Block
    ARROWS = '<div class="glide__arrows" data-glide-el="controls">
              <button class="glide__arrow glide__arrow--left" data-glide-dir="<" aria-label="prev">
              </button>
              <button class="glide__arrow glide__arrow--right" data-glide-dir=">" aria-label="next">
              </button>
            </div>'

    def render(context)
      context.environments.first['page']['slider'] = true

      #  call the default markdown renderer
      converter = context.registers[:site].find_converter_instance(Jekyll::Converters::Markdown)

      # render the markdown inside the block
      images = Nokogiri::HTML.fragment(converter.convert(super(context))).css('img').to_a
      images.map! { |image| "<li class=\"glide__slide\"><div>#{image.to_html}</div></li>" }

      <<~SLIDER
        <div class="glide">
          <div data-glide-el="track" class="glide__track">
            <ul class="glide__slides">#{images.join}</ul>
          </div>
          #{ARROWS}
          #{bullets(images.size)}
        </div>
      SLIDER
    end

    def bullets(count)
      bullets = Array.new(count).each_with_index.map do |_, i|
        "<button class=\"glide__bullet\" data-glide-dir=\"=#{i}\"></button>"
      end

      '<div class="glide__bullets" data-glide-el="controls[nav]">' + bullets.join + '</div>'
    end
  end
end

Liquid::Template.register_tag('slider', Jekyll::SliderTag)
