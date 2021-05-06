# frozen_string_literal: true

module Jekyll
  ##
  # Usage:
  #
  # {% back_link %}{{ '/blog/' | relative_url }}{% endback_link %}
  class BackLinkBlock < Liquid::Block
    def render(context)
      text = super

      <<~HTML.strip
        <a class="back-link" href="#{text}">
          &#8249; back to the overview
        </a>
      HTML
    end
  end
end

Liquid::Template.register_tag('back_link', Jekyll::BackLinkBlock)
