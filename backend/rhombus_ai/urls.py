from django.urls import path
from .views import FileUploadAPI

urlpatterns = [
    path('upload/', FileUploadAPI.as_view(), name='file-upload'),
]