#!/bin/bash

case $1 in
    compose)
        echo "Copying resources"
        rsync -av ./build/ ./extension --exclude manifest.json
        mkdir ./extension/icons
        cp ./src/logo.svg ./extension/icons/
        echo "Generating icons"
        cd ./extension/icons
        convert -resize 48x48 logo.svg logo48.png
        convert -resize 96x96 logo.svg logo96.png
        ;;
    clean)
        rm extension.xpi
        cd ./extension
        echo "Cleaning extension"
        find . -type f -not -name "manifest.json" -not -name "launcher.js" -print0 | xargs -0 rm --
        rmdir static/*
        rmdir static
        rm icons/*
        rmdir icons
        ;;
    package)
    cd ./extension
    echo "Zipping"
    zip -r -FS extension.zip .
    mv extension.zip ../extension.xpi
esac