
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
def pdfToImage(data, context):
    file_data = data

    file_name = file_data['name']
    bucket_name = file_data['bucket']

    blob = storage_client.bucket(bucket_name).get_blob(file_name)
    blob_uri = f'gs://{bucket_name}/{file_name}'
    blob_source = {'source': {'image_uri': blob_uri}}


    #convertAndSave(blob)
    #return url of new file
    # Ignore already-blurred files

# [END functions_imagemagick_analyze]


# [START functions_imagemagick_blur]
# Blurs the given file using ImageMagick.
def convertAndSave(current_blob):
    file_name = current_blob.name
    _, temp_local_filename = tempfile.mkstemp()

    # Download file from bucket.
    current_blob.download_to_filename(temp_local_filename)
    print(f'Image {file_name} was downloaded to {temp_local_filename}.')

    # Blur the image using ImageMagick.
    with wi(filename=temp_local_filename) as image:
        image.convert('PNG')
        image.save(filename=temp_local_filename)

    print(f'Image {file_name} was converted to PNG.')

    blur_bucket_name = 'processed-canvas-images'
    blur_bucket = storage_client.bucket(blur_bucket_name)
    new_blob = blur_bucket.blob(file_name)
    new_blob.upload_from_filename(temp_local_filename)

    print(f'Blurred image uploaded to: gs://{blur_bucket_name}/{file_name}')

    # Delete the temporary file.
    os.remove(temp_local_filename)
# [END functions_imagemagick_blur]
