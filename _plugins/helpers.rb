# frozen_string_literal: true

require 'liquid'
require 'digest'
require 'digest/sha1'

module Helpers
  class CacheBuster < Liquid::Tag
    def render(context)
      context['site']['time'].to_i.to_s(33)
    end
  end

  def sha256(string)
    Digest::SHA2.hexdigest string
  end

  def squish(string)
    string.split.join(' ')
  end
end

Liquid::Template.register_filter(Helpers)
Liquid::Template.register_tag('cachebuster', Helpers::CacheBuster)
