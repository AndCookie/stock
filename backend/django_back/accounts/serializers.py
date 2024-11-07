from .models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        field = '__all__'
    
    def create(self,validated_data):
        user = User.Objects.create_user(
            email = validated_data['email'],
            password = validated_data['password']
        )
        return user