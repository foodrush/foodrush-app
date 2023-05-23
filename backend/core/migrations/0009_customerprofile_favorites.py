# Generated by Django 4.1.7 on 2023-05-23 16:30

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("core", "0008_cartitem"),
    ]

    operations = [
        migrations.AddField(
            model_name="customerprofile",
            name="favorites",
            field=models.ManyToManyField(
                blank=True, related_name="favorites", to="core.product"
            ),
        ),
    ]
