from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from pricelist import views

urlpatterns = [
    # Get list of categories
    path('', views.CategoryList.as_view()),
    # Get category based on id
    path('<int:pk>', views.CategoryDetail.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)