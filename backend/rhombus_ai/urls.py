from django.urls import path
from .views import *

urlpatterns = [
    path('pattern-matching', PatternMatchingAPI.as_view(), name='pattern-matching'),
    path('upload', UploadFileAPI.as_view(), name='upload-file'),
    path('get-file', GetUploadFileAPI.as_view(), name='get-file')

]