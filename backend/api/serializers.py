from rest_framework import serializers
from pricelist.models import Category, Food, Store, Unit, Price

# Serializers define the API representation
class CategorySerializer(serializers.HyperlinkedModelSerializer):
    """
    Hyperlinked serializer class for Category model from ``pricelist.models``
    """

    class Meta:
        model = Category
        fields = ('id', 'name')

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
        fields = ('id', 'name', 'category_id', 'category')

# TODO: Check if need 
class FoodListingField(serializers.RelatedField):
    def to_representation(self, value):
        return {'name': value.name}

class StoreSerializer(serializers.ModelSerializer):
    """
    Serializer class for Store model from ``pricelist.models``
    """

    class Meta:
        model = Store
        fields = ('id', 'name', 'location')

# TODO: Check if need 
class StoreListingField(serializers.RelatedField):
    def to_representation(self, value):
        return {'name': value.name, 'location': value.location}

class UnitSerializer(serializers.ModelSerializer):
    """
    Serializer class for Unit model from ``pricelist.models``
    """

    class Meta:
        model = Unit
        fields = ('id', 'name')

# TODO: Check if need 
class UnitListingField(serializers.RelatedField):
    def to_representation(self, value):
        return {'name': value.name}

class PriceSerializer(serializers.ModelSerializer):
    """
    Serializer class for Price model from ``pricelist.models``
    """
    store_info = StoreListingField(source='store', read_only=True)
    unit_info = UnitListingField(source='unit', read_only=True)
    food_info = FoodListingField(source='food', read_only=True)

    class Meta:
        # TODO: Fix is_sale_expired
        model = Price
        fields = ('id', 'store', 'store_info', 'food', 'food_info', 'brand', 'price', 'on_sale',
            'date', 'expiration_date', 'unit', 'unit_info', 'amount')
