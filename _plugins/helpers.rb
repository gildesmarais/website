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
    [].concat(*collection.values)
  end

  def humanize_title_type(string)
    case string
    when 'tvSeries'
      'TV Series'
    when 'tvMiniSeries'
      'TV Mini Series'
    when 'tvEpisode'
      'TV Series Episode'
    else
      string
    end
  end

  def howlize(collection)
    return [] unless collection

    sets = collection.map do |set|
      { title: set['file'], file: set['file'], howl: nil }
    end

    { sets: }
  end
end

Liquid::Template.register_filter(Helpers)
