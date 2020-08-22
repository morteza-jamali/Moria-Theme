# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "Moria-Theme"
  spec.version       = "0.1.0"
  spec.authors       = ["Morteza Jamali"]
  spec.email         = ["mortezajamali4241@gmail.com"]

  spec.summary       = "Write a short summary, because Rubygems requires one."
  spec.homepage      = "https://github.com/morteza-jamali/Moria-Theme"
  spec.license       = "Apache"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r!^(assets|_layouts|_includes|_sass|LICENSE|README|_config\.yml)!i) }

  spec.add_runtime_dependency "jekyll", "~> 4.1"
end
