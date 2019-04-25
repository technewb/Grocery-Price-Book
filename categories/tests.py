from django.test import TestCase
from .models import Category

class CategoryModelTests(TestCase):

    def test_name_return_string(self):
        '''Return string of category name'''
        category_name = Category(name='Produce')
        self.assertIs(category_name.get_name(), 'Produce')
