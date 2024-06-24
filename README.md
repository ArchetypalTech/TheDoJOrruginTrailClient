# TheOrugginTrail
A MUD (and eventually also Dojo, World Engine, and who-knows) based Zork-like experiment in fully onchain text adventures, onchain games framework interoperability, and the engines that drive them.
What lies ahead, is anyone's guess...

![ad_2_final](https://github.com/ArchetypalTech/TheOrugginTrail/assets/983878/b90bcc55-2ba1-4564-94e1-d08184c1e49c)



This project is a test-case for taking a zork-like text adventure engine and reimagining it in onchain gaming engines and frameworks like MUD, Dojo, and World Engine... and from there seeing if interesting interoperability between the engines can be connected and experimented with. This will also give an opportunity to see if any of the differences and affordances between frameworks and onchain game engines generate varied or new gameplay paradigms and directions.

We are porting / reinterpreting the MIT Zork design and architecture for text adventure engines onchain, this model eventually became the base for Infocom games and such favoured classics as Commodore64's The Hitchikers Guide To The Galaxy, one of the most ambitious and complex text adventures ever made. To get a primer and learn more about the engine and explore it's history and and the engineering principles under the hood please read these resources:

https://mud.co.uk/richard/zork.htm

https://github.com/MITDDC/zork

https://medium.com/swlh/zork-the-great-inner-workings-b68012952bdc

This Zork-like engine will be piloted by a text adventure called the O'ruggin Trail.

WARNING: attempting a crossing to the frontiers of crypto country ultimately always results in horrible death... physical, moral, ego, or otherwise.

Your pre death checklist:

You will need to pull the submodule containing the cairo code, either:

### TheOrugginTrail-DoJo
`git clone --recurse-submodules git@github.com:ArchetypalTech/TheOrugginTrail-DoJo.git`

or assuming you cloned this without the `--recurse-submodules` flag

`git submodule init && git submodules update`

### 
it's a cairo/starknet/rust project

it uses the Dojo Frameowrk so you'll need a working ll of that tooling.

the best way to do this is using `asdf`
[asdf getting started](https://asdf-vm.com/guide/getting-started.html)



now prepare to die from __fun__!
