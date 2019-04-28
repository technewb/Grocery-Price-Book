from django.test import TestCase
from .models import Food, Category, Store, Price, Unit
from datetime import datetime, timedelta

class CategoryModelTests(TestCase):

    @classmethod
    def setUpTestData(cls):
        cls.category = Category(name="Produce")

    def test_get_name_(self):
        '''Return string "Produce" from name'''
        self.assertEqual(self.category.name, 'Produce')

class FoodModelTests(TestCase):

    @classmethod
    def setUpTestData(cls):
        category = Category(name="Canned")
        cls.food = Food(name="Beans", category=category)

    def test_get_name_(self):
        '''Return string "Beans" from name'''
        self.assertEqual(self.food.name, 'Beans')

    def test_get_category_name(self):
        '''Returns string "Canned" from Category name'''
        self.assertEqual(self.food.category_name, "Canned")

class StoreModelTests(TestCase):

    @classmethod
    def setUpTestData(cls):
        cls.store = Store(name='Kroger', location='Marietta, GA 30064')

    def test_get_name(self):
        '''Returns string "Kroger" from name'''
        self.assertEqual(self.store.name, 'Kroger')
    
    def test_get_location(self):
        '''Returns string "Marietta, GA 30064" from location'''
        self.assertEqual(self.store.location, 'Marietta, GA 30064')

class UnitModelTests(TestCase):

    @classmethod
    def setUpTestData(cls):
        cls.unit = Unit(name='lb')
    
    def test_get_name(self):
        '''Returns string "lb" from name'''
        self.assertEqual(self.unit.name, 'lb')

class PriceModelTests(TestCase):
    
    @classmethod
    def setUpTestData(cls):
        category = Category(name='Dairy')
        store = Store(name='ALDI', location='Kennesaw, GA 30152')
        food = Food(name='Cheddar Cheese', category=category)
        unit = Unit(name='lb')
        cls.item_price = Price(store=store, food=food, brand='Fresh Farms', price=1.50, on_sale=False,
                           date=datetime.now(), expiration_date=datetime.now() - timedelta(1),
                           unit=unit, amount=2)

    def test_get_store_name(self):
        '''Returns string "ALDI" from Store's name'''
        self.assertEqual(self.item_price.store_name, 'ALDI')

    def test_get_food_name(self):
        '''Returns string "Cheddar Cheese" from Food's name'''
        self.assertEqual(self.item_price.food_name, 'Cheddar Cheese')

    def test_get_brand(self):
        '''Returns string "Fresh Farms" from brand'''
        self.assertEqual(self.item_price.brand, 'Fresh Farms')

    def test_get_price(self):
        '''Returns float 1.50 from price'''
        self.assertEqual(self.item_price.price, 1.50)

    def test_get_on_sale(self):
        '''Returns False (unchecked box) from on_sale'''
        self.assertEqual(self.item_price.on_sale, False)

    def test_get_date(self):
        '''Returns today's date from date without time'''
        self.assertEqual(self.item_price.date.date(), datetime.now().date())

    def test_get_sale_expiration_date(self):
        '''Returns yesterday's date without time from sale_expiration'''
        yesterday = datetime.now().date() - timedelta(1)
        self.assertEqual(self.item_price.expiration_date.date(), yesterday)

    def test_get_unit_name(self):
        '''Returns "lb" from Unit name'''
        self.assertEqual(self.item_price.unit_name, "lb")

    def test_get_amount(self):
        '''Returns 2 float from amount'''
        self.assertEqual(self.item_price.amount, 2)

    def test_is_sale_expired(self):
        '''is_sale_expired() returns True for expiration date whose expiration_date was yesterday'''
        self.assertEqual(self.item_price.is_sale_expired(), True)

    # TODO: Add test to check for False is_sale_expired()