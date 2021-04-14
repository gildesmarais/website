# frozen_string_literal: true

require 'liquid'
require 'digest'
require 'digest/sha1'

##
# holder for some liquid filter
module Helpers
  def sha256(string)
    Digest::SHA2.hexdigest string
  end

  def squish(string)
    string.split.join(' ')
  end

  def beginning_with_letters(collection, _chars)
    # TODO: implement
    collection
  end
end

Liquid::Template.register_filter(Helpers)
