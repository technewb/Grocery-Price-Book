from django.test import TestCase
from .models import Food

class FoodModelTests(TestCase):

    def test_name_return_string(self):
        food_name = Food(food_name='Beans')
        self.assertIs(food_name.get_name(), 'Beans')
