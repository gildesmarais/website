# frozen_string_literal: true

require 'liquid'
require 'digest'

module Helpers
  def sha256(string)
    Digest::SHA2.hexdigest string
  end

  def squish(string)
    string.split.join(' ')
  end
end

Liquid::Template.register_filter(Helpers)
