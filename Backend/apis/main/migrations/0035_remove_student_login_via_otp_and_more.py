# Generated by Django 4.2 on 2023-05-27 09:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0034_student_login_via_otp_teacher_login_via_otp'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='student',
            name='login_via_otp',
        ),
        migrations.RemoveField(
            model_name='teacher',
            name='login_via_otp',
        ),
    ]
