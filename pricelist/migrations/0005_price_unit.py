# Generated by Django 2.2 on 2019-04-25 23:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('pricelist', '0004_auto_20190425_1854'),
    ]

    operations = [
        migrations.CreateModel(
            name='Unit',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('unit', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='Price',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('brand', models.CharField(max_length=200)),
                ('price', models.DecimalField(decimal_places=2, max_digits=12)),
                ('on_sale', models.BooleanField()),
                ('date', models.DateField(auto_now_add=True)),
                ('expiration_date', models.DateField(null=True)),
                ('amount', models.DecimalField(decimal_places=2, max_digits=12)),
                ('food', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='pricelist.Food')),
                ('store', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='pricelist.Store')),
                ('unit', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='pricelist.Unit')),
            ],
        ),
    ]
