{
  const {Group, Garbage, Bang} = require('../../../../day9classes')
}
start
  = g:(garbage/ group) "\n"? { return g }

garbage
  = "<" things:garbageText* ">" { return new Garbage(things) }

garbageText
  = unescapedGarbage
  / bang

unescapedGarbage
  = $ [^>\!]+

bang
  = "!" char:. { return new Bang(char) }

group
  = "{" things:(thing commaThing*)?  "}" { return new Group(things) }

commaThing
  = "," t:thing { return t }

thing
  = group
  / garbage

