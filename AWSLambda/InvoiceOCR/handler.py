import base64
import io
import json
import pytesseract
from PIL import Image

pytesseract.pytesseract.tesseract_cmd = r'C:\Users\cameron.smith.dav\AppData\Local\Programs\Tesseract-OCR\tesseract.exe'

def ocr(event, context):

    request_body = json.loads(event['body'])
    #image = io.BytesIO(base64.b64decode(request_body['image']))
    #text = request_body['template']
    
    template = request_body['template']
    
    #This loop loops over all the labels within this forloop perform OCR
   # for label in text['labels']:
        
    
    
    #text = pytesseract.image_to_string(Image.open(image))

    body = {
        "text": template
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
   #     \"labels\": [
   #         {\"id\":\"0\", \"label\": \"accountnumber\", \"height\": \"24\", \"width\":\"133\", \"x\":\"966\", \"y\":\"141\"},
   #         {\"id\":\"1\", \"label\": \"invoicedate\", \"height\": \"34\", \"width\":\"163\", \"x\":\"961\", \"y\":\"211\"},
   #         {\"id\":\"2\", \"label\": \"total\", \"height\": \"24\", \"width\":\"133\", \"x\":\"966\", \"y\":\"141\"}
   #     ]
   # }
   #}	
   
   
   
   #Note you can test this function by running the command
   
   # serverless invoke local -f ocr -p lambda_event.json
   
   #Tutorial link here: https://typless.com/tesseract-on-aws-lambda-ocr-as-a-service/