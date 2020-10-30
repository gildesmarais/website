# frozen_string_literal: true

module Jekyll
  ##
  # adds a cachebuster
  class CacheBuster < Liquid::Tag
    def render(context)
      @render ||= context['site']['time'].to_i.to_s(33)
    end
  end
end

Liquid::Template.register_tag('cachebuster', Jekyll::CacheBuster)
