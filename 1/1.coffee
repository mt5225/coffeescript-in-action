{print} = require 'sys'

square = (x) ->
  x * x
numbers = [1...10]
result = (square x for x in numbers)
print result

add = (x) ->
  x + 5
result = add 6
print result
