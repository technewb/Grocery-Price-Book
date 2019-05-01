from rest_framework import serializers
from pricelist.models import Category, Food

class CategorySerializer(serializers.ModelSerializer):
    """
    Serializer class for Category model from ``pricelist.models``
    """
    class Meta:
        model = Category
        fields = ('id', 'name')

class FoodSerializer(serializers.ModelSerializer):
    """
    Serializer class for Category model from ``pricelist.models``
    """
    class Meta:
        model = Food
        fields = ('id', 'name', 'category')
