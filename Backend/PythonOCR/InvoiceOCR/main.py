import cv2
import os
import pytesseract
from PIL import Image

img = cv2.imread("waterimg.jpg")
x, y, h, w = 101, 224, 156, 516

crop_img = img[y:y+h, x:x+w]
gray = cv2.cvtColor(crop_img, cv2.COLOR_BGR2GRAY)

filename = "{}.jpg".format(os.getpid())
cv2.imwrite(filename, gray)

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files (x86)\Tesseract-OCR\tesseract.exe'

text = pytesseract.image_to_string(Image.open(filename))
os.remove(filename)
print(text)



