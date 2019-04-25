from django.db import models

class Food(models.Model):
    food_name = models.CharField(max_length=200)

    def __str__(self):
        return self.food_name