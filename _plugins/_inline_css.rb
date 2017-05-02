require 'liquid'
require 'uri'

module InlineCSS
  def inline_file_contents(filename)
    File.open("../#{filename}", 'r').map { |line| line }.join(' ')
  end
end

Liquid::Template.register_filter(InlineCSS)
