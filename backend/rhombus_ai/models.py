from django.db import models

'''
Temporary data model

file_name: String
data_blob: Binary file
uploaded_at: DateTime
'''
class TemporaryData(models.Model):
    file_name = models.CharField(max_length=255)  
    data_blob = models.BinaryField()  
    uploaded_at = models.DateTimeField(auto_now_add=True) 