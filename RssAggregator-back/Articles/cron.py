from django_cron import CronJobBase, Schedule
from .models import RSSFeed, Article  # Adjust this import based on your application
import feedparser
from django.utils.timezone import make_aware
from datetime import datetime
from .utils import get_image_url , clean_html


class FetchArticlesCronJob(CronJobBase):
    RUN_EVERY_MINS = 5  # every hour

    schedule = Schedule(run_every_mins=RUN_EVERY_MINS)
    code = "Articles.cron.FetchArticlesCronJob"  # A unique code for your cron job

    def do(self):
        feeds = RSSFeed.objects.all()
        for feed in feeds:
            parsed_feed = feedparser.parse(feed.url)
            for entry in parsed_feed.entries:
                # Basic check for existing articles by title and feed
                if not Article.objects.filter(title=entry.title, feed=feed).exists():
                    # Parsing publication date
                    publication_date = entry.get("published_parsed")
                    if publication_date:
                        publication_date = make_aware(datetime(*publication_date[:6]))
                    else:
                        publication_date = make_aware(datetime.now())

                    # Extracting image URL
                    image_url = get_image_url(entry)

                    # Creating the article
                    Article.objects.create(
                        title=entry.title,
                        description=clean_html(entry.get("summary", "")),
                        publication_date=publication_date,
                        image_url=image_url,
                        author=entry.get("author", ""),
                        content=entry.get("content", [{}])[0].get("value", ""),
                        feed=feed,
                    )
