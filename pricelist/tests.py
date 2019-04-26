from django.test import TestCase
from .models import Food, Category, Store, Price, Unit
from datetime import datetime, timedelta

class FoodModelTests(TestCase):

    @classmethod
    def setUpTestData(cls):
        category = Category(name="Canned")
        cls.food = Food(food_name="Beans", category=category)

    def test_name_return_string(self):
        '''get_name() return string of food name'''
        self.assertEqual(self.food.get_name(), 'Beans')

    def test_get_category(self):
        '''get_category() returns string name from Category model connected to food'''
        self.assertEqual(self.food.get_category(), "Canned")

class CategoryModelTests(TestCase):

    @classmethod
    def setUpTestData(cls):
        cls.category = Category(name="Produce")

    def test_name_return_string(self):
        '''Return string of category name'''
        self.assertEqual(self.category.get_name(), 'Produce')

class StoreModelTests(TestCase):

    @classmethod
    def setUpTestData(cls):
        cls.store = Store(store_name='Kroger', location='Marietta, GA 30064')

    def test_store_name_return_string(self):
        '''get_name() returns string of store name from database'''
        self.assertEqual(self.store.get_name(), 'Kroger')
    
    def test_location_return_string(self):
        '''get_location() returns string of store location from database'''
        self.assertEqual(self.store.get_location(), 'Marietta, GA 30064')

class PriceModelTests(TestCase):
    
    @classmethod
    def setUpTestData(cls):
        category = Category(name='Dairy')
        store = Store(store_name='ALDI', location='Kennesaw, GA 30152')
        food = Food(food_name='Cheddar Cheese', category=category)
        unit = Unit(unit='lb')
        cls.item_price = Price(store=store, food=food, brand='Fresh Farms', price=1.50, on_sale=False,
                           date=datetime.now(), expiration_date=datetime.now() - timedelta(1),
                           unit=unit, amount=2)

    def test_get_store(self):
        '''get_store() returns string of price items's store from Store model'''
        self.assertEqual(self.item_price.get_store(), 'ALDI')

    def test_get_food(self):
        '''get_food() returns string of price item's food from Food model'''
        self.assertEqual(self.item_price.get_food(), 'Cheddar Cheese')

    def test_get_brand(self):
        '''get_brand() returns string of price item's brand'''
        self.assertEqual(self.item_price.get_brand(), 'Fresh Farms')

    def test_is_sale_expired(self):
        '''is_sale_expired() returns True for expiration date has passed'''
        # Equals expiration date as yesterday
        self.assertEqual(self.item_price.is_sale_expired(), True)