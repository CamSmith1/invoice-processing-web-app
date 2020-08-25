import cv2
import os
import pytesseract
from PIL import Image


# Taking the 4 coordinates from the webapp we can extract data from 1 region
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files (x86)\Tesseract-OCR\tesseract.exe'
img = cv2.imread("assets/waterimg.jpg")

# coords from web app
x, y, h, w = 101, 224, 156, 516

# Crop image and convert to gray scale for OCR
crop_img = img[y:y+h, x:x+w]
gray = cv2.cvtColor(crop_img, cv2.COLOR_BGR2GRAY)

# Create a temp file from the extracted region
filename = "{}.jpg".format(os.getpid())
cv2.imwrite(filename, gray)

#Extract text and delete temp file
text = pytesseract.image_to_string(Image.open(filename))
os.remove(filename)
print(text)



