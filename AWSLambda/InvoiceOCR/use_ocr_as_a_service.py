import base64

import requests


with open('water1.pdf','rb') as file:
    base64_str = base64.b64encode(file.read()).decode();


response = requests.post(
    'https://80ta11frx9.execute-api.us-east-1.amazonaws.com/dev/ocr',
    json={
    "template": {
        "labels": [
            {"id":"0", "label": "accountnumber", "height": "24", "width":"133", "x":"966", "y":"141"},
            {"id":"1", "label": "invoicedate", "height": "34", "width":"163", "x":"961", "y":"211"},
            {"id":"2", "label": "total", "height": "24", "width":"133", "x":"966", "y":"141"}
        ]
    },
	"pdffiles": {
		"files":[
			{"base64": base64_str}

		]
	}
}		
)

print(response.json())



