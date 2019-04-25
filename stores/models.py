from django.db import models

class Store(models.Model):
    store_name = models.CharField(max_length=200)
    location = models.CharField(max_length=500)

    def __str__(self):
        return (self.store_name)
        
    def get_name(self):
        '''Returns a string of the store name'''
        return self.store_name
        
    def get_location(self):
        '''Returns a string of the store's location'''
        return self.location

