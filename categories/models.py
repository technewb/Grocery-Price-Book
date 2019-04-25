from django.db import models

class Category(models.Model):
    name = models.CharField(max_length="200")

    def __str__(self):
        return self.name
    
    def get_name(self):
        '''Return string of category name'''
        return self.name
