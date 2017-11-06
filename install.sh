#/bin/bash

# clone the source into ./v3 and install dependencies
git clone https://github.com/mathjax/mathjax-v3.git v3
cd ./v3
npm install
git checkout package.json

# create separate branch
git checkout -b pkra-mj3-demos

# merge latest HTML output branch
# NOTE subject to change
git merge -m 'merge html output' origin/stretchy-cells
# merge latest TeX input  branch
# NOTE subject to change
git merge -m 'merge TeX input' origin/tex_input_typescript

# complile v3 source
npx tsc

# return and run webpack
cd ..
npx webpack
