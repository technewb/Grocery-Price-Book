from django.contrib import admin
from .models import Category

# Access categories in admin view
admin.site.register(Category)
