from django.db import models

class userinfo(models.Model):
    hashEmail = models.CharField(max_length=255, null=True) 
    password = models.CharField(max_length=255, null=True)
    
    
    def __str__(self):
            return self.hashEmail
class complains(models.Model):
    hashEmail = models.CharField(max_length=255, null=True) 
    subject = models.CharField(max_length=255, null=True) 
    desc = models.CharField(max_length=255, null=True) 
    