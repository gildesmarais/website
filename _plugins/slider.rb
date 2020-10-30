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
    attr_reader :context, :html

    SLIDER = <<~SLIDER
      <div class="glide">
          <div data-glide-el="track" class="glide__track" aria-roledescription="slide">
            <ul class="glide__slides">%<images>s</ul>
          </div>
          %<arrows>s
          %<bullets>s
        </div>
    SLIDER

    ARROWS = '<div class="glide__arrows" data-glide-el="controls">
              <button class="glide__arrow glide__arrow--left" data-glide-dir="<" aria-label="prev">
              </button>
              <button class="glide__arrow glide__arrow--right" data-glide-dir=">" aria-label="next">
              </button>
            </div>'

    SLIDE = '<li class="glide__slide" aria-roledescription="slide"><div>%<image>s</div></li>'

    def render(context)
      @context = context
      @html = converter.convert(super(context))
      context.environments.first['page']['slider'] = true

      format(SLIDER, images: images.join, arrows: ARROWS, bullets: bullets(images.size))
    end

    def converter
      @converter ||= context.registers[:site].find_converter_instance(Jekyll::Converters::Markdown)
    end

    def images
      # render the markdown inside the block
      @images ||= Nokogiri::HTML.fragment(html).css('img').to_a
                                .then do |images|
        images.map! do |image|
          image['role'] = :presentation if !image['alt'] && !image['role']

          format(SLIDE, image: image)
        end
      end
    end

    def bullets(count)
      bullets = Array.new(count).each_with_index.map do |_, i|
        "<button class=\"glide__bullet\" data-glide-dir=\"=#{i}\"></button>"
      end

      "<div class=\"glide__bullets\" data-glide-el=\"controls[nav]\">#{bullets.join}</div>"
    end
  end
end

Liquid::Template.register_tag('slider', Jekyll::SliderTag)
