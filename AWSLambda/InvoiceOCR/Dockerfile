FROM amazonlinux:2018.03.0.20200318.1

ENV LEPTONICA_VERSION="1.75.1"


#Poppler dependancies
RUN yum install -y locate \
                       libopenjp2-7 \
                       poppler-utils


RUN rm -rf /poppler_binaries 
RUN mkdir /poppler_binaries
#RUN updatedb
RUN cp -r $(locate libpoppler.so) /poppler_binaries/.
RUN cp $(which pdftoppm) /poppler_binaries/.
RUN cp $(which pdfinfo) /poppler_binaries/.
RUN cp $(which pdftocairo) /poppler_binaries/.
RUN cp $(locate libjpeg.so.8 ) /poppler_binaries/.
RUN cp $(locate libopenjp2.so.7 ) /poppler_binaries/.
RUN cp $(locate libpng16.so.16 ) /poppler_binaries/.
RUN cp $(locate libz.so.1 ) /poppler_binaries/.
RUN cp $(locate libfreetype.so.6 ) /poppler_binaries/.
RUN cp $(locate libfontconfig.so.1 ) /poppler_binaries/.
RUN cp $(locate libnss3.so ) /poppler_binaries/.
RUN cp $(locate libsmime3.so ) /poppler_binaries/.
RUN cp $(locate liblcms2.so.2 ) /poppler_binaries/.
RUN cp $(locate libtiff.so.5 ) /poppler_binaries/.
RUN cp $(locate libexpat.so.1 ) /poppler_binaries/.
RUN cp $(locate libjbig.so.0 ) /poppler_binaries/.



# Install OpenCV
RUN mkdir /opt && cd /opt && \
    wget https://github.com/opencv/opencv/archive/${OPENCV_VERSION}.zip && \
    unzip ${OPENCV_VERSION}.zip && \
    rm -rf ${OPENCV_VERSION}.zip && \
    mkdir -p /opt/opencv-${OPENCV_VERSION}/build && \
    cd /opt/opencv-${OPENCV_VERSION}/build && \
    cmake \
    -D CMAKE_BUILD_TYPE=RELEASE \
    -D CMAKE_INSTALL_PREFIX=/usr/local \
    -D WITH_FFMPEG=NO \
    -D WITH_IPP=NO \
    -D WITH_OPENEXR=NO \
    -D WITH_TBB=YES \
    -D BUILD_EXAMPLES=NO \
    -D BUILD_ANDROID_EXAMPLES=NO \
    -D INSTALL_PYTHON_EXAMPLES=NO \
    -D BUILD_DOCS=NO \
    -D BUILD_opencv_python2=NO \
    -D BUILD_opencv_python3=ON \
    -D PYTHON3_EXECUTABLE=/usr/local/bin/python \
    -D PYTHON3_INCLUDE_DIR=/usr/local/include/python3.6m/ \
    -D PYTHON3_LIBRARY=/usr/local/lib/libpython3.so \
    -D PYTHON_LIBRARY=/usr/local/lib/libpython3.so \
    -D PYTHON3_PACKAGES_PATH=/usr/local/lib/python3.6/site-packages/ \
    -D PYTHON3_NUMPY_INCLUDE_DIRS=/usr/local/lib/python3.6/site-packages/numpy/core/include/ \
    .. && \
    make VERBOSE=1 && \
    make -j${CPUCOUNT} && \
    make install && \
    rm -rf /opt/opencv-${OPENCV_VERSION} && \
    ln -s /usr/local/lib/python3.6/site-packages/cv2.cpython-36m-x86_64-linux-gnu.so /usr/local/lib/python3.6/site-packages/cv2.so



# docker_build leptonica
WORKDIR /tmp/
RUN yum install clang wget zip gzip tar autoconf xz libpng-devel libtiff-devel zlib-devel libwebp-devel libjpeg-turbo-devel make libtool pkgconfig -y
RUN wget https://github.com/DanBloomberg/leptonica/releases/download/$LEPTONICA_VERSION/leptonica-$LEPTONICA_VERSION.tar.gz
RUN tar -xzvf leptonica-$LEPTONICA_VERSION.tar.gz
RUN cd leptonica-$LEPTONICA_VERSION && ./configure && make && make install

RUN wget http://ftpmirror.gnu.org/autoconf-archive/autoconf-archive-2019.01.06.tar.xz
RUN tar -xvf autoconf-archive-2019.01.06.tar.xz
RUN cd autoconf-archive-2019.01.06 && ./configure && make && make install
RUN cd autoconf-archive-2019.01.06 && cp m4/* /usr/share/aclocal/

COPY build_tesseract.sh /tmp/build_tesseract.sh
RUN chmod +x /tmp/build_tesseract.sh
CMD sh /tmp/build_tesseract.sh