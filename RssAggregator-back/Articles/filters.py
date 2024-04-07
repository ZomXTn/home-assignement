from django_filters import FilterSet, filters
from .models import Article

class ArticleFilters(FilterSet):
    author = filters.CharFilter(field_name="author", lookup_expr="icontains")
    title = filters.CharFilter(field_name="title", lookup_expr="icontains")
    publication_date = filters.DateFilter(field_name="publication_date")
    feed_id = filters.NumberFilter(field_name="feed__id", lookup_expr="exact")  # Added filter for feed by ID
    favorite_only = filters.BooleanFilter(method="filter_favorite_only")

    class Meta:
        model = Article
        fields = ["author", "title", "publication_date", "feed_id"]  # Updated to include feed_id

    def filter_favorite_only(self, queryset, name, value):
        if value:
            user = self.request.user
            return queryset.filter(
                article_interactions__in=user.user_interactions.filter(interaction_type="favorite")
            )
        return queryset
