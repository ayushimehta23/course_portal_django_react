# Generated by Django 4.2 on 2023-06-16 05:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0046_remove_teacher_login_via_otp'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='teacher',
            name='otp_digit',
        ),
        migrations.RemoveField(
            model_name='teacher',
            name='verify_status',
        ),
    ]
