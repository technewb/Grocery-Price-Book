from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from pricelist.views import CategoryViewSet, api_root, FoodViewSet, StoreViewSet, UnitViewSet, PriceViewSet
from . import views
from rest_framework.routers import DefaultRouter

# Router automatically makes routes for api
router = DefaultRouter()

# Registered Model routes route
router.register(r'categories', views.CategoryViewSet)
router.register(r'food', views.FoodViewSet)
router.register(r'stores', views.StoreViewSet)
router.register(r'units', views.UnitViewSet)
router.register(r'prices', views.PriceViewSet)

# Index of api at api, and includes registered routers
urlpatterns = [
    path('api/', include(router.urls))
]