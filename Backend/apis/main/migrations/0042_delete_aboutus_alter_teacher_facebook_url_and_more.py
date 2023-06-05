# Generated by Django 4.2 on 2023-06-03 04:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0041_alter_aboutus_options'),
    ]

    operations = [
        migrations.DeleteModel(
            name='AboutUs',
        ),
        migrations.AlterField(
            model_name='teacher',
            name='facebook_url',
            field=models.URLField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='teacher',
            name='instagram_url',
            field=models.URLField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='teacher',
            name='otp_digit',
            field=models.CharField(blank=True, max_length=10, null=True),
        ),
        migrations.AlterField(
            model_name='teacher',
            name='twitter_url',
            field=models.URLField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='teacher',
            name='website_url',
            field=models.URLField(blank=True, null=True),
        ),
    ]