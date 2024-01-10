# frozen_string_literal: true

require 'terser'

##
# Provides helper methods to subclasses.
class OptimizableStaticFile < Jekyll::StaticFile
  def input
    File.read(path).force_encoding('UTF-8')
  end

  def copy_file(dest_path)
    File.open(dest_path, 'w') { |file| file.write(output) }
  end

  def output
    raise 'must be implemented in subclass'
  end
end

##
# Optimizes/minimizes JS files with Terser.
class JavaScriptFile < OptimizableStaticFile
  def output
    Terser.compile input
  end
end

Jekyll::Hooks.register :site, :post_render do |site|
  site.static_files.map! do |file|
    case file.extname
    when '.js'
      JavaScriptFile.new(site, site.source, file.destination_rel_dir, file.name)
    else
      file
    end
  end
end
