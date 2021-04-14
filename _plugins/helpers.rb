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

  def beginning_with(collection, field, chars)
    chars = [chars] unless chars.is_a?(Array)

    collection.select do |obj|
      if (field_value = obj[field])
        field_value.to_s.start_with?(*chars)
      else
        false
      end
    end
  end
end

Liquid::Template.register_filter(Helpers)
