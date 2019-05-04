from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from pricelist.views import CategoryViewSet, api_root, FoodViewSet

category_list = CategoryViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

category_detail = CategoryViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

food_list = FoodViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

food_detail = FoodViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

urlpatterns = [
    # API root
    path('', api_root),
    # List of categories
    path('categories/', category_list, name='category-list'),
    # Category detail
    path('categories/<int:pk>', category_detail, name='category-detail'),
    # List of food
    path('food/', food_list, name='food-list'),
    # Food detail
    path('food/<int:pk>', food_detail, name='food-detail'),
]

urlpatterns = format_suffix_patterns(urlpatterns)