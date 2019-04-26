from django.db import models
from django.utils import timezone
from datetime import datetime

class Category(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name
    
    def get_name(self):
        '''Return string of category name'''
        return self.name

class Food(models.Model):
    food_name = models.CharField(max_length=200)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, default='', null=True, blank=True)

    def __str__(self):
        return self.food_name

    def get_name(self):
        return self.food_name

    def get_category(self):
        return self.category.get_name()

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

class Unit(models.Model):
    unit = models.CharField(max_length=10)

    def __str__(self):
        return self.unit

    def get_unit(self):
        return self.unit

class Price(models.Model):
    store = models.ForeignKey(Store, on_delete=models.CASCADE)
    food = models.ForeignKey(Food, on_delete=models.CASCADE)
    brand = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=12, decimal_places=2)
    on_sale = models.BooleanField()
    date = models.DateField(auto_now_add=True)
    expiration_date = models.DateField(null=True)
    # TODO: May need to figure out how to deal when using math
    unit = models.ForeignKey(Unit, on_delete=models.SET_NULL, null=True, blank=True)
    amount = models.DecimalField(max_digits=12, decimal_places=2)

    def __str__(self):
        return (f'{self.food} ${(self.price / self.amount):.2f} per {self.unit} - {self.store}')
    
    def get_store(self):
        '''
        Returns string of items's store
        '''
        return self.store.get_name()
    
    def get_food(self):
        '''
        Returns string of item's food type/name
        '''
        return self.food.get_name()
    
    def get_brand(self):
        '''
        Returns string of item's brand
        '''
        return self.brand
    
    def get_price(self):
        '''
        Returns string of item's price
        '''
        # TODO: Can I enforce two decimal places?
        return self.price
    
    def is_on_sale(self):
        '''
        Returns boolean if item on sale or not
        '''
        return self.on_sale

    def get_date(self):
        '''
        Returns string of item's date entry without timestamp
        '''
        return self.date.date()

    def get_sale_expiration(self):
        '''
        Returns datetime object of item's sale expiration date
        '''
        return self.expiration_date.date()
    
    def get_unit(self):
        '''
        Returns string of item's unit of measurement
        '''
        return self.unit.get_unit()
    
    def get_amount(self):
        '''
        Returns amount of product in item/price
        '''
        return self.amount
    
    # TODO: Can I change to exactly date when entering data?
    def is_sale_expired(self):
        '''
        Returns boolean if sale expired
        '''
        if self.expiration_date.date() < datetime.now().date():
            return True
        return False
