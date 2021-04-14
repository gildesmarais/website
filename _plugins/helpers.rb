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
    return [] unless chars

    chars = [chars] unless chars.is_a?(Array)
    chars.map!(&:to_s)

    collection.select do |obj|
      if (field_value = obj[field])
        field_value.to_s.start_with?(*chars)
      else
        false
      end
    end
  end

  def flat_map_hash(collection)
    arr = []
    collection.each_pair { |_key, value| arr.append(value) }
    arr.flatten
  end
end

Liquid::Template.register_filter(Helpers)
