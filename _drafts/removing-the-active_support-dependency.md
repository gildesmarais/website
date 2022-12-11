Recently, [a post by solnic raised quite some attention](https://solnic.codes/2022/02/02/rails-and-its-ruby-dialect/). The post is about active support (AS) enabling a "ruby dialect" to be spoken.

While having AS makes Ruby really nice to write, and more important to read, (e.g. `1.hour.ago` returns an instance of Time) it relies on ~~Guerrilla~~, ~~gorilla~~ [monkey patching](https://en.wikipedia.org/wiki/Monkey_patch#References).
I, and many others, see monkey patching as [code smell](https://en.wikipedia.org/wiki/Code_smell).

A while ago I created [a little gem](https://github.com/html2rss) and applications which helps me to create RSS feeds for websites which do not have one.
Likely I added AS to the deps without giving it so much of a thought. I mostly worked on Ruby on Rails applications at that time. I spoke and speak that Ruby dialect fluently. I probably thought: I can write this nice `1.hour.ago` code. Nothing wrong with it - It's a well established and maintained gem, right? Riiiight?

The aforementioned blog post now drawed my attention back the topic. And thus I remember and eventually thought ... okay, why not remove the dependency?

# Getting started

With [ripgrep](https://github.com/BurntSushi/ripgrep) I went to find the files which require AS and removed the require statements (`rg active_support`) one by one. After each removal, ran my test suite and tackled the failing tests.
Here's what I encountered along the way and how it's fixable.

# `#to_xml` on Hash & Array

Unexpectedly hard to find a suitable alternative...

In the end wrote a naive solution myself, because is sufficent for my use case to lose type information, meaning the output where everything is a String in the xml is fine.

The result is a method, which takes an object and basically does this recursivly:

- if it responds_to #each_pair I assume it quacks like a Hash and build <key>value</key>
- if it responds_to #each I assume it quacks like an Array
- else I rely on `to_s` to represent the data

However, this will not work if you need to keep the types. In such case, you could resort using a gem, e.g.

- gyoku
- simple-xml

Or pick another one: ruby libhunt xml shows a bunch of potential gems, however labels them as inactive. That label doesn't have to say the gem isn't usable, but assess each your self.

# Time (in zones)

Whew, been lucky there: no complex time calculations are needed. Just parsing a time from a string within a given time zone.

`Time.in_zone('Europe/Berlin') { work_hard_play_hard }`

We can get it done even without the `tzinfo` gem and this implementation:

```ruby
def in_zone(time_zone = "Europe/Berlin")
  prev_tz = ENV['TZ']
  ENV['TZ'] = time_zone
  yield
ensure
  ENV['TZ'] = prev_tz
end
```

# Hash with `indifferent_access`, `deep_symbolize_keys`, `deep_merge`

Dealing with Strings and Symbols in Ruby is so much fun.

I assume, has being consistent with the type of the keys in hashes been the trickiest part.

I think there are two ways to handle this: make sure to just use symbols as keys. And errr... secondly, just keep the flexible behaviour in place and don't care much about the String/Symbol situation.

## Strictly use only symbol keys

When parsing YAML with Psych, tell it to symbolize the names:
`YAML.safe_load(string, symbolize_names: true)``

Same for parsing JSON: `JSON.parse(string, symbolize_names: true)`

When refactoring, as always, having tests helps massively. However, I found some String keys by throwing `byebug if name.is_a?(String)` in some places when testing. When byebug became active, I traced back the String to where it originated and made it use a Symbol there.

If you have a large code base, I'd try to (temporarily) utilize rubocop-performance and its [StringIdentifierArgument](https://docs.rubocop.org/rubocop-performance/cops_performance.html#performancestringidentifierargument) cop. I assume it could help enforcing symbolzied keys and it supports autocorrection. Anyway, this task can become a massive undertaking.

So, maybe the second way involves less effort.

## Use Hashie

You can subclass Hash and include the functionality you need by including the desired modules offered by [Hashie](https://github.com/hashie/hashie).

Example:

```ruby
class Storage < Hash
  include Hashie::Extensions::MergeInitializer
  include Hashie::Extensions::IndifferentAccess
  include Hashie::Extensions::DeepMerge
end
```

`Storage` is a class implementing Hash with "indifferent access" and it has a `deep_merge` method:

```ruby
hash = Storage.new
hash[:foo] = 'bar'
hash['foo'] # => 'bar'

hash.deep_merge(other_hash) # => ... what you'd expect
```

# Convienience methods

Sprinkled in here and there I found some String method calls, e.g. `#titleize` or `#squish` .

Since these operation are quite common, alternative implemention can be found, e.g. in [Hanami::Utils::Kernel::String#titleize](https://docs.hanamirb.org/1.3.3/hanami/utils/string#titleize-class_method). But I did not want to depend on another gem just for two methods and thus went with my "good enough" solutions below.

For `String#squish` it could be `string.split("\n").map { |s| s.gsub(/[[:space:]]+/, " ").strip }.join` .
Although not 100% equal again, but this _titleizes_ well enough for my use case: `string.split.map(&:capitalize).join(' ')`

Note: avoid sprinkling all that code everywhere a String method was called and, instead, create a utility or helper class containing methods whichs contains the code. It's also nicely testable with a unit test.

# Conclusion

Overall, the effort to migrate feels like a good investment. The initial migration of AS did not take too much time, but I was fine with some behavioural changes in my code. That flexibility probably saved me a good amount of time. I did not benchmark the changes, so I can only guess wildly if the changes lead to an increased performance. Guessing wouldn't create reliable data, so I'll leave that out. Performance wasn't driving my motivation.

Another observation was that dependending projects kept started using AS, even when they did not explicitly depended on AS. This can happen when a dependent gem monkey patches core classes, like (not only) AS does. Creepy.

If you think there is no way around using the technique of monkey-patching for your classes or modules, then please be aware of Ruby's [refinements](https://docs.ruby-lang.org/en/3.1/doc/syntax/refinements_rdoc.html). Refinements will limit the scope of the monkey patches from global to local. Meaning your code will not start to creep into your dependent's code and maybe cause problems there. Cool!

Can one say in general: the earlier you migrate away from AS, the less effort you have? I think so.

If you're interested in the code, head to [the issue on Github](https://github.com/html2rss/html2rss/issues/132).
