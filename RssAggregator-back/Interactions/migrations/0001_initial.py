# Generated by Django 5.0.2 on 2024-04-07 17:28

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Articles', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Interaction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('interaction_type', models.CharField(choices=[('READ', 'read'), ('OPINION', 'opinion'), ('RATING', 'rating'), ('FAVORITE', 'favorite'), ('SHARE', 'share')], max_length=20)),
                ('timestamp', models.DateTimeField(auto_now=True)),
                ('rating', models.PositiveSmallIntegerField(blank=True, null=True)),
                ('opinion', models.CharField(blank=True, choices=[('LIKE', 'like'), ('DISLIKE', 'dislike')], max_length=20, null=True)),
                ('share', models.CharField(blank=True, choices=[('INSTAGRAM', 'instagram'), ('FACEBOOK', 'facebook'), ('WHATSAPP', 'whatsapp'), ('EMAIL', 'email'), ('REDDIT', 'reddit')], max_length=20, null=True)),
                ('duration', models.PositiveSmallIntegerField(blank=True, null=True)),
                ('article', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='article_interactions', to='Articles.article')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_interactions', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-timestamp'],
            },
        ),
    ]