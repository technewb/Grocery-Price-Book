from pricelist.models import Category
from api.serializers import CategorySerializer
from rest_framework import generics

class CategoryList(generics.ListCreateAPIView):
    """
    List all categories, or create a new category
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update, or delete a category
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer