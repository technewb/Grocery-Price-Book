from django.contrib import admin
from .models import Category, Store, Food

# Access categories in admin view
admin.site.register(Category)
admin.site.register(Store)
admin.site.register(Food)
