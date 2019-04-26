from django.contrib import admin
from .models import Category, Store, Food, Unit, Price

# Access categories in admin view
admin.site.register(Category)
admin.site.register(Store)
admin.site.register(Food)
admin.site.register(Unit)
admin.site.register(Price)
