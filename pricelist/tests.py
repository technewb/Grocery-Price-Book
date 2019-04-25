from django.test import TestCase
from .models import Food, Category, Store

class FoodModelTests(TestCase):

    def test_name_return_string(self):
        '''Return string of food name'''
        food_name = Food(food_name='Beans')
        self.assertIs(food_name.get_name(), 'Beans')

class CategoryModelTests(TestCase):

    def test_name_return_string(self):
        '''Return string of category name'''
        category_name = Category(name='Produce')
        self.assertIs(category_name.get_name(), 'Produce')

class StoreModelTests(TestCase):

    def test_store_name_return_string(self):
        '''get_name() returns string of store name from database'''
        store_name = Store(store_name='Kroger')
        self.assertIs(store_name.get_name(), 'Kroger')
    
    def test_location_return_string(self):
        '''get_location() returns string of store location from database'''
        store_name = Store(location='Marietta, GA 30064')
        self.assertIs(store_name.get_location(), 'Marietta, GA 30064')