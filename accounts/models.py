from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.


class CustomUser(AbstractUser):
    age = models.PositiveIntegerField(null=True,blank=True)
    isphotograper = models.BooleanField(null=True,blank=True)
    is_approved = models.BooleanField(null=False,blank=False,default=False)
    def __str__(self):
        return self.username
