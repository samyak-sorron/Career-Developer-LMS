# Generated by Django 4.1.3 on 2023-05-07 20:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0033_course_course_views'),
    ]

    operations = [
        migrations.AddField(
            model_name='teacher',
            name='profile_img',
            field=models.ImageField(null=True, upload_to='teacher_img/'),
        ),
    ]
