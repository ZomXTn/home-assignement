from django.utils.timezone import make_aware
from datetime import datetime
import feedparser
from rest_framework.decorators import action
from rest_framework import viewsets, status, mixins
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db.models import Prefetch
from django_filters import rest_framework as filters
from .models import Article, Category, RSSFeed
from Interactions.models import Interaction
from .serializers import (
    ArticleSerializer,
    CategorySerializer,
    RSSFeedSerializer,
    UpdateArticleSerializer,
)
from .filters import ArticleFilters
from rest_framework.filters import OrderingFilter
from .utils import get_image_url, clean_html


class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    http_method_names = ["get", "head", "options", "put", "delete"]
    permission_classes = [IsAuthenticated]
    filter_backends = (filters.DjangoFilterBackend, OrderingFilter)
    filterset_class = ArticleFilters

    def get_queryset(self):
        user = self.request.user
        user_subscribed_feeds = user.subscribed_feeds.all()
        return (
            self.queryset.filter(feed__in=user_subscribed_feeds)
            .prefetch_related(
                Prefetch(
                    "article_interactions",
                    queryset=Interaction.objects.filter(user=user),
                )
            )
        )

    def get_permissions(self):
        if self.action in ["destroy"]:
            self.permission_classes = [IsAuthenticated, IsAdminUser]
        else:
            self.permission_classes = [IsAuthenticated]
        return super().get_permissions()

    def get_serializer_class(self):
        if self.action in ["update", "partial_update"]:
            return UpdateArticleSerializer
        return self.serializer_class


class RSSFeedViewSet(viewsets.ModelViewSet):
    queryset = RSSFeed.objects.all()
    serializer_class = RSSFeedSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get_permissions(self):
        if self.action in ["list", "retrieve", "subscribe", "unsubscribe"]:
            self.permission_classes = [IsAuthenticated]
        else:
            self.permission_classes = [IsAdminUser]
        return super().get_permissions()

    def create(self, request, *args, **kwargs):
        feed_url = request.data.get("url")
        feed_name = request.data.get("name")
        feed_image_url = request.data.get("image_url")
        # Check if the feed already exists
        rss_feed_instance, created = RSSFeed.objects.get_or_create(
            url=feed_url,  # This is used for matching
            defaults={  # These are used for creation if a match is not found
                "name": feed_name,  # Assuming you have a variable feed_name
                "image_url": feed_image_url,  # Assuming you have a variable feed_image_url
                # Include any other fields you want to set upon creation
            },
        )

        # Automatically subscribe the user to the RSSFeed
        rss_feed_instance.users.add(request.user)

        # Parse the RSS feed and add new articles
        feed = feedparser.parse(feed_url)
        new_articles_added = 0  # Counter for new articles
        for entry in feed.entries:
            article_title = entry.title
            image_url = get_image_url(entry)
            # Check if the article already exists for this feed
            if not Article.objects.filter(
                title=article_title, feed=rss_feed_instance
            ).exists():
                Article.objects.create(
                    title=article_title,
                    description=clean_html(entry.get("summary", "")),
                    publication_date=make_aware(
                        datetime.now()
                    ),  # Consider improving date handling
                    image_url=image_url,
                    author=entry.get("author", ""),
                    content=entry.get("content", [{}])[0].get("value", ""),
                    feed=rss_feed_instance,
                )
                new_articles_added += 1

        # Response handling
        if created:
            # If the feed was newly created, return the feed's details
            headers = self.get_success_headers(rss_feed_instance)
            return Response(
                RSSFeedSerializer(rss_feed_instance).data,
                status=status.HTTP_201_CREATED,
                headers=headers,
            )
        else:
            # If the feed existed and only articles were updated, return a success message
            return Response(
                {"message": f"Feed updated with {new_articles_added} new articles."},
                status=status.HTTP_200_OK,
            )
        
    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def unsubscribe(self, request, pk=None):
        # Get the feed instance, ensuring it exists
        feed = get_object_or_404(RSSFeed, pk=pk)
        
        # Remove the current user from the feed's subscribers
        feed.users.remove(request.user)
        
        # Return a success response
        return Response({'status': 'unsubscribed'})


class CategoryViewSet(viewsets.GenericViewSet, mixins.ListModelMixin):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Category.objects.all()
