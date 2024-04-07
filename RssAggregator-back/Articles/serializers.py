from rest_framework import serializers
from .models import Category, RSSFeed, Article

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

class RSSFeedSerializer(serializers.ModelSerializer):
    feed_id = serializers.UUIDField(read_only=True)
    class Meta:
        model = RSSFeed
        fields = ["url", "name", "last_updated","feed_id","image_url"]

class ArticleSerializer(serializers.ModelSerializer):
    feed = RSSFeedSerializer(read_only=True)
    categories = CategorySerializer(read_only=True, many=True)
    categories_ids = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), source="categories", write_only=True, many=True
    )

    class Meta:
        model = Article
        fields = [
            "article_id",
            "title",
            "description",
            "publication_date",
            "image_url",
            "author",
            "article_interactions",
            "content",
            "feed",
            "categories",
            "categories_ids",
        ]
        depth = 1

class UpdateArticleSerializer(ArticleSerializer):
    feed_id = serializers.PrimaryKeyRelatedField(
        queryset=RSSFeed.objects.all(), source="feed", write_only=True
    )

    class Meta(ArticleSerializer.Meta):
        fields = ArticleSerializer.Meta.fields + ["feed_id"]
