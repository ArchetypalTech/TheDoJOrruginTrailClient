

Your pre death checklist:

You will need to pull the submodule containing the cairo code, either:

### TheOrugginTrail-DoJo
`git clone --recurse-submodules git@github.com:ArchetypalTech/TheOrugginTrail-DoJo.git`

or assuming you cloned this without the `--recurse-submodules` flag

`git submodule init && git submodules update`

### 
it's a cairo/starknet/rust project

it uses the Dojo Framework so you'll need a working install of that tooling.

the best way to do this is using `asdf`
[asdf getting started](https://asdf-vm.com/guide/getting-started.html)

install the dojo stuff you need using asdf [dojo asdf](https://book.dojoengine.org/getting-started#install-using-asdf)
that should give you the dojo-plugin.

now install dojo, ND you need the dojo-plugin installed by the above link for this to work.
```shell
asdf install dojo 0.7.2
```

you also need `scarb`
```shell 
asdf install scarb 2.5.4 
```

you should now have the right versions of the tools installed and you can check by running

```shell
asdf current
```

at the root of the repo.

you should see:
```shell
dojo    0.7.2   some/path/...
scarb   2.5.4   some/path/...
```

it will also say no version set for starknet-foundry but this seems not to matter.

now prepare to die from __fun__!


### running locally for test

from the root of the project `pnpm deploy:local`

if you want to monitor the backgrounded processes use `mprocs`

so from the output of the above command look for the 2 l_path's and then:

`mprocs "tail -f <l_pathForKatana>" "tail -f <l_pathForTorii>"` that will tail both logs into your terminal.

Then call the output contract


``` shell 
sozo execute --manifest-path ./tot-dojo/Scarb.toml the_oruggin_trail::systems::outputter::outputter updateOutput --calldata str:"foo"
```

__NOTE__ if you are running in the root then you will need the `--manifest-path` 
