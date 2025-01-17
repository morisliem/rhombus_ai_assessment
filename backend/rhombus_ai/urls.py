from django.urls import path
from .views import PatternMatchingAPI

urlpatterns = [
    path('pattern-matching', PatternMatchingAPI.as_view(), name='pattern-matching'),
]