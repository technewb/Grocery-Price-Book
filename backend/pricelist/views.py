from django.shortcuts import render
from django_filters import rest_framework as filters
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse

from api.serializers import CategorySerializer, FoodSerializer, StoreSerializer, UnitSerializer
from pricelist.models import Category, Food, Store, Unit


def index(request, path=''):
    """
    Homepage to render container for single-app page
    """
    return render(request, 'index.html')

@api_view(['GET'])
def api_root(request, format=None):
    """
    API entry point
    """
    return Response({
        'categories': reverse('category-list', request=request, format=format),
        'food': reverse('food-list', request=request, format=format),
    })

# FilterSet class for Category model
class CategoryFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = Category
        fields = ['name']

# Defines view behavior for Category model
class CategoryViewSet(viewsets.ModelViewSet):
    """
    Provides basic CRUD for Category model
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = CategoryFilter

# Defines view behavior for Food model
class FoodViewSet(viewsets.ModelViewSet):
    """
    Provides basic CRUD for Food model
    """
    queryset = Food.objects.all()
    serializer_class = FoodSerializer

#Defines view behavior for Store model
class StoreViewSet(viewsets.ModelViewSet):
    """
    Provides basic CRUD for Store model
    """
    queryset = Store.objects.all()
    serializer_class = StoreSerializer

#Defines view behavior for Unit model
class UnitViewSet(viewsets.ModelViewSet):
    """
    Provides basic CRUD for Unit model
    """
    queryset = Unit.objects.all()
    serializer_class = UnitSerializer
