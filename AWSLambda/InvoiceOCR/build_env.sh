# system libs
sudo yum -y update
sudo yum -y upgrade
sudo yum -y groupinstall "Development Tools"

# tesseract / leptonica / pillow dependencies
sudo yum -y install gcc gcc-c++ make autoconf aclocal automake libtool \
                    libjpeg-devel libpng-devel libtiff-devel zlib-devel \
                    libzip-devel freetype-devel lcms2-devel libwebp-devel \
                    tcl-devel tk-devel

# install leptonica
cd ~
mkdir leptonica
cd leptonica
wget http://www.leptonica.org/source/leptonica-1.74.1.tar.gz
tar -zxvf leptonica-*.tar.gz
cd leptonica-*
./configure
make
sudo make install

# install tesseract
cd ~
git clone --branch 4.00.00alpha https://github.com/tesseract-ocr/tesseract.git
cd tesseract
./autogen.sh
./configure --enable-debug
LDFLAGS="-L/usr/local/lib" CFLAGS="-I/usr/local/include" make
sudo make install

# create a python virtual env
virtualenv ~/tfenv
source ~/tfenv/bin/activate

# Install pillow
pip install pillow

# Install cython
pip install cython

# Install tesserocr
pip install tesserocr

# prepare the zip package
cd ~
mkdir lambda-tesseract
cd lambda-tesseract
cp /usr/local/bin/tesseract .
mkdir lib
cp /usr/local/lib/libtesseract.so.4 lib/
cp /usr/local/lib/liblept.so.5 lib/
cp /lib64/librt.so.1 lib/
cp /lib64/libz.so.1 lib/
cp /usr/lib64/libpng12.so.0 lib/
cp /usr/lib64/libjpeg.so.62 lib/
cp /usr/lib64/libtiff.so.5 lib/
cp /lib64/libpthread.so.0 lib/
cp /usr/lib64/libstdc++.so.6 lib/
cp /lib64/libm.so.6 lib/
cp /lib64/libgcc_s.so.1 lib/
cp /lib64/libc.so.6 lib/
cp /lib64/ld-linux-x86-64.so.2 lib/
cp /usr/lib64/libjbig.so.2.0 lib/
cp -r ~/tesseract/tessdata/ tessdata
cp -r ~/tfenv/lib/python2.7/site-packages/* .
cp -r ~/tfenv/lib64/python2.7/site-packages/* .

mkdir tessdata
wget https://github.com/tesseract-ocr/tessdata/raw/master/eng.traineddata -O tessdata/eng.traineddata