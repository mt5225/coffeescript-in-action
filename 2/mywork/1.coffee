{print} = require 'sys'
text = """ You may have read "10 Scala One Liners to Impress Your Friends" at Marcus Kazmierczak's blog recently featured on HN. Although I don't know Scala (or Java), it all looks quite nice, so I decided to impress my friends too - folks go from Java to Scala, we go from Javascript to CoffeeScript. Assume node.js as the environment for all examples."""


getNumOfWords = (text) ->
  tempArray = text.split /[\s,]/
  wordArray = (word for word in tempArray when word.length > 3)
  wordArray.length

print getNumOfWords text
