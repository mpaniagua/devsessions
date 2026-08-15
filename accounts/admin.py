from	django.contrib	import	admin
from	django.contrib.auth.admin	import	UserAdmin

from django.contrib.auth.forms import AdminUserCreationForm, UserChangeForm  # new

from .models import CustomUser


class CustomUserCreationForm(AdminUserCreationForm):  # new

    class Meta:
        model = CustomUser
        fields = ("username", "email","age","first_name","last_name")


class CustomUserChangeForm(UserChangeForm):

    class Meta:
        model = CustomUser
        fields = ("username", "email","age","first_name","last_name")

admin.site.register(CustomUser)
