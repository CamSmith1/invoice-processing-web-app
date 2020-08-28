
# [START functions_imagemagick_setup]
import os
import tempfile

from google.cloud import storage, vision
from wand.image import Image as wi


storage_client = storage.Client()
vision_client = vision.ImageAnnotatorClient()
# [END functions_imagemagick_setup]


# [START functions_imagemagick_analyze]
# Blurs uploaded images that are flagged as Adult or Violence.
def ConvertPDFToImage(data, context):
    file_data = data

    file_name = file_data['name']
    bucket_name = file_data['bucket']

    blob = storage_client.bucket(bucket_name).get_blob(file_name)
    blob_uri = f'gs://{bucket_name}/{file_name}'
    blob_source = {'source': {'image_uri': blob_uri}}




# [END functions_imagemagick_analyze]


