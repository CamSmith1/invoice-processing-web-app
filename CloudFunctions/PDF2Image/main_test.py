

from collections import UserDict
import uuid

from mock import MagicMock, patch

import main


@patch('main.__blur_image')
@patch('main.vision_client')
@patch('main.storage_client')
def test_process_offensive_image(
  storage_client,
  vision_client,
  __blur_image,
  capsys):
    result = UserDict()
    result.safe_search_annotation = UserDict()
    result.safe_search_annotation.adult = 5
    result.safe_search_annotation.violence = 5
    vision_client.safe_search_detection = MagicMock(return_value=result)

    filename = str(uuid.uuid4())
    data = {
      'bucket': 'my-bucket',
      'name': filename
    }

    main.blur_offensive_images(data, None)

    out, _ = capsys.readouterr()
    assert 'Analyzing %s.' % filename in out
    assert 'The image %s was detected as inappropriate.' % filename in out
    assert main.__blur_image.called


@patch('main.__blur_image')
@patch('main.vision_client')
@patch('main.storage_client')
def test_process_safe_image(
  storage_client,
  vision_client,
  __blur_image,
  capsys):
    result = UserDict()
    result.safe_search_annotation = UserDict()
    result.safe_search_annotation.adult = 1
    result.safe_search_annotation.violence = 1
    vision_client.safe_search_detection = MagicMock(return_value=result)

    filename = str(uuid.uuid4())
    data = {
      'bucket': 'my-bucket',
      'name': filename
    }

    main.blur_offensive_images(data, None)

    out, _ = capsys.readouterr()

    assert 'Analyzing %s.' % filename in out
    assert 'The image %s was detected as OK.' % filename in out
    assert __blur_image.called is False


@patch('main.os')
@patch('main.Image')
@patch('main.storage_client')
def test_blur_image(storage_client, image_mock, os_mock, capsys):
    filename = str(uuid.uuid4())
    blur_bucket = 'blurred-bucket-' + str(uuid.uuid4())

    os_mock.remove = MagicMock()
    os_mock.path = MagicMock()
    os_mock.path.basename = MagicMock(side_effect=(lambda x: x))

    os_mock.getenv = MagicMock(return_value=blur_bucket)

    image_mock.return_value = image_mock
    image_mock.__enter__.return_value = image_mock

    blob = UserDict()
    blob.name = filename
    blob.bucket = UserDict()
    blob.download_to_filename = MagicMock()
    blob.upload_from_filename = MagicMock()

    main.__blur_image(blob)

    out, _ = capsys.readouterr()

    assert f'Image {filename} was downloaded to' in out
    assert f'Image {filename} was blurred.' in out
    assert f'Blurred image uploaded to: gs://{blur_bucket}/{filename}' in out
    assert os_mock.remove.called
    assert image_mock.resize.called
