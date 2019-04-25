from django.test import TestCase

from .models import Store

class StoreModelTests(TestCase):

    def test_store_name_return_string(self):
        store_name = Store(store_name="Kroger")
        self.assertIs(store_name.get_name(), "Kroger")
    
    def test_location_return_string(self):
        store_name = Store(location="Dallas Hwy, Marietta, GA 30064")
        self.assertIs(store_name.get_location(), "Dallas Hwy, Marietta, GA 30064")
