from django.db import models
from django.utils import timezone
from datetime import datetime


class Category(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class Food(models.Model):
    name = models.CharField(max_length=200)
    category = models.ForeignKey(
        Category, on_delete=models.SET_NULL, default='', null=True, blank=True)

    def __str__(self):
        return f'{self.name} ({self.category})'


class Store(models.Model):
    name = models.CharField(max_length=200)
    location = models.CharField(max_length=500)

    def __str__(self):
        return f'{self.name} - {self.location}'


class Unit(models.Model):
    '''Unit of measurement'''
    name = models.CharField(max_length=10)

    def __str__(self):
        return self.name


class Price(models.Model):
    store = models.ForeignKey(Store, on_delete=models.CASCADE)
    food = models.ForeignKey(Food, on_delete=models.CASCADE)
    brand = models.CharField(max_length=200, blank=True)
    price = models.DecimalField(max_digits=12, decimal_places=2)
    on_sale = models.BooleanField()
    date = models.DateField()
    expiration_date = models.DateField(blank=True, null=True)
    # TODO: May need to figure out how to deal when using math
    unit = models.ForeignKey(
        Unit, on_delete=models.SET_NULL, null=True, blank=True)
    amount = models.DecimalField(max_digits=12, decimal_places=2)

    def __str__(self):
        return (f'{self.food} ${(self.price / self.amount):.2f} per {self.unit} - {self.store}')

    def is_sale_expired(self):
        '''Returns boolean if sale expired'''
        if self.expiration_date.date() < datetime.now().date():
            return True
        return False

    class Meta:
        ordering = ('date',)

# TODO: Meta Model Class ?
