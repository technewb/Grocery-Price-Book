from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from pricelist.views import CategoryViewSet, api_root, FoodViewSet
from . import views

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
    path('', views.index, name='index'),
    # API root
    path('api', api_root),
    # List of categories
    path('api/categories/', category_list, name='category-list'),
    # Category detail
    path('api/categories/<int:pk>', category_detail, name='category-detail'),
    # List of food
    path('api/food/', food_list, name='food-list'),
    # Food detail
    path('api/food/<int:pk>', food_detail, name='food-detail'),
]

urlpatterns = format_suffix_patterns(urlpatterns)