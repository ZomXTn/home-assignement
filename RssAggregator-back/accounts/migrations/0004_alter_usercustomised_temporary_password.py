# Generated by Django 5.0.2 on 2024-04-07 20:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_alter_usercustomised_temporary_password'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usercustomised',
            name='temporary_password',
            field=models.CharField(default='d>IeHm5-2q|@', max_length=64, verbose_name='Mot de passe temporaire'),
        ),
    ]
