from rest_framework import serializers
from pricelist.models import Category, Food

# Serializers define the API representation
class CategorySerializer(serializers.HyperlinkedModelSerializer):
    """
    Hyperlinked serializer class for Category model from ``pricelist.models``
    """

    class Meta:
        model = Category
        fields = ('url', 'id', 'name')

class FoodSerializer(serializers.ModelSerializer):
    """
    Serializer class for Category model from ``pricelist.models``
    """
    # Return string instead of id for category
    # category = serializers.StringRelatedField()
    category = CategorySerializer(
        read_only=True
    )
    category_id = serializers.IntegerField()

    class Meta:
        model = Food
        fields = ('url', 'id', 'name', 'category_id', 'category')
