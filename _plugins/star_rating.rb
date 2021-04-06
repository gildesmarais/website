# frozen_string_literal: true

##
# Displays the rating as a series of stars
#
# Source:
# https://github.com/lawrencewoodman/star_rating-liquid_filter/blob/master/_plugins/star_rating.filter.rb
module StarRating
  # Location of the star images from root of website
  STAR_IMAGESLOC = '/assets/images'

  # The format of the img tag used by % method
  STAR_IMAGETAG = "<img src=\"#{STAR_IMAGESLOC}/%s\" alt=\"%s\" />"

  # rubocop:disable Metrics/AbcSize
  # rubocop:disable Metrics/MethodLength
  def star_rating(rating, max: 5, divide_by: 2.0)
    rating = rating.to_f / divide_by

    whole_stars = rating.floor
    whole_stars += 1 if rating - whole_stars > 0.5

    # rubocop:disable Lint/FloatComparison
    half_star = (rating - whole_stars == 0.5 ? 1 : 0)
    # rubocop:enable Lint/FloatComparison
    clear_stars = max - (whole_stars + half_star)

    rating_alt_text = format("%.1f/#{max.to_f}", rating)

    html_output = ''
    whole_stars.times do
      html_output += format(STAR_IMAGETAG, 'star_filled.png', rating_alt_text)
    end

    html_output += format(STAR_IMAGETAG, 'star_half.png', rating_alt_text) if half_star == 1

    clear_stars.times do
      html_output += format(STAR_IMAGETAG, 'star_clear.png', rating_alt_text)
    end

    html_output
  end
  # rubocop:enable Metrics/AbcSize
  # rubocop:enable Metrics/MethodLength
end

Liquid::Template.register_filter(StarRating)
