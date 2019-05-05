from pricelist.models import Category, Food
from api.serializers import CategorySerializer, FoodSerializer
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.reverse import reverse
from rest_framework.response import Response


@api_view(['GET'])
def api_root(request, format=None):
    """
    API entry point
    """
    return Response({
        'categories': reverse('category-list', request=request, format=format),
        'food': reverse('food-list', request=request, format=format),
    })

# Defines view behavior
class CategoryViewSet(viewsets.ModelViewSet):
    """
    Provides basic CRUD for Category model
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class FoodViewSet(viewsets.ModelViewSet):
    """
    Provides basic CRUD for Food model
    """
    queryset = Food.objects.all()
    serializer_class = FoodSerializer