# Generated by Django 4.2 on 2023-04-19 15:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0020_alter_teacher_profile_img'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='teacher',
            name='profile_img',
        ),
        migrations.CreateModel(
            name='StudentFavoriteCourse',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.BooleanField(default=False)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.course')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.student')),
            ],
            options={
                'verbose_name_plural': '7. Student Favorite Courses',
            },
        ),
    ]