from django.test import TestCase

from .models import Store

class StoreModelTests(TestCase):

    def test_store_name_return_string(self):
        '''get_name() returns string of store name from database'''
        store_name = Store(store_name="Kroger")
        self.assertIs(store_name.get_name(), "Kroger")
    
    def test_location_return_string(self):
        '''get_location() returns string of store location from database'''
        store_name = Store(location="Marietta, GA 30064")
        self.assertIs(store_name.get_location(), "Marietta, GA 30064")
