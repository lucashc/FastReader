icons: src/logo.svg
	mkdir -p build/icons
	convert -resize 48x48 src/logo.svg build/icons/logo48.png
	convert -resize 96x96 src/logo.svg build/icons/logo96.png

build: icons
	mkdir -p build
	cp -R ./src/* ./build

package: build
	cd build && zip -r ../extension.zip . && cd ..
	mv extension.zip extension.xpi

clean:
	rm -R ./build/*
	rm extension.xpi
