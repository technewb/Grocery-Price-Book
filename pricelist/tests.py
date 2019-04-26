from django.test import TestCase
from .models import Food, Category, Store, Price, Unit
from datetime import datetime, timedelta

class FoodModelTests(TestCase):

    @classmethod
    def setUpTestData(cls):
        category = Category(name="Canned")
        cls.food = Food(food_name="Beans", category=category)

    def test_name_return_string(self):
        '''
        get_name() return string of food name
        '''
        self.assertEqual(self.food.get_name(), 'Beans')

    def test_get_category(self):
        '''
        get_category() returns string name from Category model connected to food
        '''
        self.assertEqual(self.food.get_category(), "Canned")

class CategoryModelTests(TestCase):

    @classmethod
    def setUpTestData(cls):
        cls.category = Category(name="Produce")

    def test_name_return_string(self):
        '''
        Return string of category name
        '''
        self.assertEqual(self.category.get_name(), 'Produce')

class StoreModelTests(TestCase):

    @classmethod
    def setUpTestData(cls):
        cls.store = Store(store_name='Kroger', location='Marietta, GA 30064')

    def test_store_name_return_string(self):
        '''
        get_name() returns string of store name from database
        '''
        self.assertEqual(self.store.get_name(), 'Kroger')
    
    def test_location_return_string(self):
        '''
        get_location() returns string of store location from database
        '''
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
        '''
        get_store() returns "ALDI" from Store model store_name
        '''
        self.assertEqual(self.item_price.get_store(), 'ALDI')

    def test_get_food(self):
        '''
        get_food() returns "Cheddar Cheese" from Food model food_name
        '''
        self.assertEqual(self.item_price.get_food(), 'Cheddar Cheese')

    def test_get_brand(self):
        '''
        get_brand() returns "Fresh Farms" from Price model brand
        '''
        self.assertEqual(self.item_price.get_brand(), 'Fresh Farms')

    def test_get_price(self):
        '''
        get_price() returns 1.50 from Price model price
        '''
        self.assertEqual(self.item_price.get_price(), 1.50)

    def test_is_on_sale(self):
        '''
        is_on_sale() returns False (unchecked box) from Price model on_sale
        '''
        self.assertEqual(self.item_price.is_on_sale(), False)

    def test_get_date(self):
        '''
        get_date() returns today's date with time from Price model date
        '''
        self.assertEqual(self.item_price.get_date(), datetime.now().date())

    def test_get_sale_expiration(self):
        '''
        get_sale_expiration() returns yesterday's date without time from Price model sale_expiration
        '''
        yesterday = datetime.now().date() - timedelta(1)
        self.assertEqual(self.item_price.get_sale_expiration(), yesterday)

    def test_get_unit(self):
        '''
        get_unit() returns "lb" from Price model unit
        '''
        self.assertEqual(self.item_price.get_unit(), "lb")

    def test_get_amount(self):
        '''
        get_amount() returns 2 from Price model amount
        '''
        self.assertEqual(self.item_price.get_amount(), 2)

    def test_is_sale_expired(self):
        '''
        is_sale_expired() returns True for expiration date whose expiration_date was yesterday
        '''
        self.assertEqual(self.item_price.is_sale_expired(), True)