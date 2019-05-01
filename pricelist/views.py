from pricelist.models import Category
from api.serializers import CategorySerializer
from django.http import Http404
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

class CategoryList(APIView):
    """
    List all categories, or create a new category
    """
    def get(self, request, format=None):
        """
        Get all categories parsed
        """
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        """
        Create a category and return parsed
        """
        serializer = CategorySerializer(data=request.data)
        # Check if data is valid
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CategoryDetail(APIView):
    """
    Retrieve, update, or delete a category
    """
    def get_object(self, pk):
        """
        Get category object by primary key
        """
        try:
            category = Category.objects.get(pk=pk)
        except Category.DoesNotExist:
            raise Http404
    
    def get(self, request, pk, format=None):
        """
        Get and return category
        """
        category = self.get_object(pk)
        serializer = CategorySerializer(category)
        return Response(serializer.data)

    def put(self, request, pk, format=None):

        category = self.get_object(pk)
        serializer = CategorySerializer(category, data=request.data)
        # Check if data is valid
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk, format=None):
        """
        Delete category
        """
        category = self.get_object(pk)
        category.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)