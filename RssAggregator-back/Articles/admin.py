from django.contrib import admin
from .models import Article, RSSFeed
# Register your models here.
admin.site.register(Article)
admin.site.register(RSSFeed)