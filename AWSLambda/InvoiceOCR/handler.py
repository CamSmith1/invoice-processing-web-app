import base64
from chalice import Chalice, Response
from io import BytesIO
import json
import pytesseract
from PIL import Image
from base64 import b64decode
import os
import secrets 
import pdf2image
import glob
import cv2
#import ghostscript

app = Chalice(app_name='pdf2image')

pytesseract.pytesseract.tesseract_cmd = r'C:\Users\cameron.smith.dav\AppData\Local\Programs\Tesseract-OCR\tesseract.exe'
poppler_path = r"C:\Users\cameron.smith.dav\Documents\GitHub\invoice-processing-web-app\AWSLambda\InvoiceOCR\poppler-20.11.0\bin"

def ocr(event, context):

    request_body = json.loads(event['body'])
    #image = io.BytesIO(base64.b64decode(request_body['image']))
    #text = request_body['template']
    
    template = request_body['template']
    pdfFilesArray = request_body['pdffiles']
    labelsArray = template['labels']

    #Make a temporary folder to store the pdf when they are converted from base64, delete the directory after execition for cleanup
    tempFolderName = secrets.token_hex(nbytes=16)
    os.makedirs(tempFolderName)

    allExtractedInvoiceData = [] #Array to store all the extracted data from all invoices
    
    #Loop over each base64 format file and perform OCR
    #When the pdf is converted correctly to image format do stuff
    for file in pdfFilesArray['files']:
       
        #note in production replace b64 value with file['base64']
        b64 = file['base64']
        bytes = b64decode(b64, validate=True)
        if bytes[0:4] != b'%PDF':
            raise ValueError('Missing the PDF file signature')


        filename = tempFolderName +"/{}.jpg".format(secrets.token_hex(nbytes=16)) #Generate a random temp name for the pdf before its saved to file
        image = pdf2image.convert_from_bytes(bytes)
        f = open(filename, 'wb')
        f.write(image)
        f.close() 

#Code below iterates over all the invoices that have been converted to jpg and dumps into tempFolderName directory
    images = glob.glob(tempFolderName + "/*.jpg") #Get a collection of all files in the temp folder
    for img in images:
        extractedFileDate = {} #A dict that will store all the data extracted from 1 file
        with open(img,'rb') as file:
            invoice = Image.open(file) #Invoice variable is the individual invoice we are working with
            invoice = image.resize((1653,2339),Image.ANTIALIAS) # TODO figure out the dimensions of the image
            cv2img = cv2.imread(invoice) #read the invoice in cv2 this might not work

            for label in labelsArray:
                x = label['x']
                y = label['y']
                w = label['width']
                h = label['height']
                lblName = label['label']

                crop_img = cv2img[y:y+h, x:x+w]
                gray = cv2.cvtColor(crop_img, cv2.COLOR_BGR2GRAY)

                #create a temp file from the extracted region
                filename = "{}.jpg".format(os.getpid())
                cv2.imwrite(filename, gray)

                #extracted text from the specified region
                extractedText = pytesseract.image_to_string(Image.open(filename))
                extractedFileDate[lblName] = extractedText #Let the extracted next into the dict
            #Take all the data extracted from a single invoice and insert it as a record to allExtractedInvoiceData array
        allExtractedInvoiceData.append(extractedFileDate)

    #Outside of all the loops
    #sets the output to extracted data array
    output = allExtractedInvoiceData



    body = {
        "text": output
    }

    response = {
        "statusCode": 200,
        "body": json.dumps(body)
    }

    return response
    
    
    
    
    #TODOS
    #Update the JSON to include a list of URLS for the uploaded images and or PDF's
    
    #The format of the json input below
		
# {
    # \"template\": {
        # \"labels\": [
            # {\"id\":\"0\", \"label\": \"accountnumber\", \"height\": \"24\", \"width\":\"133\", \"x\":\"966\", \"y\":\"141\"},
            # {\"id\":\"1\", \"label\": \"invoicedate\", \"height\": \"34\", \"width\":\"163\", \"x\":\"961\", \"y\":\"211\"},
            # {\"id\":\"2\", \"label\": \"total\", \"height\": \"24\", \"width\":\"133\", \"x\":\"966\", \"y\":\"141\"}
        # ]
    # },
	# \"pdffiles\": {
		# \"files\":[
			# {\"base64\": \"12345\"},
			# {\"base64\": \"22222\"},
			# {\"base64\": \"55555\"}
		# ]
	# }
# }		
   
   
   
   #Note you can test this function by running the command
   
   # serverless invoke local -f ocr -p lambda_event.json
   
   #Tutorial link here: https://typless.com/tesseract-on-aws-lambda-ocr-as-a-service/