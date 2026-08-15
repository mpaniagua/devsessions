from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
# Create your tests here.
class UserManagerTest(TestCase):
    def test_create_user(self):
        User = get_user_model()
        user = User.objects.create_user(
            username="testuser"
            ,email= "testemail@testemail.com"
            ,password="test12345"
            ,age=15
        )
        self.assertEqual(user.username,"testuser")
        self.assertEqual(user.age,15)
    def test_creater_anothr(self):
        User = get_user_model()
        user = User.objects.create_user(
            username="testuser12"
            ,email= "testemail@testemail.com"
            ,password="test12345"            
        )
        self.assertNotEqual(user.username,"testuser")
class SignUpPageTest(TestCase):
    def test_url_exist_at_location_signupvie(self):
        respose= self.client.get("/accounts/signup/")
        self.assertEqual(respose.status_code,200)
    
    def test_url_exist_at_location_signupvieFalse(self):
        respose= self.client.get("/accounts/signup/")
        self.assertNotEqual(respose.status_code,400)

    def test_signup_view_name(self):
        response = self.client.get(reverse,"signup")
        self.assertEqual(response.status_code,200)
        #self.assertTemplateUsed(response,"registration/signup.html")

    
    