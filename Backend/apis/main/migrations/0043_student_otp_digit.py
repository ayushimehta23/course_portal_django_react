# Generated by Django 4.2 on 2023-06-06 04:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0042_delete_aboutus_alter_teacher_facebook_url_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='student',
            name='otp_digit',
            field=models.CharField(blank=True, max_length=10, null=True),
        ),
    ]