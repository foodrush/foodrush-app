# Generated by Django 4.1.7 on 2023-04-03 14:43

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("core", "0004_remove_order_user_remove_product_user_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="customerprofile",
            name="phone_number",
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]
