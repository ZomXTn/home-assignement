from django.db import models
from accounts.models import UserCustomised
import uuid


class RSSFeed(models.Model):
    feed_id = models.UUIDField(
        primary_key=True, unique=True, default=uuid.uuid4, editable=False
    )
    url = models.URLField(unique=True)
    name = models.CharField(max_length=255, blank=True)
    image_url = models.URLField( default="https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Feed-icon.svg/1200px-Feed-icon.svg.png")
    last_updated = models.DateTimeField(auto_now=True)
    users = models.ManyToManyField(
        UserCustomised, related_name="subscribed_feeds"
    )

    def __str__(self):
        return self.name or self.url


class Category(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Article(models.Model):
    article_id = models.UUIDField(
        primary_key=True, unique=True, default=uuid.uuid4, editable=False
    )
    title = models.TextField(blank=False)
    description = models.TextField(blank=False)
    publication_date = models.DateTimeField(blank=False)
    image_url = models.URLField(blank=True)
    author = models.TextField(blank=False)
    content = models.TextField(blank=False)
    feed = models.ForeignKey(RSSFeed, on_delete=models.CASCADE)
    categories = models.ManyToManyField(Category)

    def __str__(self) -> str:
        return str(self.title)
