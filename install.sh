#/bin/bash

# clone the source into ./v3 and install dependencies
echo "clone mathjax-v3 repository"
git clone --branch alpha https://github.com/mathjax/mathjax-v3.git v3
cd ./v3
npm install

# complile v3 source
echo "compile typescript"
npx tsc

# return and run webpack
cd ..
echo "run webpack"
npx webpack
